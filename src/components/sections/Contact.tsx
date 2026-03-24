"use client";

import dynamic from "next/dynamic";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { useLanguage } from "@/context/LanguageContext";

// Dynamic import — maplibre-gl is client-only and large
const ContactMap = dynamic(() => import("@/components/ui/ContactMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse bg-green-mid/20" />
  ),
});

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;

  return (
    <section id="contacto" className="relative overflow-hidden bg-green-dark">
      {/* Radial gradient depth layers */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 50% 60% at 10% 90%, rgba(74,107,78,0.25) 0%, transparent 100%),
            radial-gradient(ellipse 45% 50% at 90% 10%, rgba(61,94,63,0.18) 0%, transparent 100%)
          `,
        }}
        aria-hidden="true"
      />

      {/* ── Top: text + form + info ── */}
      <div className="relative z-10 mx-auto max-w-[700px] px-6 pt-32 pb-20 text-center lg:px-12">

        <RevealOnScroll>
          <SectionLabel centered light>{c.label}</SectionLabel>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <h2 className="mt-6 font-serif font-light text-cream leading-[1.15]" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            {c.title}{" "}
            <em className="text-green-light italic">{c.titleEm}</em>
            {c.titleEnd}
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <p className="mt-6 font-sans text-base font-light leading-relaxed text-green-light/80">{c.sub}</p>
        </RevealOnScroll>

        {/* Email capture form */}
        <RevealOnScroll delay={0.3}>
          <form className="mx-auto mt-12 max-w-[500px]" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col sm:flex-row">
              <input
                type="email"
                required
                placeholder={c.placeholder}
                className="flex-1 px-6 py-[1.1rem] bg-cream/[0.08] border border-green-light/20 text-cream font-sans text-[0.9rem] font-light placeholder:text-green-light/40 focus:outline-none focus:border-green-sage transition-colors duration-300 border-b-0 sm:border-b sm:border-r-0"
              />
              <button
                type="submit"
                className="px-8 py-[1.1rem] bg-cream text-green-dark font-sans text-[0.78rem] font-medium uppercase tracking-[0.15em] transition-colors duration-300 hover:bg-white whitespace-nowrap"
              >
                {c.cta}
              </button>
            </div>
          </form>
        </RevealOnScroll>

        {/* Contact info */}
        <RevealOnScroll delay={0.4}>
          <div className="mt-16 flex flex-wrap justify-center gap-x-16 gap-y-10">
            {c.items.map(({ label, value, href }) => (
              <div key={label} className="flex flex-col items-center">
                <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.25em] text-green-sage mb-2">{label}</p>
                {href ? (
                  <a href={href} className="font-serif text-[1.15rem] text-cream transition-colors duration-200 hover:text-green-light">{value}</a>
                ) : (
                  <span className="font-serif text-[1.15rem] text-cream">{value}</span>
                )}
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>

      {/* ── Bottom: map ── */}
      <RevealOnScroll delay={0.2}>
        <div className="relative z-10 px-6 pb-16 lg:px-12">
          <div className="h-[320px] w-full overflow-hidden sm:h-[400px] rounded-lg">
            <ContactMap tooltip={c.mapTooltip} />
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
