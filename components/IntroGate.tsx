"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { hasPlayedIntro, setIntroPlayed } from "@/lib/introState";
import { onSceneReady } from "@/lib/sceneReady";

/** Mínimo visible: deja que los iconos terminen de entrar sin cortarse. */
const MIN_MS = 1900;
/** Tope duro: la intro nunca se queda pegada (WebGL lento, glb que no llega…). */
const MAX_MS = 10000;

/**
 * Pantalla de carga / bienvenida. Se muestra una vez por sesión y se
 * mantiene hasta que la escena 3D haya renderizado su primer frame
 * (`onSceneReady`), respetando `MIN_MS`. Así el pico de carga del glb + la
 * fusión de geometría ocurren OCULTOS detrás de la intro.
 */
export function IntroGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (hasPlayedIntro()) return;

    setShow(true);
    document.body.style.overflow = "hidden";

    const start = performance.now();
    let closeTimer: number | undefined;
    let closed = false;

    const close = () => {
      if (closed) return;
      closed = true;
      setShow(false);
      setIntroPlayed();
      document.body.style.overflow = "";
    };

    // cierra cuando la escena esté lista, sin bajar del mínimo
    const offReady = onSceneReady(() => {
      const wait = Math.max(0, MIN_MS - (performance.now() - start));
      closeTimer = window.setTimeout(close, wait);
    });

    const hardTimer = window.setTimeout(close, MAX_MS);

    return () => {
      offReady();
      window.clearTimeout(hardTimer);
      if (closeTimer) window.clearTimeout(closeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999]"
        >
          <WelcomeScreen />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
