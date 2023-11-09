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
      textShadow: {
        'custom': '1px 0 10px #fff',
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
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-stroke-white': {
          '-webkit-text-stroke-width': '2px',
          '-webkit-text-stroke-color': '#fff',
        },
        '.text-stroke-black': {
          '-webkit-text-stroke-width': '2px',
          '-webkit-text-stroke-color': '#000',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
    function({ addUtilities }) {
      addUtilities({
        '.text-shadow-custom': {
          textShadow: '1px 0 10px red',
        },
      });
    },
    require('tailwindcss-textshadow')
  ]
};
