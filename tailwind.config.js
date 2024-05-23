/** @type {import('tailwindcss').Config} */
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
    colors: {
      black: '#333A42',
      blue: '#195b9c',
      green: '#24806E',
      white: '#fff',
      'gray-100': '#F3F5F6',
      'gray-200': '#E8EAED',
      'gray-300': '#DCE0E4',
      'gray-400': '#D1D6DC',
    },
  },
  plugins: [],
}
