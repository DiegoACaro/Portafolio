"use client";

import {
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  useFrame,
  useThree,
} from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function dampColor(
  current: THREE.Color,
  target: THREE.Color,
  lambda: number,
  dt: number
) {
  current.lerp(
    target,
    1 - Math.exp(-lambda * dt)
  );
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
  const meshGroupRef =
    useRef<THREE.Group>(null!);

  const pointRef =
    useRef<THREE.PointLight>(null!);

  const spotRef =
    useRef<THREE.SpotLight>(null!);

  const gltf = useGLTF("/rgb_led.glb");

  /*
   * Clonamos el GLB para que este componente tenga
   * su propia instancia.
   */
  const clonedScene = useMemo(
    () => gltf.scene.clone(true),
    [gltf.scene]
  );

  /*
   * Posición responsive del LED.
   */
  const base = useMemo<[number, number, number]>(
    () =>
      small
        ? [3.3, 0.3, 1.8]
        : [3.3, 0.3, 1.8],
    [small]
  );

  /*
   * Transformación del modelo.
   */
  const meshOffsetPosition: [
    number,
    number,
    number
  ] = [-3.3, 1, 0];

  const meshOffsetRotation: [
    number,
    number,
    number
  ] = [1.3, 0, 0];

  const scaleLED = 4;

  /*
   * ESCALA DEL GLB
   *
   * Esta es la escala real que hemos comprobado
   * después de la normalización.
   *
   * Ya NO hacemos ningún cálculo dinámico.
   */
  const GLB_SCALE = 0.05072294619875279;

  /*
   * Posición del spotlight.
   */
  const spotPosition: [
    number,
    number,
    number
  ] = [6.3, 2.3, -0.3];

  /*
   * ==========================================================
   * MATERIALES
   * ==========================================================
   */

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

        attenuationColor:
          new THREE.Color("#00F0FF"),

        attenuationDistance: 0.45,

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

  /*
   * ==========================================================
   * INNER GLOW
   * ==========================================================
   */

  const innerGlowTex = useMemo(() => {
    const c =
      document.createElement("canvas");

    c.width = c.height = 128;

    const ctx = c.getContext("2d")!;

    const g =
      ctx.createRadialGradient(
        64,
        64,
        0,
        64,
        64,
        64
      );

    g.addColorStop(
      0,
      "rgba(255,255,255,1)"
    );

    g.addColorStop(
      0.2,
      "rgba(255,255,255,0.7)"
    );

    g.addColorStop(
      0.6,
      "rgba(255,255,255,0.15)"
    );

    g.addColorStop(
      1,
      "rgba(255,255,255,0)"
    );

    ctx.fillStyle = g;

    ctx.fillRect(
      0,
      0,
      128,
      128
    );

    const texture =
      new THREE.CanvasTexture(c);

    texture.colorSpace =
      THREE.SRGBColorSpace;

    return texture;
  }, []);

  const innerGlowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: innerGlowTex,

        color:
          new THREE.Color("#00F0FF"),

        transparent: true,

        opacity: 0.9,

        blending:
          THREE.AdditiveBlending,

        depthWrite: false,
      }),
    [innerGlowTex]
  );

  /*
   * ==========================================================
   * HALO
   * ==========================================================
   */

  const haloTex = useMemo(() => {
    const c =
      document.createElement("canvas");

    c.width = c.height = 128;

    const ctx = c.getContext("2d")!;

    const g =
      ctx.createRadialGradient(
        64,
        64,
        0,
        64,
        64,
        64
      );

    g.addColorStop(
      0,
      "rgba(255,255,255,0.55)"
    );

    g.addColorStop(
      0.28,
      "rgba(255,255,255,0.22)"
    );

    g.addColorStop(
      1,
      "rgba(255,255,255,0)"
    );

    ctx.fillStyle = g;

    ctx.fillRect(
      0,
      0,
      128,
      128
    );

    const texture =
      new THREE.CanvasTexture(c);

    texture.colorSpace =
      THREE.SRGBColorSpace;

    return texture;
  }, []);

  const haloMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: haloTex,

        color:
          new THREE.Color("#00F0FF"),

        transparent: true,

        opacity: 0.75,

        blending:
          THREE.AdditiveBlending,

        depthWrite: false,

        toneMapped: true,
      }),
    [haloTex]
  );

  const halo =
    useRef<THREE.Mesh>(null!);

  /*
   * ==========================================================
   * CONFIGURACIÓN DEL GLB
   * ==========================================================
   *
   * IMPORTANTE:
   * Aquí NO calculamos bounding boxes ni escalas.
   *
   * Simplemente establecemos una transformación fija.
   */

  useEffect(() => {
    clonedScene.position.set(
      0,
      0,
      0
    );

    clonedScene.rotation.set(
      0,
      0,
      0
    );

    clonedScene.scale.setScalar(
      GLB_SCALE
    );

    let index = 0;

    clonedScene.traverse(
      (child) => {
        if (
          (child as THREE.Mesh).isMesh
        ) {
          const mesh =
            child as THREE.Mesh;

          mesh.castShadow = true;
          mesh.receiveShadow = true;

          const name =
            mesh.name.toLowerCase();

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
      }
    );

    clonedScene.updateMatrixWorld(
      true
    );
  }, [
    clonedScene,
    epoxy,
    legMat,
  ]);

  /*
   * ==========================================================
   * CLEANUP
   * ==========================================================
   */

  useEffect(
    () => () => {
      epoxy.dispose();
      legMat.dispose();

      haloMat.dispose();
      haloTex.dispose();

      innerGlowMat.dispose();
      innerGlowTex.dispose();
    },
    [
      epoxy,
      legMat,
      haloMat,
      haloTex,
      innerGlowMat,
      innerGlowTex,
    ]
  );

  /*
   * ==========================================================
   * ANIMACIÓN
   * ==========================================================
   */

  useFrame((state, dt) => {
    const t =
      state.clock.elapsedTime;

    dampColor(
      epoxy.emissive,
      targetColor,
      3.4,
      dt
    );

    dampColor(
      epoxy.attenuationColor,
      targetColor,
      3.4,
      dt
    );

    dampColor(
      haloMat.color,
      targetColor,
      3.4,
      dt
    );

    dampColor(
      innerGlowMat.color,
      targetColor,
      3.4,
      dt
    );

    if (pointRef.current) {
      dampColor(
        pointRef.current.color,
        targetColor,
        3.4,
        dt
      );
    }

    if (spotRef.current) {
      dampColor(
        spotRef.current.color,
        targetColor,
        3.4,
        dt
      );
    }

    if (halo.current) {
      const pulse = reduced
        ? 1
        : 1 +
          Math.sin(t * 2.2) *
            0.06;

      halo.current.scale.setScalar(
        pulse
      );
    }
  });

  /*
   * ==========================================================
   * DEBUG TEMPORAL
   * ==========================================================
   */

  useEffect(() => {
    if (
      !group.current ||
      !meshGroupRef.current
    ) {
      return;
    }

    group.current.updateMatrixWorld(
      true
    );

    meshGroupRef.current.updateMatrixWorld(
      true
    );

    clonedScene.updateMatrixWorld(
      true
    );

    const groupWorld =
      new THREE.Vector3();

    const meshGroupWorld =
      new THREE.Vector3();

    const modelWorld =
      new THREE.Vector3();

    group.current.getWorldPosition(
      groupWorld
    );

    meshGroupRef.current.getWorldPosition(
      meshGroupWorld
    );

    clonedScene.getWorldPosition(
      modelWorld
    );

    console.log(
      "===== LED TRANSFORM DEBUG ====="
    );

    console.log(
      "small:",
      small
    );

    console.log(
      "base:",
      base
    );

    console.log(
      "group world:",
      groupWorld.toArray()
    );

    console.log(
      "meshGroup local:",
      meshGroupRef.current.position.toArray()
    );

    console.log(
      "meshGroup world:",
      meshGroupWorld.toArray()
    );

    console.log(
      "GLB local:",
      clonedScene.position.toArray()
    );

    console.log(
      "GLB world:",
      modelWorld.toArray()
    );

    console.log(
      "GLB rotation:",
      clonedScene.rotation.toArray()
    );

    console.log(
      "GLB scale:",
      clonedScene.scale.toArray()
    );

    const box =
      new THREE.Box3().setFromObject(
        clonedScene
      );

    const center =
      new THREE.Vector3();

    box.getCenter(center);

    console.log(
      "GLB visual center:",
      center.toArray()
    );
  }, [
    small,
    base,
    clonedScene,
  ]);

  /*
   * ==========================================================
   * RENDER
   * ==========================================================
   */

  return (
    <group
      ref={group}
      position={base}
      scale={1}
    >
      <group
        ref={meshGroupRef}
        position={meshOffsetPosition}
        rotation={meshOffsetRotation}
        scale={scaleLED}
      >
        <primitive
          object={clonedScene}
        />
      </group>

      <pointLight
        ref={pointRef}
        position={[
          -0.3,
          0.5,
          0.9,
        ]}
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
        shadow-mapSize={[
          1024,
          1024,
        ]}
        shadow-bias={-0.0005}
        shadow-camera-near={0.1}
        shadow-camera-far={20}
      />
    </group>
  );
}

useGLTF.preload("/rgb_led.glb");