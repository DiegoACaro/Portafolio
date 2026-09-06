"use client";

import { motion } from "framer-motion";
import { SectionShell } from "@/components/sections/SectionShell";

const CHANNELS: { label: string; value: string; href: string }[] = [
  { label: "EMAIL", value: "tu.correo@dominio.com", href: "mailto:tu.correo@dominio.com" },
  { label: "GITHUB", value: "github.com/tu-usuario", href: "https://github.com/tu-usuario" },
  { label: "LINKEDIN", value: "linkedin.com/in/tu-usuario", href: "https://linkedin.com/in/tu-usuario" },
];

export function Contact() {
  return (
    <SectionShell id="contact" eyebrow="04 // CONTACTO">
      <div className="panel-pcb relative overflow-hidden rounded-3xl p-8 sm:p-12">
        {/* halo de transmision */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(var(--section-rgb),0.25),transparent_70%)] blur-2xl" />

        <div className="relative">
          <div className="mb-6 flex items-center gap-3">
            <motion.span
              className="h-2 w-2 rounded-full bg-[var(--section)]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              style={{ boxShadow: "0 0 10px 2px rgba(var(--section-rgb),0.8)" }}
            />
            <span className="silkscreen text-[10px] text-white/45">
              canal abierto · tx
            </span>
          </div>

          <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Transmitamos datos. Cuentame tu proyecto.
          </h2>
          <p className="mt-5 max-w-xl text-slate-400">
            Disponible para roles hibridos software/IA + mecatronica, consultoria
            de integracion y colaboraciones de I+D. Respondo en menos de 48 h.
          </p>

          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {CHANNELS.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors duration-200 hover:border-[rgba(var(--section-rgb),0.4)] hover:bg-white/[0.04]"
              >
                <span className="silkscreen text-[9px] text-white/35">
                  {channel.label}
                </span>
                <p className="mt-1.5 break-all text-sm text-slate-300 transition-colors group-hover:text-[var(--section)]">
                  {channel.value}
                </p>
              </a>
            ))}
          </div>

          <a
            href="mailto:tu.correo@dominio.com"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--section)] px-6 py-3 text-sm font-semibold text-pcb-deep transition-transform duration-200 hover:-translate-y-0.5"
          >
            Enviar mensaje →
          </a>
        </div>
      </div>

      <footer className="mx-auto mt-10 flex max-w-5xl items-center justify-between text-[11px] text-white/30">
        <span className="font-mono">© {new Date().getFullYear()} Tu Nombre</span>
        <span className="silkscreen">sys_status · tx_open</span>
      </footer>
    </SectionShell>
  );
}
