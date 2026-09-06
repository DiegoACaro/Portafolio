"use client";

import { motion } from "framer-motion";
import { useSectionState } from "@/context/SectionContext";
import { SECTIONS } from "@/lib/sections";

/**
 * Navegacion lateral izquierda: un punto por seccion. Refleja la seccion
 * activa (mismo estado que el LED) y permite saltar con scroll suave.
 * Se oculta en pantallas pequenas.
 */
export function SideNav() {
  const { activeId, active } = useSectionState();

  return (
    <nav
      aria-label="Secciones"
      className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 lg:flex"
    >
      {SECTIONS.map((section) => {
        const isActive = section.id === activeId;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-3"
          >
            <motion.span
              className="block h-2 w-2 rounded-full"
              initial={false}
              animate={{
                backgroundColor: isActive
                  ? section.color
                  : "rgba(255,255,255,0.2)",
                scale: isActive ? 1.35 : 1,
                boxShadow: isActive
                  ? `0 0 10px 2px rgba(${section.rgb}, 0.7)`
                  : "0 0 0 0 rgba(0,0,0,0)",
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <span
              className="silkscreen text-[9px] text-white/0 transition-colors duration-200 group-hover:text-white/50"
              style={isActive ? { color: active.color } : undefined}
            >
              {section.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
