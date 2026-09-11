# Portafolio · Software / IA × Mecatrónica

Portafolio profesional híbrido con un **fondo 3D en tiempo real** (React Three
Fiber): una placa PCB con material físico y un LED de 5 mm que flota, cambia de
color según la sección visible e **ilumina las pistas de la placa** con su luz.

| Sección | Color LED | HEX | Estado |
|---|---|---|---|
| Hero / Inicio | Cian eléctrico | `#00F0FF` | Sistema listo |
| Sobre mí | Verde esmeralda | `#10B981` | Núcleo operativo |
| Proyectos | Ámbar / naranja | `#F59E0B` | Carga de trabajo |
| Contacto | Púrpura eléctrico | `#A855F7` | Transmisión de datos |

## Stack

- **Next.js 14** (App Router) · React 18 · TypeScript (estricto)
- **Three.js** · **@react-three/fiber** · **@react-three/drei**
- **Tailwind CSS** · **Framer Motion** (HUD / entradas por scroll)
- **next-intl** — i18n (`/es` / `/en`, detección automática por navegador)

### Dependencias 3D (versiones instaladas)

```bash
npm i three@0.169.0 @react-three/fiber@8.17.10 @react-three/drei@9.114.3
npm i -D @types/three@0.169.0
```

> `@react-three/fiber@8` es la línea compatible con **React 18**. `maath`
> (suavizado) entra como dependencia transitiva de drei; no se importa directo.

## Arranque

```bash
npm install
npm run dev      # http://localhost:3000 -> redirige a /es o /en según el navegador
npm run build && npm run start
```

## Idiomas (i18n)

El sitio vive bajo `/es` y `/en` (`next-intl`). `middleware.ts` detecta el
idioma del navegador (`Accept-Language`) en la primera visita, redirige
`/` -> `/es` o `/en` y recuerda la elección en la cookie `NEXT_LOCALE`
(también se actualiza al usar el `LanguageSwitcher`).

- `i18n/routing.ts` — locales soportados (`es`, `en`) y locale por defecto.
- `i18n/navigation.ts` — `Link` / `usePathname` / `useRouter` locale-aware
  (envuelven `next/link` y `next/navigation`).
- `i18n/request.ts` — resuelve el locale de cada request y carga
  `messages/{locale}.json`.
- `messages/es.json`, `messages/en.json` — todo el copy de la UI, con las
  mismas claves en ambos archivos.
- `lib/projects.ts`, `lib/certifications.ts` — el contenido "de datos"
  (nombre/resumen de cada proyecto, título de cada certificado) es bilingüe
  (`{ es, en }` por campo); los componentes resuelven el idioma con
  `useLocale()`.
- `components/ui/LanguageSwitcher.tsx` — selector ES/EN; cambia solo el
  segmento de locale y conserva ruta, query y `#ancla` actuales.

> Cambiar de idioma remonta la escena 3D (recarga el GLB + fusión de
> geometría), porque `[locale]` es el segmento raíz de la app — es el
> comportamiento esperado de esta arquitectura, no un bug.

## Arquitectura

```
app/[locale]/
  layout.tsx             <html lang={locale}>, NextIntlClientProvider,
                          <SectionProvider> + <Navbar>
  page.tsx                <BackgroundScene/> + <StatusHUD/> + las 4 secciones
  proyectos/page.tsx      <AllProjects/> (todos los proyectos, no solo featured)
app/
  globals.css            tokens, utilidades (.silkscreen, .panel-pcb), reduce-motion
  icon.svg               favicon
middleware.ts             detección de idioma + redirección /es /en

components/3d/
  BackgroundScene.tsx   contenedor fixed inset-0 -z-10 pointer-events-none.
                        dynamic(Scene, { ssr:false }) + fallback CSS + scrim de legibilidad
  Scene.tsx             <Canvas> de R3F: cámara, DPR, tone mapping, luz ambiental
                        y el "puente" contexto -> escena (ver abajo)
  PCBBoard.tsx          plano + meshPhysicalMaterial (map/normal/roughness/metalness)
  LEDModel.tsx          LED de 5 mm (primitivas) + pointLight + spotLight con sombras;
                        interpolación de color y flotación en useFrame
  pcb-textures.ts       generación PROCEDURAL de las 4 texturas (canvas + PRNG + Sobel)

components/
  SideNav.tsx           navegación lateral (refleja la sección activa)
  StatusHUD.tsx         lectura textual del estado (SYS_STATUS) en la esquina
  sections/…            SectionShell + Hero / About / Projects / Contact
context/SectionContext.tsx   IntersectionObserver único -> sección dominante
hooks/useSectionObserver.ts  ref callback para registrar cada <section>
lib/sections.ts              fuente única de verdad (id, color, rgb, status, code)
```

### Conexión scroll ⇄ 3D

El contexto de React **no cruza** el reconciliador de R3F, así que el estado se
lee **fuera** del `<Canvas>` (en `Scene.tsx`) y se inyecta hacia dentro:

1. Cada `<section>` se registra en el `IntersectionObserver` global
   (`SectionShell → useSectionObserver → SectionContext`).
2. `Scene.tsx` lee `useSectionState()` y pasa `active.color` como **prop** →
   `THREE.Color` objetivo; `LEDModel` lo interpola en `useFrame` (suavizado
   exponencial, ~0.8–1 s) sobre el `emissive` del epoxi, el chip, el
   `pointLight` y el `spotLight`. Ese cambio se dispara al **cambiar de
   sección** (IntersectionObserver), no con la posición de scroll.
3. **La cámara es estática** (encuadre fijo por breakpoint). Se probó un
   *dolly* de cámara ligado al scroll y se descartó: al trasladarse la cámara,
   los reflejos especulares de las pistas metálicas y los bordes de la sombra
   suave hacían *aliasing* de frame a frame (shimmer), y el *easing* dejaba a
   la cámara derivando ~1–2 s tras soltar el scroll.
4. `SceneContents` va envuelto en `memo` y las props del `<Canvas>`
   (`camera` / `gl` / `onCreated`) son constantes de módulo: el subárbol 3D y
   el `<Canvas>` **no se reconfiguran en cada frame de scroll**.

### PCB procedural (sin GLTF)

`pcb-textures.ts` enruta un circuito determinista (PRNG *mulberry32*) y lo pinta
en varios `<canvas>`; de ahí salen los 4 mapas del `meshPhysicalMaterial`:

| Mapa | Cómo se genera |
|---|---|
| `map` (albedo) | cobre / pads ENIG / serigrafía / grano FR4 sobre baquelita oscura |
| `normalMap` | heightmap (mismo trazado, en escala de grises) → filtro **Sobel** en JS |
| `roughnessMap` | FR4 rugoso (~0.8) vs cobre (~0.47) vs oro (~0.25) |
| `metalnessMap` | cobre/pads/vías = 1, FR4/silk = 0 |

Todo se calcula **una vez** (`useMemo`, solo cliente) y se libera al desmontar.

## Rendimiento

- `<Canvas>` de fondo: `fixed inset-0 -z-10 pointer-events-none`.
- `dpr={[1, 2]}` **fijo**. Se descartó `AdaptiveDpr` / `PerformanceMonitor`:
  bajo la carga de scroll cambiaban el DPR y ese re-dimensionado del buffer se
  percibía como parpadeo. Para gama baja: la sombra del `spotLight` baja a
  512² en móvil.
- Una sola luz con sombras (el `spotLight` del LED, `shadow="soft"`).
- Entorno procedural (`<Environment frames={1}>` con `<Lightformer>`, en un
  componente `memo`): se renderiza una sola vez, sin descargar ningún HDR.
- `frameloop` pasa a `"never"` cuando la pestaña no está visible.
- Hacer scroll no dispara ningún re-render de React ni toca la cámara: el
  `<Canvas>` queda intacto mientras se scrollea.
- three.js va en un chunk aparte (`dynamic(… , { ssr:false })`): no entra al
  *first load*.

## Accesibilidad y fallback

- Fondo y HUD son decorativos (`aria-hidden` + `pointer-events-none`).
- `prefers-reduced-motion`: se detiene la flotación del LED; el cambio de color
  se mantiene (transición suave).
- Sin WebGL: `Scene` no monta y queda visible el fallback CSS (fondo mate + halo).

## Personalización

- **Colores / estados:** `lib/sections.ts`.
- **Circuito de la PCB:** `generateCircuit()` en `components/3d/pcb-textures.ts`.
- **Encuadre / intensidad de luz:** constantes en `Scene.tsx` y `LEDModel.tsx`.
- **Contenido:** marcadores `Tu Nombre`, `tu.correo@dominio.com`,
  `github.com/tu-usuario` en `components/sections/`.
