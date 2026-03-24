"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

// ─── Animation helpers ────────────────────────────────────────────────────────

const EASE = [0.4, 0, 0.2, 1] as const;

function fadeUp(delay: number) {
  return {
    initial:    { opacity: 0, y: 32 },
    animate:    { opacity: 1, y: 0  },
    transition: { duration: 0.8, ease: EASE, delay },
  };
}

// ─── Decorative botanical SVGs ────────────────────────────────────────────────

function BotanicalTopRight() {
  return (
    <svg viewBox="0 0 220 320" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="absolute -top-8 -right-8 w-[220px] opacity-[0.05] pointer-events-none select-none" aria-hidden="true">
      <path d="M110 320 C110 320 108 200 112 80"                   stroke="#B8CDB9" strokeWidth="1"   strokeLinecap="round" />
      <path d="M110 240 C110 240 70 220 48 195"                    stroke="#B8CDB9" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M48 195 C48 195 58 170 80 168 C80 168 72 190 48 195Z"  stroke="#B8CDB9" strokeWidth="0.8" />
      <path d="M111 200 C111 200 150 178 172 155"                  stroke="#B8CDB9" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M172 155 C172 155 162 130 140 128 C140 128 148 152 172 155Z" stroke="#B8CDB9" strokeWidth="0.8" />
      <path d="M110 155 C110 155 72 135 52 108"                    stroke="#B8CDB9" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M52 108 C52 108 62 82 86 80 C86 80 76 104 52 108Z"  stroke="#B8CDB9" strokeWidth="0.8" />
      <path d="M112 110 C112 110 148 90 166 65"                    stroke="#B8CDB9" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M166 65 C166 65 156 40 134 38 C134 38 142 62 166 65Z" stroke="#B8CDB9" strokeWidth="0.8" />
      <path d="M112 80 C112 80 108 55 112 30 C116 55 112 80 112 80Z" stroke="#B8CDB9" strokeWidth="0.8" />
    </svg>
  );
}

function BotanicalBottomLeft() {
  return (
    <svg viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="absolute -bottom-10 -left-6 w-[180px] opacity-[0.05] pointer-events-none select-none rotate-[15deg]" aria-hidden="true">
      <path d="M100 280 C98 280 88 180 92 70"                      stroke="#B8CDB9" strokeWidth="1"   strokeLinecap="round" />
      <path d="M94 210 C94 210 136 195 158 172"                    stroke="#B8CDB9" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M158 172 C158 172 148 148 126 146 C126 146 134 168 158 172Z" stroke="#B8CDB9" strokeWidth="0.8" />
      <path d="M93 160 C93 160 56 142 36 118"                      stroke="#B8CDB9" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M36 118 C36 118 46 94 68 92 C68 92 60 114 36 118Z"  stroke="#B8CDB9" strokeWidth="0.8" />
      <path d="M92 110 C92 110 130 94 148 72"                      stroke="#B8CDB9" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M148 72 C148 72 138 50 118 48 C118 48 124 70 148 72Z" stroke="#B8CDB9" strokeWidth="0.8" />
      <path d="M92 70 C92 70 88 44 92 18 C96 44 92 70 92 70Z"      stroke="#B8CDB9" strokeWidth="0.8" />
    </svg>
  );
}

// ─── Grain overlay ────────────────────────────────────────────────────────────

const GRAIN_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E`;

// ─── Scroll indicator ─────────────────────────────────────────────────────────

function ScrollIndicator({ label }: { label: string }) {
  return (
    // Plain div owns the absolute positioning — no transform conflict with Framer Motion
    <div className="absolute bottom-12 left-0 right-0 flex justify-center">
      <motion.div {...fadeUp(1.3)} className="flex flex-col items-center gap-3">
        <div className="relative h-[50px] w-px overflow-hidden bg-green-mid/30">
          <motion.span
            className="absolute inset-x-0 top-0 h-full bg-green-light"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.4 }}
            style={{ transformOrigin: "top" }}
          />
        </div>
        <span className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-green-light/60">
          {label}
        </span>
      </motion.div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden bg-green-dark flex items-center justify-center"
    >
      {/* Radial gradient depth layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 20% 80%, rgba(74,107,78,0.40) 0%, transparent 100%),
            radial-gradient(ellipse 55% 45% at 80% 20%, rgba(61,94,63,0.30) 0%, transparent 100%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Grain / noise layer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: `url("${GRAIN_SVG}")`, backgroundRepeat: "repeat", backgroundSize: "300px 300px" }}
        aria-hidden="true"
      />

      {/* Botanical line art */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <BotanicalTopRight />
        <BotanicalBottomLeft />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-[900px] mx-auto">

        {/* Badge */}
        <motion.div {...fadeUp(0.5)}>
          <span className="inline-flex items-center gap-3 rounded-full border border-green-mid/50 px-6 py-2">
            <span className="relative flex h-[6px] w-[6px] shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-sage opacity-60" />
              <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-green-sage" />
            </span>
            <span className="font-sans text-[0.72rem] font-medium uppercase tracking-[0.3em] text-green-light">
              {h.badge}
            </span>
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          {...fadeUp(0.7)}
          className="mt-8 font-serif font-light text-cream leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
        >
          {h.h1}{" "}
          <em className="text-green-light italic">{h.h1em}</em>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          {...fadeUp(0.9)}
          className="mt-7 max-w-[550px] font-sans text-[1.05rem] font-light leading-relaxed tracking-wide text-green-light/80"
        >
          {h.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(1.1)} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button as="a" href="#contacto" variant="primary" dark>{h.cta1}</Button>
          <Button as="a" href="#proyectos" variant="outline" dark>{h.cta2}</Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator label={h.scroll} />
    </section>
  );
}
