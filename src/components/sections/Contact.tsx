"use client";

import SectionLabel from "@/components/ui/SectionLabel";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const CONTACT_ITEMS = [
  {
    label: "Teléfono",
    value: "+57 300 123 4567",
    href: "tel:+573001234567",
  },
  {
    label: "Email",
    value: "hola@plantula.co",
    href: "mailto:hola@plantula.co",
  },
  {
    label: "Ubicación",
    value: "Medellín, Colombia",
    href: undefined,
  },
] as const;

export default function Contact() {
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

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[700px] px-6 py-32 text-center lg:px-12">

        {/* Label */}
        <RevealOnScroll>
          <SectionLabel centered light>Contacto</SectionLabel>
        </RevealOnScroll>

        {/* Heading */}
        <RevealOnScroll delay={0.1}>
          <h2
            className="mt-6 font-serif font-light text-cream leading-[1.15]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            ¿Listo para transformar tu{" "}
            <em className="text-green-light italic">espacio</em>?
          </h2>
        </RevealOnScroll>

        {/* Subheading */}
        <RevealOnScroll delay={0.2}>
          <p className="mt-6 font-sans text-base font-light leading-relaxed text-green-light/80">
            Cuéntanos sobre tu proyecto y te ayudaremos a hacerlo realidad.
            La primera consulta es sin compromiso.
          </p>
        </RevealOnScroll>

        {/* Email capture form */}
        <RevealOnScroll delay={0.3}>
          <form
            className="mx-auto mt-12 max-w-[500px]"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col sm:flex-row">
              <input
                type="email"
                required
                placeholder="Tu correo electrónico"
                className="
                  flex-1 px-6 py-[1.1rem]
                  bg-cream/[0.08] border border-green-light/20
                  text-cream font-sans text-[0.9rem] font-light
                  placeholder:text-green-light/40
                  focus:outline-none focus:border-green-sage
                  transition-colors duration-300
                  border-b-0 sm:border-b sm:border-r-0
                "
              />
              <button
                type="submit"
                className="
                  px-8 py-[1.1rem]
                  bg-cream text-green-dark
                  font-sans text-[0.78rem] font-medium uppercase tracking-[0.15em]
                  transition-colors duration-300
                  hover:bg-white
                  whitespace-nowrap
                "
              >
                Agenda consulta
              </button>
            </div>
          </form>
        </RevealOnScroll>

        {/* Contact info */}
        <RevealOnScroll delay={0.4}>
          <div className="mt-16 flex flex-wrap justify-center gap-x-16 gap-y-10">
            {CONTACT_ITEMS.map(({ label, value, href }) => (
              <div key={label} className="flex flex-col items-center">
                <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.25em] text-green-sage mb-2">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    className="font-serif text-[1.15rem] text-cream transition-colors duration-200 hover:text-green-light"
                  >
                    {value}
                  </a>
                ) : (
                  <span className="font-serif text-[1.15rem] text-cream">
                    {value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}
