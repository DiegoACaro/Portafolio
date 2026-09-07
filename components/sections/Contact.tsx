"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Timer,
  User,
} from "lucide-react";
import { SectionShell } from "@/components/sections/SectionShell";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlassCard } from "@/components/ui/GlassCard";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const field: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const EMAIL = "diego.caro@dominio.com";

const SOCIALS = [
  { label: "GitHub", handle: "@diego-caro", icon: GithubIcon, href: "https://github.com/diego-caro" },
  { label: "LinkedIn", handle: "in/diego-caro", icon: LinkedinIcon, href: "https://linkedin.com/in/diego-caro" },
  { label: "Email", handle: EMAIL, icon: Mail, href: `mailto:${EMAIL}` },
];

const FACTS = [
  { icon: MapPin, label: "Ubicación", value: "Colombia · remoto (UTC−5)" },
  { icon: Timer, label: "Respuesta", value: "< 48 h" },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
    `Contacto de ${form.name || "…"}`,
  )}&body=${encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)}`;

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
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
          <SectionLabel className="mb-4">Contacto</SectionLabel>
          <motion.h2
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-[clamp(30px,5vw,56px)] font-extrabold tracking-[-0.03em] text-white"
          >
            Transmitamos datos
          </motion.h2>
          <p className="mt-3 max-w-lg text-[14px] text-slate-400">
            ¿Tienes algo en mente? Escríbeme y hablamos.
          </p>
        </motion.div>

        {/* contenido */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
          {/* --- formulario --- */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <GlassCard className="flex h-full flex-col p-5 sm:p-7">
              <h3 className="text-[20px] font-bold text-white">Envíame un mensaje</h3>
              <p className="mt-2 text-[13px] text-slate-500">
                Roles híbridos software/IA + mecatrónica, consultoría de
                integración y colaboraciones de I+D.
              </p>

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
                    placeholder="Tu nombre"
                    className={inputCls}
                  />
                </motion.div>
                <motion.div variants={field} className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="Tu email"
                    className={inputCls}
                  />
                </motion.div>
                <motion.div variants={field} className="relative">
                  <MessageSquare size={16} className="absolute left-4 top-4 text-slate-500" />
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Tu mensaje"
                    className={`${inputCls} resize-none pt-3.5`}
                  />
                </motion.div>
                <motion.a
                  variants={field}
                  href={mailto}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--section)] py-3.5 text-[14px] font-semibold text-pcb-deep transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <Send size={15} />
                  Enviar mensaje
                </motion.a>
              </motion.div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="mb-3 text-[13px] text-slate-500">Conecta conmigo</p>
                <div className="grid gap-2.5 sm:grid-cols-1">
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
              </div>
            </GlassCard>
          </motion.div>

          {/* --- panel de estado --- */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <GlassCard className="relative flex h-full flex-col overflow-hidden p-5 sm:p-8">
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(var(--section-rgb),0.22), transparent 70%)",
                }}
              />
              <div className="relative flex items-center gap-3">
                <motion.span
                  className="h-2 w-2 rounded-full bg-[var(--section)]"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ boxShadow: "0 0 10px 2px rgba(var(--section-rgb),0.8)" }}
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
                  canal abierto · tx
                </span>
              </div>

              <p className="relative mt-6 text-[15px] leading-relaxed text-slate-300">
                Disponible para nuevos proyectos. Cuéntame el problema —del sensor
                al usuario— y te respondo con una primera lectura técnica.
              </p>

              <a
                href={`mailto:${EMAIL}`}
                className="relative mt-6 inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-[13px] text-slate-200 transition-colors hover:border-[rgba(var(--section-rgb),0.4)] hover:text-[var(--section)]"
              >
                <Mail size={14} />
                {EMAIL}
              </a>

              <div className="relative mt-auto grid gap-3 pt-8 sm:grid-cols-2">
                {FACTS.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-slate-500">
                      <Icon size={12} />
                      {label}
                    </span>
                    <p className="mt-1.5 text-[13px] text-slate-200">{value}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        <p className="mt-16 text-center font-mono text-[11px] text-white/30">
          © {new Date().getFullYear()} Diego Alejandro Caro · sys_status · tx_open
        </p>
      </div>
    </SectionShell>
  );
}
