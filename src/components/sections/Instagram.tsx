"use client";

import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionTitle from "@/components/ui/SectionTitle";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { useLanguage } from "@/context/LanguageContext";

const IG_URL = "https://www.instagram.com/plantula___/";

function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PostItem({ src, alt, placeholder }: { src: string; alt: string; placeholder: string }) {
  return (
    <div className="group relative aspect-square overflow-hidden">
      <div className="absolute inset-0" style={{ background: placeholder }} aria-hidden="true" />
      <Image src={src} alt={alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw" className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.08]" />
      <div className="absolute inset-0 flex items-center justify-center bg-green-dark/60 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
        <span className="text-white"><InstagramIcon size={24} /></span>
      </div>
    </div>
  );
}

export default function Instagram() {
  const { t } = useLanguage();
  const ig = t.instagram;

  return (
    <section id="instagram" className="bg-cream">
      <div className="px-6 py-32 text-center lg:px-12">

        <RevealOnScroll>
          <SectionLabel centered>{ig.label}</SectionLabel>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <SectionTitle className="mt-5">
            {ig.title} <em>{ig.handle}</em>
          </SectionTitle>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="mx-auto mt-12 max-w-[1400px]">
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-6">
              {ig.posts.map((post) => (
                <PostItem key={post.src} {...post} />
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <div className="mt-12 flex justify-center">
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-3 border border-green-dark px-10 py-4 font-sans text-[0.8rem] uppercase tracking-[0.15em] text-green-dark transition-all duration-300 hover:bg-green-dark hover:text-cream"
            >
              <span className="transition-colors duration-300 group-hover/btn:text-cream">
                <InstagramIcon size={16} />
              </span>
              {ig.handle}
            </a>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}
