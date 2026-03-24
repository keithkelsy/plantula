"use client";

import { useLanguage } from "@/context/LanguageContext";

function PlantLogoMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="14" y1="26" x2="14" y2="10" stroke="rgba(184,205,185,0.30)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M14 18 C14 18 6 16 5 9 C9 9 14 13 14 18Z"   stroke="rgba(184,205,185,0.30)" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
      <path d="M14 14 C14 14 22 12 23 5 C19 5 14 9 14 14Z" stroke="rgba(184,205,185,0.30)" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/plantula___/", Icon: InstagramIcon },
  { label: "WhatsApp",  href: "#",                                        Icon: WhatsAppIcon  },
  { label: "Facebook",  href: "#",                                        Icon: FacebookIcon  },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-green-sage/[0.12] bg-green-dark">
      <div className="mx-auto max-w-[1300px] px-6 py-12 lg:px-12">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">

          {/* Logo + copyright */}
          <div>
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <PlantLogoMark />
              <span className="font-serif text-[1.1rem] uppercase tracking-[0.2em] text-cream">Plántula</span>
            </div>
              <p className="mt-2 font-sans text-[0.75rem] font-light text-green-sage">
                {t.footer.copyStart}{" "}
                <a
                  href={t.footer.authorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-green-light"
                >
                  {t.footer.author}
                </a>
                . {t.footer.copyEnd}
              </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-green-sage/20 text-green-light transition-all duration-300 hover:border-green-sage hover:bg-green-sage/10"
              >
                <Icon />
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}
