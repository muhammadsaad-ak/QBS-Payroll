/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./apps/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'app-bg': '#F8F9FA',
        'primary': '#026464',
        'secondary': '#F6F7F8',
        'neutral-gray': '#909090',
        'white-edgar': '#EDEDED',
        'silver-sand': '#C2C2C2',
        'white-smoke': '#9E9E9E', 
        teal: {
          100: '#E0F2F1',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
        },
      },
      fontFamily: {
        primary: ['"Noto Sans"', 'sans-serif'],
        secondary: ['"Inter"', 'sans-serif'],
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      fontSize: {
        'h1': ['2rem', { lineHeight: '2.5rem' }],    
        'h2': ['1.75rem', { lineHeight: '2.25rem' }],  
        'h3': ['1.5rem', { lineHeight: '2rem' }],      
        'h4': ['1.25rem', { lineHeight: '1.75rem' }],  
        'h5': ['1rem', { lineHeight: '1.5rem' }],      
        'h6': ['0.875rem', { lineHeight: '1.25rem' }], 
        'p': ['0.875rem', { lineHeight: '1.5rem' }],  
      },
    },
  },
  plugins: [],
};