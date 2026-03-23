"use client";

import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionTitle from "@/components/ui/SectionTitle";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { useCountUp } from "@/lib/hooks/useCountUp";

// ─── Shared logo mark (matches Navbar SVG) ────────────────────────────────────

function PlantLogoMark({ size = 80 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="14" y1="26" x2="14" y2="10" stroke="#2C3E2D" strokeWidth="1.2" strokeLinecap="round" />
      <path
        d="M14 18 C14 18 6 16 5 9 C9 9 14 13 14 18Z"
        stroke="#2C3E2D"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M14 14 C14 14 22 12 23 5 C19 5 14 9 14 14Z"
        stroke="#2C3E2D"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

// ─── Stat item with count-up animation ───────────────────────────────────────

function Stat({
  end,
  suffix = "",
  label,
  delay = 0,
}: {
  end: number;
  suffix?: string;
  label: string;
  delay?: number;
}) {
  const [ref, count] = useCountUp(end, 2000);

  return (
    <RevealOnScroll delay={delay} direction="up">
      <div ref={ref}>
        <p className="font-serif font-light text-green-dark" style={{ fontSize: "2.8rem", lineHeight: 1 }}>
          {count}{suffix}
        </p>
        <p className="mt-1 font-sans text-[0.72rem] uppercase tracking-widest text-text-light">
          {label}
        </p>
      </div>
    </RevealOnScroll>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <section id="nosotros" className="bg-cream-light">
      <div className="mx-auto max-w-[1300px] px-6 py-32 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">

          {/* ── Left column ── */}
          <div className="max-w-[520px]">
            <RevealOnScroll>
              <SectionLabel>Nuestra Filosofía</SectionLabel>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <SectionTitle className="mt-5">
                La naturaleza como{" "}
                <em>lenguaje de diseño</em>
              </SectionTitle>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="mt-8 font-sans text-base font-light leading-[1.85] text-text-mid">
                En Plántula creemos que cada espacio tiene el potencial de contar
                una historia a través de las plantas. Nuestro enfoque fusiona el
                conocimiento botánico con la sensibilidad estética para crear
                ambientes que inspiran, sanan y transforman.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.28}>
              <p className="mt-4 font-sans text-base font-light leading-[1.85] text-text-mid">
                Desde jardines residenciales hasta instalaciones corporativas,
                cada proyecto es una oportunidad para reconectar personas con el
                mundo natural.
              </p>
            </RevealOnScroll>

            {/* Stats */}
            <RevealOnScroll delay={0.15}>
              <div className="mt-14 border-t border-green-pale pt-12">
                <div className="grid grid-cols-3 gap-6">
                  <Stat end={150} suffix="+" label="Proyectos" delay={0} />
                  <Stat end={8} label="Años" delay={0.15} />
                  <Stat end={200} suffix="+" label="Especies" delay={0.3} />
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* ── Right column ── */}
          <RevealOnScroll direction="right" delay={0.1}>
            <div className="relative h-[480px] lg:h-[600px]">

              {/* Main image block */}
              <div className="absolute right-0 top-0 h-[75%] w-[85%] overflow-hidden">
                <Image
                  src="/images/about/equipo.jpg"
                  alt="Equipo de Plántula en proyecto de paisajismo"
                  fill
                  sizes="(max-width: 1024px) 85vw, 45vw"
                  className="object-cover"
                  // Shows a gradient placeholder while the real image is absent
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                {/* Fallback gradient shown behind the image */}
                <div
                  className="absolute inset-0 -z-10"
                  style={{
                    background: "linear-gradient(135deg, #7A9B7E 0%, #4A6B4E 100%)",
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Accent block */}
              <div className="absolute bottom-0 left-0 flex h-[45%] w-[50%] items-center justify-center bg-beige shadow-[0_20px_60px_rgba(44,62,45,0.08)]">
                <div className="opacity-30">
                  <PlantLogoMark size={96} />
                </div>
              </div>

            </div>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  );
}
