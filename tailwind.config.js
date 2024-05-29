/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    screens: {
      'xs': '480px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        black: "#333A42",
        blue: "#195b9c",
        "blue-500": "#17528C",
        green: "#24806E",
        white: "#fff",
        "gray-100": "#F3F5F6",
        "gray-200": "#E8EAED",
        "gray-300": "#DCE0E4",
        "gray-400": "#D1D6DC",
        "gray-500": "#C5CBD3",
        "gray-600": "#B9C1CA",
        "gray-700": "#AEB7C2",
        "gray-800": "#A2ACB9",
      },
    },
  },
  plugins: [],
}
