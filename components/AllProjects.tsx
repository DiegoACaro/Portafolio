"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { PROJECTS } from "@/lib/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionLabel } from "@/components/ui/SectionLabel";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Acento ámbar (mismo color que la sección "Proyectos"). */
const ACCENT = {
  "--section": "#F59E0B",
  "--section-rgb": "245, 158, 11",
} as CSSProperties;

export function AllProjects() {
  const locale = useLocale();
  const t = useTranslations("allProjects");

  return (
    <main className="relative z-10 min-h-screen" style={ACCENT}>
      {/* fondo estático (esta página no monta la escena 3D) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-pcb-bg"
      >
        <div className="absolute inset-0 bg-[radial-gradient(80%_55%_at_50%_0%,rgba(245,158,11,0.06),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-pcb-deep to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-32 sm:px-12 lg:px-20">
        <Link
          href={`/${locale}#projects`}
          className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-slate-400 transition-colors hover:text-white"
        >
          <ArrowLeft size={14} />
          {t("back")}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mt-8"
        >
          <SectionLabel className="mb-4">{t("eyebrow")}</SectionLabel>
          <h1 className="text-[clamp(30px,5vw,52px)] font-extrabold tracking-[-0.03em] text-white">
            {t("titlePrefix")} <span className="text-[var(--section)]">{t("titleHighlight")}</span>
          </h1>
          <p className="mt-3 max-w-lg text-[14px] text-slate-400">
            {t("count", { count: PROJECTS.length })}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease }}
              whileHover={{ y: -4 }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
