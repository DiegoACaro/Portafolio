"use client";

import { useState, type ComponentType, type CSSProperties } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Database,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Webhook,
} from "lucide-react";
import { useTranslations } from "next-intl";
import {
  SiAndroid,
  SiCss,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJetpackcompose,
  SiKotlin,
  SiLaravel,
  SiLinux,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiReactquery,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";
import { Link } from "@/i18n/navigation";
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

type StackIcon = ComponentType<{
  size?: number | string;
  className?: string;
  style?: CSSProperties;
}>;

/** Color de la sección: lo usan las herramientas sin logo de marca propio. */
const ACCENT = "var(--section)";

type StackCategoryId = "frontend" | "backendData" | "mobile" | "tools";

/**
 * Stack técnico agrupado por categoría (logo + color de marca). Las entradas
 * sin marca propia — diseño responsive, APIs REST, auth, etc. — usan un icono
 * de lucide teñido con el acento de la sección. `id` mapea a
 * `messages/{locale}.json` -> "projects.stack" para el título del grupo; los
 * nombres de tecnología (`name`) no se traducen (son nombres propios).
 */
const STACK: { id: StackCategoryId; items: { name: string; Icon: StackIcon; color: string }[] }[] = [
  {
    id: "frontend",
    items: [
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
      { name: "Vite", Icon: SiVite, color: "#646CFF" },
      { name: "React Query", Icon: SiReactquery, color: "#FF4154" },
      { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", Icon: SiCss, color: "#1572B6" },
      { name: "Responsive design", Icon: MonitorSmartphone, color: ACCENT },
    ],
  },
  {
    id: "backendData",
    items: [
      { name: "PHP", Icon: SiPhp, color: "#777BB4" },
      { name: "Laravel", Icon: SiLaravel, color: "#FF2D20" },
      { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Supabase", Icon: SiSupabase, color: "#3ECF8E" },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
      { name: "REST APIs", Icon: Webhook, color: ACCENT },
      { name: "Auth / RLS", Icon: ShieldCheck, color: ACCENT },
    ],
  },
  {
    id: "mobile",
    items: [
      { name: "Kotlin", Icon: SiKotlin, color: "#7F52FF" },
      { name: "Android", Icon: SiAndroid, color: "#3DDC84" },
      { name: "Jetpack Compose", Icon: SiJetpackcompose, color: "#4285F4" },
      { name: "Room", Icon: Database, color: ACCENT },
    ],
  },
  {
    id: "tools",
    items: [
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "GitHub", Icon: SiGithub, color: "#FFFFFF" },
      { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
      { name: "Vercel", Icon: SiVercel, color: "#FFFFFF" },
      { name: "Linux", Icon: SiLinux, color: "#FCC624" },
      { name: "AI / LLMs", Icon: Sparkles, color: ACCENT },
    ],
  },
];

const TAB_IDS = ["projects", "stack", "certifications"] as const;
type TabId = (typeof TAB_IDS)[number];

/* ---------------- componente ---------------- */

export function Projects() {
  const t = useTranslations("projects");
  const [tab, setTab] = useState<TabId>("projects");

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
          <SectionLabel className="mb-4">{t("label")}</SectionLabel>
          <h2 className="text-[clamp(28px,4.5vw,46px)] font-extrabold tracking-[-0.03em] text-white">
            {t("titlePrefix")} <span className="text-[var(--section)]">{t("titleHighlight")}</span>
          </h2>
        </motion.div>

        {/* tabs */}
        <div className="mt-10 flex justify-center">
          <div className="flex w-full max-w-md gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-xl">
            {TAB_IDS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`relative flex-1 rounded-full py-2.5 text-[13px] font-medium transition-colors duration-300 ${
                  tab === id ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab === id && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full bg-[rgba(var(--section-rgb),0.14)] ring-1 ring-[rgba(var(--section-rgb),0.3)]"
                    transition={{ duration: 0.35, ease }}
                  />
                )}
                <span className="relative">{t(`tabs.${id}`)}</span>
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
                    {t("viewAll")}
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </motion.div>
              </motion.div>
            )}

            {tab === "stack" && (
              <motion.div
                key="stack"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease }}
                className="mx-auto max-w-3xl space-y-8"
              >
                {STACK.map((group) => (
                  <div key={group.id}>
                    <SectionLabel className="mb-4">{t(`stack.${group.id}`)}</SectionLabel>
                    <motion.div
                      variants={grid}
                      initial="hidden"
                      animate="show"
                      className="grid grid-cols-3 gap-3 sm:grid-cols-4"
                    >
                      {group.items.map(({ name, Icon, color }) => (
                        <motion.div
                          key={name}
                          variants={cardIn}
                          whileHover={{ y: -4 }}
                          className="group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-2 py-4 text-center backdrop-blur-xl transition-colors hover:border-white/20"
                        >
                          <span className="relative flex h-8 items-center justify-center">
                            <span
                              aria-hidden
                              className="pointer-events-none absolute h-8 w-8 rounded-full opacity-25 blur-lg transition-opacity duration-500 group-hover:opacity-70"
                              style={{ background: color }}
                            />
                            <Icon
                              size={28}
                              style={{ color }}
                              className="relative z-10"
                            />
                          </span>
                          <span className="text-[11.5px] font-medium leading-tight text-slate-300">
                            {name}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
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
