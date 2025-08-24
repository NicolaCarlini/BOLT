/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: {
          10: '#ffeef5',
        },
        blue: {
          10: '#eaf3fb',
        },
        yellow: {
          10: '#fff9e0',
        },
      },
    },
  },
  plugins: [],
};
