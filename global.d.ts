import type { routing } from "@/i18n/routing";
import type messages from "./messages/es.json";

/**
 * Tipa `useTranslations` / `getTranslations` / `useLocale` en todo el
 * proyecto: autocompletado y verificación en build de namespaces, claves de
 * mensaje y el propio locale (`"es" | "en"`). Se usa `es.json` como forma de
 * referencia — `en.json` debe mantener exactamente las mismas claves.
 */
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
