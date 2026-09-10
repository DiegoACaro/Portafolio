"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
import { ProjectCard } from "@/components/ui/ProjectCard";
import { CertificateGallery } from "@/components/ui/CertificateGallery";
import { FEATURED_PROJECTS } from "@/lib/projects";

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
  { id: "languages", label: "Stack" },
  { id: "certifications", label: "Certificaciones" },
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
            Mis <span className="text-[var(--section)]">Proyectos</span>
          </h2>
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
            {tab === "projects" && (
              <motion.div
                key="projects"
                variants={grid}
                initial="hidden"
                animate="show"
                exit="exit"
                className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
              >
                {FEATURED_PROJECTS.map((project, i) => (
                  <motion.div
                    key={project.slug}
                    variants={cardIn}
                    whileHover={{ y: -4 }}
                  >
                    <ProjectCard project={project} index={i} />
                  </motion.div>
                ))}

                {/* CTA: una celda más de la grid, con el mismo ancho que una
                    card de proyecto. En desktop (3 col) va bajo la 2.ª card. */}
                <motion.div
                  variants={cardIn}
                  whileHover={{ y: -4 }}
                  className="xl:col-start-2"
                >
                  <Link
                    href="/proyectos"
                    className="group flex h-full min-h-[3.5rem] w-full items-center justify-center gap-2 rounded-xl bg-[var(--section)] px-6 py-4 text-center text-[14px] font-semibold text-pcb-deep shadow-[0_14px_36px_-12px_rgba(var(--section-rgb),0.75)]"
                  >
                    Ver todos los proyectos
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </motion.div>
              </motion.div>
            )}

            {tab === "languages" && (
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

            {tab === "certifications" && (
              <motion.div
                key="certifications"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease }}
              >
                <CertificateGallery />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionShell>
  );
}
