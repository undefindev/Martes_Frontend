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
          DEFAULT: colors.neutral[100],
          hover: colors.stone[200],
          border: colors.stone[300],
          text: colors.stone[400],
          dark: colors.stone[600],
          ["dark-hover"]: colors.stone[800]
        }
      }
    },
  },
  plugins: [],
}

