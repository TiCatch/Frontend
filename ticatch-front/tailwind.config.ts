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
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        primary: 'var(--color-primary)',
        black: 'var(--color-black)',
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
      },
      boxShadow: {
        simple: 'var(--simple-shadow)',
      },
      borderRadius: {
        12: '12px',
      },
      container: { center: true, screens: { sm: '100%', md: '1040px' } },
      keyframes: {
        blink: {
          '0%, 100%': { backgroundColor: 'var(--gray-400)' },
          '50%': { backgroundColor: 'var(--purple-400)' },
        },
      },
      animation: {
        blink: 'blink 1.5s infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
