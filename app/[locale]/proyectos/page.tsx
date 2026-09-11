import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AllProjects } from "@/components/AllProjects";
import { routing, type AppLocale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale as AppLocale,
    namespace: "allProjectsMetadata",
  });

  return { title: t("title"), description: t("description") };
}

export default async function ProyectosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);

  return <AllProjects />;
}
