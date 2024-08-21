import colors from 'tailwindcss/colors'


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: {
          DEFAULT: colors.indigo[200],
          hover: colors.indigo[300],
          border: colors.indigo[400],
          text: colors.indigo[500],
          dark: colors.indigo[800],
          ['dark-hover']: colors.indigo[900],
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
}

