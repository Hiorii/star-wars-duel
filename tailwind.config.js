/** @type {import('tailwindcss').Config} */
export const THEME_COLORS = {
  primary: 'var(--primary-color)',
  secondary: 'var(--secondary-color)',
  warning: '#990000'
};

module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  darkMode: false,
  theme: {
    extend: {
      colors: THEME_COLORS,
      boxShadow: {
        'button-shape': '0 0 25px #FFE81F',
        'button-shape-hover': '0 0 5px #FFE81F, 0 0 25px #FFE81F, 0 0 50px #FFE81F, 0 0 100px #FFE81F',
        'button-shape-secondary': '0 0 25px white',
        'button-shape-secondary-hover': '0 0 5px white, 0 0 25px white, 0 0 50px white, 0 0 100px white'
      },
      textShadow: {
        custom: '1px 0 10px #fff'
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
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-stroke-white': {
          '-webkit-text-stroke-width': '2px',
          '-webkit-text-stroke-color': '#fff'
        },
        '.text-stroke-black': {
          '-webkit-text-stroke-width': '2px',
          '-webkit-text-stroke-color': '#000'
        },
        '.text-stroke-yellow': {
          '-webkit-text-stroke-width': '2px',
          '-webkit-text-stroke-color': '#FFE81F'
        }
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-custom': {
          textShadow: '1px 0 10px red'
        }
      });
    },
    require('tailwindcss-textshadow')
  ]
};
