/**
 * Certificados y credenciales que se muestran en la pestaña "Certificaciones"
 * de la sección Proyectos.
 *
 * Cómo añadir uno:
 *  1. Copia la imagen del certificado en `public/certificates/`.
 *  2. Añade una entrada a `CERTIFICATES` con su ruta (`src`), título y emisor.
 *
 * Mientras el array esté vacío, la galería muestra un estado "en camino".
 */
export interface Certificate {
  /** Ruta pública de la imagen, p. ej. "/certificates/curso-ia.png". */
  src: string;
  /** Nombre del certificado (se usa como texto alternativo y como pie). */
  title: string;
  /** Entidad emisora (opcional). */
  issuer?: string;
}

export const CERTIFICATES: Certificate[] = [
  // {
  //   src: "/certificates/ejemplo.png",
  //   title: "Nombre del certificado",
  //   issuer: "Plataforma / institución",
  // },
];
