"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Proceso", href: "#proceso" },
];

const SCROLL_THRESHOLD = 80;

// Mobile menu animation variants
const EASE = [0.4, 0, 0.2, 1] as const;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: EASE, delay: 0.1 } },
};

const menuItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay: 0.15 + i * 0.08 },
  }),
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

function PlantLogo({ scrolled, menuOpen }: { scrolled: boolean; menuOpen: boolean }) {
  const stroke = menuOpen ? "#FAF8F3" : scrolled ? "#2C3E2D" : "#FAF8F3";
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Stem */}
      <line x1="14" y1="26" x2="14" y2="10" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
      {/* Left leaf */}
      <path
        d="M14 18 C14 18 6 16 5 9 C9 9 14 13 14 18Z"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Right leaf */}
      <path
        d="M14 14 C14 14 22 12 23 5 C19 5 14 9 14 14Z"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function NavLink({
  href,
  children,
  scrolled,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  scrolled: boolean;
  onClick?: () => void;
}) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onClick?.();
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [href, onClick],
  );

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`
        relative font-sans text-[0.82rem] font-normal uppercase tracking-[0.15em]
        transition-colors duration-300 py-1
        after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0
        after:transition-[width] after:duration-300 after:ease-in-out
        hover:after:w-full
        ${
          scrolled
            ? "text-text-mid after:bg-green-dark hover:text-green-dark"
            : "text-cream/85 after:bg-cream hover:text-cream"
        }
      `}
    >
      {children}
    </a>
  );
}

function MobileNavLink({
  href,
  children,
  index,
  onClose,
}: {
  href: string;
  children: React.ReactNode;
  index: number;
  onClose: () => void;
}) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onClose();
      setTimeout(() => {
        const id = href.replace("#", "");
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 350);
    },
    [href, onClose],
  );

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      custom={index}
      variants={menuItemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="font-serif font-light text-3xl tracking-tight text-cream/90 hover:text-cream transition-colors duration-200"
    >
      {children}
    </motion.a>
  );
}

export default function Navbar() {
  // Start as false — will be set correctly on client via useEffect
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    // Set immediately on mount to catch page refreshes mid-scroll
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        className={`
          fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${
            scrolled
              ? "bg-cream-light/95 backdrop-blur-xl shadow-[0_1px_30px_rgba(44,62,45,0.06)] py-4"
              : "bg-transparent py-6"
          }
        `}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">

          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 shrink-0"
            aria-label="Plántula — ir al inicio"
          >
            <PlantLogo scrolled={scrolled} menuOpen={menuOpen} />
            <span
              className={`
                font-serif text-lg uppercase tracking-[0.25em] transition-colors duration-300
                ${scrolled ? "text-green-dark" : "text-cream"}
              `}
            >
              Plántula
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} scrolled={scrolled}>
                {link.label}
              </NavLink>
            ))}

            {/* Contact CTA */}
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`
                ml-4 inline-flex items-center px-6 py-2.5 font-sans text-[0.78rem]
                font-medium uppercase tracking-[0.15em] border transition-all duration-300
                hover:-translate-y-px
                ${
                  scrolled
                    ? "border-green-dark text-green-dark hover:bg-green-dark hover:text-cream"
                    : "border-cream/70 text-cream hover:bg-cream/10"
                }
              `}
            >
              Contacto
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            className="md:hidden flex flex-col justify-center gap-[5px] p-2 -mr-2"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className={`block h-[1.5px] w-7 origin-center transition-colors duration-300 ${
                menuOpen || !scrolled ? "bg-cream" : "bg-green-dark"
              }`}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className={`block h-[1.5px] w-7 transition-colors duration-300 ${
                menuOpen || !scrolled ? "bg-cream" : "bg-green-dark"
              }`}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className={`block h-[1.5px] w-7 origin-center transition-colors duration-300 ${
                menuOpen || !scrolled ? "bg-cream" : "bg-green-dark"
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-green-dark/97 backdrop-blur-md md:hidden"
          >
            {/* Close button */}
            <button
              onClick={closeMenu}
              aria-label="Cerrar menú"
              className="absolute top-6 right-6 p-2 text-cream/70 hover:text-cream transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </button>

            {/* Mobile links */}
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <MobileNavLink key={link.href} href={link.href} index={i} onClose={closeMenu}>
                  {link.label}
                </MobileNavLink>
              ))}

              <motion.a
                href="#contacto"
                custom={NAV_LINKS.length}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => {
                  e.preventDefault();
                  closeMenu();
                  setTimeout(() => {
                    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
                  }, 350);
                }}
                className="mt-4 inline-flex items-center border border-cream/30 px-8 py-3 font-sans text-xs uppercase tracking-[0.2em] text-cream/80 hover:text-cream hover:border-cream/60 transition-colors duration-200"
              >
                Contacto
              </motion.a>
            </nav>

            {/* Decorative bottom label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
              className="absolute bottom-8 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-green-sage/60"
            >
              Estudio botánico · Colombia
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
