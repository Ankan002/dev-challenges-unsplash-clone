/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        "raleway": "'Raleway', sans-serif",
      },
      colors: {
        "primary-green": "#3DB46D",
        "primary-grey": "#BDBDBD",
        "primary-red": "#EB5757"
      }
    },
  },
  plugins: [],
}
