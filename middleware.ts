import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

/**
 * Detecta el idioma preferido del navegador (`Accept-Language`) en la
 * primera visita y redirige `/` -> `/es` o `/en`; recuerda la elección del
 * usuario (cookie `NEXT_LOCALE`) en visitas siguientes y cuando usa el
 * `LanguageSwitcher`.
 */
export default createMiddleware(routing);

export const config = {
  // Corre en todas las rutas salvo assets estáticos (archivos con extensión,
  // p. ej. /pcb.glb, /ProfilePicture.png, /icon.svg) y las internas de Next.
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
