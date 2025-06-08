import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-pretendard)', 'sans-serif'],
      },
      height: {
        'inner-screen':
          'calc(100dvh - var(--header-height) - var(--footer-height))',
        'without-header': 'calc(100dvh - var(--header-height))',
        'without-footer': 'calc(100dvh - var(--footer-height))',
      },
      minHeight: {
        'inner-screen':
          'calc(100dvh - var(--header-height) - var(--footer-height))',
        'without-header': 'calc(100dvh - var(--header-height))',
        'without-footer': 'calc(100dvh - var(--footer-height))',
      },
      fontSize: {
        '2xs': 'var(--font-2xs)',
        xs: 'var(--font-xs)',
        s: 'var(--font-s)',
        m: 'var(--font-m)',
        l: 'var(--font-l)',
        xl: 'var(--font-xl)',
        '2xl': 'var(--font-2xl)',
        '3xl': 'var(--font-3xl)',
        '4xl': 'var(--font-4xl)',
        '5xl': 'var(--font-5xl)',
      },
      colors: {
        background: 'var(--background)',
        primary: 'var(--color-primary)',
        black: 'var(--color-black)',
        white: 'var(--color-white)',
        purple: {
          50: 'var(--purple-50)',
          100: 'var(--purple-100)',
          200: 'var(--purple-200)',
          300: 'var(--purple-300)',
          400: 'var(--purple-400)',
          500: 'var(--purple-500)',
          600: 'var(--purple-600)',
          700: 'var(--purple-700)',
          800: 'var(--purple-800)',
        },
        gray: {
          50: 'var(--gray-50)',
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          800: 'var(--gray-800)',
        },
        sub: {
          1: 'var(--color-sub1)',
          2: 'var(--color-sub2)',
          3: 'var(--color-sub3)',
          '3-50': 'var(--color-sub3-50)',
          4: 'var(--color-sub4)',
          '4-50': 'var(--color-sub4-50)',
          '4-100': 'var(--color-sub4-100)',
          5: 'var(--color-sub5)',
          6: 'var(--color-sub6)',
          7: 'var(--color-sub7)',
        },
        blackTip: {
          0.04: 'var(--blackTip-4)',
          0.08: 'var(--blackTip-8)',
          0.12: 'var(--blackTip-12)',
          0.14: 'var(--blackTip-14)',
          0.18: 'var(--blackTip-18)',
          0.2: 'var(--blackTip-20)',
          0.28: 'var(--blackTip-28)',
          0.6: 'var(--blackTip-60)',
        },
        abs: {
          white: 'var(--abs-white)',
          black: 'var(--abs-black)',
        },
      },
      boxShadow: {
        simple: 'var(--simple-shadow)',
        inner: 'var(--inner-shadow)',
        glass: 'var(--glass-shadow)',
      },
      borderRadius: {
        12: '12px',
      },
      backdropBlur: {
        glass: 'var(--glass-blur)',
      },
      container: { center: true, screens: { sm: '100%', md: '1040px' } },
      keyframes: {
        shine: {
          '0%': {
            transform: 'translateY(100%) translateX(-65%) rotate(-45deg)',
          },
          '100%': {
            transform: 'translateY(100%) translateX(10%) rotate(-45deg)',
          },
        },
        showText: {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' },
        },
      },
      animation: {
        shine: 'shine 2s infinite ease',
        'show-text': 'showText .5s ease-out forwards 4s',
      },
    },
  },
  plugins: [],
} satisfies Config;
