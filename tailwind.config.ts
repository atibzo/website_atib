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
        // ── Sunset Coral & Teal ──────────────────────────────────────────
        cream: "#FBF3E9",
        "cream-deep": "#F4E6D4",
        sand: "#F1E0C6",
        coral: "#E0654B",
        "coral-soft": "#EC8C6E",
        teal: "#2E8B8B",
        "teal-deep": "#226A6E",
        seafoam: "#9FC8BE",
        gold: "#7E5E1C",
        "gold-soft": "#A8852F",
        // legacy alias kept so existing class names resolve to the new warm accent
        rust: "#D05A3E",
        "rust-soft": "#E0856A",
        sanskrit: "#C0563B",
        ink: "#4E443C",
        "ink-soft": "#7A675D",
        card: "#FFFDF8",
      },
      fontFamily: {
        // Bound to next/font CSS variables defined in app/layout.tsx
        script: ["var(--font-script)", "cursive"],
        display: ["var(--font-display)", "Georgia", "serif"],
        // legacy alias → display, so any leftover font-brush still resolves
        brush: ["var(--font-display)", "cursive"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
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
