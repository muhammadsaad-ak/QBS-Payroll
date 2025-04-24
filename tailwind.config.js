/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./apps/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#026464',
        secondary: '#F6F7F8',
        teal: { // Define different shades as needed
          100: '#E0F2F1', // Light teal for circle (example)
          500: '#14B8A6', // Main teal accent (example)
          600: '#0D9488', // Button teal (example)
          700: '#0F766E', // Button hover (example)
        },
      },
    },
  },
  plugins: [],
} 