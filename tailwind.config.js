/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [
      function({ addUtilities }) {
        addUtilities({
          '.transform-style-preserve-3d': {
            'transform-style': 'preserve-3d',
          },
          '.perspective-1000': {
            'perspective': '1000px',
          },
        })
      }
    ]
  }