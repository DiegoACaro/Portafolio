import type { Config } from "tailwindcss";

/**
 * Sistema de diseño del portafolio.
 * - Paleta "pcb": superficies oscuras mate + tono cobre de los trazados.
 * - Paleta "sys": los 4 colores de estado del LED (uno por seccion).
 * Estos tokens se consumen tanto desde clases utilitarias como desde
 * variables CSS declaradas en globals.css.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        pcb: {
          bg: "#0A0D14", // fondo global mate
          deep: "#05070C", // sombras / viñeta
          panel: "#0B0F17", // superficies de tarjetas / modulos SMD
          line: "#1C2740", // bordes sutiles
          trace: "#33496F", // trazados base del circuito
          copper: "#5E7CB8", // trazados "vivos" / iluminados
        },
        sys: {
          nominal: "#00F0FF", // Hero  -> Sistema listo
          core: "#10B981", // About -> Nucleo operativo
          load: "#F59E0B", // Projects -> Carga de trabajo
          tx: "#A855F7", // Contact -> Transmision de datos
        },
      },
      boxShadow: {
        smd: "inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 60px -24px rgba(0,0,0,0.9)",
        "smd-inset": "inset 0 0 0 1px rgba(255,255,255,0.04), inset 0 2px 8px rgba(0,0,0,0.6)",
      },
      keyframes: {
        "led-breathe": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.78" },
        },
        blink: {
          "0%, 45%": { opacity: "1" },
          "50%, 95%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "led-breathe": "led-breathe 3.6s ease-in-out infinite",
        blink: "blink 1.1s step-end infinite",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
