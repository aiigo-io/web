/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5468ff',
        secondary: '#6c63ff',
        dark: '#1a1a2e',
        light: '#f7f7f9',
        indigo: {
          300: '#a5b4fc',
          500: '#6366f1',
        },
        rose: {
          300: '#fda4af',
          500: '#f43f5e',
        },
        amber: {
          500: '#f59e0b',
        },
        violet: {
          500: '#8b5cf6',
        },
        cyan: {
          500: '#06b6d4',
        },
      },
    },
  },
  plugins: [],
} 