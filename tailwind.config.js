/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
  corePlugins: {
    preflight: false, // https://stackoverflow.com/questions/71715157/tailwinds-ant-design-button-color-is-white-but-has-own-color-wnen-i-hover-it
  },
  // darkMode: false,
}
