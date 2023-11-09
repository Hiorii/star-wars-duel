/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  darkMode: false,
  theme: {
    extend: {
      boxShadow: {
        'button-shape': '0 0 25px #FFE81F',
        'button-shape-hover': '0 0 5px #FFE81F, 0 0 25px #FFE81F, 0 0 50px #FFE81F, 0 0 100px #FFE81F'
      },
      transitionDuration: {
        500: '500ms'
      },
      transitionProperty: {
        'box-shadow': 'box-shadow'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
