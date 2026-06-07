/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maternity: {
          50: '#fff6f5',   // Softest warm blush background
          100: '#fde7e4',  // Light rose-petal accent
          200: '#fbcbc4',  // Warm highlight
          600: '#d97870',  // Deep soothing rose for headings
          700: '#be5e56',  // Deep button text color
          900: '#4a2825',  // Warm comforting dark text
        }
      }
    },
  },
  plugins: [],
}