/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {

      fontFamily: {
        main: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui'],

      },
      colors: {
        black: '#262626'
      }

    },
  },
  plugins: [],
}
