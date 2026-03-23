"use client";

import Image from "next/image";
import { PROJECTS } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionTitle from "@/components/ui/SectionTitle";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

// ─── Grid layout config ───────────────────────────────────────────────────────
// Each item's col-span and aspect ratio for the asymmetric editorial grid.
const GRID_CONFIG = [
  { colSpan: "lg:col-span-7", aspect: "aspect-[16/10]" },
  { colSpan: "lg:col-span-5", aspect: "aspect-square"   },
  { colSpan: "lg:col-span-4", aspect: "aspect-square"   },
  { colSpan: "lg:col-span-8", aspect: "aspect-[16/10]"  },
] as const;

// ─── Single portfolio item ─────────────────────────────────────────────────────

interface PortfolioItemProps {
  title: string;
  category: string;
  image: string;
  placeholder: string;
  colSpan: string;
  aspect: string;
  delay: number;
}

function PortfolioItem({
  title,
  category,
  image,
  placeholder,
  colSpan,
  aspect,
  delay,
}: PortfolioItemProps) {
  return (
    <RevealOnScroll
      delay={delay}
      direction="up"
      // col-span must be on the outer element for the CSS grid to read it
      className={`col-span-1 ${colSpan}`}
    >
      <div className={`group relative w-full overflow-hidden ${aspect} cursor-pointer`}>

        {/* Placeholder gradient (always rendered, sits behind the image) */}
        <div
          className="absolute inset-0"
          style={{ background: placeholder }}
          aria-hidden="true"
        />

        {/* Photo */}
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 58vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div
          className="
            absolute inset-0 flex flex-col justify-end p-10
            opacity-0 transition-opacity duration-500 group-hover:opacity-100
          "
          style={{
            background:
              "linear-gradient(to top, rgba(26,42,27,0.85) 0%, transparent 60%)",
          }}
        >
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-green-light mb-2">
            {category}
          </p>
          <h3
            className="font-serif font-normal text-cream"
            style={{ fontSize: "1.5rem" }}
          >
            {title}
          </h3>
        </div>

      </div>
    </RevealOnScroll>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Portfolio() {
  return (
    <section id="proyectos" className="bg-cream-light">
      <div className="mx-auto max-w-[1400px] px-6 py-32 lg:px-12">

        {/* Header */}
        <div className="mb-16">
          <RevealOnScroll>
            <SectionLabel>Proyectos</SectionLabel>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <SectionTitle className="mt-5">
              Espacios que <em>cobran vida</em>
            </SectionTitle>
          </RevealOnScroll>
        </div>

        {/* Asymmetric editorial grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12">
          {PROJECTS.map((project, i) => (
            <PortfolioItem
              key={project.id}
              title={project.title}
              category={project.category}
              image={project.image}
              placeholder={project.placeholder}
              colSpan={GRID_CONFIG[i].colSpan}
              aspect={GRID_CONFIG[i].aspect}
              delay={i * 0.12}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
