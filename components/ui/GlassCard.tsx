import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Tarjeta "glass" — el contenedor visual base de las secciones
 * (borde tenue, fondo translucido, blur). El borde reacciona al color de
 * la seccion activa (`--section-rgb`) al hacer hover cuando `interactive`.
 */
export function GlassCard({
  children,
  className,
  interactive = false,
  style,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      style={style}
      className={cn(
        "rounded-[26px] border border-white/10 bg-white/[0.035] backdrop-blur-xl",
        "shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]",
        interactive &&
          "transition-colors duration-300 hover:border-[rgba(var(--section-rgb),0.4)] hover:bg-white/[0.055]",
        className,
      )}
    >
      {children}
    </div>
  );
}
