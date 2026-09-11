"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Selector ES / EN. Cambia solo el segmento de locale de la URL — conserva
 * ruta, query string y hash (#seccion) actuales — usando el `usePathname` /
 * `useRouter` de `@/i18n/navigation` (envoltorios locale-aware de next/link
 * y next/navigation). next-intl persiste la elección en la cookie
 * `NEXT_LOCALE`, así que las próximas visitas respetan el idioma elegido en
 * vez de volver a detectarlo por `Accept-Language`.
 *
 * El query string y el hash se leen directamente de `window.location` (solo
 * al hacer clic, nunca durante el render) en vez de con `useSearchParams()`:
 * ese hook obliga a envolver cualquier árbol que lo use en <Suspense> para
 * poder pre-renderizarse de forma estática, y aquí no hace falta reactividad
 * a cambios de query — basta con leerlo una vez, en el momento del clic.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("languageSwitcher");
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: AppLocale) => {
    if (next === locale || isPending) return;

    const { search, hash } = typeof window !== "undefined" ? window.location : { search: "", hash: "" };
    const href = `${pathname}${search}${hash}`;

    startTransition(() => {
      router.replace(href, { locale: next });
    });
  };

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={cn(
        "flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-xl transition-opacity",
        isPending && "opacity-60",
        className,
      )}
    >
      {routing.locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => switchTo(code)}
            aria-current={active ? "true" : undefined}
            disabled={isPending}
            className={cn(
              "rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors duration-200",
              active
                ? "bg-white/10 text-white"
                : "text-slate-400 hover:text-slate-200",
            )}
          >
            {t(code)}
          </button>
        );
      })}
    </div>
  );
}
