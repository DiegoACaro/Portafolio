"use client";

/**
 * SectionContext
 * --------------------------------------------------------------------
 * Mecanismo global (y unico) para saber que seccion esta mirando el
 * usuario. Un solo `IntersectionObserver` observa todas las secciones
 * registradas, mantiene su ratio de visibilidad y expone la seccion
 * dominante. La escena 3D (`components/3d/Scene.tsx`) consume ese estado
 * para el color del LED y de la luz que proyecta sobre la PCB.
 *
 * Uso:
 *   <SectionProvider> ... </SectionProvider>           // en el layout
 *   const { active } = useSectionState();               // consumidores
 *   const ref = useSectionObserver("about");            // en cada <section>
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_SECTION_ID,
  SECTION_MAP,
  type SectionId,
  type SectionTheme,
} from "@/lib/sections";

interface SectionContextValue {
  /** Id de la seccion con mayor presencia en el viewport. */
  activeId: SectionId;
  /** Tema completo (color, status, rgb, ...) de la seccion activa. */
  active: SectionTheme;
  /** Registra / desregistra el nodo DOM de una seccion en el observer. */
  registerSection: (id: SectionId, node: HTMLElement | null) => void;
}

const SectionContext = createContext<SectionContextValue | null>(null);

/** Umbrales densos -> transiciones de color mas suaves. */
const THRESHOLDS = [0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 0.9, 1];

export function SectionProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<SectionId>(DEFAULT_SECTION_ID);

  /** id -> nodo observado */
  const nodesRef = useRef<Map<SectionId, HTMLElement>>(new Map());
  /** id -> ratio de interseccion actual */
  const ratiosRef = useRef<Map<SectionId, number>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  /** Recalcula la seccion dominante a partir de los ratios almacenados. */
  const resolveActive = useCallback(() => {
    let bestId: SectionId | null = null;
    let bestRatio = 0;

    ratiosRef.current.forEach((ratio, id) => {
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestId = id;
      }
    });

    // Solo conmutamos si hay un ganador real; si el viewport queda entre
    // dos secciones sin interseccion, conservamos la ultima activa.
    if (bestId !== null && bestRatio > 0) {
      setActiveId((prev) => (prev === bestId ? prev : (bestId as SectionId)));
    }
  }, []);

  /* ---- Observer: se crea una sola vez en cliente ---- */
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.sectionId as
            | SectionId
            | undefined;
          if (!id) continue;
          ratiosRef.current.set(
            id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }
        resolveActive();
      },
      {
        threshold: THRESHOLDS,
        // Sesga la medicion hacia la banda central del viewport: la
        // seccion "activa" es la que ocupa el centro de la pantalla.
        rootMargin: "-8% 0px -8% 0px",
      },
    );

    observerRef.current = observer;
    // Observa los nodos que se hayan registrado antes de este efecto.
    nodesRef.current.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [resolveActive]);

  /* ---- Registro estable de secciones ---- */
  const registerSection = useCallback<SectionContextValue["registerSection"]>(
    (id, node) => {
      const nodes = nodesRef.current;
      const previous = nodes.get(id);

      if (previous && previous !== node) {
        observerRef.current?.unobserve(previous);
        nodes.delete(id);
        ratiosRef.current.delete(id);
      }

      if (node) {
        node.dataset.sectionId = id;
        nodes.set(id, node);
        observerRef.current?.observe(node);
      }
    },
    [],
  );

  const value = useMemo<SectionContextValue>(
    () => ({
      activeId,
      active: SECTION_MAP[activeId],
      registerSection,
    }),
    [activeId, registerSection],
  );

  return (
    <SectionContext.Provider value={value}>{children}</SectionContext.Provider>
  );
}

/** Acceso al estado de seccion. Debe usarse dentro de <SectionProvider>. */
export function useSectionState(): SectionContextValue {
  const ctx = useContext(SectionContext);
  if (!ctx) {
    throw new Error("useSectionState debe usarse dentro de <SectionProvider>");
  }
  return ctx;
}
