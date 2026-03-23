"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.4, 0, 0.2, 1] as const;

// Total visible duration before the exit starts (ms)
const HOLD_DURATION = 1800;

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Only show once per session
    const alreadySeen = sessionStorage.getItem("splash-seen");
    if (alreadySeen) {
      setVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("splash-seen", "1");
    }, HOLD_DURATION);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: EASE } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-green-dark"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.6, ease: EASE, delay: 0.1 },
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              transition: { duration: 0.5, ease: EASE },
            }}
            className="flex flex-col items-center gap-8"
          >
            {/* SVG logo — filter converts black paths to cream */}
            <img
              src="/plantula-logo.svg"
              alt="Plántula"
              width={160}
              height={160}
              style={{
                filter:
                  "brightness(0) saturate(1) invert(96%) sepia(6%) saturate(400%) hue-rotate(50deg) brightness(103%)",
              }}
            />

            {/* Wordmark */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: EASE, delay: 0.4 },
              }}
              className="font-serif text-2xl font-light uppercase tracking-[0.35em] text-cream"
            >
              Plántula
            </motion.span>

            {/* Subtle loading line */}
            <motion.div
              className="h-px w-16 origin-left bg-green-sage/60"
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: 1,
                transition: { duration: 1.2, ease: EASE, delay: 0.3 },
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
