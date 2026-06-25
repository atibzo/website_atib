import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FBF4EC",
        "cream-deep": "#F5E9DC",
        rust: "#BC5836",
        "rust-soft": "#C97A52",
        gold: "#B8923C",
        "gold-soft": "#CDA85B",
        sanskrit: "#B5533A",
        ink: "#5B4A42",
        "ink-soft": "#7A675D",
        card: "#FFFDFA",
      },
      fontFamily: {
        // Bound to next/font CSS variables defined in app/layout.tsx
        script: ["var(--font-script)", "cursive"],
        brush: ["var(--font-brush)", "cursive"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        arabic: ["var(--font-arabic)", "serif"],
      },
      boxShadow: {
        card: "0 24px 60px -28px rgba(120, 72, 45, 0.35)",
        soft: "0 10px 30px -12px rgba(120, 72, 45, 0.25)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s ease both",
        "bounce-soft": "bounce-soft 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
