/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./@src/**/*.{js,jsx,ts,tsx}",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
} 