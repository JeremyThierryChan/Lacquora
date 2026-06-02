import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ─── Core Backgrounds ───
        obsidian:  '#0A0A0A',
        graphite:  '#141414',
        carbon:    '#1A1A1A',
        slate:     '#2C2C2C',
        // ─── Text Scale ───
        ash:       '#4A4A4A',
        smoke:     '#6E6E6E',
        silver:    '#ACACAC',
        ivory:     '#F5F0EB',
        white:     '#FFFFFF',
        // ─── Brand Accents ───
        gold: {
          DEFAULT: '#C9A84C',
          light:   '#E2C97E',
          dim:     '#8B6E2E',
          muted:   '#5C4A20',
        },
        lacquer: {
          DEFAULT: '#8B1A1A',
          light:   '#B22222',
          deep:    '#5C0F0F',
          bright:  '#CC2929',
        },
        // ─── Semantic ───
        success:  '#2D6A4F',
        error:    '#9B2226',
        warning:  '#CA6702',
      },

      fontFamily: {
        display:  ['"Cormorant Garamond"', ...defaultTheme.fontFamily.serif],
        'display-zh': ['"Noto Serif SC"', ...defaultTheme.fontFamily.serif],
        sans:     ['Inter', ...defaultTheme.fontFamily.sans],
        'sans-zh': ['"Noto Sans SC"', ...defaultTheme.fontFamily.sans],
        mono:     ['"Space Mono"', ...defaultTheme.fontFamily.mono],
      },

      fontSize: {
        'display-2xl': ['4.5rem',   { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-xl':  ['3.75rem',  { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-lg':  ['3rem',     { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'heading-xl':  ['2.25rem',  { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'heading-lg':  ['1.875rem', { lineHeight: '1.2',  letterSpacing: '-0.01em' }],
        'heading-md':  ['1.5rem',   { lineHeight: '1.25', letterSpacing: '-0.008em' }],
        'heading-sm':  ['1.25rem',  { lineHeight: '1.3',  letterSpacing: '-0.005em' }],
        'body-lg':     ['1.125rem', { lineHeight: '1.7' }],
        'body-md':     ['1rem',     { lineHeight: '1.7' }],
        'body-sm':     ['0.875rem', { lineHeight: '1.6' }],
        'label':       ['0.75rem',  { lineHeight: '1.5', letterSpacing: '0.08em' }],
        'label-lg':    ['0.8125rem',{ lineHeight: '1.5', letterSpacing: '0.06em' }],
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '120': '30rem',
        '140': '35rem',
        '160': '40rem',
        '180': '45rem',
        '200': '50rem',
      },

      maxWidth: {
        'site':    '1440px',
        'content': '1200px',
        'narrow':  '800px',
        'xs2':     '20rem',
      },

      aspectRatio: {
        'guitar':   '3 / 7',
        'guitar-h': '16 / 9',
        'card':     '4 / 5',
        'square':   '1 / 1',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gold':   'linear-gradient(135deg, #C9A84C 0%, #E2C97E 50%, #C9A84C 100%)',
        'gradient-dark':   'linear-gradient(180deg, transparent 0%, #0A0A0A 100%)',
        'gradient-vignette': 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)',
        'noise':           'url("/noise.svg")',
      },

      animation: {
        'fade-in':       'fadeIn 0.8s ease-out forwards',
        'fade-up':       'fadeUp 0.8s ease-out forwards',
        'fade-in-slow':  'fadeIn 1.4s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.7s ease-out forwards',
        'scale-in':      'scaleIn 0.6s ease-out forwards',
        'shimmer':       'shimmer 2s infinite',
        'pulse-gold':    'pulseGold 2s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0)' },
          '50%':       { boxShadow: '0 0 0 6px rgba(201,168,76,0.15)' },
        },
      },

      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },

      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'ease-out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },

      borderWidth: {
        '0.5': '0.5px',
      },

      blur: {
        'xs': '2px',
      },

      gridTemplateColumns: {
        'gallery-auto': 'repeat(auto-fill, minmax(320px, 1fr))',
        'masonry-3':    'repeat(3, 1fr)',
        'masonry-2':    'repeat(2, 1fr)',
      },

      zIndex: {
        '60':  '60',
        '70':  '70',
        '80':  '80',
        '90':  '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({ strategy: 'class' }),
    require('@tailwindcss/aspect-ratio'),
  ],
} satisfies Config
