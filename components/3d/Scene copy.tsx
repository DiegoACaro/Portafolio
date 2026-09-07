"use client";

import {
  memo,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { useSectionState } from "@/context/SectionContext";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { emitSceneReady } from "@/lib/sceneReady";
import { PCBBoard } from "./PCBBoard";
import { LEDModel } from "./LEDModel";

/**
 * Scene
 * --------------------------------------------------------------------
 * Canvas global de React Three Fiber (fondo, sin interaccion).
 *
 * El estado se lee AQUI, FUERA del <Canvas> (el contexto de React no cruza
 * el reconciliador de R3F), y se inyecta hacia dentro:
 *   - `colorHex`  -> color objetivo del LED y su luz (cambia por seccion)
 *   - `scrollRef` -> progreso 0..1 del scroll (REF): parallax sutil de la PCB
 *
 * La CAMARA es estatica. El parallax de la PCB usa mapeo DIRECTO desde el
 * ref de scroll (sin easing): se mueve solo mientras haces scroll y queda
 * inmovil al parar -> sin shimmer residual en las pistas metalicas.
 *
 * Anti-parpadeo: nada re-renderiza en cada frame de scroll (scroll = ref,
 * props del <Canvas> constantes, `SceneContents` en `memo`) y NO se usa
 * AdaptiveDpr/PerformanceMonitor (cambian el DPR bajo carga -> parpadeo).
 */


function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl2") || c.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

/* props del Canvas: referencias ESTABLES (nunca cambian entre renders) */
const CAMERA_PROPS = {
  position: [0, 1.6, 8.5],
  fov: 42,
  near: 0.1,
  far: 70,
} as const;

const GL_PROPS = {
  antialias: true,
  alpha: true,
  powerPreference: "high-performance",
  stencil: false,
} as const;

/* punto al que mira la camara (fijo) */
const LOOK_AT = new THREE.Vector3(0, -0.3, -2);

function handleCreated({ gl }: { gl: THREE.WebGLRenderer }) {
  // "Neutral" (Khronos PBR Neutral) NO desatura los tonos brillantes como
  // ACES: el cian / ambar / purpura del LED se mantienen vivos.
  gl.toneMapping = THREE.NeutralToneMapping;
  gl.toneMappingExposure = 1.15;
}

/* ---------------- entorno procedural (memo: se monta una sola vez) ---------------- */

const ProceduralEnv = memo(function ProceduralEnv() {
  return (
    <Environment resolution={160} frames={1} environmentIntensity={0.5}>
      <Lightformer intensity={2.2} position={[0, 4, -6]} scale={[14, 9, 1]} color="#34517e" />
      <Lightformer intensity={1.3} position={[-7, 2, 4]} scale={[6, 6, 1]} color="#12233c" />
      <Lightformer intensity={1.1} position={[8, -2, 3]} scale={[6, 6, 1]} color="#1b1540" />
    </Environment>
  );
});

/* ---------------- señal de "escena lista" ---------------- */

/**
 * Se monta dentro del <Suspense> (solo cuando los glb ya cargaron). Cuenta
 * 2 frames renderizados de verdad —para que la fusión de la PCB y el primer
 * pase de sombras ya estén pintados— y avisa a la pantalla de carga.
 */
function ReadyBeacon() {
  const frames = useRef(0);
  const doneRef = useRef(false);
  useFrame(() => {
    if (doneRef.current) return;
    frames.current += 1;
    if (frames.current >= 2) {
      doneRef.current = true;
      emitSceneReady();
    }
  });
  return null;
}

/* ---------------- contenido dentro del Canvas ---------------- */

interface ContentsProps {
  colorHex: string;
  reduced: boolean;
  scrollRef: MutableRefObject<number>;
}

const SceneContents = memo(function SceneContents({
  colorHex,
  reduced,
  scrollRef,
}: ContentsProps) {
  const { camera, size } = useThree();
  const target = useMemo(() => new THREE.Color(colorHex), []); // eslint-disable-line react-hooks/exhaustive-deps
//   const [small, setSmall] = useState(false);
//   useEffect(() => {
//   setSmall(size.width < 768);
// }, [size.width]);
  const small = size.width < 768;

  useEffect(() => {
    target.set(colorHex);
  }, [colorHex, target]);

  // encuadre responsivo: se fija una vez por breakpoint (camara estatica)
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    cam.position.set(0, small ? 2.2 : 1.6, small ? 10.5 : 8.5);
    cam.fov = small ? 52 : 42;
    cam.near = 0.1;
    cam.far = 70;
    cam.updateProjectionMatrix();
    cam.lookAt(LOOK_AT);
  }, [camera, small]);

  return (
    <>
      <fog attach="fog" args={["#060912", 15, 44]} />

      {/* fill general: la PCB debe leerse aunque el spot del LED no la toque */}
      <ambientLight intensity={0.42} />
      <hemisphereLight args={["#2b4066", "#060a11", 0.75]} />
      {/* key frio: define el relieve del normalMap (sin sombra, barato) */}
      <directionalLight position={[-7, 9, 6]} intensity={2.3} color="#c3d6f0" />

      <ProceduralEnv />

      {/* los glb (PCB ~2 MB + LED) cargan async: aparecen juntos al estar listos.
          ReadyBeacon avisa a la pantalla de carga tras el primer render real. */}
      <Suspense fallback={null}>
        <PCBBoard scrollRef={scrollRef} reduced={reduced} />
        <ReadyBeacon />
      </Suspense>
      <LEDModel targetColor={target} reduced={reduced} small={small} />
    </>
  );
});

/* ---------------- Canvas + guards ---------------- */

export default function Scene() {
  const { active } = useSectionState();
  const prefersReduced = useReducedMotion();
  const reduced = Boolean(prefersReduced);
  const scrollRef = useScrollProgress();

  const [ready, setReady] = useState(false);
  const [supported, setSupported] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setSupported(hasWebGL());
    setReady(true);
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // sin WebGL no habra escena 3D -> libera la pantalla de carga igualmente
  useEffect(() => {
    if (ready && !supported) emitSceneReady();
  }, [ready, supported]);

  if (!ready || !supported) return null; // el fallback CSS de BackgroundScene queda visible

  return (
    <Canvas
      className="!absolute inset-0"
      shadows="soft"
      dpr={[1, 2]}
      frameloop={visible ? "always" : "never"}
      gl={GL_PROPS}
      camera={CAMERA_PROPS}
      onCreated={handleCreated}
    >
      <SceneContents
        colorHex={active.color}
        reduced={reduced}
        scrollRef={scrollRef}
      />
    </Canvas>
  );
}
