"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";
import { SectionShell } from "@/components/sections/SectionShell";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease } },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease } },
};

const scrollToProjects = () =>
  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

/** Marco cuadrado de la foto (misma imagen en móvil y escritorio). */
function ProfilePhoto({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden border border-white/10 bg-[radial-gradient(circle_at_center,rgba(228,228,231,0.85)_0%,rgba(24,24,27,0.85)_100%)] backdrop-blur-sm",
        className,
      )}
    >
      <Image
        src="/ProfilePicture.png"
        alt="Diego Alejandro Caro"
        fill
        sizes="(max-width: 1024px) 112px, 340px"
        className="object-cover"
      />
    </div>
  );
}

export function About() {
  const t = useTranslations("about");

  return (
    <SectionShell
      id="about"
      align="start"
      className="px-6 pb-16 pt-28 sm:px-12 md:px-16 lg:px-24"
    >
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeUp} className="mb-4">
            <SectionLabel>{t("label")}</SectionLabel>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-[clamp(30px,5vw,46px)] font-extrabold leading-[1.03] tracking-[-0.03em] text-white"
          >
            {t("titlePrefix")} <span className="text-[var(--section)]">{t("titleHighlight")}</span>
          </motion.h2>

          {/* items-start alinea el borde superior de ambas columnas: en
              escritorio la foto arranca a la altura del primer párrafo. */}
          <div className="mt-6 lg:grid lg:grid-cols-[1fr_320px] lg:items-start lg:gap-x-12">
            {/* --- flujo de texto --- */}
            <div className="max-w-xl">
              {/* foto móvil: pequeña, flotando junto al texto */}
              <motion.div
                variants={pop}
                className="float-right ml-3.5 mb-1 w-[164px] sm:w-[100px] lg:hidden"
              >
                <ProfilePhoto className="rounded-xl" />
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="text-justify text-[16px] leading-[1.8] text-slate-400 hyphens-auto"
              >
                {t("paragraph1")}
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="mt-4 text-justify text-[16px] leading-[1.8] text-slate-400 hyphens-auto"
              >
                {t("paragraph2")}
              </motion.p>

              {/* cita — solo móvil (en escritorio va bajo la foto) */}
              <motion.p
                variants={pop}
                className="clear-both mt-6 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-[12px] italic leading-relaxed text-slate-300 lg:hidden"
              >
                “{t("quote")}”
              </motion.p>

              <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-3">
                <a
                  href="/diego-alejandro-caro-cv.pdf"
                  download="CV - Diego Alejandro Caro.pdf"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-[13px] font-semibold text-black transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <FileText size={14} />
                  {t("downloadCv")}
                </a>
                <button
                  type="button"
                  onClick={scrollToProjects}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-[13px] font-semibold text-slate-200 transition-colors duration-200 hover:border-white/40 hover:bg-white/[0.04]"
                >
                  <ArrowUpRight size={14} />
                  {t("viewProjects")}
                </button>
              </motion.div>
            </div>

            {/* --- foto + cita (solo escritorio) --- */}
            <div className="hidden lg:flex lg:flex-col lg:gap-4">
              <motion.div variants={pop} className="relative">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-4 rounded-[40px] opacity-40 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(var(--section-rgb),0.4), transparent 70%)",
                  }}
                />
                <ProfilePhoto className="rounded-3xl" />
              </motion.div>

              <motion.p
                variants={pop}
                className="rounded-xl border border-white/10 bg-pcb-bg/[0.7] px-5 py-3 text-[14px] italic leading-relaxed text-slate-300"
              >
                “{t("quote")}”
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}
