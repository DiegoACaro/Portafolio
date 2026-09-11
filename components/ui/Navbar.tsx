"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useSectionState } from "@/context/SectionContext";
import { usePathname } from "@/i18n/navigation";
import { SECTIONS, SECTION_MAP, type SectionId } from "@/lib/sections";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export function Navbar() {
  const { activeId, active } = useSectionState();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const onHome = pathname === "/";
  const currentId: SectionId | null = onHome
    ? activeId
    : pathname.startsWith("/proyectos")
      ? "projects"
      : null;
  const accent = currentId ? SECTION_MAP[currentId].color : active.color;
  const homeHref = `/${locale}`;
  const hrefFor = (id: SectionId) => (onHome ? `#${id}` : `${homeHref}#${id}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      aria-label={t("srLabel")}
      className="fixed inset-x-3 top-3 z-50 sm:inset-x-6 sm:top-5"
    >
      <div
        className={`flex items-center justify-between gap-4 rounded-full border px-4 py-2.5 backdrop-blur-xl transition-colors duration-300 sm:px-6 ${
          scrolled
            ? "border-white/10 bg-pcb-bg/80"
            : "border-white/[0.06] bg-pcb-bg/45"
        }`}
      >
        <a
          href={onHome ? "#hero" : homeHref}
          className="font-mono text-[13px] tracking-[0.12em] text-slate-300 transition-colors hover:text-white"
        >
          diego<span style={{ color: accent }}>.</span>caro
        </a>

        {/* desktop - ml-auto empuja los enlaces hacia la derecha antes del LanguageSwitcher */}
        <div className="hidden items-center gap-8 md:flex ml-auto">
          {SECTIONS.map((section) => {
            const isActive = section.id === currentId;
            return (
              <a
                key={section.id}
                href={hrefFor(section.id)}
                aria-current={isActive ? "true" : undefined}
                className={`relative pb-1 font-mono text-[13px] tracking-[0.08em] transition-colors duration-200 ${
                  isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {t(section.id)}
                <motion.span
                  className="absolute inset-x-0 bottom-0 h-px origin-left"
                  style={{ backgroundColor: section.color }}
                  initial={false}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
              </a>
            );
          })}
        </div>

        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          aria-label={open ? t("closeMenu") : t("openMenu")}
          onClick={() => setOpen((v) => !v)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-300 md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-2 flex flex-col gap-1 rounded-3xl border border-white/10 bg-pcb-bg/90 p-3 backdrop-blur-xl md:hidden"
          >
            {SECTIONS.map((section) => {
              const isActive = section.id === currentId;
              return (
                <a
                  key={section.id}
                  href={hrefFor(section.id)}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-mono text-[13px] tracking-[0.08em] ${
                    isActive ? "bg-white/[0.06] text-white" : "text-slate-400"
                  }`}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: isActive
                        ? section.color
                        : "rgba(255,255,255,0.2)",
                    }}
                  />
                  {t(section.id)}
                </a>
              );
            })}
            <div className="mt-1 flex justify-center border-t border-white/5 pt-3">
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}