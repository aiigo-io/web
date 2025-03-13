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
      },
    },
  },
  plugins: [],
} 