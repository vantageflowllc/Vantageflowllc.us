import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0B",
        "ink-soft": "#17171A",
        bone: "#F6F5F2",
        "bone-dim": "#EEECE6",
        stone: "#A39E93",
        "stone-dark": "#6B675E",
        line: "#DEDBD3",
        "line-dark": "#2A2A2D",
        flow: "var(--accent)",
        "flow-light": "var(--accent-light)",
        "flow-pale": "var(--accent-pale)"
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      letterSpacing: {
        tightest: "-0.04em",
        widest2: "0.28em"
      },
      maxWidth: {
        "8xl": "1600px"
      },
      transitionTimingFunction: {
        flow: "cubic-bezier(0.65, 0, 0.35, 1)"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        draw: {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" }
        }
      },
      animation: {
        marquee: "marquee 28s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
