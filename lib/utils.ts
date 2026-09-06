/**
 * Une clases condicionalmente sin dependencias externas.
 * (equivalente minimo a `clsx` para el alcance de este proyecto)
 */
export function cn(
  ...parts: Array<string | number | false | null | undefined>
): string {
  return parts.filter(Boolean).join(" ");
}
