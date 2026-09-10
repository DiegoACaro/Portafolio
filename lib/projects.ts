/**
 * Fuente única de verdad de los proyectos.
 *
 * - La sección "Proyectos" de la home muestra los que tienen `featured: true`.
 * - La página `/proyectos` muestra TODOS.
 *
 * Para añadir un proyecto: agrega un objeto al array (con un `slug` único).
 */

export type ProjectKind = "HÍBRIDO" | "SOFTWARE" | "HARDWARE";

export interface Project {
  /** Identificador único (para keys y posibles páginas de detalle). */
  slug: string;
  name: string;
  kind: ProjectKind;
  /** Descripción corta (2–3 líneas). */
  summary: string;
  /** Tecnologías / stack. */
  stack: string[];
  /** Métrica o resultado destacado (opcional). */
  metric?: string;
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
    name: "App de servicios aduaneros con IA integrada",
    kind: "SOFTWARE",
    summary:
      "Plataforma B2C con IA, casillero virtual y KYC que evalúa la viabilidad e impuestos de envíos internacionales bajo auditoría humana.",
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
    name: "Plataforma robótica con cambios de locomoción y redes neuronales biológicamente inspiradas",
    kind: "HÍBRIDO",
    summary:
      "Robot con locomoción reconfigurable controlado por redes neuronales de inspiración biológica; control de bajo nivel en STM32 y telemetría por CAN.",
    stack: ["STM32", "C++", "ROS 2", "CAN bus"],
    metric: "±0.4 mm de repetibilidad",
    featured: true,
  },
  {
    slug: "copiloto-documental-rag",
    name: "Copiloto documental RAG",
    kind: "SOFTWARE",
    summary:
      "Asistente que responde sobre manuales técnicos con citas verificables. Ingesta, embeddings, reranking y evaluación continua.",
    stack: ["TypeScript", "Next.js", "pgvector", "LLM APIs"],
    metric: "92% respuestas con cita válida",
    featured: true,
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
