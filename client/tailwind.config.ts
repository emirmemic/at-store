import typography from '@tailwindcss/typography';
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
        'sf-pro-display': ['var(--font-sf-pro-display)', 'sans-serif'],
      },
      screens: {
        md: '840px',
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
        black: '#000000',
        white: '#ffffff',
        blue: {
          DEFAULT: '#3577e5',
          light: '#e5edf1',
          steel: '#252732',
          dark: '#0d3372',
        },
        green: {
          DEFAULT: '#22C55E',
          dark: '#15803D',
        },
        grey: {
          DEFAULT: '#968c8c',
          'almost-white': '#f6f6f6',
          'extra-light': '#ededed',
          silver: '#E1E1E1',
          light: '#d0d0d0',
          medium: '#cac3c3',
          dark: '#7d7d7d',
          darker: '#6a6a6a',
          darkest: '#2e2e30',
          'almost-black': '#121212',
        },
        orange: {
          DEFAULT: '#F59E0B',
          dark: '#B45309',
        },
        pink: {
          soft: '#ff8997',
        },
        red: {
          deep: '#c81b1b',
          darkest: '#3f0008',
        },
      },
      boxShadow: {
        'inset-black-top':
          'inset 0 .25rem .25rem 0 rgba(0, 0, 0, 0.35), inset 0 -0.25rem .25rem 0 rgba(255, 255, 255, 0.16)',
        'inset-black-full': 'inset 0 0 0 .125rem rgba(0, 0, 0, 0.35)',
        'inset-blue': 'inset 0 0 0 2px #3577e5',
        'standard-black': '0px .25rem .25rem 0px rgba(0, 0, 0, 0.25)',
        'standard-black-hover': '0px .35rem .35rem 0px rgba(0, 0, 0, 0.4)',
        'outline-black': ' 0px 0.125rem 0.625rem 0px rgba(0, 0, 0, 0.25)',
        'outline-black-hover': '0px 0.125rem 0.725rem 0px rgba(0, 0, 0, 0.45)',
        'slider-drop-shadow': '0 .25rem .25rem .3125rem rgba(0, 0, 0, 0.35)',
        'popup-black': '0px 6px 4px 0px rgba(0, 0, 0, 0.35)',
      },
      spacing: {
        '6px': '0.375rem',
        '10px': '0.625rem',
        '14px': '0.875rem',
        '18px': '1.125rem',
        '38px': '2.375rem',
        'nav-height': '3.5rem',
        'screen-h-cutoff': 'calc(100vh - 3.5rem)',
      },
      keyframes: {
        slideDown: {
          from: { height: '0rem', opacity: '0' },
          to: {
            height: 'var(--radix-collapsible-content-height)',
            opacity: '1',
          },
        },
        slideUp: {
          from: {
            height: 'var(--radix-collapsible-content-height)',
            opacity: '1',
          },
          to: { height: '0rem', opacity: '0' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.5s ease-out',
        slideUp: 'slideUp 0.5s ease-out',
      },
    },
  },

  plugins: [
    animate,
    typography,
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
          fontSize: '4rem',
          lineHeight: 'normal',
        },
        '.heading-1': {
          '@apply typography-heading': {},
          fontSize: '3rem',
        },
        '.heading-2': {
          '@apply typography-heading': {},
          fontWeight: '400',
          fontSize: '2.5rem',
        },
        '.heading-3': {
          '@apply typography-heading': {},
          fontWeight: '400',
          fontSize: '2.25rem',
        },
        '.heading-4': {
          '@apply typography-heading': {},
          fontWeight: '400',
          fontSize: '1.5rem',
          lineHeight: '1.875rem',
        },
        '.heading-5': {
          '@apply typography-heading': {},
          fontSize: '1rem',
          fontWeight: '300',
          lineHeight: '1.875rem',
        },
        '.title': {
          '@apply typography-paragraph': {},
          lineHeight: 'var(--line-height-large)',
          fontSize: '2.25rem',
        },
        '.paragraph-1': {
          '@apply typography-paragraph': {},
          lineHeight: 'var(--line-height-large)',
          fontSize: '1.5rem',
        },
        '.paragraph-2': {
          '@apply typography-paragraph': {},
          lineHeight: 'var(--line-height-medium)',
          fontWeight: '300',
          fontSize: '1rem',
        },
        '.paragraph-3': {
          '@apply typography-paragraph': {},
          fontWeight: '900',
          fontSize: '.8125rem',
        },
        '.paragraph-4': {
          '@apply typography-paragraph': {},
          fontWeight: '400',
          fontSize: '.75rem',
        },
        '.paragraph-5': {
          '@apply typography-paragraph': {},
          fontSize: '.6875rem',
        },
        '.paragraph-6': {
          '@apply typography-paragraph': {},
          fontWeight: '500',
          fontSize: '.625rem',
        },
        '.bullet-1': {
          '@apply typography-paragraph': {},
          fontSize: '1.25rem',
          lineHeight: '1.625rem',
        },
        '.bullet-2': {
          '@apply typography-paragraph': {},
          lineHeight: 'var(--line-height-medium)',
        },
        '.bullet-heading-1': {
          '@apply typography-heading': {},
          letterSpacing: '0.0625rem',
          fontSize: '2rem',
        },
        '.bullet-heading-2': {
          '@apply typography-heading': {},
          fontSize: '1.25rem',
          lineHeight: '1.875rem',
        },
        '.navigation': {
          '@apply typography-paragraph': {},
          fontWeight: '300',
          fontSize: '.875rem',
        },
        '.footer-text': {
          fontWeight: '300',
          color: '#6b7280',
          fontSize: '.875rem',
          lineHeight: '1.125rem',
        },
        '.footer-navigation': {
          '@apply footer-text': {},
          fontWeight: '400',
        },
        '.button-1': {
          '@apply typography-button': {},
          fontSize: '1rem',
        },
        '.button-2': {
          '@apply typography-button': {},
          fontWeight: '400',
          fontSize: '1rem',
        },
        '.container-max-width': {
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          '@screen lg': {
            paddingLeft: '3rem',
            paddingRight: '3rem',
          },
        },
        '.container-max-width-lg': {
          width: '100%',
          maxWidth: '1800px',
          margin: '0 auto',
        },
        '.container-max-width-xl': {
          width: '100%',
          maxWidth: '2200px',
          margin: '0 auto',
        },
        '.blur-background': {
          'backdrop-filter': 'blur(.125rem)',
          'background-color': 'rgba(0, 0, 0, 0.2)',
        },
        '.custom-scrollbar': {
          '&::-webkit-scrollbar': {
            width: '0.25rem',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#d0d0d0',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#3577e5',
          },
        },
      });
    },
  ],
} satisfies Config;
