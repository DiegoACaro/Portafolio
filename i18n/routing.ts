import { defineRouting } from "next-intl/routing";

/**
 * Configuración central de idiomas del portafolio.
 *
 * `localePrefix: "always"` mantiene rutas explícitas `/es` y `/en` (nunca se
 * sirve contenido en la raíz "/" sin prefijo) — así `middleware.ts` siempre
 * puede detectar y fijar el idioma en la URL.
 */
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always",
});

export type AppLocale = (typeof routing.locales)[number];
