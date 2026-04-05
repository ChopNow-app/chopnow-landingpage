import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-abril)', 'serif'],
        sans: ['var(--font-outfit)', 'sans-serif'],
      },
      colors: {
        heat: {
          DEFAULT: '#0F0E0B',
          card: '#1C1916',
          border: '#2E2820',
          muted: '#3D3530',
        },
        cream: {
          DEFAULT: '#F0EBE0',
          warm: '#F7F3EC',
          muted: '#9A938A',
        },
        fire: {
          DEFAULT: '#F97316',
          dark: '#EA6A08',
        },
        spark: {
          DEFAULT: '#BDEF4F',
          dark: '#A8D438',
        },
        gold: '#C9973E',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        float: 'float 3.5s ease-in-out infinite',
        'float-b': 'float 3.5s ease-in-out 1.2s infinite',
        'float-c': 'float 4.5s ease-in-out 0.6s infinite',
        'float-d': 'float 4s ease-in-out 1.8s infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
