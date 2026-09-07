"use client";

import { useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import * as THREE from "three";
import { PCBModel } from "./Pcb"; // Tu componente generado

export const BOARD = {
  position: [2.5, -0.5, -2] as [number, number, number],
  rotation: [-0.34, 0.03, 0.02] as [number, number, number],
  scale: 200, // Escala de prueba para magnificar el modelo de SolidWorks

  /**
   * Parallax de scroll: cuanto se desplaza / gira la placa entre el
   * principio (p = 0) y el final (p = 1) de la pagina. Valores pequenos:
   * es un movimiento de fondo, no un protagonista.
   */
  parallax: {
  x: 0.1,
  y: -1,
  rotX: 0.08,
  },
};

interface PCBBoardProps {
  /** Progreso de scroll 0..1 (ref, se lee en useFrame). */
  scrollRef?: MutableRefObject<number>;
  /** prefers-reduced-motion: deja la placa quieta. */
  reduced?: boolean;
}

export function PCBBoard({ scrollRef, reduced = false }: PCBBoardProps) {
  const group = useRef<THREE.Group>(null!);

  // Parallax: mapeo DIRECTO desde el progreso de scroll (sin easing/lerp).
  // Asi la placa se mueve exactamente lo que te mueves tu, y queda
  // totalmente inmovil en cuanto paras -> nada de shimmer residual en las
  // pistas metalicas.
  useFrame(() => {
    if (!group.current) return;
    const p = scrollRef?.current ?? 0;
    group.current.position.set(
      BOARD.position[0] + BOARD.parallax.x * p,
      BOARD.position[1] + BOARD.parallax.y * p,
      BOARD.position[2],
    );
    group.current.rotation.set(
      BOARD.rotation[0] + BOARD.parallax.rotX * p,
      BOARD.rotation[1],
      BOARD.rotation[2],
    );
  });

  return (
    <group
      ref={group}
      position={BOARD.position}
      rotation={BOARD.rotation}
      scale={BOARD.scale}
    >
      {/* Center recalcula dinámicamente las 560 mallas y las centra en [0,0,0] */}
      <Center>
        <PCBModel />
      </Center>
    </group>
  );
}
