/**
 * Estado de la intro (WelcomeScreen). Se guarda en `sessionStorage`:
 * la animacion de bienvenida se ve una vez por pestana/sesion, no en cada
 * navegacion interna.
 */

const KEY = "introPlayed";

export function hasPlayedIntro(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return sessionStorage.getItem(KEY) === "true";
  } catch {
    return true;
  }
}

export function setIntroPlayed(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(KEY, "true");
  } catch {
    /* modo privado / storage bloqueado: la intro simplemente se repetira */
  }
}
