import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5F0E8",
        "cream-light": "#FAF8F3",
        "green-dark": "#2C3E2D",
        "green-mid": "#4A6B4E",
        "green-sage": "#7A9B7E",
        "green-light": "#B8CDB9",
        "green-pale": "#D4E2D4",
        beige: "#E8DFD0",
        "text-dark": "#1A2A1B",
        "text-mid": "#3A4A3B",
        "text-light": "#6B7B6C",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
