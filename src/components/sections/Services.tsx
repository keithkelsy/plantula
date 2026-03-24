"use client";

import SectionLabel from "@/components/ui/SectionLabel";
import SectionTitle from "@/components/ui/SectionTitle";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { useLanguage } from "@/context/LanguageContext";

export default function Services() {
  const { t } = useLanguage();
  const s = t.services;

  return (
    <section id="servicios" className="bg-cream-light">
      <div className="mx-auto max-w-[1300px] px-6 py-32 lg:px-12">

        {/* Header */}
        <div className="mb-20 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <RevealOnScroll>
              <SectionLabel>{s.label}</SectionLabel>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <SectionTitle className="mt-5">
                {s.title} <em>{s.titleEm}</em>
              </SectionTitle>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.2} direction="right">
            <p className="max-w-[360px] font-sans text-[0.9rem] font-light leading-relaxed text-text-light lg:text-right">
              {s.sub}
            </p>
          </RevealOnScroll>
        </div>

        {/* Service list */}
        <div className="divide-y divide-green-pale">
          {s.items.map((service, i) => (
            <RevealOnScroll key={service.id} delay={i * 0.1} direction="up">
              <div className="group grid cursor-default py-10 transition-colors duration-500 hover:bg-green-pale/20 lg:grid-cols-[80px_1fr_1fr_auto] lg:items-center lg:gap-16 lg:px-6">

                <span className="mb-4 font-serif text-[2.2rem] font-light text-green-pale transition-colors duration-500 group-hover:text-green-light lg:mb-0">
                  {service.number}
                </span>

                <h3 className="mb-3 font-serif text-[1.4rem] font-light text-green-dark lg:mb-0">
                  {service.title}
                </h3>

                <p className="font-sans text-[0.88rem] font-light leading-relaxed text-text-light">
                  {service.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 lg:mt-0 lg:justify-end">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-green-pale px-3 py-1 font-sans text-[0.65rem] uppercase tracking-[0.15em] text-text-light transition-colors duration-300 group-hover:border-green-sage/40 group-hover:text-green-mid"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </RevealOnScroll>
          ))}
        </div>

      </div>
    </section>
  );
}
