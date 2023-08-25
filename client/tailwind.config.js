/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#9696FC',
        light: '#ffffff',
        dark: '#28282B',
      },
    },
  },
  plugins: [],
};
