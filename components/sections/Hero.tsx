"use client";

import { motion } from "framer-motion";
import { SectionShell } from "@/components/sections/SectionShell";
import { Chip } from "@/components/ui/Chip";

/* Lineas del "log de arranque" del sistema. */
const BOOT_LOG = [
  "› init core.mecatronica ......... OK",
  "› load models/ia ............... OK",
  "› link firmware <-> backend .... OK",
  "› status: SYSTEM READY",
];

export function Hero() {
  return (
    <SectionShell id="hero" eyebrow="01 // INICIO">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        {/* --- Columna principal --- */}
        <div>
          <div className="mb-6 flex flex-wrap gap-2">
            <Chip accent>Software / IA</Chip>
            <Chip accent>Ingenieria Mecatronica</Chip>
          </div>

          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Construyo sistemas donde el{" "}
            <span className="text-[var(--section)]">codigo</span> y el{" "}
            <span className="text-[var(--section)]">hardware</span> piensan juntos.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Tu Nombre — desarrollador de software e IA e ingeniero mecatronico.
            Diseno desde el firmware y el control de planta hasta el modelo, la
            API y la interfaz. Un unico flujo, del sensor al usuario.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-[var(--section)] px-5 py-3 text-sm font-semibold text-pcb-deep transition-transform duration-200 hover:-translate-y-0.5"
            >
              Ver proyectos
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-medium text-slate-200 transition-colors duration-200 hover:border-white/35 hover:bg-white/[0.04]"
            >
              Hablemos
            </a>
          </div>
        </div>

        {/* --- Panel: log de arranque --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="panel-pcb rounded-2xl p-1"
        >
          <div className="rounded-xl bg-pcb-deep/70 p-5">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--section)] shadow-[0_0_10px_2px_rgba(var(--section-rgb),0.7)]" />
              <span className="silkscreen text-[10px] text-white/40">
                boot.sequence
              </span>
            </div>
            <pre className="whitespace-pre-wrap font-mono text-[12.5px] leading-6 text-slate-400">
              {BOOT_LOG.map((line, i) => (
                <motion.span
                  key={line}
                  className="block"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.4 + i * 0.18 }}
                >
                  {line.includes("SYSTEM READY") ? (
                    <span className="text-[var(--section)]">{line}</span>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
            </pre>
          </div>
        </motion.div>
      </div>

      {/* Hint de scroll */}
      <motion.div
        className="mt-16 flex items-center gap-3 text-white/30"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="silkscreen text-[10px]">scroll</span>
        <span className="h-8 w-px bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </SectionShell>
  );
}
