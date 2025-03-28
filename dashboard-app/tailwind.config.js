/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary)',
        secondary: 'rgb(var(--color-secondary))',
        accent: 'rgb(var(--color-accent))'
      }
    }
  },
  plugins: []
}