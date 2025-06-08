/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { colors: {
      'deep-navy': '#0A0F1C',
      'beige-light': '#E0DBD1',
      'beige-soft': '#C2B9A2',
      'beige-hover': '#D6CFB6',
      'midnight-blue': '#101a2f',
    },},
  },
  plugins: [],
}
