import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#F9F5F0",
        burgundy: {
          DEFAULT: "#8B4513",
          light: "#A0522D",
          dark: "#6B3410",
        },
        gold: {
          DEFAULT: "#D4A017",
          light: "#E8B84B",
          dark: "#B8860B",
        },
        sepia: {
          50: "#FAF6F1",
          100: "#F4EBE0",
          200: "#E8D5BA",
          300: "#D4B896",
          400: "#C09B72",
          500: "#A67C52",
          600: "#8B5E3C",
          700: "#6B4226",
          800: "#4A2C15",
          900: "#2D1A0A",
        },
        ink: "#2C1810",
        cream: "#FDF8F3",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        body: ["Lora", "Georgia", "serif"],
        script: ["Dancing Script", "cursive"],
        sans: ["Nunito", "system-ui", "sans-serif"],
      },
      fontSize: {
        base: ["18px", "1.7"],
        lg: ["20px", "1.6"],
        xl: ["24px", "1.5"],
        "2xl": ["30px", "1.4"],
        "3xl": ["36px", "1.3"],
        "4xl": ["48px", "1.2"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      boxShadow: {
        warm: "0 4px 24px rgba(139, 69, 19, 0.12)",
        "warm-lg": "0 8px 40px rgba(139, 69, 19, 0.18)",
        parchment: "0 2px 8px rgba(44, 24, 16, 0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
      },
      backgroundImage: {
        "parchment-texture": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='%23F9F5F0'/%3E%3Ccircle cx='1' cy='1' r='0.5' fill='%23E8D5BA' opacity='0.4'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
