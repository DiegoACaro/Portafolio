import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/ui/Navbar";
import { SectionProvider } from "@/context/SectionContext";
import { routing, type AppLocale } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

/** Pre-renderiza `/es` y `/en` como páginas estáticas en el build. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as AppLocale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "portafolio",
      "portfolio",
      "software",
      "inteligencia artificial",
      "artificial intelligence",
      "mecatronica",
      "mechatronics",
      "robotica",
      "robotics",
      "three.js",
      "react three fiber",
      "Next.js",
    ],
  };
}

export const viewport: Viewport = {
  themeColor: "#0A0D14",
  colorScheme: "dark",
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Habilita el renderizado estático de esta ruta con el locale correcto.
  setRequestLocale(locale as AppLocale);

  // Mensajes ya resueltos por `i18n/request.ts`; se pasan explícitamente al
  // provider de cliente (necesario para que useTranslations funcione en los
  // Client Components, p. ej. Hero, Navbar, LanguageSwitcher, ...).
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-pcb-bg font-sans text-slate-200 antialiased">
        {/*
          SectionProvider expone la seccion activa a toda la app.
          La escena 3D (BackgroundScene), el HUD y la intro viven en
          app/[locale]/page.tsx; cada <section> se registra en el observer.
        */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SectionProvider>
            <Navbar />
            {children}
          </SectionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
