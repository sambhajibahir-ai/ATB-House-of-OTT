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
        background: "#FFFFFF",
        surface: "#F8FAFC",
        "surface-card": "#FFFFFF",
        "surface-border": "#E2E8F0",
        brand: {
          red: "#991B1B",       // Sober deep wine/burgundy
          crimson: "#B91C1C",   // Refined dark red
          slate: "#0F172A",     // Deep charcoal
          amber: "#B45309",     // Sober warm amber
          gold: "#D97706",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
