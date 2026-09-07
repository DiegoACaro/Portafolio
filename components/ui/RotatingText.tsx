"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Texto que "se escribe" y rota entre varias frases (efecto maquina de
 * escribir). Versión ligera, sin dependencias — usa timeouts y un cursor
 * animado por CSS.
 */
export function RotatingText({
  phrases,
  typingSpeed = 70,
  deletingSpeed = 40,
  pause = 1600,
  className,
}: {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
  className?: string;
}) {
  const [text, setText] = useState("");
  const idx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    if (phrases.length === 0) return;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const full = phrases[idx.current % phrases.length];

      if (!deleting.current) {
        const next = full.slice(0, text.length + 1);
        setText(next);
        if (next === full) {
          deleting.current = true;
          timer = setTimeout(tick, pause);
          return;
        }
        timer = setTimeout(tick, typingSpeed);
      } else {
        const next = full.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          deleting.current = false;
          idx.current += 1;
          timer = setTimeout(tick, typingSpeed);
          return;
        }
        timer = setTimeout(tick, deletingSpeed);
      }
    };

    timer = setTimeout(tick, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, phrases, typingSpeed, deletingSpeed, pause]);

  return (
    <span className={cn("font-mono", className)}>
      {text}
      <span className="animate-blink ml-0.5 font-light opacity-70">_</span>
    </span>
  );
}
