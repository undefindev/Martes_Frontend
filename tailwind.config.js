import colors from "tailwindcss/colors"
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
          DEFAULT: colors.slate[200],
          hover: colors.slate[300],
          border: colors.slate[400],
          text: colors.slate[500],
          dark: colors.slate[900],
          red: colors.red[400],
          ["dark-hover"]: colors.slate[800]
        }
      }
    },
  },
  plugins: [],
}

