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
 * 
 * 
 * 
 * --------------------------------------------------------------------
 * Canvas global de React Three Fiber (fondo, sin interacción).
 *
 * Para esta prueba:
 * - `small` vuelve a ser responsive según `size.width`.
 * - La cámara queda completamente FIJA.
 * - No hay cambio de posición/FOV de cámara según `small`.
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

/* ------------------------------------------------------------------ */
/* Canvas props                                                       */
/* ------------------------------------------------------------------ */

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

/* punto fijo al que mira la cámara */
const LOOK_AT = new THREE.Vector3(0, -0.3, -2);

/* ------------------------------------------------------------------ */
/* Renderer                                                           */
/* ------------------------------------------------------------------ */

function handleCreated({ gl }: { gl: THREE.WebGLRenderer }) {
  gl.toneMapping = THREE.NeutralToneMapping;
  gl.toneMappingExposure = 1.15;
}

/* ------------------------------------------------------------------ */
/* Entorno procedural                                                 */
/* ------------------------------------------------------------------ */

const ProceduralEnv = memo(function ProceduralEnv() {
  return (
    <Environment
      resolution={160}
      frames={1}
      environmentIntensity={0.5}
    >
      <Lightformer
        intensity={2.2}
        position={[0, 4, -6]}
        scale={[14, 9, 1]}
        color="#34517e"
      />

      <Lightformer
        intensity={1.3}
        position={[-7, 2, 4]}
        scale={[6, 6, 1]}
        color="#12233c"
      />

      <Lightformer
        intensity={1.1}
        position={[8, -2, 3]}
        scale={[6, 6, 1]}
        color="#1b1540"
      />
    </Environment>
  );
});

/* ------------------------------------------------------------------ */
/* Señal de escena lista                                              */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* Contenido dentro del Canvas                                        */
/* ------------------------------------------------------------------ */

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

  const target = useMemo(
    () => new THREE.Color(colorHex),
    []
  );

  /*
   * SMALL vuelve a funcionar como originalmente.
   *
   * Esto permite:
   * - desktop: small = false
   * - mobile:  small = true
   *
   * La única diferencia respecto al código original
   * es que la cámara ya NO cambia según small.
   */
  const small = size.width < 768;

  /* -------------------------------------------------------------- */
  /* Color                                                           */
  /* -------------------------------------------------------------- */

  useEffect(() => {
    target.set(colorHex);
  }, [colorHex, target]);

  /* -------------------------------------------------------------- */
  /* CÁMARA FIJA                                                     */
  /* -------------------------------------------------------------- */

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;

    /*
     * IMPORTANTE:
     * La cámara NO depende de `small`.
     */
    cam.position.set(0, 1.6, 8.5);

    cam.fov = 42;
    cam.near = 0.1;
    cam.far = 70;

    cam.lookAt(LOOK_AT);

    cam.updateProjectionMatrix();
    cam.updateMatrixWorld(true);

    console.log("===== FIXED CAMERA =====");
    console.log("position:", cam.position.toArray());
    console.log("rotation:", cam.rotation.toArray());
    console.log("fov:", cam.fov);
    console.log("canvas size:", size.width, size.height);
  }, [camera]);

  return (
    <>
      <fog attach="fog" args={["#060912", 15, 44]} />

      {/* fill general */}
      <ambientLight intensity={0.42} />

      <hemisphereLight
        args={["#2b4066", "#060a11", 0.75]}
      />

      {/* key frío */}
      <directionalLight
        position={[-7, 9, 6]}
        intensity={2.3}
        color="#c3d6f0"
      />

      <ProceduralEnv />

      {/* ---------------------------------------------------------- */}
      {/* Modelos                                                      */}
      {/* ---------------------------------------------------------- */}

      <Suspense fallback={null}>
        <PCBBoard
          scrollRef={scrollRef}
          reduced={reduced}
        />

        <ReadyBeacon />
      </Suspense>

      <LEDModel
        targetColor={target}
        reduced={reduced}
        small={small}
      />
    </>
  );
});

/* ------------------------------------------------------------------ */
/* Canvas + guards                                                    */
/* ------------------------------------------------------------------ */

export default function Scene() {
  const { active } = useSectionState();

  const prefersReduced = useReducedMotion();
  const reduced = Boolean(prefersReduced);

  const scrollRef = useScrollProgress();

  const [ready, setReady] = useState(false);
  const [supported, setSupported] = useState(true);
  const [visible, setVisible] = useState(true);

  /* -------------------------------------------------------------- */
  /* WebGL + visibility                                               */
  /* -------------------------------------------------------------- */

  useEffect(() => {
    setSupported(hasWebGL());
    setReady(true);

    const onVis = () => {
      setVisible(!document.hidden);
    };

    document.addEventListener(
      "visibilitychange",
      onVis
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        onVis
      );
    };
  }, []);

  /* -------------------------------------------------------------- */
  /* Fallback si WebGL no está disponible                            */
  /* -------------------------------------------------------------- */

  useEffect(() => {
    if (ready && !supported) {
      emitSceneReady();
    }
  }, [ready, supported]);

  if (!ready || !supported) {
    return null;
  }

  /* -------------------------------------------------------------- */
  /* Canvas                                                           */
  /* -------------------------------------------------------------- */

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