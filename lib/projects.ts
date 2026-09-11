/**
 * Fuente única de verdad de los proyectos.
 *
 * - La sección "Proyectos" de la home muestra los que tienen `featured: true`.
 * - La página `/proyectos` muestra TODOS.
 *
 * Contenido bilingüe: `name`, `summary` y `metric` son `{ es, en }` — los
 * componentes (`ProjectCard`, `AllProjects`) escogen el idioma con el
 * `locale` activo. `stack` NO se traduce (nombres propios de tecnologías).
 *
 * Para añadir un proyecto: agrega un objeto al array (con un `slug` único).
 */

import type { AppLocale } from "@/i18n/routing";

/** Identificador interno del tipo de proyecto; su texto vive en `messages/{locale}.json` -> "projects.kind". */
export type ProjectKind = "hybrid" | "software" | "hardware";

/** Texto con su traducción a cada idioma soportado. */
export type LocalizedText = Record<AppLocale, string>;

export interface Project {
  /** Identificador único (para keys y posibles páginas de detalle). */
  slug: string;
  name: LocalizedText;
  kind: ProjectKind;
  /** Descripción corta (2–3 líneas). */
  summary: LocalizedText;
  /** Tecnologías / stack (nombres propios, iguales en ambos idiomas). */
  stack: string[];
  /** Métrica o resultado destacado (opcional). */
  metric?: LocalizedText;
  /** Enlace externo: demo, repo, etc. (opcional). */
  href?: string;
  /** Año o rango (opcional). */
  year?: string;
  /** Se muestra en la sección de la home. */
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: "app-servicios-aduaneros-ia",
    name: {
      es: "App de servicios aduaneros con IA integrada",
      en: "Customs services app with integrated AI",
    },
    kind: "software",
    summary: {
      es: "Plataforma B2C con IA, casillero virtual y KYC que evalúa la viabilidad e impuestos de envíos internacionales bajo auditoría humana.",
      en: "B2C platform with AI, a virtual mailbox and KYC that assesses the feasibility and duties of international shipments under human review.",
    },
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "IA / LLMs",
      "PostgreSQL (RLS)",
      "Supabase",
    ],
    featured: true,
  },
  {
    slug: "plataforma-robotica-locomocion",
    name: {
      es: "Plataforma robótica con cambios de locomoción y redes neuronales biológicamente inspiradas",
      en: "Robotic platform with locomotion switching and biologically-inspired neural networks",
    },
    kind: "hybrid",
    summary: {
      es: "Robot con locomoción reconfigurable controlado por redes neuronales de inspiración biológica; control de bajo nivel en STM32 y telemetría por CAN.",
      en: "Robot with reconfigurable locomotion controlled by biologically-inspired neural networks; low-level control on STM32 with CAN-bus telemetry.",
    },
    stack: ["STM32", "C++", "ROS 2", "CAN bus"],
    metric: {
      es: "±0.4 mm de repetibilidad",
      en: "±0.4 mm repeatability",
    },
    featured: true,
  },
  {
    slug: "copiloto-documental-rag",
    name: {
      es: "Copiloto documental RAG",
      en: "RAG document copilot",
    },
    kind: "software",
    summary: {
      es: "Asistente que responde sobre manuales técnicos con citas verificables. Ingesta, embeddings, reranking y evaluación continua.",
      en: "Assistant that answers questions about technical manuals with verifiable citations. Ingestion, embeddings, reranking and continuous evaluation.",
    },
    stack: ["TypeScript", "Next.js", "pgvector", "LLM APIs"],
    metric: {
      es: "92% respuestas con cita válida",
      en: "92% of answers with a valid citation",
    },
    featured: true,
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
