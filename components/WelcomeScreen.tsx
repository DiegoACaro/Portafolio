"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CircuitBoard, Code2, Cpu } from "lucide-react";

const ICONS = [Cpu, Code2, CircuitBoard];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Pantalla de carga / bienvenida (intro). Solo los tres iconos: entran con
 * stagger + rotacion y luego flotan sutilmente para no parecer congelados
 * mientras carga la escena 3D. Se ve una vez por sesion (lo controla
 * IntroGate).
 */
export function WelcomeScreen() {
  const reduce = useReducedMotion();

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black px-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.28 } } }}
        className="flex items-center justify-center gap-4"
      >
        {ICONS.map((Icon, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: reduce
                ? { opacity: 0, scale: 0.85 }
                : { opacity: 0, scale: 0.3, rotate: -120, y: 50 },
              visible: { opacity: 1, scale: 1, rotate: 0, y: 0 },
            }}
            transition={{ duration: reduce ? 0.5 : 1.3, ease }}
          >
            {/* flotacion continua (independiente de la animacion de entrada) */}
            <motion.div
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.35,
              }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white backdrop-blur-md sm:h-14 sm:w-14"
            >
              <Icon size={20} />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
