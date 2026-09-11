/**
 * Certificados y credenciales que se muestran en la pestaña "Certificaciones"
 * de la sección Proyectos.
 *
 * Cómo añadir uno:
 *  1. Copia la imagen del certificado en `public/certificates/`.
 *  2. Añade una entrada a `CERTIFICATES` con su ruta (`src`), título y emisor
 *     (`title`/`issuer` son `{ es, en }` — `CertificateGallery` escoge el
 *     idioma según el `locale` activo).
 *
 * Mientras el array esté vacío, la galería muestra un estado "en camino".
 */
import type { LocalizedText } from "@/lib/projects";

export interface Certificate {
  /** Ruta pública de la imagen, p. ej. "/certificates/curso-ia.png". */
  src: string;
  /** Nombre del certificado (se usa como texto alternativo y como pie). */
  title: LocalizedText;
  /** Entidad emisora (opcional; normalmente un nombre propio, igual en ambos idiomas). */
  issuer?: string;
}

export const CERTIFICATES: Certificate[] = [
  {
    src: "/certificates/Leadership.png",
    title: { es: "Certificado de liderazgo", en: "Leadership certificate" },
    issuer: "Universidad Autónoma de Occidente",
  },
];
