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
        background: "#0c0e14",
        surface: "#141722",
        "surface-card": "#1a1e2c",
        "surface-border": "#2c3349",
        brand: {
          red: "#C51D24",
          crimson: "#D32F2F",
          burgundy: "#991B1B",
          amber: "#D97706",
          gold: "#EAB308",
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
