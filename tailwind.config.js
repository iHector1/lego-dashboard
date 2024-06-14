/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#1a202c',
        darkCard: '#2d3748',
        primary: '#3182ce',
        secondary: '#2b6cb0',
        accent: '#9f7aea',
      },
    },
  },
  plugins: [],
}
