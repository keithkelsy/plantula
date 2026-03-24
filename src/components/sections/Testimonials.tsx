"use client";

import SectionLabel from "@/components/ui/SectionLabel";
import SectionTitle from "@/components/ui/SectionTitle";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { useLanguage } from "@/context/LanguageContext";

function TestimonialCard({ quote, name, role, company }: { quote: string; name: string; role: string; company: string }) {
  return (
    <div className="flex flex-col border border-green-pale bg-white p-12 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-green-sage hover:shadow-[0_20px_60px_rgba(44,62,45,0.06)]">
      <span className="font-serif font-light leading-none text-green-pale mb-4 select-none" style={{ fontSize: "3rem" }} aria-hidden="true">&ldquo;</span>
      <p className="font-sans text-[0.95rem] font-light italic leading-[1.8] text-text-mid">{quote}</p>
      <div className="mt-8 border-t border-green-pale pt-6">
        <p className="font-sans text-[0.9rem] font-medium text-green-dark">{name}</p>
        <p className="mt-1 font-sans text-[0.75rem] uppercase tracking-widest text-text-light">{role} &mdash; {company}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { t } = useLanguage();
  const tm = t.testimonials;

  return (
    <section id="testimonios" className="bg-cream-light">
      <div className="mx-auto max-w-[1300px] px-6 py-32 lg:px-12">

        <div className="text-center">
          <RevealOnScroll>
            <SectionLabel centered>{tm.label}</SectionLabel>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <SectionTitle className="mt-5">
              {tm.title} <em>{tm.titleEm}</em>
            </SectionTitle>
          </RevealOnScroll>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {tm.items.map((item, i) => (
            <RevealOnScroll key={item.name} delay={i * 0.15} direction="up">
              <TestimonialCard {...item} />
            </RevealOnScroll>
          ))}
        </div>

      </div>
    </section>
  );
}
