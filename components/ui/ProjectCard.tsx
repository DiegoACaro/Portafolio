"use client";

import { ArrowUpRight, CircuitBoard, Cpu, Layers } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { GlassCard } from "@/components/ui/GlassCard";
import { Chip } from "@/components/ui/Chip";
import type { Project, ProjectKind } from "@/lib/projects";

const KIND_ICON: Record<ProjectKind, typeof Cpu> = {
  hybrid: CircuitBoard,
  software: Cpu,
  hardware: Layers,
};

/**
 * Tarjeta de proyecto. Se usa tanto en la sección "Proyectos" de la home
 * como en la página `/proyectos`. El acento toma el color de `--section`
 * (lo fija cada contenedor: la sección o la página). El nombre, resumen y
 * métrica del proyecto son bilingües (`{ es, en }`); se resuelven con el
 * `locale` activo. La etiqueta del "kind" (SOFTWARE/HÍBRIDO/HARDWARE) sale
 * de `messages/{locale}.json` -> "projects.kind".
 */
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const locale = useLocale();
  const t = useTranslations("projects");
  const Icon = KIND_ICON[project.kind];

  return (
    <GlassCard interactive className="flex h-full flex-col p-4">
      {/* cabecera visual */}
      <div className="relative mb-4 flex h-32 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(120%_120%_at_20%_0%,rgba(var(--section-rgb),0.16),transparent_60%)]">
        <Icon size={30} className="text-[var(--section)] opacity-70" />
        <span className="absolute left-3 top-3 rounded-md border border-[rgba(var(--section-rgb),0.4)] px-2 py-0.5 font-mono text-[10px] tracking-widest text-[var(--section)]">
          {t(`kind.${project.kind}`)}
        </span>
        <span className="absolute right-3 top-3 font-mono text-[11px] text-slate-500">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="text-[16px] font-semibold leading-tight text-white">
        {project.name[locale]}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-[13px] leading-relaxed text-slate-400">
        {project.summary[locale]}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <Chip key={tech}>{tech}</Chip>
        ))}
      </div>

      {(project.metric || project.href) && (
        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
          <span className="text-[13px] font-medium text-[var(--section)]">
            {project.metric?.[locale]}
          </span>
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[12px] text-slate-400 transition-colors hover:text-white"
            >
              {t("card.view")} <ArrowUpRight size={13} />
            </a>
          )}
        </div>
      )}
    </GlassCard>
  );
}
