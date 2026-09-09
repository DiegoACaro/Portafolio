"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowUpRight, Cpu, CircuitBoard, Layers } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiC,
  SiCplusplus,
  SiJavascript,
  SiPython,
  SiTypescript,
} from "react-icons/si";
import { SectionShell } from "@/components/sections/SectionShell";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlassCard } from "@/components/ui/GlassCard";
import { Chip } from "@/components/ui/Chip";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Contenedor que orquesta el stagger de sus hijos al montarse (cambio de tab). */
const grid: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease, staggerChildren: 0.06 },
  },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

const cardIn: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease } },
};

/* ---------------- datos ---------------- */

type Kind = "HÍBRIDO" | "SOFTWARE" | "HARDWARE";

interface Project {
  name: string;
  kind: Kind;
  summary: string;
  stack: string[];
  metric: string;
  href?: string;
}

const PROJECTS: Project[] = [
  {
    name: "App de servicios aduaneros con IA integrada",
    kind: "SOFTWARE",
    summary:
      "Plataforma B2C con IA, casillero virtual y KYC que evalúa la viabilidad e impuestos de envíos internacionales bajo auditoría humana.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "IA / LLMs", "PostgreSQL (RLS)", "Supabase"],
    metric: "",
  },
  {
    name: "Plataforma robótica con cambios de locomoción y redes neuronales biológicamente inspiradas",
    kind: "HÍBRIDO",
    summary:
      "",
    stack: ["STM32", "C++", "ROS 2", "CAN bus"],
    metric: "±0.4 mm de repetibilidad",
  },
  {
    name: "Copiloto documental RAG",
    kind: "SOFTWARE",
    summary:
      "Asistente que responde sobre manuales técnicos con citas verificables. Ingesta, embeddings, reranking y evaluación continua.",
    stack: ["TypeScript", "Next.js", "pgvector", "LLM APIs"],
    metric: "92% respuestas con cita válida",
  },
];

const KIND_ICON: Record<Kind, typeof Cpu> = {
  HÍBRIDO: CircuitBoard,
  SOFTWARE: Cpu,
  HARDWARE: Layers,
};

/** Lenguajes de programación (logo + color de marca). */
const LANGUAGES: { name: string; Icon: IconType; color: string }[] = [
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "C++", Icon: SiCplusplus, color: "#00599C" },
  { name: "C", Icon: SiC, color: "#A8B9CC" },
];

const TABS = [
  { id: "projects", label: "Proyectos" },
  { id: "languages", label: "Lenguajes" },
] as const;

/* ---------------- componente ---------------- */

export function Projects() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("projects");

  return (
    <SectionShell
      id="projects"
      align="start"
      className="px-6 pb-24 pt-28 sm:px-12 lg:px-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="flex flex-col items-center text-center"
        >
          <SectionLabel className="mb-4">Portafolio</SectionLabel>
          <h2 className="text-[clamp(28px,4.5vw,46px)] font-extrabold tracking-[-0.03em] text-white">
            Mis{" "}
            <span className="text-[var(--section)]">{"Proyectos"}</span>
          </h2>
          {/* <p className="mt-3 max-w-md text-[14px] text-slate-400">
            Sistemas donde software, IA y mecatrónica operan como una sola pieza.
          </p> */}
        </motion.div>

        {/* tabs */}
        <div className="mt-10 flex justify-center">
          <div className="flex w-full max-w-md gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-xl">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`relative flex-1 rounded-full py-2.5 text-[13px] font-medium transition-colors duration-300 ${
                  tab === t.id ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full bg-[rgba(var(--section-rgb),0.14)] ring-1 ring-[rgba(var(--section-rgb),0.3)]"
                    transition={{ duration: 0.35, ease }}
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* contenido */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            {tab === "projects" ? (
              <motion.div
                key="projects"
                variants={grid}
                initial="hidden"
                animate="show"
                exit="exit"
                className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
              >
                {PROJECTS.map((project, i) => {
                  const Icon = KIND_ICON[project.kind];
                  return (
                    <motion.div
                      key={project.name}
                      variants={cardIn}
                      whileHover={{ y: -4 }}
                    >
                      <GlassCard interactive className="flex h-full flex-col p-4">
                        {/* cabecera visual */}
                        <div className="relative mb-4 flex h-32 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(120%_120%_at_20%_0%,rgba(var(--section-rgb),0.16),transparent_60%)]">
                          <Icon size={30} className="text-[var(--section)] opacity-70" />
                          <span className="absolute left-3 top-3 rounded-md border border-[rgba(var(--section-rgb),0.4)] px-2 py-0.5 font-mono text-[10px] tracking-widest text-[var(--section)]">
                            {project.kind}
                          </span>
                          <span className="absolute right-3 top-3 font-mono text-[11px] text-slate-500">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <h3 className="text-[16px] font-semibold leading-tight text-white">
                          {project.name}
                        </h3>
                        <p className="mt-2 line-clamp-3 flex-1 text-[13px] leading-relaxed text-slate-400">
                          {project.summary}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {project.stack.map((tech) => (
                            <Chip key={tech}>{tech}</Chip>
                          ))}
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                          <span className="text-[13px] font-medium text-[var(--section)]">
                            {project.metric}
                          </span>
                          {project.href && (
                            <a
                              href={project.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-[12px] text-slate-400 transition-colors hover:text-white"
                            >
                              Ver <ArrowUpRight size={13} />
                            </a>
                          )}
                        </div>
                      </GlassCard>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="languages"
                variants={grid}
                initial="hidden"
                animate="show"
                exit="exit"
                className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5"
              >
                {LANGUAGES.map(({ name, Icon, color }) => (
                  <motion.div
                    key={name}
                    variants={cardIn}
                    whileHover={{ y: -5, scale: 1.04 }}
                    className="group flex flex-col items-center justify-center gap-3 rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-colors hover:border-white/20"
                  >
                    <span className="relative flex items-center justify-center">
                      <span
                        aria-hidden
                        className="pointer-events-none absolute h-12 w-12 rounded-full opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-70"
                        style={{ background: color }}
                      />
                      <Icon
                        size={42}
                        style={{ color }}
                        className="relative z-10"
                        aria-label={name}
                      />
                    </span>
                    <span className="text-[13px] font-medium text-slate-200">
                      {name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionShell>
  );
}
