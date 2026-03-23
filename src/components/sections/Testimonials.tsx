"use client";

import SectionLabel from "@/components/ui/SectionLabel";
import SectionTitle from "@/components/ui/SectionTitle";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const TESTIMONIALS = [
  {
    quote:
      "Plántula transformó nuestro balcón en un verdadero oasis. Cada planta fue elegida con un propósito y el resultado superó todas nuestras expectativas.",
    name: "Carolina Mejía",
    role: "Proyecto Residencial",
    company: "El Poblado",
  },
  {
    quote:
      "El muro verde que instalaron en nuestra oficina no solo es hermoso, sino que cambió completamente la energía del espacio. El equipo trabaja increíble.",
    name: "Andrés Restrepo",
    role: "Director Creativo",
    company: "Estudio Nómada",
  },
  {
    quote:
      "Su conocimiento botánico es impresionante. Nos guiaron desde la selección de cada especie hasta el mantenimiento. Profesionalismo de principio a fin.",
    name: "Valentina Osorio",
    role: "Arquitecta",
    company: "Espacio Abierto",
  },
];

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
}

function TestimonialCard({ quote, name, role, company }: TestimonialCardProps) {
  return (
    <div
      className="
        flex flex-col border border-green-pale bg-white p-12
        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        hover:border-green-sage hover:shadow-[0_20px_60px_rgba(44,62,45,0.06)]
      "
    >
      {/* Decorative quote mark */}
      <span
        className="font-serif font-light leading-none text-green-pale mb-4 select-none"
        style={{ fontSize: "3rem" }}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Quote text */}
      <p className="font-sans text-[0.95rem] font-light italic leading-[1.8] text-text-mid">
        {quote}
      </p>

      {/* Author */}
      <div className="mt-8 border-t border-green-pale pt-6">
        <p className="font-sans text-[0.9rem] font-medium text-green-dark">{name}</p>
        <p className="mt-1 font-sans text-[0.75rem] uppercase tracking-widest text-text-light">
          {role} &mdash; {company}
        </p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonios" className="bg-cream-light">
      <div className="mx-auto max-w-[1300px] px-6 py-32 lg:px-12">

        {/* Header */}
        <div className="text-center">
          <RevealOnScroll>
            <SectionLabel centered>Testimonios</SectionLabel>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <SectionTitle className="mt-5">
              Lo que dicen nuestros <em>clientes</em>
            </SectionTitle>
          </RevealOnScroll>
        </div>

        {/* Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <RevealOnScroll key={t.name} delay={i * 0.15} direction="up">
              <TestimonialCard {...t} />
            </RevealOnScroll>
          ))}
        </div>

      </div>
    </section>
  );
}
