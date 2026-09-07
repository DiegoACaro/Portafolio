"use client";

import dynamic from "next/dynamic";

/**
 * BackgroundScene
 * --------------------------------------------------------------------
 * Contenedor fijo del fondo 3D. Monta el <Canvas> de R3F solo en cliente
 * (`ssr: false`) para no arrastrar three.js al bundle inicial ni intentar
 * WebGL en el servidor.
 *
 * Detras del canvas queda un fallback CSS (fondo mate + halo) que se ve
 * durante la carga y si el dispositivo no soporta WebGL.
 *
 * Colocacion segun requisito: `fixed inset-0 pointer-events-none -z-10`.
 */

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => null,
});

export function BackgroundScene() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-pcb-bg"
    >
      {/* fallback CSS (queda por debajo del canvas) */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_45%,rgba(0,240,255,0.06),transparent_70%)]" />

      {/* escena 3D */}
      <Scene />

      {/*
        Scrim de legibilidad (por ENCIMA del canvas, por debajo del contenido).
        - Escritorio: gradiente lateral. Calma el lado izquierdo/centro —donde
          vive el texto— y deja respirar la derecha, donde flota el LED 3D.
        - Movil: el contenido ocupa todo el ancho => tinte casi plano mas denso.
      */}
      <div className="absolute inset-0 hidden bg-[linear-gradient(100deg,rgba(10,13,20,0.93)_0%,rgba(10,13,20,0.85)_38%,rgba(10,13,20,0.6)_62%,rgba(10,13,20,0.24)_84%,transparent_100%)] sm:block" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,13,20,0.8)_0%,rgba(10,13,20,0.7)_45%,rgba(10,13,20,0.82)_100%)] sm:hidden" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_45%,rgba(5,7,12,0.55)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-pcb-deep/90 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-pcb-deep/90 to-transparent" />
    </div>
  );
}
