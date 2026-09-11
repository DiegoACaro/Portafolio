"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { SectionShell } from "@/components/sections/SectionShell";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RotatingText } from "@/components/ui/RotatingText";
import { Chip } from "@/components/ui/Chip";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "300"],
});

/** Stack destacado: nombres propios de tecnología, iguales en cualquier idioma. */
const SKILLS = ["TypeScript", "Python", "PyTorch", "STM32 · ESP32", "ROS 2", "Next.js"];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease } },
};

/**
 * Ejemplo de componente con Framer Motion + next-intl: el `motion.h1` del
 * nombre/título, junto con el resto del texto de la sección, sale de
 * `useTranslations("hero")` en vez de estar escrito a mano — así el mismo
 * componente funciona en `/es` y en `/en` sin duplicar JSX ni animaciones.
 * `roles` es un array, así que se lee "en crudo" con `t.raw` (sin pasar por
 * el formateador ICU, que espera strings) y se tipa explícitamente.
 */
export function Hero() {
  const t = useTranslations("hero");
  const roles = t.raw("roles") as string[];

  return (
    <SectionShell
      id="hero"
      className="overflow-hidden px-6 py-28 sm:px-12 md:pl-24 lg:pl-32"
    >
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
        className="w-full max-w-3xl"
      >
        <motion.div variants={fadeUp} className="mb-6">
          <SectionLabel>{t("available")}</SectionLabel>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-[clamp(34px,6vw,64px)] font-extrabold leading-[1.03] tracking-[-0.03em] text-white"
        >
          {t("name")}
          <span
            className={`${spaceGrotesk.className} block text-[clamp(28px,5vw,61px)] text-[var(--section)]`}
          >
            {t("title")}
          </span>
        </motion.h1>

        <motion.div
          variants={fadeUp}
          className="mt-4 text-[15px] tracking-[0.06em] text-slate-400"
        >
          <RotatingText phrases={roles} />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-7 max-w-md text-[14px] leading-[1.9] text-slate-400"
        >
          {t("bio")}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <Chip key={skill}>{skill}</Chip>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col gap-1.5 font-mono text-[13px] text-slate-500"
        >
          <span>↓ {t("scrollHint")}</span>
          <span>↗ {t("openTo")}</span>
        </motion.div>
      </motion.div>

      {/* indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 6, 0], opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500"
        >
          {t("scroll")} <span className="text-slate-300">↓</span>
        </motion.div>
      </motion.div>
    </SectionShell>
  );
}
