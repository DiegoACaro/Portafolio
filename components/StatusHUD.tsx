"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSectionState } from "@/context/SectionContext";
import { SECTIONS } from "@/lib/sections";

/**
 * StatusHUD
 * --------------------------------------------------------------------
 * Sobrecapa DOM minima (texto) que acompana al LED 3D del fondo:
 * serigrafia `SYS_STATUS`, estado legible de la seccion, codigo de
 * telemetria y 4 puntos (uno por seccion). El LED fisico ahora vive en
 * la escena 3D; esto solo aporta la lectura textual.
 *
 * Anclado en la esquina inferior derecha para no invadir el contenido.
 */
export function StatusHUD() {
  const { activeId, active } = useSectionState();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-4 right-3 z-40 flex flex-col items-end gap-1.5 sm:bottom-6 sm:right-6"
    >
      <span className="silkscreen text-[8px] leading-none text-white/35">
        SYS_STATUS
      </span>

      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/45 px-2.5 py-1.5 backdrop-blur-sm">
        <motion.span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          initial={false}
          animate={{
            backgroundColor: active.color,
            boxShadow: `0 0 8px 1px ${active.color}`,
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="h-3 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeId}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.32 }}
              className="block font-mono text-[10px] tracking-[0.18em]"
              style={{ color: active.color }}
            >
              {active.status}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <div className="hidden items-center gap-2 pr-0.5 sm:flex">
        <AnimatePresence mode="wait">
          <motion.span
            key={active.code}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="font-mono text-[8px] tracking-[0.15em] text-white/40"
          >
            {active.code}
          </motion.span>
        </AnimatePresence>
        <div className="flex gap-1">
          {SECTIONS.map((section) => (
            <motion.span
              key={section.id}
              className="h-1 w-1 rounded-full"
              initial={false}
              animate={{
                backgroundColor:
                  section.id === activeId
                    ? section.color
                    : "rgba(255,255,255,0.16)",
              }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
