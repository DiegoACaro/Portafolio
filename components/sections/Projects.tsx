"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowUpRight, Cpu, CircuitBoard, Layers } from "lucide-react";
import { SectionShell } from "@/components/sections/SectionShell";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlassCard } from "@/components/ui/GlassCard";
import { Chip } from "@/components/ui/Chip";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardIn: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, delay: i * 0.05, ease },
  }),
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
    name: "Celda de inspección con visión + IA",
    kind: "HÍBRIDO",
    summary:
      "Control de calidad de línea: cámara industrial, modelo de detección de defectos en el edge y dashboard de trazabilidad en tiempo real.",
    stack: ["ESP32-CAM", "PyTorch", "ONNX Runtime", "Next.js", "MQTT"],
    metric: "−38% falsos rechazos",
  },
  {
    name: "Brazo robótico teleoperado",
    kind: "HARDWARE",
    summary:
      "Manipulador de 5 GDL con control PID en STM32, cinemática inversa y telemetría vía CAN. Puesta a punto con testing HIL.",
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
  {
    name: "Gemelo digital de planta HVAC",
    kind: "HÍBRIDO",
    summary:
      "Simulación en vivo alimentada por sensores Modbus; predice consumo y anticipa fallos con una ventana de 6 h.",
    stack: ["Python", "FastAPI", "Modbus", "Three.js"],
    metric: "−17% consumo energético",
  },
];

const KIND_ICON: Record<Kind, typeof Cpu> = {
  HÍBRIDO: CircuitBoard,
  SOFTWARE: Cpu,
  HARDWARE: Layers,
};

const STACK_GROUPS: { title: string; role: string; items: string[] }[] = [
  {
    title: "Software / IA",
    role: "U1 · Compute",
    items: ["TypeScript", "Python", "Next.js / React", "PyTorch", "RAG / LLMs", "APIs & Cloud"],
  },
  {
    title: "Mecatrónica",
    role: "U2 · Actuation",
    items: ["C / C++ embebido", "STM32 · ESP32", "Control PID", "ROS 2", "Visión artificial", "CAD / CAM"],
  },
  {
    title: "Integración",
    role: "U3 · Bus",
    items: ["MQTT · CAN · Modbus", "Edge computing", "Gemelos digitales", "CI/CD", "Telemetría", "Testing HIL"],
  },
];

const TABS = [
  { id: "projects", label: "Proyectos" },
  { id: "stack", label: "Stack técnico" },
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
            Carga de trabajo{" "}
            <span className="text-[var(--section)]">{"// output"}</span>
          </h2>
          <p className="mt-3 max-w-md text-[14px] text-slate-400">
            Sistemas donde software, IA y mecatrónica operan como una sola pieza.
          </p>
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
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
              >
                {PROJECTS.map((project, i) => {
                  const Icon = KIND_ICON[project.kind];
                  return (
                    <motion.div
                      key={project.name}
                      custom={i}
                      variants={cardIn}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
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
                key="stack"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="grid gap-6 md:grid-cols-3"
              >
                {STACK_GROUPS.map((group, i) => (
                  <motion.div
                    key={group.title}
                    custom={i}
                    variants={cardIn}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <GlassCard className="h-full p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-[15px] font-semibold text-white">
                          {group.title}
                        </h3>
                        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-500">
                          {group.role}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <Chip key={item}>{item}</Chip>
                        ))}
                      </div>
                    </GlassCard>
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
