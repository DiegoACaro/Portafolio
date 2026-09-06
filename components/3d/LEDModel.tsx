"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Billboard } from "@react-three/drei";
import * as THREE from "three";



/**
 * Interpolacion de color independiente del frame-rate (suavizado
 * exponencial). `lambda` ~ velocidad de convergencia; con dt en segundos
 * el resultado es estable a 30, 60 o 144 fps. lambda 3.4 => ~0.8-1s.
 */
function dampColor(
  current: THREE.Color,
  target: THREE.Color,
  lambda: number,
  dt: number,
) {
  current.lerp(target, 1 - Math.exp(-lambda * dt));
}

/**
 * LEDModel
 * --------------------------------------------------------------------
 * LED de 5 mm (encapsulado tipo diodo) modelado con primitivas:
 *  - cuerpo epoxi (meshPhysicalMaterial: emissive + clearcoat + algo de transmision)
 *  - "chip" emisor interno (meshStandardMaterial emissive, toneMapped=false => brilla)
 *  - copa reflectora + patas metalicas (una mas larga = anodo)
 *
 * Es la FUENTE DE LUZ principal de la escena:
 *  - pointLight  -> resplandor omnidireccional sobre la placa
 *  - spotLight   -> haz dirigido con sombras suaves sobre la PCB
 *
 * El color (emissive + ambas luces) interpola suavemente hacia
 * `targetColor` dentro de useFrame. Flotacion 3D sutil tambien en useFrame.
 */

interface LEDModelProps {
  /** Color objetivo (cambia por seccion). */
  targetColor: THREE.Color;
  /** Desactiva la flotacion (prefers-reduced-motion). */
  reduced?: boolean;
  /** Encuadre movil (reposiciona/reescala el LED). */
  small?: boolean;
  
}

export function LEDModel({ targetColor, reduced = false, small = false }: LEDModelProps) {
  const group = useRef<THREE.Group>(null!);
  const pointRef = useRef<THREE.PointLight>(null!);
  const spotRef = useRef<THREE.SpotLight>(null!);
  const { scene } = useThree();


  // posicion / escala base (margen derecho)
  const base = useMemo<[number, number, number]>(
    () => (small ? [1.3, 1.35, 2.6] : [3.3, 0.3, 1.8]),
    [small],
  );
  const scale = small ? 0.9 : 0.98;

  // --- materiales (una instancia; se mutan en useFrame) ---
  // Epoxi del LED: meshStandardMaterial dominado por EMISSIVE (requisito).
  // Color difuso casi negro + sin clearcoat => la cupula "brilla" del color
  // de la seccion en vez de parecer plastico blanco iluminado desde fuera.
  const epoxy = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#06232b"),
        emissive: new THREE.Color("#00F0FF"),
        emissiveIntensity: 1.7,
        roughness: 0.3,
        metalness: 0,
      }),
    [],
  );

  // Chip emisor interno: se sale de [0,1] (toneMapped=false) => nucleo
  // supersaturado que lee como fuente de luz.
  const chip = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#00F0FF"),
        emissive: new THREE.Color("#00F0FF"),
        emissiveIntensity: 10,
        toneMapped: false,
        roughness: 0.4,
      }),
    [],
  );

  // Halo aditivo (billboard) => "bloom" barato sin postproceso.
  const haloTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d")!.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(255,255,255,0.55)");
    g.addColorStop(0.28, "rgba(255,255,255,0.22)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  const haloMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: haloTex,
        color: new THREE.Color("#00F0FF"),
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: true,
      }),
    [haloTex],
  );
  const halo = useRef<THREE.Mesh>(null!);

  const legMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#cbd0d8"),
        metalness: 1,
        roughness: 0.26,
      }),
    [],
  );

  // objetivo del spotLight: punto fijo sobre la placa (world space)
  const spotTarget = useMemo(() => {
    const o = new THREE.Object3D();
    o.position.set(0.6, -1, -2);
    return o;
  }, []);

  useEffect(() => {
    scene.add(spotTarget);
    if (spotRef.current) spotRef.current.target = spotTarget;
    return () => {
      scene.remove(spotTarget);
    };
  }, [scene, spotTarget]);

  useEffect(
    () => () => {
      epoxy.dispose();
      chip.dispose();
      legMat.dispose();
      haloMat.dispose();
      haloTex.dispose();
    },
    [epoxy, chip, legMat, haloMat, haloTex],
  );

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;

    // ---- interpolacion suave de color (~0.8-1s de asentamiento) ----
    // el epoxi solo cambia su EMISSIVE (su color difuso queda casi negro)
    dampColor(epoxy.emissive, targetColor, 3.4, dt);
    dampColor(chip.emissive, targetColor, 4, dt);
    dampColor(chip.color, targetColor, 4, dt);
    dampColor(haloMat.color, targetColor, 3.4, dt);
    if (pointRef.current) dampColor(pointRef.current.color, targetColor, 3.4, dt);
    if (spotRef.current) dampColor(spotRef.current.color, targetColor, 3.4, dt);

    // leve latido del halo (la orientacion la resuelve <Billboard>)
    if (halo.current) {
      const pulse = reduced ? 1 : 1 + Math.sin(t * 2.2) * 0.06;
      halo.current.scale.setScalar(pulse);
    }

    // ---- flotacion 3D sutil ----
    if (!group.current) return;
    if (reduced) {
      group.current.position.set(base[0], base[1], base[2]);
      group.current.rotation.set(0.14, 0.5, 0);
    } else {
      group.current.position.y = base[1] + Math.sin(t * 0.7) * 0.14;
      group.current.position.x = base[0] + Math.sin(t * 0.43) * 0.08;
      group.current.rotation.z = Math.sin(t * 0.55) * 0.07;
      group.current.rotation.y = 0.5 + Math.sin(t * 0.3) * 0.16;
      group.current.rotation.x = 0.14 + Math.sin(t * 0.24) * 0.05;
    }
  });

  return (
    <group ref={group} position={base} rotation={[0.14, 0.5, 0]} scale={scale}>
      {/* halo aditivo (bloom barato, siempre de cara a la camara) */}
      <Billboard position={[0, 0.2, 0]}>
        <mesh ref={halo} material={haloMat}>
          <planeGeometry args={[3, 3]} />
        </mesh>
      </Billboard>

      {/* patas */}
      <mesh castShadow position={[-0.1, -0.95, 0.02]} material={legMat}>
        <cylinderGeometry args={[0.03, 0.03, 1.5, 12]} />
      </mesh>
      <mesh castShadow position={[0.1, -0.78, 0.02]} material={legMat}>
        <cylinderGeometry args={[0.03, 0.03, 1.16, 12]} />
      </mesh>

      {/* reborde / falda del encapsulado */}
      <mesh castShadow position={[0, -0.12, 0]}>
        <cylinderGeometry args={[0.37, 0.37, 0.07, 40]} />
        <meshPhysicalMaterial
          color="#0c0f15"
          roughness={0.35}
          clearcoat={0.8}
          clearcoatRoughness={0.25}
        />
      </mesh>

      {/* cuerpo epoxi: cilindro + cupula (misma instancia de material) */}
      <mesh castShadow position={[0, 0.16, 0]} material={epoxy}>
        <cylinderGeometry args={[0.34, 0.34, 0.5, 48]} />
      </mesh>
      <mesh castShadow position={[0, 0.41, 0]} material={epoxy}>
        <sphereGeometry args={[0.34, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>

      {/* copa reflectora + chip emisor */}
      <mesh position={[0, 0.02, 0]}>
        <coneGeometry args={[0.14, 0.18, 24, 1, true]} />
        <meshStandardMaterial
          color="#e6ecf4"
          metalness={1}
          roughness={0.18}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0.09, 0]} material={chip}>
        <boxGeometry args={[0.13, 0.06, 0.13]} />
      </mesh>

      {/* --- luz emitida por el LED --- */}
      <pointLight
        ref={pointRef}
        position={[0, 0.18, 0]}
        intensity={reduced ? 42 : 58}
        distance={24}
        decay={2}
        color="#00F0FF"
      />
      <spotLight
        ref={spotRef}
        position={[0, 0.35, 0.1]}
        angle={0.72}
        penumbra={1}
        intensity={reduced ? 160 : 230}
        distance={38}
        decay={2}
        color="#00F0FF"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
        shadow-camera-near={0.1}
        shadow-camera-far={20}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </group>
  );
}
