"use client";

import { motion } from "framer-motion";
import { SectionShell } from "@/components/sections/SectionShell";
import { Chip } from "@/components/ui/Chip";

type ProjectKind = "HIBRIDO" | "SOFTWARE" | "HARDWARE";

interface Project {
  name: string;
  kind: ProjectKind;
  summary: string;
  stack: string[];
  metric: string;
}

const PROJECTS: Project[] = [
  {
    name: "Celda de inspeccion con vision + IA",
    kind: "HIBRIDO",
    summary:
      "Linea de control de calidad: camara industrial, modelo de deteccion de defectos en el edge y dashboard de trazabilidad en tiempo real.",
    stack: ["ESP32-CAM", "PyTorch", "ONNX Runtime", "Next.js", "MQTT"],
    metric: "−38% falsos rechazos",
  },
  {
    name: "Brazo robotico teleoperado",
    kind: "HARDWARE",
    summary:
      "Manipulador de 5 GDL con control PID en STM32, cinematica inversa y telemetria via CAN. Puesta a punto con testing HIL.",
    stack: ["STM32", "C++", "ROS 2", "CAN bus"],
    metric: "±0.4 mm de repetibilidad",
  },
  {
    name: "Copiloto documental RAG",
    kind: "SOFTWARE",
    summary:
      "Asistente que responde sobre manuales tecnicos con citas verificables. Ingesta, embeddings, reranking y evaluacion continua.",
    stack: ["TypeScript", "Next.js", "pgvector", "LLM APIs"],
    metric: "92% respuestas con cita valida",
  },
  {
    name: "Gemelo digital de planta HVAC",
    kind: "HIBRIDO",
    summary:
      "Simulacion en vivo alimentada por sensores Modbus; predice consumo y anticipa fallos con una ventana de 6 h.",
    stack: ["Python", "FastAPI", "Modbus", "Three.js"],
    metric: "−17% consumo energetico",
  },
];

const KIND_STYLE: Record<ProjectKind, string> = {
  HIBRIDO: "border-[rgba(var(--section-rgb),0.4)] text-[var(--section)]",
  SOFTWARE: "border-cyan-400/40 text-cyan-300",
  HARDWARE: "border-emerald-400/40 text-emerald-300",
};

export function Projects() {
  return (
    <SectionShell id="projects" eyebrow="03 // PROYECTOS">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Carga de trabajo{" "}
          <span className="text-[var(--section)]">{"// output"}</span>
        </h2>
        <p className="max-w-sm text-sm text-slate-500">
          Seleccion de sistemas donde software, IA y mecatronica operan como una
          sola pieza.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {PROJECTS.map((project, i) => (
          <motion.article
            key={project.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="panel-pcb group relative flex flex-col rounded-2xl p-6 transition-colors duration-300 hover:border-[rgba(var(--section-rgb),0.35)]"
          >
            {/* barra superior tipo bus */}
            <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--section-rgb),0.5)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="mb-4 flex items-center justify-between">
              <span
                className={`rounded-md border px-2 py-0.5 font-mono text-[10px] tracking-widest ${KIND_STYLE[project.kind]}`}
              >
                {project.kind}
              </span>
              <span className="font-mono text-[11px] text-slate-500">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-white">{project.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
              {project.summary}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </div>

            <div className="mt-4 border-t border-white/5 pt-3">
              <span className="silkscreen text-[9px] text-white/35">impacto</span>
              <p className="mt-1 text-sm font-medium text-[var(--section)]">
                {project.metric}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}
