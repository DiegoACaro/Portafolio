"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Billboard, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function dampColor(
  current: THREE.Color,
  target: THREE.Color,
  lambda: number,
  dt: number
) {
  current.lerp(target, 1 - Math.exp(-lambda * dt));
}

interface LEDModelProps {
  targetColor: THREE.Color;
  reduced?: boolean;
  small?: boolean;
}

export function LEDModel({
  targetColor,
  reduced = false,
  small = false,
}: LEDModelProps) {
  const group = useRef<THREE.Group>(null!);
  const meshGroupRef = useRef<THREE.Group>(null!);

  const pointRef = useRef<THREE.PointLight>(null!);
  const spotRef = useRef<THREE.SpotLight>(null!);
  const innerGlowMatRef = useRef<THREE.MeshBasicMaterial>(null!);

  const { scene } = useThree();

  const gltf = useGLTF("/rgb_led.glb");
  const clonedScene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  const base: [number, number, number] = [3.3, 0.3, 1.8];
  const scale = small ? 0.9 : 0.98;

  // Posiciones y rotación del modelo
  const meshOffsetPosition: [number, number, number] = [-3.3, 1, 0];
  const meshOffsetRotation: [number, number, number] = [1.3, 0, 0];
  const scaleLED = 2;

  // Coordenadas compartidas de la luz principal (Spotlight)
  const spotPosition: [number, number, number] = [6.3, 2.3, -0.3];

  // 1. Material traslúcido reactivo a la posición de la luz
  const epoxy = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#030d12"),
        emissive: new THREE.Color("#00F0FF"),
        emissiveIntensity: 0.6,
        transmission: 1,
        opacity: 0.85,
        transparent: true,
        roughness: 0.01,
        metalness: 0.1,
        ior: 1.5,
        thickness: 0.1,
        attenuationColor: new THREE.Color("#00F0FF"),
        attenuationDistance: 0.45, // La luz disminuye rápido fuera del origen del spotlight
        specularIntensity: 1.0,
      }),
    []
  );

  const legMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#dcdfe5"),
        metalness: 0.95,
        roughness: 0.2,
      }),
    []
  );

  // 2. Destello interno (Flare) centrado directamente en el foco del Spotlight
  const innerGlowTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d")!.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.2, "rgba(255,255,255,0.7)");
    g.addColorStop(0.6, "rgba(255,255,255,0.15)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  const innerGlowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: innerGlowTex,
        color: new THREE.Color("#00F0FF"),
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [innerGlowTex]
  );

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = new THREE.Vector3();
    box.getSize(size);

    const maxAxis = Math.max(size.x, size.y, size.z);
    if (maxAxis > 0) {
      const targetSize = 2.0;
      const autoScale = targetSize / maxAxis;
      clonedScene.scale.setScalar(autoScale);
    }

    let index = 0;
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const name = mesh.name.toLowerCase();
        if (
          index === 0 ||
          name.includes("glass") ||
          name.includes("epoxy") ||
          name.includes("body") ||
          name.includes("lens")
        ) {
          mesh.material = epoxy;
        } else {
          mesh.material = legMat;
        }
        index++;
      }
    });
  }, [clonedScene, epoxy, legMat]);

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
    [haloTex]
  );
  const halo = useRef<THREE.Mesh>(null!);


  useEffect(
    () => () => {
      epoxy.dispose();
      legMat.dispose();
      haloMat.dispose();
      haloTex.dispose();
      innerGlowMat.dispose();
      innerGlowTex.dispose();
    },
    [epoxy, legMat, haloMat, haloTex, innerGlowMat, innerGlowTex]
  );

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;

    dampColor(epoxy.emissive, targetColor, 3.4, dt);
    dampColor(epoxy.attenuationColor, targetColor, 3.4, dt);
    dampColor(haloMat.color, targetColor, 3.4, dt);
    dampColor(innerGlowMat.color, targetColor, 3.4, dt);

    if (pointRef.current) dampColor(pointRef.current.color, targetColor, 3.4, dt);
    if (spotRef.current) dampColor(spotRef.current.color, targetColor, 3.4, dt);

    if (halo.current) {
      const pulse = reduced ? 1 : 1 + Math.sin(t * 2.2) * 0.06;
      halo.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={group} position={base} scale={scale}>
      {/* 1. Malla 3D del LED */}
      <group
        ref={meshGroupRef}
        position={meshOffsetPosition}
        rotation={meshOffsetRotation}
        scale={scaleLED}
      >
        <primitive object={clonedScene} />
      </group>

      {/* 4. Fuentes de Luz */}
      <pointLight
        ref={pointRef}
        position={[-0.3, 0.5, 0.9]} //ajustado
        intensity={10000}
        distance={35}
        decay={10}
        color="#00F0FF"
      />
      <spotLight
        ref={spotRef}
        position={spotPosition}
        angle={1.3}
        penumbra={1}
        intensity={80}
        distance={42}
        decay={1}
        color="#00F0FF"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
        shadow-camera-near={0.1}
        shadow-camera-far={20}
      />
    </group>
  );
}

useGLTF.preload("/rgb_led.glb");