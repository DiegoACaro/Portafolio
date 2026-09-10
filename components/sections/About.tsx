"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";
import { SectionShell } from "@/components/sections/SectionShell";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

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

const QUOTE =
  "Firmware que conversa con la nube, IA que corre en el edge, e interfaces que hacen legible un sistema complejo.";

const scrollToProjects = () =>
  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

/** Marco cuadrado de la foto (misma imagen en móvil y escritorio). */
function ProfilePhoto({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden border border-white/10 bg-[radial-gradient(circle_at_center,rgba(228,228,231,0.85)_0%,rgba(24,24,27,0.85)_100%)] backdrop-blur-sm",
        className,
      )}
    >
      <Image
        src="/ProfilePicture.png"
        alt="Diego Alejandro Caro"
        fill
        sizes="(max-width: 1024px) 112px, 340px"
        className="object-cover"
      />
    </div>
  );
}

export function About() {
  return (
    <SectionShell
      id="about"
      align="start"
      className="px-6 pb-16 pt-28 sm:px-12 md:px-16 lg:px-24"
    >
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeUp} className="mb-4">
            <SectionLabel>Sobre mí</SectionLabel>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-[clamp(30px,5vw,46px)] font-extrabold leading-[1.03] tracking-[-0.03em] text-white"
          >
            Mi <span className="text-[var(--section)]">Perfil</span>
          </motion.h2>

          {/* items-start alinea el borde superior de ambas columnas: en
              escritorio la foto arranca a la altura del primer párrafo. */}
          <div className="mt-6 lg:grid lg:grid-cols-[1fr_320px] lg:items-start lg:gap-x-12">
            {/* --- flujo de texto --- */}
            <div className="max-w-xl">
              {/* foto móvil: pequeña, flotando junto al texto */}
              <motion.div
                variants={pop}
                className="float-right ml-3.5 mb-1 w-[164px] sm:w-[100px] lg:hidden"
              >
                <ProfilePhoto className="rounded-xl" />
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="text-justify text-[16px] leading-[1.8] text-slate-400 hyphens-auto"
              >
                Ingeniero mecatrónico con perfil multidisciplinario centrado en
                el desarrollo de software, arquitectura de sistemas y la
                integración de inteligencia artificial. Experto en construir
                infraestructura backend escalable con TypeScript y Docker
                Compose, además de integrar modelos de IA locales con Ollama y
                herramientas avanzadas como llama.cpp.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="mt-4 text-justify text-[16px] leading-[1.8] text-slate-400 hyphens-auto"
              >
                Cuenta con sólida experiencia en control de sistemas robóticos y
                firmware en C/C++, optimizando arquitecturas de control en tiempo
                real mediante registros de puerto directos y métricas de
                estabilidad basadas en IMU. Destaca por un enfoque estructurado
                para la resolución de problemas técnicos, diseño riguroso de
                bases de datos, análisis de redes y aplicación de testing
                automatizado para garantizar software confiable y de alta
                calidad.
              </motion.p>

              {/* cita — solo móvil (en escritorio va bajo la foto) */}
              <motion.p
                variants={pop}
                className="clear-both mt-6 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-[12px] italic leading-relaxed text-slate-300 lg:hidden"
              >
                “{QUOTE}”
              </motion.p>

              <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-3">
                <a
                  href="/diego-alejandro-caro-cv.pdf"
                  download="CV - Diego Alejandro Caro.pdf"
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
            </div>

            {/* --- foto + cita (solo escritorio) --- */}
            <div className="hidden lg:flex lg:flex-col lg:gap-4">
              <motion.div variants={pop} className="relative">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-4 rounded-[40px] opacity-40 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(var(--section-rgb),0.4), transparent 70%)",
                  }}
                />
                <ProfilePhoto className="rounded-3xl" />
              </motion.div>

              <motion.p
                variants={pop}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-[12px] italic leading-relaxed text-slate-300"
              >
                “{QUOTE}”
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}
