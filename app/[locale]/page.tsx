import { setRequestLocale } from "next-intl/server";
import { BackgroundScene } from "@/components/3d/BackgroundScene";
import { IntroGate } from "@/components/IntroGate";
import { StatusHUD } from "@/components/StatusHUD";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { routing, type AppLocale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Pagina principal.
 *
 * Conexion scroll <-> 3D:
 *   1. Cada seccion se auto-registra en el IntersectionObserver global
 *      (SectionShell -> useSectionObserver -> SectionContext).
 *   2. <BackgroundScene> monta el <Canvas> de React Three Fiber; dentro de
 *      Scene.tsx se lee `useSectionState()` (fuera del reconciliador de R3F)
 *      y se inyecta `active.color` -> color del LED 3D + pointLight +
 *      spotLight, que interpola de forma suave en useFrame.
 *      (La camara es estatica; mover la camara con el scroll producia
 *       shimmer especular en las pistas de la PCB.)
 *
 *   Hero     -> #00F0FF  Cian     · Sistema listo
 *   About    -> #10B981  Verde    · Nucleo operativo
 *   Projects -> #F59E0B  Ambar    · Carga de trabajo
 *   Contact  -> #A855F7  Purpura  · Transmision de datos
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);

  return (
    <>
      {/* fondo 3D: fixed inset-0 pointer-events-none -z-10 */}
      <BackgroundScene />

      {/* lectura textual del estado (esquina inferior derecha) */}
      <StatusHUD />

      {/* pantalla de bienvenida (una vez por sesion) */}
      <IntroGate />

      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
