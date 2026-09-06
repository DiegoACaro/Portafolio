"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { useSectionObserver } from "@/hooks/useSectionObserver";
import { SECTION_MAP, type SectionId } from "@/lib/sections";
import { cn } from "@/lib/utils";

interface SectionShellProps {
  id: SectionId;
  children: ReactNode;
  className?: string;
  /** Texto pequeno de "indice" mostrado sobre el titulo (p. ej. 02 // SOBRE MI). */
  eyebrow?: string;
}

/**
 * Envoltura comun de cada seccion:
 *  - se registra en el IntersectionObserver global (via ref)
 *  - expone el color de la seccion como `--section` / `--section-rgb`
 *    para que el contenido interior pueda tematizarse en CSS
 *  - anima su entrada al entrar en viewport
 */
export function SectionShell({
  id,
  children,
  className,
  eyebrow,
}: SectionShellProps) {
  const ref = useSectionObserver(id);
  const theme = SECTION_MAP[id];

  return (
    <section
      ref={ref}
      id={id}
      aria-label={theme.label}
      style={
        {
          "--section": theme.color,
          "--section-rgb": theme.rgb,
        } as CSSProperties
      }
      className={cn(
        "relative flex min-h-screen w-full flex-col justify-center",
        // El fondo 3D vive detras del contenido (-z-10): no hace falta
        // reservar gutter, el texto puede ocupar todo el ancho util.
        "px-6 py-24 sm:px-12 lg:px-24",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-5xl"
      >
        {eyebrow ? (
          <div className="mb-5 flex items-center gap-3">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: "var(--section)",
                boxShadow: "0 0 8px 1px rgba(var(--section-rgb), 0.7)",
              }}
            />
            <span className="silkscreen text-[11px] text-white/45">{eyebrow}</span>
          </div>
        ) : null}
        {children}
      </motion.div>
    </section>
  );
}
