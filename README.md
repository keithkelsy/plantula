# Plántula — Estudio Botánico & Paisajismo

Sitio web de servicios profesionales para **Plántula**, estudio botánico y de paisajismo ubicado en Medellín, Colombia. Diseño de tipo *earthy luxury* — minimalismo orgánico, fotografía como protagonista, tipografía elegante y transiciones suaves.

---

## Tech Stack

| Tecnología | Versión | Uso |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.x | Framework (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Tipado estricto |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x | Estilos utilitarios |
| [Framer Motion](https://www.framer-motion.com/) | 12.x | Animaciones |
| [MapLibre GL](https://maplibre.org/) | 5.x | Mapa interactivo |
| [mapcn](https://www.mapcn.dev/) | — | Componentes de mapa para React |

**Fuentes (Google Fonts via `next/font`):**
- `Cormorant Garamond` — títulos, números, elementos display
- `Outfit` — cuerpo, navegación, labels, botones

---

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fuentes, metadata, LanguageProvider
│   ├── page.tsx            # Composición de secciones
│   └── globals.css         # Reset, scroll suave, selection color
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Navegación fija, scroll-aware, toggle de idioma
│   │   ├── Footer.tsx      # Logo, copyright, iconos sociales
│   │   └── SplashScreen.tsx
│   │
│   ├── sections/
│   │   ├── Hero.tsx        # Pantalla completa, fondo oscuro, CTAs
│   │   ├── About.tsx       # Filosofía, estadísticas con count-up, foto
│   │   ├── Services.tsx    # Lista de servicios con tags
│   │   ├── Portfolio.tsx   # Grilla editorial asimétrica (12 columnas)
│   │   ├── Process.tsx     # 4 pasos con línea conectora
│   │   ├── Testimonials.tsx
│   │   ├── Instagram.tsx   # Grid 6 columnas con overlay hover
│   │   └── Contact.tsx     # Formulario + info + mapa interactivo
│   │
│   └── ui/
│       ├── Button.tsx          # Variantes primary / outline, prop dark
│       ├── SectionLabel.tsx    # Línea + texto uppercase
│       ├── SectionTitle.tsx    # Cormorant Garamond, clamp responsive
│       ├── RevealOnScroll.tsx  # Wrapper Framer Motion con useInView
│       ├── ContactMap.tsx      # Mapa Medellín con marcador botánico
│       └── map.tsx             # Componente base generado por mapcn
│
├── context/
│   └── LanguageContext.tsx # Provider ES/EN, persistencia localStorage
│
└── lib/
    ├── i18n.ts             # Todos los textos ES + EN centralizados
    ├── fonts.ts            # Instancias next/font
    ├── animations.ts       # Variantes Framer Motion reutilizables
    ├── constants.ts        # Datos estáticos legacy
    ├── utils.ts            # cn() helper (clsx + tailwind-merge)
    └── hooks/
        └── useCountUp.ts   # Hook para números animados
```

---

## Paleta de colores

| Token | Hex | Uso |
|---|---|---|
| `cream` | `#F5F0E8` | Botones primarios, fondo acento |
| `cream-light` | `#FAF8F3` | Fondo principal del sitio |
| `green-dark` | `#2C3E2D` | Hero, Contact, Footer — secciones oscuras |
| `green-mid` | `#4A6B4E` | Elementos secundarios, gradientes |
| `green-sage` | `#7A9B7E` | Labels, líneas decorativas |
| `green-light` | `#B8CDB9` | Texto sobre fondos oscuros |
| `green-pale` | `#D4E2D4` | Bordes, separadores, selection |
| `beige` | `#E8DFD0` | Bloque acento en About |
| `text-dark` | `#1A2A1B` | Títulos máximo contraste |
| `text-mid` | `#3A4A3B` | Cuerpo de texto |
| `text-light` | `#6B7B6C` | Captions, labels secundarios |

---

## Internacionalización (i18n)

El sitio soporta **español** (por defecto) e **inglés**, con un toggle `ES · EN` en el navbar.

- Todos los textos están centralizados en `src/lib/i18n.ts`
- El contexto vive en `src/context/LanguageContext.tsx`
- La preferencia se persiste en `localStorage` con la clave `plantula-lang`
- Sin librerías externas — React Context puro
- Para agregar un nuevo texto: añadir la clave en ambas ramas (`es` / `en`) del objeto en `i18n.ts`, luego consumir con `const { t } = useLanguage()`

---

## Mapa interactivo

La sección de contacto incluye un mapa con la ubicación del estudio en Medellín.

- Tiles gratuitos de CARTO — **sin API key requerida**
- Marcador personalizado con el ícono botánico de Plántula
- Tooltip en el idioma activo al hacer hover sobre el marcador
- Cargado de forma dinámica (`next/dynamic`, `ssr: false`) para evitar errores SSR con maplibre-gl

---

## Comandos

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm start
```

---

## Imágenes

Las imágenes del sitio se ubican en `public/images/`:

```
public/
└── images/
    ├── portfolio/
    │   ├── plantula1.jpg   # Muro verde corporativo
    │   ├── plantula2.jpg   # Jardín terraza
    │   ├── plantula3.jpg   # Loft Laureles
    │   ├── plantula4.jpg   # Casa campo
    │   ├── plantula5.jpg   # Instagram post
    │   └── plantula6.jpg   # About / Instagram post
    ├── about/
    │   └── equipo.jpg      # Foto del equipo (sección Nosotros)
    └── instagram/
        ├── post-4.jpg
        ├── post-5.jpg
        └── post-6.jpg
```

Todos los `<Image>` tienen un gradiente verde como fallback si la imagen no existe, por lo que el sitio se ve correcto durante desarrollo aunque no tengas todas las fotos.

---

## Desarrollado por

[KeithKelsy](https://www.linkedin.com/in/keithkelsy/) · © 2026 Plántula
