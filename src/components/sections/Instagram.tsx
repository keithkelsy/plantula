"use client";

import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionTitle from "@/components/ui/SectionTitle";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const IG_HANDLE = "@plantula___";
const IG_URL = "https://www.instagram.com/plantula___/";

const POSTS = [
  {
    src: "/images/portfolio/plantula1.jpg",
    alt: "Jardín terraza en El Poblado",
    placeholder: "linear-gradient(135deg, #4A6B4E 0%, #2C3E2D 100%)",
  },
  {
    src: "/images/portfolio/plantula2.jpg",
    alt: "Detalle de muro verde corporativo",
    placeholder: "linear-gradient(135deg, #7A9B7E 0%, #4A6B4E 100%)",
  },
  {
    src: "/images/portfolio/plantula3.jpg",
    alt: "Especie nativa en proceso de instalación",
    placeholder: "linear-gradient(135deg, #B8CDB9 0%, #7A9B7E 100%)",
  },
  {
    src: "/images/instagram/post-4.jpg",
    alt: "Loft con composición botánica interior",
    placeholder: "linear-gradient(135deg, #4A6B4E 0%, #3A5A3E 100%)",
  },
  {
    src: "/images/instagram/post-5.jpg",
    alt: "Jardín de casa de campo",
    placeholder: "linear-gradient(135deg, #2C3E2D 0%, #4A6B4E 100%)",
  },
  {
    src: "/images/instagram/post-6.jpg",
    alt: "Detalle botánico close-up",
    placeholder: "linear-gradient(135deg, #7A9B7E 0%, #B8CDB9 100%)",
  },
];

function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PostItem({
  src,
  alt,
  placeholder,
}: {
  src: string;
  alt: string;
  placeholder: string;
}) {
  return (
    <div className="group relative aspect-square overflow-hidden">
      {/* Placeholder gradient */}
      <div
        className="absolute inset-0"
        style={{ background: placeholder }}
        aria-hidden="true"
      />

      {/* Photo */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw"
        className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.08]"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-green-dark/60 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
        <span className="text-white">
          <InstagramIcon size={24} />
        </span>
      </div>
    </div>
  );
}

export default function Instagram() {
  return (
    <section id="instagram" className="bg-cream">
      <div className="px-6 py-32 text-center lg:px-12">

        {/* Header */}
        <RevealOnScroll>
          <SectionLabel centered>Instagram</SectionLabel>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <SectionTitle className="mt-5">
            Síguenos en <em>{IG_HANDLE}</em>
          </SectionTitle>
        </RevealOnScroll>

        {/* Grid */}
        <RevealOnScroll delay={0.2}>
          <div className="mx-auto mt-12 max-w-[1400px]">
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-6">
              {POSTS.map((post) => (
                <PostItem key={post.src} {...post} />
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* CTA button */}
        <RevealOnScroll delay={0.3}>
          <div className="mt-12 flex justify-center">
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group/btn inline-flex items-center gap-3
                border border-green-dark px-10 py-4
                font-sans text-[0.8rem] uppercase tracking-[0.15em] text-green-dark
                transition-all duration-300
                hover:bg-green-dark hover:text-cream
              "
            >
              <span className="transition-colors duration-300 group-hover/btn:text-cream">
                <InstagramIcon size={16} />
              </span>
              {IG_HANDLE}
            </a>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}
