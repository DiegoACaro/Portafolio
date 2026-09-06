import * as THREE from "three";

/**
 * Generacion PROCEDURAL de las texturas de la PCB (sin GLTF ni imagenes).
 *
 * Se dibuja un circuito determinista (PRNG con semilla) en varios "canvas"
 * y de ahi se derivan los 4 mapas que alimentan un `meshPhysicalMaterial`:
 *
 *   - map            (albedo)      color de la baquelita FR4 + cobre + pads + serigrafia
 *   - normalMap                    relieve de pistas / vias / chips (Sobel sobre un heightmap)
 *   - roughnessMap                 FR4 mate vs cobre/oro pulido
 *   - metalnessMap                 cobre y pads = metal, FR4 = dielectrico
 *
 * Todo se calcula UNA sola vez (envolver en useMemo) y en cliente
 * (necesita `document`).
 */

export interface PCBTextureSet {
  map: THREE.CanvasTexture;
  normalMap: THREE.CanvasTexture;
  roughnessMap: THREE.CanvasTexture;
  metalnessMap: THREE.CanvasTexture;
  dispose: () => void;
}

/* PRNG determinista (mulberry32) */
function mulberry32(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------- primitivas del circuito ---------- */
type Prim =
  | { k: "trace"; pts: Array<[number, number]>; w: number }
  | { k: "via"; x: number; y: number; r: number }
  | { k: "pad"; x: number; y: number; w: number; h: number; r: number }
  | { k: "ic"; x: number; y: number; w: number; h: number; pins: number }
  | { k: "silk"; x: number; y: number; w: number; h: number };

/** Enruta un circuito plausible sobre una malla (Manhattan + diagonales). */
function generateCircuit(size: number, seed: number): Prim[] {
  const rand = mulberry32(seed);
  const prims: Prim[] = [];
  const grid = 34; // paso de la rejilla en px
  const cols = Math.floor(size / grid);
  const rows = Math.floor(size / grid);

  // --- trazas ---
  const traceCount = Math.floor(cols * rows * 0.14);
  for (let i = 0; i < traceCount; i++) {
    let cx = Math.floor(rand() * cols);
    let cy = Math.floor(rand() * rows);
    const pts: Array<[number, number]> = [[cx * grid, cy * grid]];
    const steps = 3 + Math.floor(rand() * 7);
    let dir = Math.floor(rand() * 4);
    for (let s = 0; s < steps; s++) {
      if (rand() < 0.45) dir = (dir + (rand() < 0.5 ? 1 : 3)) % 4;
      const len = 1 + Math.floor(rand() * 3);
      cx = Math.max(0, Math.min(cols, cx + (dir === 0 ? len : dir === 2 ? -len : 0)));
      cy = Math.max(0, Math.min(rows, cy + (dir === 1 ? len : dir === 3 ? -len : 0)));
      // codo a 45 grados en el ultimo tramo (rompe la sensacion de rejilla)
      if (rand() < 0.35 && pts.length) {
        const [px, py] = pts[pts.length - 1];
        const dx = cx * grid - px;
        const dy = cy * grid - py;
        const m = Math.min(Math.abs(dx), Math.abs(dy));
        pts.push([px + Math.sign(dx) * m, py + Math.sign(dy) * m]);
      }
      pts.push([cx * grid, cy * grid]);
    }
    if (pts.length < 2) continue;
    const w = rand() < 0.22 ? 6 : rand() < 0.6 ? 3 : 2;
    prims.push({ k: "trace", pts, w });
    // vias en los extremos
    prims.push({ k: "via", x: pts[0][0], y: pts[0][1], r: w < 3 ? 5 : 7 });
    prims.push({ k: "via", x: pts[pts.length - 1][0], y: pts[pts.length - 1][1], r: w < 3 ? 5 : 7 });
  }

  // --- huellas de circuitos integrados ---
  const icCount = 3 + Math.floor(rand() * 3);
  for (let i = 0; i < icCount; i++) {
    const w = grid * (2 + Math.floor(rand() * 3));
    const h = grid * (2 + Math.floor(rand() * 2));
    const x = grid + rand() * (size - w - grid * 2);
    const y = grid + rand() * (size - h - grid * 2);
    prims.push({ k: "ic", x, y, w, h, pins: 4 + Math.floor(rand() * 6) });
    prims.push({ k: "silk", x: x - 6, y: y - 14, w: w + 12, h: 10 });
  }

  // --- pads sueltos / conectores ---
  const padCount = Math.floor(cols * 1.5);
  for (let i = 0; i < padCount; i++) {
    const x = rand() * size;
    const y = rand() * size;
    prims.push({ k: "pad", x, y, w: 8 + rand() * 10, h: 6 + rand() * 6, r: 2 });
  }

  return prims;
}

/* ---------- pintado de una capa ---------- */
interface Palette {
  bg: string;
  trace: string;
  traceEdge?: string;
  via: string;
  viaHole: string;
  pad: string;
  icBody: string;
  icPin: string;
  silk: string;
}

function paintLayer(
  ctx: CanvasRenderingContext2D,
  size: number,
  prims: Prim[],
  pal: Palette,
) {
  ctx.fillStyle = pal.bg;
  ctx.fillRect(0, 0, size, size);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // trazas
  for (const p of prims) {
    if (p.k !== "trace") continue;
    if (pal.traceEdge) {
      ctx.strokeStyle = pal.traceEdge;
      ctx.lineWidth = p.w + 2.5;
      stroke(ctx, p.pts);
    }
    ctx.strokeStyle = pal.trace;
    ctx.lineWidth = p.w;
    stroke(ctx, p.pts);
  }
  // pads
  for (const p of prims) {
    if (p.k !== "pad") continue;
    ctx.fillStyle = pal.pad;
    roundRect(ctx, p.x - p.w / 2, p.y - p.h / 2, p.w, p.h, p.r);
    ctx.fill();
  }
  // ICs
  for (const p of prims) {
    if (p.k !== "ic") continue;
    ctx.fillStyle = pal.icPin;
    const gap = p.w / (p.pins + 1);
    for (let i = 1; i <= p.pins; i++) {
      ctx.fillRect(p.x + i * gap - 3, p.y - 8, 6, 10);
      ctx.fillRect(p.x + i * gap - 3, p.y + p.h - 2, 6, 10);
    }
    ctx.fillStyle = pal.icBody;
    roundRect(ctx, p.x, p.y, p.w, p.h, 4);
    ctx.fill();
  }
  // vias
  for (const p of prims) {
    if (p.k !== "via") continue;
    ctx.fillStyle = pal.via;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = pal.viaHole;
    ctx.beginPath();
    ctx.arc(p.x, p.y, Math.max(1, p.r - 2.5), 0, Math.PI * 2);
    ctx.fill();
  }
  // serigrafia
  for (const p of prims) {
    if (p.k !== "silk") continue;
    ctx.fillStyle = pal.silk;
    ctx.fillRect(p.x, p.y, p.w, 2);
    ctx.fillRect(p.x, p.y + p.h, p.w, 2);
  }
}

function stroke(ctx: CanvasRenderingContext2D, pts: Array<[number, number]>) {
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.stroke();
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

/* ---------- heightmap -> normal map (Sobel) ---------- */
function heightToNormal(src: HTMLCanvasElement, strength: number): HTMLCanvasElement {
  const w = src.width;
  const h = src.height;
  const data = src.getContext("2d")!.getImageData(0, 0, w, h).data;
  const out = document.createElement("canvas");
  out.width = w;
  out.height = h;
  const octx = out.getContext("2d")!;
  const img = octx.createImageData(w, h);

  const H = (x: number, y: number) => {
    const xx = (x + w) % w;
    const yy = (y + h) % h;
    return data[(yy * w + xx) * 4] / 255;
  };

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dx =
        (H(x - 1, y - 1) + 2 * H(x - 1, y) + H(x - 1, y + 1) -
          H(x + 1, y - 1) - 2 * H(x + 1, y) - H(x + 1, y + 1)) *
        strength;
      const dy =
        (H(x - 1, y - 1) + 2 * H(x, y - 1) + H(x + 1, y - 1) -
          H(x - 1, y + 1) - 2 * H(x, y + 1) - H(x + 1, y + 1)) *
        strength;
      const len = Math.hypot(dx, dy, 1) || 1;
      const i = (y * w + x) * 4;
      img.data[i] = ((dx / len) * 0.5 + 0.5) * 255;
      img.data[i + 1] = ((dy / len) * 0.5 + 0.5) * 255;
      img.data[i + 2] = ((1 / len) * 0.5 + 0.5) * 255;
      img.data[i + 3] = 255;
    }
  }
  octx.putImageData(img, 0, 0);
  return out;
}

/* ---------- API ---------- */
export function createPCBTextures(opts?: {
  size?: number;
  seed?: number;
}): PCBTextureSet {
  const size = opts?.size ?? 1024;
  const seed = opts?.seed ?? 73;
  const prims = generateCircuit(size, seed);

  const newCanvas = () => {
    const c = document.createElement("canvas");
    c.width = c.height = size;
    return c;
  };

  // --- albedo ---
  const albedo = newCanvas();
  paintLayer(albedo.getContext("2d")!, size, prims, {
    bg: "#0a171d",
    trace: "#7c5138",
    traceEdge: "#4a2e1f",
    via: "#a98a54",
    viaHole: "#060d0d",
    pad: "#c2a256",
    icBody: "#0b0d11",
    icPin: "#b09963",
    silk: "#9fb0b8",
  });
  // grano de fibra de vidrio
  {
    const ctx = albedo.getContext("2d")!;
    const rand = mulberry32(seed ^ 0x9e37);
    for (let i = 0; i < size * 40; i++) {
      const a = rand() * 0.04;
      ctx.fillStyle = `rgba(${rand() > 0.5 ? "255,255,255" : "0,0,0"},${a})`;
      ctx.fillRect(rand() * size, rand() * size, 2, 2);
    }
  }

  // --- height ---
  const height = newCanvas();
  paintLayer(height.getContext("2d")!, size, prims, {
    bg: "#808080",
    trace: "#adadad",
    via: "#c0c0c0",
    viaHole: "#4a4a4a",
    pad: "#b6b6b6",
    icBody: "#e0e0e0",
    icPin: "#9a9a9a",
    silk: "#8c8c8c",
  });
  {
    // suaviza los biseles antes del Sobel
    const ctx = height.getContext("2d")!;
    ctx.globalAlpha = 1;
    ctx.filter = "blur(1.4px)";
    ctx.drawImage(height, 0, 0);
    ctx.filter = "none";
  }

  // --- roughness ---  (oscuro = liso)
  const rough = newCanvas();
  paintLayer(rough.getContext("2d")!, size, prims, {
    bg: "#cccccc", // FR4 ~0.8
    trace: "#7a7a7a", // cobre ~0.47
    via: "#5a5a5a",
    viaHole: "#b0b0b0",
    pad: "#3f3f3f", // oro ~0.25
    icBody: "#9a9a9a",
    icPin: "#4a4a4a",
    silk: "#8a8a8a",
  });

  // --- metalness ---
  const metal = newCanvas();
  paintLayer(metal.getContext("2d")!, size, prims, {
    bg: "#000000",
    trace: "#ffffff",
    via: "#ffffff",
    viaHole: "#000000",
    pad: "#ffffff",
    icBody: "#000000",
    icPin: "#ffffff",
    silk: "#000000",
  });

  const normal = heightToNormal(height, 2.4);

  /* -> texturas */
  const mkTex = (canvas: HTMLCanvasElement, srgb: boolean) => {
    const t = new THREE.CanvasTexture(canvas);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = 8;
    t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    t.needsUpdate = true;
    return t;
  };

  const map = mkTex(albedo, true);
  const normalMap = mkTex(normal, false);
  const roughnessMap = mkTex(rough, false);
  const metalnessMap = mkTex(metal, false);
  for (const t of [map, normalMap, roughnessMap, metalnessMap]) t.anisotropy = 16;

  return {
    map,
    normalMap,
    roughnessMap,
    metalnessMap,
    dispose: () => {
      map.dispose();
      normalMap.dispose();
      roughnessMap.dispose();
      metalnessMap.dispose();
    },
  };
}
