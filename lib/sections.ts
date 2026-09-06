/**
 * Fuente unica de verdad de las secciones del portafolio.
 *
 * Cada seccion tiene un "tema" que describe su color de LED, el texto de
 * serigrafia (SYS_STATUS) y los canales RGB necesarios para componer
 * gradientes / sombras con opacidad variable.
 *
 * El orden del array define el orden de scroll y de la navegacion.
 */

export type SectionId = "hero" | "about" | "projects" | "contact";

export interface SectionTheme {
  /** Identificador y ancla (#hero, #about, ...). */
  id: SectionId;
  /** Etiqueta legible para navegacion y accesibilidad. */
  label: string;
  /** Texto de serigrafia que acompania al LED. */
  status: string;
  /** Codigo corto tipo telemetria (mono). */
  code: string;
  /** Descripcion del "significado" del estado. */
  meaning: string;
  /** Color base del LED en HEX. */
  color: string;
  /** Canales RGB ("r, g, b") para rgba() dinamico. */
  rgb: string;
}

export const SECTIONS: readonly SectionTheme[] = [
  {
    id: "hero",
    label: "Inicio",
    status: "SYSTEM READY",
    code: "SYS_NOMINAL",
    meaning: "Estado nominal / Sistema listo",
    color: "#00F0FF", // Cian electrico
    rgb: "0, 240, 255",
  },
  {
    id: "about",
    label: "Sobre mi",
    status: "CORE PROCESSING",
    code: "CORE_ACTIVE",
    meaning: "Nucleo operativo / Procesamiento",
    color: "#10B981", // Verde esmeralda
    rgb: "16, 185, 129",
  },
  {
    id: "projects",
    label: "Proyectos",
    status: "WORKLOAD // OUTPUT",
    code: "LOAD_HIGH",
    meaning: "Carga de trabajo / Output",
    color: "#F59E0B", // Ambar / naranja
    rgb: "245, 158, 11",
  },
  {
    id: "contact",
    label: "Contacto",
    status: "DATA TRANSMISSION",
    code: "TX_OPEN",
    meaning: "Transmision / Datos",
    color: "#A855F7", // Purpura electrico
    rgb: "168, 85, 247",
  },
] as const;

export const SECTION_IDS = SECTIONS.map((s) => s.id) as SectionId[];

export const SECTION_MAP: Record<SectionId, SectionTheme> = SECTIONS.reduce(
  (acc, section) => {
    acc[section.id] = section;
    return acc;
  },
  {} as Record<SectionId, SectionTheme>,
);

export const DEFAULT_SECTION_ID: SectionId = "hero";

/** Devuelve el tema de una seccion (con fallback al Hero). */
export function getSectionTheme(id: SectionId | null | undefined): SectionTheme {
  return (id && SECTION_MAP[id]) || SECTION_MAP[DEFAULT_SECTION_ID];
}
