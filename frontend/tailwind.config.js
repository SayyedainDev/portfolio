/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#FFFFFF',
        surface: '#F7F3F0',
        ink: '#251C19',
        muted: '#60524D',
        line: '#DFD7D4',
        amber: '#DD5316',
        'amber-fill': '#AA3606',
        petrol: '#005482',
        'petrol-deep': '#042234',
      },
      fontFamily: {
        display: ['Archivo', 'Arial Narrow', 'sans-serif'],
        sans: ['Source Sans 3', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
