"use client";

import SectionLabel from "@/components/ui/SectionLabel";
import SectionTitle from "@/components/ui/SectionTitle";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { useLanguage } from "@/context/LanguageContext";

export default function Process() {
  const { t } = useLanguage();
  const p = t.process;

  return (
    <section id="proceso" className="bg-cream">
      <div className="mx-auto max-w-[1300px] px-6 py-32 lg:px-12">

        {/* Header */}
        <div className="text-center">
          <RevealOnScroll>
            <SectionLabel centered>{p.label}</SectionLabel>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <SectionTitle className="mt-5">
              {p.title} <em>{p.titleEm}</em>
            </SectionTitle>
          </RevealOnScroll>
        </div>

        {/* Steps grid */}
        <div className="relative mt-20">

          {/* Connecting line — desktop only */}
          <div
            className="pointer-events-none absolute left-[10%] right-[10%] top-[40px] hidden h-px lg:block"
            style={{ background: "linear-gradient(to right, transparent, #7A9B7E 30%, #7A9B7E 70%, transparent)" }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-0">
            {p.steps.map((step, i) => (
              <RevealOnScroll key={step.number} delay={i * 0.15} direction="up">
                <div className="group flex flex-col items-center px-6 text-center">

                  {/* Number circle */}
                  <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-green-pale bg-cream transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:border-green-dark group-hover:bg-green-dark">
                    <span
                      className="font-serif font-light text-green-mid transition-colors duration-[400ms] group-hover:text-cream"
                      style={{ fontSize: "1.8rem", lineHeight: 1 }}
                    >
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-8 font-serif font-medium text-green-dark" style={{ fontSize: "1.3rem" }}>
                    {step.title}
                  </h3>

                  <p className="mt-3 font-sans text-[0.88rem] font-light leading-relaxed text-text-light">
                    {step.description}
                  </p>

                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
