import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";

/**
 * Envoltorios de `next/link`, `next/navigation` conscientes del locale.
 * `Link` antepone `/es` o `/en` automáticamente; `usePathname` hace lo
 * contrario (devuelve la ruta SIN el prefijo), por lo que el código que ya
 * comparaba `pathname === "/"` sigue funcionando sin cambios.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
