/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff3eb',
          100: '#ffe4c6',
          200: '#fecb9b',
          300: '#fdaa66',
          400: '#fb8133',
          500: '#f95e09', // Base logo orange
          600: '#ea4706',
          700: '#c23306',
          800: '#9a2a0d',
          900: '#7d250f',
          950: '#430f05',
        },
        secondary: {
          50: '#f5f7fa',
          100: '#eaeef4',
          200: '#d1dce7',
          300: '#a8bed4',
          400: '#799bbc',
          500: '#577da3',
          600: '#436387',
          700: '#364f6d', // Base logo slate
          800: '#30445b',
          900: '#2b394d',
          950: '#212735',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        warning: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        }
      }
    },
  },
  plugins: [],
}
