import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        blue: {
          primary: "#3577e5",
          dark: "#0d3372",
          light: "#e5edf1",
        },
        black: "#000000",
        gray: "#968c8c",
        white: "#ffffff",
      },
      fontSize: {
        display: "64px",
        heading1: "48px",
        heading2: "40px",
        heading3: "36px",
        heading4: "24px",
        heading5: "16px",
        paragraph1: "24px",
        paragraph2: "16px",
        paragraph3: "12px",
        paragraph4: "10px",
        paragraph5: "13px",
        paragraph6: "11px",
        button1: "16px",
        button2: "11px",
      },
      lineHeight: {
        l: "50px",
        m: "35px",
        s: "30px",
      },
      letterSpacing: {
        default: ".6px",
      },
      boxShadow: {
        insetBlack:
          "inset 0 4px 4px 0 rgba(0 0 0 / 0.35), inset 0 -4px 4px 0 rgba(255 255 255 / 0.16)",
        largeBlack: "0 4px 4px 5px rgba(0 0 0 / 0.35)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - .125rem)",
        sm: "calc(var(--radius) - .25rem)",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
