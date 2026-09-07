/**
 * Señal "la escena 3D ya renderizó su primer frame".
 *
 * Pub/sub minimal con latch: `emitSceneReady()` se llama una sola vez desde
 * dentro del <Canvas> (tras la fusión de la PCB + un par de frames), o de
 * inmediato si no hay WebGL. `IntroGate` lo usa para cerrar la pantalla de
 * carga en el momento justo.
 */

let fired = false;
const listeners = new Set<() => void>();

export function emitSceneReady(): void {
  if (fired) return;
  fired = true;
  for (const fn of listeners) fn();
  listeners.clear();
}

/** Ejecuta `cb` cuando la escena esté lista (o ya mismo si lo estaba). */
export function onSceneReady(cb: () => void): () => void {
  if (fired) {
    cb();
    return () => {};
  }
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}
