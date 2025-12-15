import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-tt-norms)"],
      },
      colors: {
        error: {
          500: "#EF4444",
        },
        success: {
          500: "#10B981",
        },
        text: "#18181B",
        border: "#E4E4E7",
        primary: {
          20: "#FEF7F5",
          50: "#FCEBE4",
          200: "#F4B095",
          300: "#F19D7A",
          DEFAULT: "#20483F",
        } /* orange */,
        secondary: {
          DEFAULT: "#0e1d39",
          20: "#F1F5FC",
          50: "#D3DFF4",
          300: "#2E60BD",
          400: "#1E3F7B",
        } /* dark blue */,
        background: "#ffffff",
        "background-light": "#1a1a1a",
        "border-input": "#E4E4E7",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
