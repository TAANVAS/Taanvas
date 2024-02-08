/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,js}",
      './index.html',
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            500: '#9064d9'
          },
          secondary: {
            500: '#53b0be'
          }
        },
      },
    },
    plugins: [],
}
