// ─── i18n — Plántula ─────────────────────────────────────────────────────────
// Single source of truth for all UI copy in both languages.
// Add new keys here and consume them via useLanguage() + t[lang].

export type Lang = "es" | "en";

// ─────────────────────────────────────────────────────────────────────────────

const translations = {
  es: {
    // ── Navbar ────────────────────────────────────────────────────────────────
    nav: {
      links: [
        { label: "Nosotros",  href: "#nosotros"  },
        { label: "Servicios", href: "#servicios" },
        { label: "Proyectos", href: "#proyectos" },
        { label: "Proceso",   href: "#proceso"   },
      ],
      contact: "Contacto",
      tagline: "Estudio botánico · Colombia",
    },

    // ── Hero ──────────────────────────────────────────────────────────────────
    hero: {
      badge:  "Estudio Botánico & Paisajismo",
      h1:     "Diseñamos espacios que",
      h1em:   "respiran vida",
      sub:    "Transformamos entornos a través del diseño botánico, el paisajismo consciente y el poder de conectar personas con la naturaleza.",
      cta1:   "Agenda tu consulta",
      cta2:   "Ver proyectos",
      scroll: "Scroll",
    },

    // ── About ─────────────────────────────────────────────────────────────────
    about: {
      label:   "Nuestra Filosofía",
      title:   "La naturaleza como",
      titleEm: "lenguaje de diseño",
      p1: "En Plántula creemos que cada espacio tiene el potencial de contar una historia a través de las plantas. Nuestro enfoque fusiona el conocimiento botánico con la sensibilidad estética para crear ambientes que inspiran, sanan y transforman.",
      p2: "Desde jardines residenciales hasta instalaciones corporativas, cada proyecto es una oportunidad para reconectar personas con el mundo natural.",
      stats: [
        { end: 150, suffix: "+", label: "Proyectos" },
        { end: 8,   suffix: "",  label: "Años"      },
        { end: 200, suffix: "+", label: "Especies"  },
      ],
      imgAlt: "Equipo de Plántula en proyecto de paisajismo",
    },

    // ── Services ──────────────────────────────────────────────────────────────
    services: {
      label:   "Servicios",
      title:   "Lo que",
      titleEm: "hacemos",
      sub:     "Cada proyecto es único. Adaptamos nuestro proceso a las condiciones del espacio, el entorno y la visión de cada cliente.",
      items: [
        {
          id:          "diseno-paisajistico",
          number:      "01",
          title:       "Diseño Paisajístico",
          description: "Creamos espacios exteriores que dialogan con el entorno natural, integrando plantas nativas y composiciones visuales de alto impacto.",
          tags:        ["Residencial", "Comercial", "Corporativo"],
        },
        {
          id:          "jardines-interiores",
          number:      "02",
          title:       "Jardines Interiores",
          description: "Llevamos la naturaleza adentro. Diseñamos jardines verticales, terrariums y composiciones botánicas para interiores.",
          tags:        ["Oficinas", "Restaurantes", "Hogares"],
        },
        {
          id:          "consultoria-botanica",
          number:      "03",
          title:       "Consultoría Botánica",
          description: "Asesoría especializada en selección de especies, cuidado y mantenimiento de colecciones botánicas privadas y corporativas.",
          tags:        ["Selección de especies", "Mantenimiento", "Colecciones"],
        },
        {
          id:          "instalacion-mantenimiento",
          number:      "04",
          title:       "Instalación & Mantenimiento",
          description: "Acompañamiento completo desde el diseño hasta la implementación, con planes de mantenimiento mensual adaptados a cada proyecto.",
          tags:        ["Implementación", "Mantenimiento mensual", "Seguimiento"],
        },
      ],
    },

    // ── Portfolio ─────────────────────────────────────────────────────────────
    portfolio: {
      label:   "Proyectos",
      title:   "Espacios que",
      titleEm: "cobran vida",
      projects: [
        { id: "jardin-terraza", title: "Jardín Terraza El Poblado",  category: "Paisajismo Residencial",  image: "/images/portfolio/plantula1.jpg",  placeholder: "linear-gradient(135deg,#4A6B4E 0%,#2C3E2D 100%)" },
        { id: "muro-verde",     title: "Muro Verde Corporativo",     category: "Cuadro Vivo",             image: "/images/portfolio/plantula2.jpg",  placeholder: "linear-gradient(135deg,#7A9B7E 0%,#4A6B4E 100%)" },
        { id: "loft-laureles",  title: "Loft Laureles",              category: "Interiorismo Botánico",   image: "/images/portfolio/plantula3.jpg",  placeholder: "linear-gradient(135deg,#B8CDB9 0%,#7A9B7E 100%)" },
        { id: "casa-campo",     title: "Proyecto Casa Campo",        category: "Diseño de Jardines",      image: "/images/portfolio/plantula4.jpg", placeholder: "linear-gradient(135deg,#4A6B4E 0%,#2C3E2D 100%)" },
      ],
    },

    // ── Process ───────────────────────────────────────────────────────────────
    process: {
      label:   "Nuestro Proceso",
      title:   "De la idea al",
      titleEm: "jardín perfecto",
      steps: [
        { number: "01", title: "Consulta Inicial",    description: "Escuchamos tu visión, analizamos el espacio y entendemos tus necesidades para crear una propuesta personalizada." },
        { number: "02", title: "Diseño Conceptual",   description: "Desarrollamos planos, selección de especies y paleta vegetal alineados con tu estilo y las condiciones del entorno." },
        { number: "03", title: "Ejecución",           description: "Nuestro equipo implementa el diseño con atención meticulosa al detalle y respeto por cada planta y material." },
        { number: "04", title: "Seguimiento",         description: "Acompañamos el crecimiento de tu espacio con planes de mantenimiento y asesoría continua." },
      ],
    },

    // ── Testimonials ──────────────────────────────────────────────────────────
    testimonials: {
      label:   "Testimonios",
      title:   "Lo que dicen nuestros",
      titleEm: "clientes",
      items: [
        { quote: "Plántula transformó nuestro balcón en un verdadero oasis. Cada planta fue elegida con un propósito y el resultado superó todas nuestras expectativas.", name: "Carolina Mejía",    role: "Proyecto Residencial", company: "El Poblado"      },
        { quote: "El muro verde que instalaron en nuestra oficina no solo es hermoso, sino que cambió completamente la energía del espacio. El equipo trabaja increíble.",    name: "Andrés Restrepo", role: "Director Creativo",    company: "Estudio Nómada"  },
        { quote: "Su conocimiento botánico es impresionante. Nos guiaron desde la selección de cada especie hasta el mantenimiento. Profesionalismo de principio a fin.",    name: "Valentina Osorio", role: "Arquitecta",           company: "Espacio Abierto" },
      ],
    },

    // ── Instagram ─────────────────────────────────────────────────────────────
    instagram: {
      label:  "Instagram",
      title:  "Síguenos en",
      handle: "@plantula___",
      posts: [
        { src: "/images/portfolio/plantula1.jpg",   alt: "Jardín terraza en El Poblado",               placeholder: "linear-gradient(135deg,#4A6B4E 0%,#2C3E2D 100%)" },
        { src: "/images/portfolio/plantula2.jpg",   alt: "Detalle de muro verde corporativo",          placeholder: "linear-gradient(135deg,#7A9B7E 0%,#4A6B4E 100%)" },
        { src: "/images/portfolio/plantula3.jpg",   alt: "Especie nativa en proceso de instalación",   placeholder: "linear-gradient(135deg,#B8CDB9 0%,#7A9B7E 100%)" },
        { src: "/images/portfolio/plantula4.jpg",   alt: "Loft con composición botánica interior",     placeholder: "linear-gradient(135deg,#4A6B4E 0%,#3A5A3E 100%)" },
        { src: "/images/portfolio/plantula5.jpg",   alt: "Jardín de casa de campo",                    placeholder: "linear-gradient(135deg,#2C3E2D 0%,#4A6B4E 100%)" },
        { src: "/images/portfolio/plantula6.jpg",   alt: "Detalle botánico close-up",                  placeholder: "linear-gradient(135deg,#7A9B7E 0%,#B8CDB9 100%)" },
      ],
    },

    // ── Contact ───────────────────────────────────────────────────────────────
    contact: {
      label:       "Contacto",
      title:       "¿Listo para transformar tu",
      titleEm:     "espacio",
      titleEnd:    "?",
      sub:         "Cuéntanos sobre tu proyecto y te ayudaremos a hacerlo realidad. La primera consulta es sin compromiso.",
      placeholder: "Tu correo electrónico",
      cta:         "Agenda consulta",
      items: [
        { label: "Teléfono",  value: "+57 300 123 4567",  href: "tel:+573001234567"       },
        { label: "Email",     value: "hola@plantula.co",  href: "mailto:hola@plantula.co" },
        { label: "Ubicación", value: "Medellín, Colombia", href: undefined                },
      ],
    },

    // ── Footer ────────────────────────────────────────────────────────────────
    footer: {
      copyStart: "© 2026 by",
      author: "KeithKelsy",
      copyEnd: "Todos los derechos reservados.",
      authorUrl: "https://www.linkedin.com/in/keithkelsy/"
    },
  },

  // ───────────────────────────────────────────────────────────────────────────
  // ENGLISH
  // ───────────────────────────────────────────────────────────────────────────
  en: {
    nav: {
      links: [
        { label: "About",    href: "#nosotros"  },
        { label: "Services", href: "#servicios" },
        { label: "Projects", href: "#proyectos" },
        { label: "Process",  href: "#proceso"   },
      ],
      contact: "Contact",
      tagline: "Botanical studio · Colombia",
    },

    hero: {
      badge:  "Botanical Studio & Landscaping",
      h1:     "We design spaces that",
      h1em:   "breathe life",
      sub:    "We transform environments through botanical design, conscious landscaping and the power of connecting people with nature.",
      cta1:   "Book a consultation",
      cta2:   "View projects",
      scroll: "Scroll",
    },

    about: {
      label:   "Our Philosophy",
      title:   "Nature as a",
      titleEm: "design language",
      p1: "At Plántula we believe every space has the potential to tell a story through plants. Our approach blends botanical knowledge with aesthetic sensibility to create environments that inspire, heal and transform.",
      p2: "From residential gardens to corporate installations, every project is an opportunity to reconnect people with the natural world.",
      stats: [
        { end: 150, suffix: "+", label: "Projects" },
        { end: 8,   suffix: "",  label: "Years"    },
        { end: 200, suffix: "+", label: "Species"  },
      ],
      imgAlt: "Plántula team working on a landscaping project",
    },

    services: {
      label:   "Services",
      title:   "What we",
      titleEm: "do",
      sub:     "Every project is unique. We adapt our process to the conditions of the space, the environment and each client's vision.",
      items: [
        {
          id:          "diseno-paisajistico",
          number:      "01",
          title:       "Landscape Design",
          description: "We create outdoor spaces that dialogue with the natural environment, integrating native plants and high-impact visual compositions.",
          tags:        ["Residential", "Commercial", "Corporate"],
        },
        {
          id:          "jardines-interiores",
          number:      "02",
          title:       "Interior Gardens",
          description: "We bring nature indoors. We design vertical gardens, terrariums and botanical compositions for interior spaces.",
          tags:        ["Offices", "Restaurants", "Homes"],
        },
        {
          id:          "consultoria-botanica",
          number:      "03",
          title:       "Botanical Consultancy",
          description: "Specialized advice on species selection, care and maintenance of private and corporate botanical collections.",
          tags:        ["Species selection", "Maintenance", "Collections"],
        },
        {
          id:          "instalacion-mantenimiento",
          number:      "04",
          title:       "Installation & Maintenance",
          description: "Full support from design to implementation, with monthly maintenance plans tailored to each project.",
          tags:        ["Implementation", "Monthly maintenance", "Follow-up"],
        },
      ],
    },

    portfolio: {
      label:   "Projects",
      title:   "Spaces that",
      titleEm: "come alive",
      projects: [
        { id: "jardin-terraza", title: "El Poblado Rooftop Garden",    category: "Residential Landscaping", image: "/images/portfolio/plantula1.jpg",  placeholder: "linear-gradient(135deg,#4A6B4E 0%,#2C3E2D 100%)" },
        { id: "muro-verde",     title: "Corporate Green Wall",         category: "Living Picture",           image: "/images/portfolio/plantula2.jpg",  placeholder: "linear-gradient(135deg,#7A9B7E 0%,#4A6B4E 100%)" },
        { id: "loft-laureles",  title: "Laureles Loft",                category: "Botanical Interiors",      image: "/images/portfolio/plantula3.jpg",  placeholder: "linear-gradient(135deg,#B8CDB9 0%,#7A9B7E 100%)" },
        { id: "casa-campo",     title: "Country House Project",        category: "Garden Design",            image: "/images/portfolio/plantula4.jpg", placeholder: "linear-gradient(135deg,#4A6B4E 0%,#2C3E2D 100%)" },
      ],
    },

    process: {
      label:   "Our Process",
      title:   "From idea to",
      titleEm: "perfect garden",
      steps: [
        { number: "01", title: "Initial Consultation", description: "We listen to your vision, analyse the space and understand your needs to create a personalised proposal." },
        { number: "02", title: "Concept Design",       description: "We develop plans, species selection and plant palette aligned with your style and the conditions of the environment." },
        { number: "03", title: "Execution",            description: "Our team implements the design with meticulous attention to detail and respect for every plant and material." },
        { number: "04", title: "Follow-up",            description: "We accompany the growth of your space with periodic visits and tailored maintenance plans." },
      ],
    },

    testimonials: {
      label:   "Testimonials",
      title:   "What our",
      titleEm: "clients say",
      items: [
        { quote: "Plántula transformed our balcony into a true oasis. Every plant was chosen with purpose and the result exceeded all our expectations.", name: "Carolina Mejía",    role: "Residential Project", company: "El Poblado"     },
        { quote: "The green wall they installed in our office is not only beautiful — it completely changed the energy of the space. The team is amazing.",   name: "Andrés Restrepo", role: "Creative Director",   company: "Estudio Nómada" },
        { quote: "Their botanical knowledge is impressive. They guided us from species selection all the way through maintenance. True professionalism.",      name: "Valentina Osorio", role: "Architect",           company: "Espacio Abierto" },
      ],
    },

    instagram: {
      label:  "Instagram",
      title:  "Follow us on",
      handle: "@plantula___",
      posts: [
        { src: "/images/portfolio/plantula1.jpg",   alt: "Rooftop garden in El Poblado",       placeholder: "linear-gradient(135deg,#4A6B4E 0%,#2C3E2D 100%)" },
        { src: "/images/portfolio/plantula2.jpg",   alt: "Detail of corporate green wall",     placeholder: "linear-gradient(135deg,#7A9B7E 0%,#4A6B4E 100%)" },
        { src: "/images/portfolio/plantula3.jpg",   alt: "Native species being installed",     placeholder: "linear-gradient(135deg,#B8CDB9 0%,#7A9B7E 100%)" },
        { src: "/images/portfolio/plantula4.jpg",   alt: "Loft with botanical composition",    placeholder: "linear-gradient(135deg,#4A6B4E 0%,#3A5A3E 100%)" },
        { src: "/images/portfolio/plantula5.jpg",   alt: "Country house garden",               placeholder: "linear-gradient(135deg,#2C3E2D 0%,#4A6B4E 100%)" },
        { src: "/images/portfolio/plantula6.jpg",   alt: "Botanical detail close-up",          placeholder: "linear-gradient(135deg,#7A9B7E 0%,#B8CDB9 100%)" },
      ],
    },

    contact: {
      label:       "Contact",
      title:       "Ready to transform your",
      titleEm:     "space",
      titleEnd:    "?",
      sub:         "Tell us about your project and we'll help you make it a reality. The first consultation is commitment-free.",
      placeholder: "Your email address",
      cta:         "Book consultation",
      items: [
        { label: "Phone",    value: "+57 300 123 4567",   href: "tel:+573001234567"       },
        { label: "Email",    value: "hola@plantula.co",   href: "mailto:hola@plantula.co" },
        { label: "Location", value: "Medellín, Colombia",  href: undefined                },
      ],
    },

    footer: {
      copyStart: "© 2026 by",
      author: "KeithKelsy",
      copyEnd: "All rights reserved.",
      authorUrl: "https://www.linkedin.com/in/keithkelsy/"
    },
  },
} as const;

export type Translations = typeof translations;
export default translations;
