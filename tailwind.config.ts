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
        primary: "#000000",
        secondary: "#506600",
        "secondary-container": "#c1f100",
        "on-secondary-container": "#546b00",
        background: "#f7f9fb",
        surface: "#f7f9fb",
        "surface-container": "#eceef0",
        "outline-variant": "#c6c6cd",
        "secondary-fixed": "#c3f400",
        "secondary-fixed-dim": "#abd600",
      },
      fontFamily: {
        space: ["var(--font-space-grotesk)"],
        manrope: ["var(--font-manrope)"],
      },
    },
  },
  plugins: [],
};
export default config;
