"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { CERTIFICATES } from "@/lib/certifications";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** El contenedor orquesta el stagger de las miniaturas al montarse. */
const gridV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const thumbV: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease } },
};

/**
 * Galería de certificados (pestaña "Certificaciones").
 *
 * Cada miniatura abre un visor a pantalla completa donde la imagen se amplía.
 * Se navega con las flechas ← → (teclado o botones) y se cierra con Esc, el
 * botón × o un clic en el fondo. Las imágenes viven en `public/certificates/`
 * y se declaran en `lib/certifications.ts`; mientras no haya ninguna se
 * muestra un estado "en camino".
 */
export function CertificateGallery() {
  const [index, setIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const isOpen = index !== null;

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setIndex((i) =>
        i === null ? i : (i + dir + CERTIFICATES.length) % CERTIFICATES.length,
      ),
    [],
  );

  // Teclado + bloqueo de scroll mientras el visor está abierto.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, step]);

  if (CERTIFICATES.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
        className="mx-auto max-w-md rounded-[24px] border border-dashed border-white/15 bg-white/[0.02] px-6 py-12 text-center"
      >
        <ZoomIn
          size={22}
          className="mx-auto mb-3 text-[var(--section)]"
          aria-hidden
        />
        <p className="text-[14px] font-medium text-slate-200">
          Certificados en camino
        </p>
        <p className="mt-1 text-[12px] leading-relaxed text-slate-500">
          Pronto se listarán aquí las credenciales y cursos. Cada imagen se podrá
          ampliar con un clic.
        </p>
      </motion.div>
    );
  }

  const current = index !== null ? CERTIFICATES[index] : null;

  return (
    <>
      <motion.div
        variants={gridV}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-4 sm:grid-cols-3"
      >
        {CERTIFICATES.map((cert, i) => (
          <motion.button
            key={cert.src}
            type="button"
            variants={thumbV}
            whileHover={{ y: -4 }}
            onClick={() => setIndex(i)}
            aria-label={`Ampliar: ${cert.title}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.03] text-left transition-colors hover:border-white/25"
          >
            <Image
              src={cert.src}
              alt={cert.title}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pcb-deep/90 via-pcb-deep/15 to-transparent"
            />
            <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-pcb-deep/70 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <ZoomIn size={15} />
            </span>
            <span className="absolute inset-x-0 bottom-0 p-3">
              <span className="block truncate text-[12px] font-semibold text-white">
                {cert.title}
              </span>
              {cert.issuer && (
                <span className="block truncate text-[11px] text-slate-400">
                  {cert.issuer}
                </span>
              )}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && current && (
              <motion.div
                className="fixed inset-0 z-[120] flex items-center justify-center bg-pcb-deep/90 p-4 backdrop-blur-md sm:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={close}
                role="dialog"
                aria-modal="true"
                aria-label={current.title}
              >
                <button
                  type="button"
                  onClick={close}
                  aria-label="Cerrar"
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-slate-200 transition-colors hover:bg-white/[0.12] hover:text-white"
                >
                  <X size={18} />
                </button>

                {CERTIFICATES.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        step(-1);
                      }}
                      aria-label="Certificado anterior"
                      className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-slate-200 transition-colors hover:bg-white/[0.12] hover:text-white sm:left-6"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        step(1);
                      }}
                      aria-label="Certificado siguiente"
                      className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-slate-200 transition-colors hover:bg-white/[0.12] hover:text-white sm:right-6"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                <motion.figure
                  key={current.src}
                  className="flex w-full max-w-4xl flex-col items-center"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, ease }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative h-[70vh] w-full">
                    <Image
                      src={current.src}
                      alt={current.title}
                      fill
                      sizes="90vw"
                      className="object-contain"
                      priority
                    />
                  </div>
                  <figcaption className="mt-4 text-center">
                    <span className="block text-[14px] font-semibold text-white">
                      {current.title}
                    </span>
                    {current.issuer && (
                      <span className="mt-0.5 block text-[12px] text-slate-400">
                        {current.issuer}
                      </span>
                    )}
                  </figcaption>
                </motion.figure>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
