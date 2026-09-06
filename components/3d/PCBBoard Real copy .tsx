"use client";

import { Center } from "@react-three/drei";
import { PCBModel } from "./Pcb"; // Tu componente generado

export const BOARD = {
  position: [2, -0.5, -2] as [number, number, number],
  rotation: [-0.34, 0.03, 0.02] as [number, number, number],
  scale: 200, // Escala de prueba para magnificar el modelo de SolidWorks
};

export function PCBBoard() {
  return (
    <group 
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