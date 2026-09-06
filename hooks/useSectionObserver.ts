"use client";

import { useCallback } from "react";
import { useSectionState } from "@/context/SectionContext";
import type { SectionId } from "@/lib/sections";

/**
 * Devuelve un `ref callback` para adjuntar a un elemento `<section>`.
 * El nodo queda automaticamente registrado (y desregistrado al desmontar)
 * en el `IntersectionObserver` global del `SectionProvider`.
 *
 * @example
 *   const ref = useSectionObserver("projects");
 *   return <section ref={ref} id="projects">...</section>;
 */
export function useSectionObserver(id: SectionId) {
  const { registerSection } = useSectionState();

  return useCallback(
    (node: HTMLElement | null) => registerSection(id, node),
    [id, registerSection],
  );
}
