import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "@/i18n/routing";

/**
 * Resuelve el locale de cada request de servidor (lo consumen `layout.tsx`,
 * `getTranslations`, `NextIntlClientProvider`, ...) y carga su archivo de
 * mensajes. Si el locale de la URL no es válido, cae al idioma por defecto.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
