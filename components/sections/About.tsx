"use client";

import { motion } from "framer-motion";
import { SectionShell } from "@/components/sections/SectionShell";
import { Chip } from "@/components/ui/Chip";

/* Modulos de competencias: un "chip" del sistema por dominio. */
const MODULES: { title: string; role: string; items: string[] }[] = [
  {
    title: "Software / IA",
    role: "U1 · Compute",
    items: ["TypeScript", "Python", "Next.js / React", "PyTorch", "RAG / LLMs", "APIs & Cloud"],
  },
  {
    title: "Mecatronica",
    role: "U2 · Actuation",
    items: ["C / C++ embebido", "STM32 · ESP32", "Control PID", "ROS 2", "Vision artificial", "CAD / CAM"],
  },
  {
    title: "Integracion",
    role: "U3 · Bus",
    items: ["MQTT · CAN · Modbus", "Edge computing", "Gemelos digitales", "CI/CD", "Telemetria", "Testing HIL"],
  },
];

export function About() {
  return (
    <SectionShell id="about" eyebrow="02 // SOBRE MI">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        {/* --- Bio --- */}
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Un nucleo operativo entre dos disciplinas
          </h2>
          <div className="mt-6 space-y-4 text-slate-400">
            <p>
              Empece desmontando motores y terminé entrenando modelos. Esa doble
              raiz define como trabajo: entiendo la restriccion fisica de un
              actuador y, a la vez, la arquitectura de datos que lo gobierna.
            </p>
            <p>
              Mi zona de mayor valor es la frontera: firmware que conversa con
              servicios en la nube, modelos de IA que corren en el edge, y
              interfaces que hacen legible un sistema complejo.
            </p>
          </div>

          <dl className="mt-8 grid grid-cols-3 gap-4">
            {[
              ["+5", "anios construyendo"],
              ["24", "proyectos entregados"],
              ["2", "disciplinas, 1 flujo"],
            ].map(([value, label]) => (
              <div key={label} className="panel-pcb rounded-xl px-3 py-4">
                <dt className="text-2xl font-semibold text-[var(--section)]">
                  {value}
                </dt>
                <dd className="mt-1 text-[12px] leading-tight text-slate-500">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* --- Modulos de skills --- */}
        <div className="grid gap-4 sm:grid-cols-1">
          {MODULES.map((mod, i) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="panel-pcb rounded-2xl p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{mod.title}</h3>
                <span className="silkscreen text-[10px] text-white/35">
                  {mod.role}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {mod.items.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
