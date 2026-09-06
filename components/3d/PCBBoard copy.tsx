"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { createPCBTextures } from "./pcb-textures";

/**
 * PCBBoard
 * --------------------------------------------------------------------
 * Plano 3D con material fisico que simula una placa FR4:
 *  - `map` procedural (cobre / pads / serigrafia sobre baquelita)
 *  - `normalMap` (relieve real de pistas y vias, derivado por Sobel)
 *  - `roughnessMap` + `metalnessMap` (mate el FR4, pulido el cobre)
 *
 * Recibe la luz del LED (spot con sombras) => `receiveShadow`.
 */

export const BOARD = {
  width: 22,
  height: 15,
  position: [0, -0.5, -2] as [number, number, number],
  // Inclinacion suave hacia atras (se aleja del observador por arriba)
  rotation: [-0.34, 0.03, 0.02] as [number, number, number],
};

export function PCBBoard() {
  const textures = useMemo(
    () => createPCBTextures({ size: 1024, seed: 20260905 }),
    [],
  );

  const material = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      map: textures.map,
      normalMap: textures.normalMap,
      roughnessMap: textures.roughnessMap,
      metalnessMap: textures.metalnessMap,
      color: new THREE.Color("#e7eef2"),
      metalness: 1,
      roughness: 1,
      normalScale: new THREE.Vector2(1.3, 1.3),
      // barniz sutil del solder mask
      clearcoat: 0.25,
      clearcoatRoughness: 0.5,
      envMapIntensity: 0.7,
      sheen: 0.12,
      sheenColor: new THREE.Color("#20406a"),
    });
    return m;
  }, [textures]);

  // repeticion ligera del mapa para mas densidad de circuito
  useEffect(() => {
    for (const t of [
      textures.map,
      textures.normalMap,
      textures.roughnessMap,
      textures.metalnessMap,
    ]) {
      t.repeat.set(1.7, 1.15);
      t.needsUpdate = true;
    }
  }, [textures]);

  useEffect(
    () => () => {
      material.dispose();
      textures.dispose();
    },
    [material, textures],
  );

  return (
    <group position={BOARD.position} rotation={BOARD.rotation}>
      {/* borde / sustrato ligeramente mas grande y oscuro */}
      <mesh position={[0, 0, -0.06]}>
        <boxGeometry args={[BOARD.width + 0.5, BOARD.height + 0.5, 0.12]} />
        <meshStandardMaterial color="#05080d" roughness={0.9} metalness={0} />
      </mesh>

      {/* superficie de la PCB */}
      <mesh receiveShadow material={material}>
        <planeGeometry args={[BOARD.width, BOARD.height, 1, 1]} />
      </mesh>
    </group>
  );
}
