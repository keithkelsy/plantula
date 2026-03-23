"use client";

import { motion } from "framer-motion";
import type { MouseEventHandler } from "react";

type ButtonVariant = "primary" | "outline";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  dark?: boolean;
  className?: string;
  // anchor props
  as?: "a";
  href?: string;
  target?: string;
  rel?: string;
  // button props
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler;
  "aria-label"?: string;
}

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

export default function Button({
  children,
  as,
  variant = "primary",
  dark = false,
  className = "",
  href,
  target,
  rel,
  type = "button",
  disabled,
  onClick,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-3 px-8 py-4 font-sans text-xs font-medium uppercase tracking-[0.15em] cursor-pointer select-none";

  const styles: Record<ButtonVariant, Record<"light" | "dark", string>> = {
    primary: {
      light: "bg-cream text-green-dark",
      dark: "bg-green-dark text-cream",
    },
    outline: {
      light: "border border-green-dark text-green-dark bg-transparent",
      dark: "border border-cream text-cream bg-transparent",
    },
  };

  const mode = dark ? "dark" : "light";
  const classes = `${base} ${styles[variant][mode]} ${className}`;

  const hoverBg =
    variant === "outline"
      ? dark
        ? "rgba(250,248,243,0.08)"
        : "rgba(44,62,45,0.08)"
      : undefined;

  const motionProps = {
    className: classes,
    whileHover: {
      y: -2,
      boxShadow: "0 8px 30px rgba(44,62,45,0.18)",
      ...(hoverBg ? { backgroundColor: hoverBg } : {}),
    },
    whileTap: { y: 0, boxShadow: "none" },
    transition: { duration: 0.4, ease: EASE },
    "aria-label": ariaLabel,
  };

  if (as === "a") {
    return (
      <motion.a href={href} target={target} rel={rel} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
