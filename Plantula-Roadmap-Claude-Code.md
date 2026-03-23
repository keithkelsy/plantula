# 🌿 PLÁNTULA — Hoja de Ruta para Claude Code

## Sitio Web con Next.js | Estudio Botánico & Paisajismo

---

## Referencia de Inspiración

**Sitio de referencia:** [soilboy.sg](https://www.soilboy.sg/)

**¿Qué tomamos de Soilboy?**

Soilboy es un estudio botánico en Singapur con un sitio web estilo Squarespace. Su estética se caracteriza por: fondos claros tipo crema/off-white, fotografía de producto inmersiva con mucho espacio negativo, tipografía minimalista y elegante, navegación ultra-limpia con mucho aire, transiciones suaves y sutiles, layout de producto en grid limpio, y una sensación general de calma y sofisticación orgánica.

**¿Qué NO copiamos?**

No copiamos la estructura de e-commerce (Plántula es un estudio de servicios, no una tienda), ni los colores exactos (usamos nuestra paleta verde-crema propia), ni la tipografía de Soilboy. En su lugar usamos Cormorant Garamond + Outfit que ya fueron seleccionadas.

**Lo que adaptamos para Plántula:**

- El uso generoso de whitespace y composición limpia
- La atmósfera "earthy luxury" — cálida pero sofisticada
- Las transiciones y hover effects sutiles (no llamativos)
- La navegación minimalista con logo a la izquierda + links a la derecha
- Fotografía como protagonista con overlays mínimos
- Secciones con breathing room entre ellas
- El estilo editorial en la presentación de proyectos

---

## Sistema de Diseño

### Tipografía

| Fuente | Uso | Pesos | Import |
|--------|-----|-------|--------|
| **Cormorant Garamond** | Títulos, números destacados, elementos decorativos | 300, 400, 500, 600, 700 (con itálica) | `next/font/google` |
| **Outfit** | Cuerpo, UI, labels, navegación, botones | 200, 300, 400, 500, 600 | `next/font/google` |

### Paleta de Colores

| Nombre | HEX | Uso |
|--------|-----|-----|
| cream | `#F5F0E8` | Fondo principal |
| cream-light | `#FAF8F3` | Fondo alternativo |
| green-dark | `#2C3E2D` | Color primario, fondos oscuros, nav scrolled |
| green-mid | `#4A6B4E` | Acentos, énfasis en itálicas |
| green-sage | `#7A9B7E` | Elementos decorativos, líneas |
| green-light | `#B8CDB9` | Texto sobre fondos oscuros |
| green-pale | `#D4E2D4` | Bordes, separadores |
| beige | `#E8DFD0` | Acentos cálidos |
| text-dark | `#1A2A1B` | Títulos sobre fondo claro |
| text-mid | `#3A4A3B` | Cuerpo de texto |
| text-light | `#6B7B6C` | Labels, texto secundario |

---

## Fase 0: Preparación

**Antes de abrir Claude Code, tené listo:**

- Node.js 18+ instalado
- Claude Code instalado (`npm install -g @anthropic-ai/claude-code`)
- El logo de Plántula en PNG (el circular con las hojas)
- Fotos de tus proyectos en alta resolución (mínimo 8-10 fotos)
- Screenshots o fotos de Instagram para la sección de feed

**En terminal:**

```
mkdir plantula-web && cd plantula-web
mkdir -p public/images/portfolio public/images/instagram public/images/about public/images/logo
# Copiá tu logo a public/images/logo/plantula-logo.png
# Copiá fotos de proyectos a public/images/portfolio/
# Copiá fotos cuadradas de IG a public/images/instagram/
claude
```

> 💡 **TIP:** Nombrá las fotos descriptivamente: `jardin-terraza-poblado.jpg`, `muro-verde-oficina.jpg`. Esto ayuda al SEO y a Claude Code a entender qué foto va dónde.

---

## Fase 1: Scaffolding del Proyecto

### PROMPT 1 — Inicializar proyecto

```
Crea un proyecto Next.js 14 con App Router para un estudio botánico y de paisajismo
llamado "Plántula". Es un sitio web de servicios profesionales (NO e-commerce).

REFERENCIA DE DISEÑO:
Nos inspiramos en el estilo de soilboy.sg — minimalismo orgánico, mucho whitespace,
tipografía elegante, fondos claros con secciones oscuras de contraste, fotografía
como protagonista, transiciones suaves y sutiles. La sensación general debe ser
"earthy luxury" — cálida y sofisticada, como un estudio de arquitectura verde.

TECH STACK:
- Next.js 14 con App Router y src/ directory
- TypeScript estricto
- Tailwind CSS v3
- Framer Motion para animaciones
- next/font con Google Fonts:
  • "Cormorant Garamond" (serif) — para títulos, números, elementos display
  • "Outfit" (sans-serif) — para cuerpo, navegación, labels, botones

PALETA DE COLORES (configurar en tailwind.config.ts como extend.colors):
cream: '#F5F0E8',
'cream-light': '#FAF8F3',
'green-dark': '#2C3E2D',
'green-mid': '#4A6B4E',
'green-sage': '#7A9B7E',
'green-light': '#B8CDB9',
'green-pale': '#D4E2D4',
beige: '#E8DFD0',
'text-dark': '#1A2A1B',
'text-mid': '#3A4A3B',
'text-light': '#6B7B6C',

ESTRUCTURA:
src/
  app/
    layout.tsx (configurar ambas fuentes con next/font, metadata base, body con className
                de Outfit como default + variable CSS de Cormorant para títulos)
    page.tsx (composición de todas las secciones en orden)
    globals.css (reset base, scroll-behavior smooth, selection color verde)
  components/
    layout/Navbar.tsx
    layout/Footer.tsx
    sections/Hero.tsx
    sections/About.tsx
    sections/Services.tsx
    sections/Portfolio.tsx
    sections/Process.tsx
    sections/Testimonials.tsx
    sections/Instagram.tsx
    sections/Contact.tsx
    ui/Button.tsx
    ui/SectionLabel.tsx
    ui/SectionTitle.tsx
    ui/RevealOnScroll.tsx
  lib/
    constants.ts (datos de servicios, testimonios, proyectos, info de contacto)
    animations.ts (variantes de Framer Motion reutilizables: fadeInUp, staggerContainer, etc.)
    fonts.ts (exportar las instancias de ambas fuentes)

IMPORTANTE:
- En globals.css agregar: ::selection con background green-pale y color green-dark
- El body debe tener bg-cream-light y text-text-mid por default
- NO implementes las secciones todavía — solo componentes placeholder que rendericen
  un div con el nombre de la sección, padding y border para verificar layout
- Asegurate de que ambas fuentes se cargan correctamente
```

**Después de que termine, validá:**

```
Ejecuta npm run dev y verifica que compile sin errores. Verifica en el browser que
las dos fuentes (Cormorant Garamond y Outfit) se cargan correctamente.
```

---

## Fase 2: Componentes UI + Navbar

### PROMPT 2 — Componentes UI base

```
Crea los componentes UI reutilizables. Estos son el sistema de diseño base del sitio.
Recordá: la estética es minimalismo orgánico inspirado en soilboy.sg — nada recargado,
todo con aire y elegancia.

1. Button.tsx:
   - Variante "primary": bg-cream text-green-dark, px-8 py-4, font-family Outfit,
     text-xs uppercase tracking-[0.15em] font-medium, hover: translateY(-2px) + shadow-lg,
     transition duration-400
   - Variante "outline": border border-current, bg-transparent, mismos estilos tipográficos,
     hover: bg con 8% opacity del color actual
   - Prop "dark" para invertir colores cuando está sobre fondo oscuro
   - Debe aceptar "as" prop para renderizar como <a> o <button>

2. SectionLabel.tsx:
   - Línea horizontal de 30px (h-px bg-green-sage) + texto
   - Texto en Outfit, text-[0.7rem] font-medium uppercase tracking-[0.3em] text-green-mid
   - Prop "centered" que pone línea a ambos lados del texto
   - Prop "light" para versión sobre fondo oscuro (text-green-light, línea green-light)

3. SectionTitle.tsx:
   - Usa Cormorant Garamond, font-light (300)
   - Tamaño: text-[clamp(2.2rem,4vw,3.8rem)]
   - Color text-green-dark (prop "light" para text-cream)
   - Acepta children con <em> que se renderiza en text-green-mid italic
   - line-height 1.15, tracking tight

4. RevealOnScroll.tsx:
   - Wrapper con Framer Motion
   - useInView hook con threshold 0.15 y once: true
   - Animación: opacity 0→1, translateY 40px→0, duration 0.8s, ease [0.4, 0, 0.2, 1]
   - Props: delay (default 0), direction ("up" | "left" | "right"), className
   - Debe ser client component ("use client")
```

### PROMPT 3 — Navbar

```
Crea el Navbar.tsx inspirado en el estilo de soilboy.sg — navegación ultra-limpia,
minimalista, con mucho aire.

COMPORTAMIENTO:
- Position fixed, z-50, full width
- Estado inicial (sobre hero): fondo transparente, textos en white/cream
- Al scroll (>80px): fondo cream/95 con backdrop-blur-xl, textos cambian a green-dark,
  sombra sutil shadow-[0_1px_30px_rgba(44,62,45,0.06)], padding se reduce ligeramente
- IMPORTANTE: usar useState + useEffect para el scroll, con estado inicial que coincida
  con el servidor para evitar hydration mismatch. El estado "scrolled" solo se activa
  en useEffect.

CONTENIDO DESKTOP:
- Izquierda: Logo SVG simplificado (círculo con 2 hojas, estilo line-art) + texto
  "PLÁNTULA" en Cormorant Garamond, tracking-[0.25em], uppercase, text-lg
- Centro/Derecha: Links en Outfit — "Nosotros", "Servicios", "Proyectos", "Proceso"
  text-[0.82rem] uppercase tracking-[0.15em] font-normal
  Cada link con ::after pseudo-element que crece de width 0 a 100% al hover (1px de alto)
- Extremo derecho: Botón "Contacto" con borde, estilo outline

MOBILE (< 768px):
- Hamburguesa: 3 líneas de 28px width, 1.5px de alto, gap-[5px]
- Al abrir: overlay fullscreen con fondo green-dark/97, backdrop-blur
- Links centrados, Cormorant Garamond text-3xl, entran con stagger animation
- Botón de cierre (X) arriba a la derecha
- Usar AnimatePresence de Framer Motion para la transición

Smooth scroll: todos los links hacen scroll suave a las secciones por ID.
```

> 💡 **TIP:** Si Claude Code genera error de hydration en el Navbar, mandá esto: `El Navbar tiene hydration mismatch. Hacé que el estado inicial de "scrolled" sea false tanto en servidor como en cliente, y solo actualizalo dentro de useEffect. No uses window.scrollY fuera de useEffect.`

---

## Fase 3: Hero

### PROMPT 4 — Hero Section

```
Crea Hero.tsx. Esta es la sección más importante — debe capturar la esencia de Plántula.
Inspiración en la sensación de soilboy.sg: calma, sofisticación, naturaleza.
Pero nuestro hero es más dramático porque usamos un fondo oscuro (green-dark).

FONDO:
- Color base bg-green-dark (#2C3E2D)
- Encima: 2-3 gradientes radiales superpuestos con green-mid y green-accent
  (rgba(74,107,78,0.4) en 20% 80%, rgba(61,94,63,0.3) en 80% 20%) para crear profundidad
- Capa de grain/noise: un div absolute con background SVG inline usando feTurbulence,
  baseFrequency 0.85, opacity 3-4%
- Elementos decorativos: 2 SVGs de líneas botánicas (tallos con hojas estilizadas)
  posicionados absolute, uno arriba-derecha y otro abajo-izquierda, opacity 5-6%

CONTENIDO (centrado vertical y horizontal, max-w-[900px]):
- Badge: inline-flex con border rounded-full, padding px-6 py-2, text-green-light,
  Outfit text-[0.72rem] tracking-[0.3em] uppercase. Texto: "Estudio Botánico & Paisajismo"
  Con un dot animado (6px, pulse) a la izquierda
- Título h1: Cormorant Garamond font-light, text-cream
  Tamaño: text-[clamp(3rem,7vw,6.5rem)] leading-[1.05]
  Texto: "Diseñamos espacios que respiran vida"
  "respiran vida" en <em> con text-green-light italic
- Subtítulo: Outfit text-[1.05rem] font-light text-green-light, max-w-[550px] mx-auto
  leading-relaxed, tracking-wide
  Texto: "Transformamos entornos a través del diseño botánico, el paisajismo
  consciente y el poder de conectar personas con la naturaleza."
- Botones: flex gap-3, centrados
  "Agenda tu consulta" (primary, versión dark)
  "Ver proyectos" (outline, versión dark)

ANIMACIONES (Framer Motion):
- Cada elemento con fadeInUp escalonado: badge 0.5s, título 0.7s, subtítulo 0.9s,
  botones 1.1s
- delay de inicio: esperar 0.3s después del mount

SCROLL INDICATOR (absolute bottom-12, centrado):
- Línea vertical de 50px que se anima (scaleY 0→1→0 en loop de 2s)
- Texto "Scroll" debajo, Outfit text-[0.65rem] tracking-[0.3em] uppercase text-green-light
- Entra con fadeInUp delay 1.3s

SIZING: min-h-screen, flex items-center justify-center, overflow-hidden
```

> 💡 **TIP:** Si el hero se ve plano: `Agregá más profundidad al fondo del hero. Probá agregar un cuarto gradiente más concentrado en el centro, y hacé que los SVGs decorativos tengan una animación sutil de floating (translateY ±10px en un loop de 6s).`

---

## Fase 4: About + Process + Testimonials

### PROMPT 5 — About

```
Crea About.tsx. Estilo: mucho aire entre elementos, composición asimétrica como
una página de revista de diseño. Inspirado en cómo soilboy.sg presenta su marca —
con elegancia y sin saturar.

LAYOUT: CSS Grid 2 columnas (lg:grid-cols-2) gap-24 items-center. Max-w-[1300px] mx-auto.
Padding: py-32 px-6 (lg:px-12). En mobile se apilan.

COLUMNA IZQUIERDA (max-w-[520px]):
- SectionLabel: "Nuestra Filosofía"
- SectionTitle: "La naturaleza como <em>lenguaje de diseño</em>"
- Párrafo 1 (mt-8): "En Plántula creemos que cada espacio tiene el potencial de contar
  una historia a través de las plantas. Nuestro enfoque fusiona el conocimiento botánico
  con la sensibilidad estética para crear ambientes que inspiran, sanan y transforman."
  Outfit text-base font-light text-text-mid leading-[1.85]
- Párrafo 2 (mt-4): "Desde jardines residenciales hasta instalaciones corporativas,
  cada proyecto es una oportunidad para reconectar personas con el mundo natural."
- Estadísticas (mt-14, pt-12, border-t border-green-pale):
  Grid de 3 columnas con:
  • "150+" / "Proyectos"
  • "8" / "Años"
  • "200+" / "Especies"
  Números: Cormorant Garamond text-[2.8rem] font-light text-green-dark
  Labels: Outfit text-[0.72rem] uppercase tracking-widest text-text-light mt-1

COLUMNA DERECHA (relative, h-[600px] en desktop):
- Bloque principal: absolute top-0 right-0, w-[85%] h-[75%]
  Background con next/image (src="/images/about/equipo.jpg") fill objectFit cover
  Si no hay imagen todavía, usar gradiente green-sage→green-mid como placeholder
- Bloque acento: absolute bottom-0 left-0, w-[50%] h-[45%]
  bg-beige, flex items-center justify-center, shadow-[0_20px_60px_rgba(44,62,45,0.08)]
  Dentro: Logo SVG de Plántula (el del nav) a escala grande, opacity 30%

ANIMACIONES: Todos los elementos con RevealOnScroll. Las estadísticas con delay
escalonado (0, 0.15, 0.3).
```

### PROMPT 6 — Process

```
Crea Process.tsx. Estilo limpio y centrado — un respiro visual entre secciones más
complejas.

FONDO: bg-cream
PADDING: py-32 px-6

HEADER (text-center):
- SectionLabel centered: "Nuestro Proceso"
- SectionTitle: "De la idea al <em>jardín perfecto</em>"

4 PASOS (mt-20, grid grid-cols-4, en mobile grid-cols-1, gap en mobile 3rem):
Cada paso centrado:
1. "Consulta Inicial" — "Escuchamos tu visión, analizamos el espacio y entendemos
   tus necesidades para crear una propuesta personalizada."
2. "Diseño Conceptual" — "Desarrollamos planos, selección de especies y paleta
   vegetal alineados con tu estilo y las condiciones del entorno."
3. "Ejecución" — "Nuestro equipo implementa el diseño con atención meticulosa
   al detalle y respeto por cada planta y material."
4. "Seguimiento" — "Acompañamos el crecimiento de tu espacio con planes de
   mantenimiento y asesoría continua."

CADA PASO:
- Círculo (w-20 h-20, rounded-full, border border-green-pale, bg-cream, relative z-10):
  Número en Cormorant Garamond text-[1.8rem] font-light text-green-mid, centrado
  Hover: bg-green-dark text-cream border-green-dark, transition 0.4s
- Título (mt-8): Cormorant Garamond text-[1.3rem] font-medium text-green-dark
- Descripción: Outfit text-[0.88rem] font-light text-text-light leading-relaxed

LÍNEA CONECTORA (solo desktop): pseudo-element absolute top-[40px] left-[10%]
right-[10%] h-px con gradiente linear (transparent → green-sage → transparent).
Hidden en mobile.

RevealOnScroll en cada paso con delay escalonado.
```

### PROMPT 7 — Testimonials

```
Crea Testimonials.tsx. Tres tarjetas simples y elegantes.

FONDO: bg-cream-light
PADDING: py-32 px-6

HEADER centrado:
- SectionLabel centered: "Testimonios"
- SectionTitle: "Lo que dicen nuestros <em>clientes</em>"

GRID (mt-16): grid-cols-3 (1 en mobile), gap-8. Max-w-[1300px] mx-auto.

CADA TARJETA:
- p-12, bg-white, border border-green-pale
- Hover: border-green-sage, shadow-[0_20px_60px_rgba(44,62,45,0.06)], transition 0.5s
- Comilla decorativa: Cormorant Garamond text-[3rem] text-green-pale leading-none, mb-4
- Texto testimonio: Outfit text-[0.95rem] font-light text-text-mid leading-[1.8] italic
- Separador: mt-8 pt-6 border-t border-green-pale
- Nombre: Outfit font-medium text-[0.9rem] text-green-dark
- Rol: Outfit text-[0.75rem] text-text-light tracking-widest uppercase mt-1

DATOS:
1. "Plántula transformó nuestro balcón en un verdadero oasis. Cada planta fue elegida
   con un propósito y el resultado superó todas nuestras expectativas."
   — Carolina Mejía | Proyecto Residencial — El Poblado
2. "El muro verde que instalaron en nuestra oficina no solo es hermoso, sino que cambió
   completamente la energía del espacio. El equipo trabaja increíble."
   — Andrés Restrepo | Director Creativo — Estudio Nómada
3. "Su conocimiento botánico es impresionante. Nos guiaron desde la selección de cada
   especie hasta el mantenimiento. Profesionalismo de principio a fin."
   — Valentina Osorio | Arquitecta — Espacio Abierto

RevealOnScroll con delay escalonado en cada tarjeta.
```

---

## Fase 5: Services + Portfolio

### PROMPT 8 — Services

```
Crea Services.tsx. Esta sección tiene fondo oscuro para crear contraste dramático,
como las secciones oscuras que intercala soilboy.sg.

FONDO: bg-green-dark. Textos en cream/green-light.
PADDING: py-32 px-6. Overflow hidden.

HEADER (max-w-[1300px] mx-auto, flex justify-between items-end, mb-20):
- Izquierda:
  SectionLabel light: "Servicios"
  SectionTitle light: "Soluciones verdes para cada <em>necesidad</em>"
- Derecha (max-w-[400px]):
  Outfit text-base font-light text-green-light leading-relaxed
  "Ofrecemos un abanico completo de servicios botánicos y de paisajismo
  adaptados a tu visión."

GRID (max-w-[1300px] mx-auto):
grid-cols-3 (2 en tablet, 1 en mobile), gap-px, bg-green-sage/15
(el gap-px + background simula líneas separadoras de 1px)

6 TARJETAS:
Cada una: p-14 (px-10), bg-green-dark, relative, cursor-default
- Número (absolute top-10 right-10): Cormorant Garamond text-[0.9rem]
  text-green-light/25 font-light — "01" a "06"
- Ícono (mb-8): SVG 48x48, stroke-only (stroke-width 1.2, stroke-linecap round),
  color green-light. CREAR ÍCONOS CUSTOM:
  01: Planta con tallo y hojas (Diseño de Jardines)
  02: Grilla/plano con elemento orgánico (Paisajismo Integral)
  03: Arcos verticales con plantas (Cuadros Vivos)
  04: Sol con planta debajo (Plantas de Interior)
  05: Casa/edificio con hoja (Ambientación Corporativa)
  06: Gota de agua (Mantenimiento)
- Título: Cormorant Garamond text-[1.6rem] font-normal text-cream mb-4
- Descripción: Outfit text-[0.9rem] font-light text-green-light leading-relaxed
- Hover: pseudo-element ::before absolute inset-0 bg-green-sage/5, transition opacity 0.5s

DATOS DE SERVICIOS (definir en lib/constants.ts):
1. Diseño de Jardines — Creamos jardines únicos que reflejan tu personalidad,
   optimizando el espacio y seleccionando las especies perfectas para tu entorno.
2. Paisajismo Integral — Desde la planificación hasta la ejecución, diseñamos
   paisajes completos que integran vegetación, textura y funcionalidad.
3. Cuadros Vivos — Instalaciones verticales de plantas vivas que transforman muros
   en obras de arte botánicas llenas de vida y color.
4. Plantas de Interior — Asesoría experta en selección y cuidado de plantas para
   interiores, creando ambientes saludables y estéticamente armónicos.
5. Ambientación Corporativa — Diseñamos espacios verdes para oficinas y comercios
   que mejoran la productividad y bienestar de las personas.
6. Mantenimiento — Servicio continuo de cuidado y mantenimiento para que tus
   espacios verdes luzcan siempre en su mejor versión.
```

### PROMPT 9 — Portfolio

```
Crea Portfolio.tsx. Grilla asimétrica estilo editorial, inspirada en cómo soilboy.sg
presenta sus productos — con fotos grandes y mucho impacto visual.

FONDO: bg-cream-light
PADDING: py-32 px-6

HEADER (max-w-[1400px] mx-auto, mb-16):
- SectionLabel: "Proyectos"
- SectionTitle: "Espacios que <em>cobran vida</em>"

GRILLA (max-w-[1400px] mx-auto):
CSS Grid con grid-cols-12, gap-6:
- Item 1: col-span-7, row 1, aspect-[16/10] — proyecto grande horizontal
- Item 2: col-span-5, row 1, aspect-square — cuadrado
- Item 3: col-span-4, row 2, aspect-square — cuadrado
- Item 4: col-span-8, row 2, aspect-[16/10] — grande horizontal

En tablet: grid-cols-2, todos aspect-[16/10]
En mobile: grid-cols-1, todos aspect-[16/10]

CADA ITEM:
- relative overflow-hidden, group cursor-pointer
- Background: div absolute inset-0 con next/image (fill, objectFit cover)
  Si no hay imagen todavía, usar gradiente verde como placeholder
  group-hover: scale-105, transition duration-700 ease-out
- Overlay (absolute inset-0): gradiente from-[rgba(26,42,27,0.85)] from-0% to-transparent to-60%
  opacity-0, group-hover:opacity-100, transition 0.5s
  Flex flex-col justify-end, p-10
  - Tag: Outfit text-[0.65rem] uppercase tracking-[0.25em] text-green-light mb-2
  - Título: Cormorant Garamond text-[1.5rem] font-normal text-cream

4 PROYECTOS (definir en constants.ts):
1. "Jardín Terraza El Poblado" — Paisajismo Residencial — /images/portfolio/jardin-terraza.jpg
2. "Muro Verde Corporativo" — Cuadro Vivo — /images/portfolio/muro-verde.jpg
3. "Loft Laureles" — Interiorismo Botánico — /images/portfolio/loft-laureles.jpg
4. "Proyecto Casa Campo" — Diseño de Jardines — /images/portfolio/casa-campo.jpg

RevealOnScroll con delay escalonado en cada item.
```

---

## Fase 6: Instagram + Contacto + Footer

### PROMPT 10 — Instagram

```
Crea Instagram.tsx. Sección que conecta con el feed de IG, estilo grid limpio
como soilboy.sg muestra sus productos.

FONDO: bg-cream
PADDING: py-32 px-6, text-center

HEADER:
- SectionLabel centered: "Instagram"
- SectionTitle: "Síguenos en <em>@plantula___</em>"

GRILLA (mt-12, max-w-[1400px] mx-auto):
grid-cols-6 (3 en tablet, 2 en mobile), gap-1

6 ITEMS: aspect-square cada uno, relative overflow-hidden
- Background: next/image con foto cuadrada (si no hay, gradiente placeholder)
  group-hover: scale-108, transition 0.6s
- Overlay hover: bg-green-dark/60, flex items-center justify-center
  Ícono SVG de Instagram (24x24, stroke white), opacity 0 → 1

BOTÓN (mt-12): Link a https://www.instagram.com/plantula___/
Estilo outline: border border-green-dark, px-10 py-4
Outfit text-[0.8rem] uppercase tracking-[0.15em] text-green-dark
Ícono IG SVG inline (16x16) + texto "@plantula___"
Hover: bg-green-dark text-cream
target="_blank" rel="noopener noreferrer"
```

### PROMPT 11 — Contact

```
Crea Contact.tsx. Sección CTA con fondo oscuro, simétrica con el hero.

FONDO: bg-green-dark, relative overflow-hidden
Gradientes radiales decorativos (como el hero pero más sutiles)
PADDING: py-32 px-6, text-center

CONTENIDO (relative z-10, max-w-[700px] mx-auto):
- SectionLabel centered light: "Contacto"
- Título: Cormorant Garamond font-light text-cream
  text-[clamp(2.5rem,5vw,4rem)] leading-[1.15]
  "¿Listo para transformar tu <em>espacio</em>?"
  (<em> en text-green-light)
- Subtítulo (mt-6): Outfit text-base font-light text-green-light leading-relaxed
  "Cuéntanos sobre tu proyecto y te ayudaremos a hacerlo realidad.
  La primera consulta es sin compromiso."

FORMULARIO (mt-12, max-w-[500px] mx-auto):
flex (en mobile flex-col):
- Input: flex-1, px-6 py-[1.1rem], bg-cream/8, border border-green-light/20,
  border-r-0 (en mobile border-r y sin border-b),
  text-cream, Outfit text-[0.9rem] font-light
  Placeholder: "Tu correo electrónico" en green-light/40
  Focus: border-green-sage, outline-none
- Botón: px-8, bg-cream text-green-dark, Outfit text-[0.78rem] font-medium
  uppercase tracking-[0.15em]. Hover: bg-white

INFO CONTACTO (mt-16, flex justify-center gap-16, flex-wrap):
3 items centrados:
- "Teléfono" → +57 300 123 4567 (con link tel:)
- "Email" → hola@plantula.co (con link mailto:)
- "Ubicación" → Medellín, Colombia
Label: Outfit text-[0.65rem] font-medium tracking-[0.25em] uppercase text-green-sage mb-2
Valor: Cormorant Garamond text-[1.15rem] text-cream

RevealOnScroll en todo el contenido.
```

### PROMPT 12 — Footer

```
Crea Footer.tsx. Simple y elegante, como soilboy.sg.

FONDO: bg-green-dark, border-t border-green-sage/12
PADDING: py-12 px-6 (lg:px-12)

LAYOUT (max-w-[1300px] mx-auto, flex justify-between items-center,
en mobile flex-col gap-6 text-center):

IZQUIERDA:
- Flex items-center gap-3:
  Logo SVG (30x30, misma versión del nav en colores green-light/30)
  + "Plántula" en Cormorant Garamond text-[1.1rem] text-cream tracking-[0.2em] uppercase
- Debajo: "© 2026 Plántula. Todos los derechos reservados."
  Outfit text-[0.75rem] text-green-sage font-light

DERECHA:
- Flex gap-6: 3 iconos sociales
  Cada uno: w-10 h-10 rounded-full border border-green-sage/20
  flex items-center justify-center
  Hover: bg-green-sage/10 border-green-sage
  Íconos SVG 16x16 stroke green-light:
  • Instagram (link a https://www.instagram.com/plantula___/)
  • WhatsApp (link a #)
  • Facebook (link a #)
  Todos target="_blank"
```

---

## Fase 7: Animaciones y Pulido

### PROMPT 13 — Animaciones globales

```
Revisa y mejora las animaciones de todo el sitio. El estilo de animación debe ser
como soilboy.sg: sutil, suave, nunca llamativo. La elegancia está en la moderación.

VERIFICAR/AGREGAR:

1. SCROLL REVEAL: Todas las secciones y elementos internos deben usar RevealOnScroll.
   Elementos en grids con delay escalonado (0.15s entre cada uno).
   Asegurate de que no hay elementos que aparezcan sin animación.

2. NAVBAR: La transición entre transparente y sólido debe ser smooth (0.5s ease).
   En mobile, el menú debe usar AnimatePresence con fade + slide.

3. HOVER STATES (todos con transition duration-400 o 500):
   - Botones: translateY(-2px) + shadow
   - Tarjetas servicio: overlay sutil más claro
   - Portfolio: imagen scale-105 + overlay con info
   - Nav links: underline que crece left→right
   - Testimonial cards: borde cambia + sombra
   - Instagram items: scale + overlay con ícono
   - Iconos sociales footer: fondo + borde

4. ESTADÍSTICAS COUNTER: Los números en About deben contar desde 0 al valor final
   al entrar en viewport. Usar un hook custom useCountUp con duration 2s y
   easing ease-out. Solo contar una vez.

5. NO agregar parallax (queda pesado). NO agregar cursor custom.
   La clave es que todo se sienta natural y no forzado.

6. Verificá que no haya jank o stuttering en las animaciones.
   Usa will-change: transform solo donde sea necesario.
   Preferí CSS transitions sobre Framer Motion para hovers simples.
```

---

## Fase 8: SEO + Performance

### PROMPT 14 — SEO y Metadata

```
Optimiza el sitio para SEO y performance:

1. METADATA (layout.tsx):
   title: "Plántula | Estudio Botánico & Paisajismo en Medellín"
   description: "Diseño de jardines, paisajismo, cuadros vivos y ambientación
   botánica. Transformamos espacios con plantas en Medellín, Colombia."
   Open Graph completo (title, description, image, url, type, locale: "es_CO")
   Twitter card: summary_large_image

2. HTML SEMÁNTICO:
   - <header> para nav, <main> para contenido, <footer> para footer
   - Cada sección con <section id="xxx">
   - Un solo <h1> en el hero, <h2> en cada sección, <h3> para subtítulos
   - Todas las imágenes con alt descriptivo en español

3. PERFORMANCE:
   - Todas las imágenes con next/image, sizes prop correcto, formato auto webp/avif
   - Hero images con priority={true}
   - Fonts con display: "swap" y preload
   - Componentes pesados (si los hay) con dynamic import

4. ARCHIVOS:
   - robots.txt básico (allow all)
   - sitemap.xml estático
   - Schema JSON-LD para LocalBusiness:
     name: "Plántula", type: "LocalBusiness",
     address: Medellín, Colombia
     url, telephone, email, description en español

5. Verificar que npm run build pase sin errores ni warnings.
```

---

## Fase 9: Deploy

### PROMPT 15 — Pre-deploy

```
Prepara para deploy en Vercel:
1. npm run build sin errores
2. Revisa responsive: 320px, 375px, 768px, 1024px, 1440px
3. Elimina console.log en producción
4. Verifica todos los links (smooth scroll + externos)
5. Configura next.config.ts: images domains si es necesario
6. Crea .env.example si hay variables de entorno
```

**Después, fuera de Claude Code:**

1. Subí el proyecto a GitHub
2. Andá a vercel.com → Import → seleccioná el repo
3. Vercel detecta Next.js automáticamente
4. Click Deploy
5. Configurá dominio custom en Settings > Domains

---

## Prompts de Emergencia

**Hydration error:**
```
Hay un error de hydration mismatch en [componente]. Revisá que no estés usando
window, document, o estados del browser en el render inicial. Usá useEffect
para todo lo client-side. El estado inicial del server debe coincidir con el del cliente.
```

**Tailwind custom colors no funcionan:**
```
Los colores custom no funcionan. Verificá que tailwind.config.ts tenga los colores
en theme.extend.colors (no theme.colors que sobreescribe los defaults).
Hacé rm -rf .next && npm run dev para limpiar cache.
```

**Imágenes no cargan:**
```
Las imágenes con next/image no cargan. Verificá que las rutas sean relativas a
/public (sin incluir /public en el path). Ejemplo: src="/images/portfolio/foto.jpg"
no src="/public/images/portfolio/foto.jpg".
```

**Performance lenta:**
```
El sitio está lento. Reducí animaciones de Framer Motion, verificá que las imágenes
usen next/image con sizes correcto, mové componentes pesados a dynamic imports
con { ssr: false }, y eliminá re-renders innecesarios.
```

**Responsive roto:**
```
El responsive está roto en mobile. Revisá en 320px, 375px, 768px, 1024px.
Asegurate de que ningún contenedor tenga width fijo. Usá clamp() para fonts.
Verificá que grids cambien a 1 columna en mobile.
```

---

*🌿 Hecho con cariño para Plántula — Medellín, Colombia*
