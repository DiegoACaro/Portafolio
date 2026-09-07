"use client";

import { useEffect, useRef, type MutableRefObject } from "react";

/**
 * Progreso de scroll del documento (0 arriba del todo, 1 abajo del todo),
 * expuesto como REF y actualizado con rAF-throttle.
 *
 * Deliberadamente NO es React state: se lee dentro de un `useFrame` de R3F,
 * y como ref no dispara ningun re-render al hacer scroll (el <Canvas> queda
 * intacto). Ademas el valor queda EXACTAMENTE congelado en cuanto el scroll
 * se detiene, asi que cualquier animacion que dependa de el se para en seco
 * (sin cola de deriva -> sin shimmer residual).
 */
export function useScrollProgress(): MutableRefObject<number> {
  const ref = useRef(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      ref.current = max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return ref;
}
