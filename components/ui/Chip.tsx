import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Etiqueta compacta (stack, categoria, tag...).
 * Con `accent` toma el color de la seccion activa (`--section`).
 */
export function Chip({
  children,
  accent = false,
  className,
}: {
  children: ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none tracking-wide",
        accent
          ? "border-[rgba(var(--section-rgb),0.35)] bg-[rgba(var(--section-rgb),0.08)] text-[var(--section)]"
          : "border-white/10 bg-white/[0.03] text-slate-300",
        className,
      )}
    >
      {children}
    </span>
  );
}
