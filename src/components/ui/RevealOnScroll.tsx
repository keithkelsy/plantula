"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Direction = "up" | "left" | "right";

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
}

const EASE = [0.4, 0, 0.2, 1] as const;

function getInitial(direction: Direction) {
  switch (direction) {
    case "left":
      return { opacity: 0, x: -28, y: 0 };
    case "right":
      return { opacity: 0, x: 28, y: 0 };
    case "up":
    default:
      return { opacity: 0, x: 0, y: 24 };
  }
}

export default function RevealOnScroll({
  children,
  delay = 0,
  direction = "up",
  className,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  const initial = getInitial(direction);
  const animate = isInView ? { opacity: 1, x: 0, y: 0 } : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.75, ease: EASE, delay }}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
