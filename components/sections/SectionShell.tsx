"use client";

import type { CSSProperties, ReactNode } from "react";
import { useSectionObserver } from "@/hooks/useSectionObserver";
import { SECTION_MAP, type SectionId } from "@/lib/sections";
import { cn } from "@/lib/utils";

interface SectionShellProps {
  id: SectionId;
  children: ReactNode;
  className?: string;
  /** Alineacion vertical del contenido dentro del 100vh. */
  align?: "center" | "start";
}

/**
 * Envoltura minima de cada seccion. Su unico trabajo:
 *  1. registrarse en el IntersectionObserver global (sincroniza el LED 3D)
 *  2. exponer el color de la seccion como `--section` / `--section-rgb`
 *  3. ocupar >= 100vh
 *
 * El layout interno lo controla cada seccion (asimetrico en Hero, centrado
 * y ancho en Proyectos/Contacto), siguiendo el Template.
 */
export function SectionShell({
  id,
  children,
  className,
  align = "center",
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
        "relative flex min-h-screen w-full flex-col",
        align === "center" ? "justify-center" : "justify-start",
        className,
      )}
    >
      {children}
    </section>
  );
}
