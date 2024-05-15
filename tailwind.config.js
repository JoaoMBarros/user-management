/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.vue'],
  theme: {
    extend: {
      backgroundImage: {
        'masked-login-bg': "linear-gradient(to right bottom, rgba(34, 150, 246, 0.8), rgba(0, 229, 253, 0.8)), url('public/login-bg.png')",
      },
      fontFamily: {
        sans: ['Mulish', 'sans-serif'],
        'mulish': ['Mulish', 'sans-serif']
      }
    },
  },
  plugins: [],
}