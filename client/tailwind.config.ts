import type { Config } from 'tailwindcss';
import { PluginAPI } from 'tailwindcss/types/config';
import animate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sf-pro': ['var(--font-sf-pro)', 'sans-serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        black: 'var(--color-black)',
        white: 'var(--color-white)',
        blue: {
          DEFAULT: 'var(--color-blue)',
          light: 'var(--color-blue-light)',
          steel: 'var(--color-blue-steel)',
          dark: 'var(--color-blue-dark)',
        },
        green: {
          DEFAULT: 'var(--color-green)',
        },
        grey: {
          DEFAULT: 'var(--color-grey)',
          'extra-light': 'var(--color-grey-extra-light)',
          light: 'var(--color-grey-light)',
          medium: 'var(--color-grey-medium)',
          dark: 'var(--color-grey-dark)',
          darker: 'var(--color-grey-darker)',
          darkest: 'var(--color-grey-darkest)',
        },
        pink: {
          soft: 'var(--color-pink-soft)',
        },
        red: {
          deep: 'var(--color-red-deep)',
          darkest: 'var(--color-red-darkest)',
        },
      },
      boxShadow: {
        'inset-black':
          'inset 0 4px 4px 0 rgba(0 0 0 / 0.35), inset 0 -4px 4px 0 rgba(255 255 255 / 0.16)',
        'large-black': '0 4px 4px 5px rgba(0 0 0 / 0.35)',
        'inset-blue':'inset 0 0 0 2px var(--color-blue)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - .125rem)',
        sm: 'calc(var(--radius) - .25rem)',
      },
      spacing: {
        '6px': 'var(--spacing-6px)',
        '10px': 'var(--spacing-10px)',
        '14px': 'var(--spacing-14px)',
        '18px': 'var(--spacing-18px)',
        '38px': 'var(--spacing-38px)',
      },
    },
  },
  plugins: [
    animate,
    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        '.typography-heading': {
          letterSpacing: 'var(--letter-spacing-default)',
          fontWeight: '700',
          lineHeight: 'var(--line-height-xlarge)',
        },
        '.typography-button': {
          letterSpacing: 'var(--letter-spacing-default)',
          fontWeight: '600',
          lineHeight: 'var(--line-height-small)',
        },
        '.typography-paragraph': {
          letterSpacing: 'var(--letter-spacing-default)',
          lineHeight: 'var(--line-height-small)',
          fontWeight: '400',
        },
        '.display': {
          '@apply typography-heading': {},
          fontSize: '64px',
        },
        '.heading-1': {
          '@apply typography-heading': {},
          fontSize: '48px',
        },
        '.heading-2': {
          '@apply typography-heading': {},
          fontSize: '40px',
        },
        '.heading-3': {
          '@apply typography-heading': {},
          fontSize: '36px',
        },
        '.heading-4': {
          '@apply typography-heading': {},
          fontSize: '24px',
          lineHeight: '40px',
        },
        '.heading-5': {
          '@apply typography-heading': {},
          fontSize: '16px',
          lineHeight: '30px',
        },
        '.title': {
          '@apply typography-paragraph': {},
          lineHeight: 'var(--line-height-large)',
          fontSize: '36px',
        },
        '.paragraph-1': {
          '@apply typography-paragraph': {},
          lineHeight: 'var(--line-height-large)',
          fontSize: '24px',
        },
        '.paragraph-2': {
          '@apply typography-paragraph': {},
          lineHeight: 'var(--line-height-medium)',
          fontWeight: '500',
          fontSize: '16px',
        },
        '.paragraph-3': {
          '@apply typography-paragraph': {},
          fontWeight: '900',
          fontSize: '13px',
        },
        '.paragraph-4': {
          '@apply typography-paragraph': {},
          fontWeight: '500',
          fontSize: '12px',
        },
        '.paragraph-5': {
          '@apply typography-paragraph': {},
          fontWeight: '900',
          fontSize: '11px',
        },
        '.paragraph-6': {
          '@apply typography-paragraph': {},
          fontWeight: '500',
          fontSize: '10px',
        },
        '.navigation': {
          '@apply typography-paragraph': {},
          fontWeight: '500',
          fontSize: '14px',
        },
        '.button-1': {
          '@apply typography-button': {},
          fontSize: '16px',
        },
        '.button-2': {
          '@apply typography-button': {},
          fontSize: '11px',
        },
      });
    },
  ],
} satisfies Config;
