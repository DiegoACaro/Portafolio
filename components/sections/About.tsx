"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Award, Boxes, Code2, FileText } from "lucide-react";
import { SectionShell } from "@/components/sections/SectionShell";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlassCard } from "@/components/ui/GlassCard";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease } },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease } },
};

const STATS = [
  { icon: Code2, value: "12", title: "PROYECTOS ENTREGADOS" },
  { icon: Award, value: "5", title: "AÑOS CONSTRUYENDO" },
  { icon: Boxes, value: "2", title: "DISCIPLINAS · 1 FLUJO" },
];

const scrollToProjects = () =>
  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

export function About() {
  return (
    <SectionShell
      id="about"
      align="start"
      className="px-6 pb-16 pt-28 sm:px-12 md:px-16 lg:px-24"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
          {/* --- texto --- */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-xl"
          >
            <motion.div variants={fadeUp} className="mb-4">
              <SectionLabel>Sobre mí</SectionLabel>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-[clamp(30px,5vw,46px)] font-extrabold leading-[1.03] tracking-[-0.03em] text-white"
            >
              Mi{" "} <span className="text-[var(--section)]">Perfil</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-[14px] leading-[1.8] text-slate-400"
            >
              Empecé desmontando motores y terminé entrenando modelos. Esa doble
              raíz define cómo trabajo: entiendo la restricción física de un
              actuador y, a la vez, la arquitectura de datos que lo gobierna. Mi
              zona de mayor valor es la frontera entre ambos mundos.
            </motion.p>

            <motion.p
              variants={pop}
              className="mt-5 inline-block w-fit rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-[12px] italic text-slate-300"
            >
              “Firmware que conversa con la nube, IA que corre en el edge, e
              interfaces que hacen legible un sistema complejo.”
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-[13px] font-semibold text-black transition-transform duration-200 hover:-translate-y-0.5"
              >
                <FileText size={14} />
                Descargar CV
              </a>
              <button
                type="button"
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-[13px] font-semibold text-slate-200 transition-colors duration-200 hover:border-white/40 hover:bg-white/[0.04]"
              >
                <ArrowUpRight size={14} />
                Ver proyectos
              </button>
            </motion.div>
          </motion.div>

          {/* --- stat cards (columna derecha en desktop) --- */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1"
          >
            {STATS.map(({ icon: Icon, value, title }) => (
              <motion.div key={title} variants={pop} whileHover={{ y: -4 }}>
                <GlassCard interactive className="relative p-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-300">
                    <Icon size={16} />
                  </div>
                  <span className="absolute right-5 top-5 text-xl font-bold text-white">
                    {value}
                  </span>
                  <p className="mt-3 font-mono text-[11px] leading-tight tracking-[0.1em] text-slate-400">
                    {title}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionShell>
  );
}
