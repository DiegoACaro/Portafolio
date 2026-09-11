"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Mail, MessageSquare, Send, User } from "lucide-react";
import { SectionShell } from "@/components/sections/SectionShell";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlassCard } from "@/components/ui/GlassCard";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const field: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const EMAIL = "diegoalejandrocarov@gmail.com";

const SOCIALS = [
  { label: "GitHub", handle: "@DiegoACaro", icon: GithubIcon, href: "https://github.com/DiegoACaro" },
  { label: "LinkedIn", handle: "in/diego-alejandro-caro-v", icon: LinkedinIcon, href: "https://linkedin.com/in/diego-alejandro-caro-v" },
  { label: "Email", handle: EMAIL, icon: Mail, href: `mailto:${EMAIL}` },
];

export function Contact() {
  const t = useTranslations("contact");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
    t("subject", { name: form.name || "…" }),
  )}&body=${encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)}`;

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const inputCls =
    "w-full rounded-2xl border border-white/15 bg-black/25 py-3.5 pl-11 pr-4 text-[14px] text-slate-200 outline-none transition-colors duration-200 placeholder:text-slate-500 focus:border-[rgba(var(--section-rgb),0.6)]";

  return (
    <SectionShell
      id="contact"
      align="start"
      className="px-5 pb-28 pt-28 sm:px-10 lg:px-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="flex flex-col items-center text-center"
        >
          <SectionLabel className="mb-4">{t("label")}</SectionLabel>
          <motion.h2
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-[clamp(30px,5vw,56px)] font-extrabold tracking-[-0.03em] text-white"
          >
            {t("title")}
          </motion.h2>
          <p className="mt-3 max-w-lg text-[14px] text-slate-400">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* contenido: formulario (izquierda) + redes (derecha) */}
        <div className="mx-auto mt-14 grid w-full max-w-4xl gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
          {/* --- formulario --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <GlassCard className="flex flex-col p-5 sm:p-8">
              <h3 className="text-[20px] font-bold text-white">{t("formTitle")}</h3>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                className="mt-6 space-y-3"
              >
                <motion.div variants={field} className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    value={form.name}
                    onChange={set("name")}
                    placeholder={t("namePlaceholder")}
                    className={inputCls}
                  />
                </motion.div>
                <motion.div variants={field} className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder={t("emailPlaceholder")}
                    className={inputCls}
                  />
                </motion.div>
                <motion.div variants={field} className="relative">
                  <MessageSquare size={16} className="absolute left-4 top-4 text-slate-500" />
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={set("message")}
                    placeholder={t("messagePlaceholder")}
                    className={`${inputCls} resize-none pt-3.5`}
                  />
                </motion.div>
                <motion.a
                  variants={field}
                  href={mailto}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--section)] py-3.5 text-[14px] font-semibold text-pcb-deep transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <Send size={15} />
                  {t("send")}
                </motion.a>
              </motion.div>
            </GlassCard>
          </motion.div>

          {/* --- conecta conmigo --- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <GlassCard className="p-5 sm:p-8">
              <h3 className="text-[20px] font-bold text-white mb-3">{t("connect")}</h3>
              <div className="space-y-2.5">
                {SOCIALS.map(({ label, handle, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-3 transition-colors hover:border-[rgba(var(--section-rgb),0.4)]"
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={15} className="text-slate-400" />
                      <span>
                        <span className="block text-[13px] text-slate-200">{label}</span>
                        <span className="block text-[11px] text-slate-500">{handle}</span>
                      </span>
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-slate-600 opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        <p className="mt-16 text-center font-mono text-[11px] text-white/30">
          © {new Date().getFullYear()} {t("footer")}
        </p>
      </div>
    </SectionShell>
  );
}
