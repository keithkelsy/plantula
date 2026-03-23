export const SITE_NAME = "Plántula";
export const SITE_TAGLINE = "Estudio botánico y de paisajismo";

export const CONTACT_INFO = {
  email: "hola@plantula.co",
  phone: "+57 300 000 0000",
  address: "Bogotá, Colombia",
  instagram: "@plantula.co",
};

export const SERVICES = [
  {
    id: "diseno-paisajistico",
    number: "01",
    title: "Diseño Paisajístico",
    description:
      "Creamos espacios exteriores que dialogan con el entorno natural, integrando plantas nativas y composiciones visuales de alto impacto.",
    tags: ["Residencial", "Comercial", "Corporativo"],
  },
  {
    id: "jardines-interiores",
    number: "02",
    title: "Jardines Interiores",
    description:
      "Llevamos la naturaleza adentro. Diseñamos jardines verticales, terrariums y composiciones botánicas para interiores.",
    tags: ["Oficinas", "Restaurantes", "Hogares"],
  },
  {
    id: "consultoria-botanica",
    number: "03",
    title: "Consultoría Botánica",
    description:
      "Asesoría especializada en selección de especies, cuidado y mantenimiento de colecciones botánicas privadas y corporativas.",
    tags: ["Selección de especies", "Mantenimiento", "Colecciones"],
  },
  {
    id: "instalacion-mantenimiento",
    number: "04",
    title: "Instalación & Mantenimiento",
    description:
      "Acompañamiento completo desde el diseño hasta la implementación, con planes de mantenimiento mensual adaptados a cada proyecto.",
    tags: ["Implementación", "Mantenimiento mensual", "Seguimiento"],
  },
];

export const PROJECTS = [
  {
    id: "jardin-terraza",
    title: "Jardín Terraza El Poblado",
    category: "Paisajismo Residencial",
    image: "/images/portfolio/plantula2.jpg",
    // Placeholder gradient shown when image is absent
    placeholder: "linear-gradient(135deg, #4A6B4E 0%, #2C3E2D 100%)",
  },
  {
    id: "muro-verde",
    title: "Muro Verde Corporativo",
    category: "Cuadro Vivo",
    image: "/images/portfolio/plantula1.jpg",
    placeholder: "linear-gradient(135deg, #7A9B7E 0%, #4A6B4E 100%)",
  },
  {
    id: "loft-laureles",
    title: "Loft Laureles",
    category: "Interiorismo Botánico",
    image: "/images/portfolio/plantula3.jpg",
    placeholder: "linear-gradient(135deg, #B8CDB9 0%, #7A9B7E 100%)",
  },
  {
    id: "casa-campo",
    title: "Proyecto Casa Campo",
    category: "Diseño de Jardines",
    image: "/images/portfolio/casa-campo.jpg",
    placeholder: "linear-gradient(135deg, #4A6B4E 0%, #2C3E2D 100%)",
  },
];

export const TESTIMONIALS = [
  {
    id: "1",
    quote:
      "Plántula transformó completamente nuestra terraza. Cada detalle refleja una comprensión profunda de cómo queremos vivir en ese espacio.",
    author: "Marcela Restrepo",
    role: "Propietaria residencial",
    location: "Bogotá",
  },
  {
    id: "2",
    quote:
      "El jardín interior que diseñaron para nuestras oficinas cambió el ambiente de trabajo. Nuestro equipo es más feliz y productivo.",
    author: "Andrés Morales",
    role: "Director General",
    company: "Verde+ Consulting",
  },
  {
    id: "3",
    quote:
      "Su conocimiento botánico es extraordinario. Seleccionaron especies perfectas para el microclima de nuestro restaurante.",
    author: "Camila Torres",
    role: "Chef & Propietaria",
    company: "Restaurante Tierra",
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Exploración",
    description:
      "Visitamos el espacio, entendemos el entorno, la luz, el microclima y la visión del cliente.",
  },
  {
    number: "02",
    title: "Concepto",
    description:
      "Desarrollamos una propuesta de diseño con moodboard, selección de especies y planimetría.",
  },
  {
    number: "03",
    title: "Implementación",
    description:
      "Ejecutamos el proyecto con nuestro equipo especializado, garantizando cada detalle.",
  },
  {
    number: "04",
    title: "Seguimiento",
    description:
      "Acompañamos el crecimiento del jardín con visitas periódicas y planes de mantenimiento.",
  },
];

export const INSTAGRAM_POSTS = [
  { id: "1", image: "/images/portfolio/plantula1.jpg", alt: "Jardín en proceso" },
  { id: "2", image: "/images/portfolio/plantula2.jpg", alt: "Terraza diseñada" },
  { id: "3", image: "/images/portfolio/plantula3.jpg", alt: "Planta nativa" },
  { id: "4", image: "/instagram/post-4.jpg", alt: "Muro verde" },
  { id: "5", image: "/instagram/post-5.jpg", alt: "Detalle botánico" },
  { id: "6", image: "/instagram/post-6.jpg", alt: "Proyecto terminado" },
];
