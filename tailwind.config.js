/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  relative: true,
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/container-queries'),
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      // addBase({
      //   h1: {
      //     fontSize: theme('fontSize.2xl'),
      //   },
      //   h2: {
      //     fontSize: theme('fontSize.xl'),
      //   },
      // })
      // addComponents({
      //   '.card': {
      //     backgroundColor: theme('colors.white'),
      //     borderRadius: theme('borderRadius.lg'),
      //     padding: theme('spacing.6'),
      //     boxShadow: theme('boxShadow.xl'),
      //   },
      // })
      // addUtilities({
      //   '.content-auto': {
      //     contentVisibility: 'auto',
      //   },
      // })
    }),
  ],
  corePlugins: {
    preflight: false, // https://stackoverflow.com/questions/71715157/tailwinds-ant-design-button-color-is-white-but-has-own-color-wnen-i-hover-it
  }, // костыль нужен только для Modal.confirm(), для обычного Modal работает без него
  // darkMode: false,
  important: true,
}
