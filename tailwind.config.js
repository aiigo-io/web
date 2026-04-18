/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./@src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
        serif: ['Instrument Serif', 'serif'],
      },
      colors: {
        ink: {
          950: '#0A0B0D',
          900: '#0F1113',
          800: '#15171B',
          700: '#1C1F24',
          600: '#2A2E35',
          500: '#4A4E57',
          400: '#6B7079',
          300: '#9AA0AA',
          200: '#C8CDD5',
          100: '#E6E9ED',
          50: '#F3F4F6',
        },
        paper: '#F5F1EA',
        paper2: '#EDE7DC',
        lime: {
          DEFAULT: '#C6FF3F',
          dim: '#A8DC34',
        },
        amber: {
          warn: '#F7B955',
        },
        signal: {
          red: '#FF5D5D',
          green: '#4ADE80',
        }
      },
      animation: {
        'pulse-dot': 'pulseDot 1.8s ease-in-out infinite',
        'ticker': 'ticker 60s linear infinite',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.5, transform: 'scale(0.85)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    }
  },
  plugins: [],
}
