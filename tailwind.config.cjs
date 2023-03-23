/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      scale: {
        80: '.8'
      },
      fontFamily: {
        main: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui'],

      },
      colors: {
        black: '#262626',
        accent: {
          lighter: "#515151",
          "0": "#262626",
          darker: "#1e1e1e"
        },
        main: {
          light: {
            "lighter": "#fbfbfb",
            0: "#fafafa",
            "darker": "#c8c8c8"
          },
          dark: {
            "lighter": "#515151",
            0: "#262626",
            "darker": "#1e1e1e"
          }
        }
      }

    },
  },
  plugins: [],
}
