import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Etiqueta corta que encabeza cada seccion (mono, mayusculas, tracking
 * amplio) con un punto de color de la seccion activa. Equivalente al
 * "eyebrow" del template.
 */
export function SectionLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{
          backgroundColor: "var(--section)",
          boxShadow: "0 0 8px 1px rgba(var(--section-rgb), 0.7)",
        }}
      />
      <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/45">
        {children}
      </span>
    </div>
  );
}
