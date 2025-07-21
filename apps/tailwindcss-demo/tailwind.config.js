/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    colors: {
      // g => general
      'ys-g': {
        game: {
          elemental: {
            pyro: '#ff6640',
            hydro: '#00c0ff',
            anemo: '#33d7a0',
            electro: '#cc80ff',
            dendro: '#90cc00',
            cyro: '#7af2f2',
            geo: '#ffb00d',
          },
        },
        func: {
          yellow: {
            DEFAULT: '#FFCC33',
            2: '#E59900',
          },
          red: '#ff5e41',
          blue: '#37a5ea',
          green: {
            DEFAULT: '#9be53d',
            2: '#79B230',
          },
          cyan: '#4dffff',
          orange: '#F48F01',
        },
      },
      // d => dark
      'ys-d': {
        grey: {
          blue: {
            1: '#2C323D',
            2: '#3B4252',
            3: '#4A5366',
            4: '#586172',
            5: '#676E7E',
            6: '#757C8B',
          },
        },
        brand: {
          golden: {
            1: '#B1987D',
            2: '#A58769',
            3: '#997754',
            4: '#816447',
            5: '#685139',
          },
          yellow: {
            1: '#CEB096',
            2: '#C29E7D',
            3: '#B78B64',
            4: '#A17A58',
            5: '#8B6A4C',
          },
        },
        text: {
          yellow: {
            1: '#B1987D',
            2: '#A58769',
            3: '#997754',
            4: '#816447',
            5: '#685139',
          },
        },
      },
      // l=> light
      'ys-l': {
        grey: {
          white: {
            1: '#F4EFE8',
            2: '#F0EAE0',
            3: '#ECE5D8',
            4: '#DBD1BF',
            5: '#CBBDA7',
            6: '#BCA890',
          },
        },
        brand: {
          golden: {
            1: '#E7D8B3',
            2: '#DDCA9F',
            3: '#D3BC8E',
            4: '#C3AA80',
            5: '#B49872',
          },
          yellow: {
            1: '#E5D7BB',
            2: '#DCC9A5',
            3: '#D3BC8E',
            4: '#C2AA80',
            5: '#B29A76',
          },
        },
        text: {
          yellow: {
            1: '#E7D8B3',
            2: '#DDCA9F',
            3: '#D3BC8E',
            4: '#C3AA80',
            5: '#B49872',
          },
        },
      },
    },
    extend: {
      colors: {
        white: 'rgba(255, 255, 255, 1)',
        black: 'rgba(0, 0, 0, 1)',
        transparent: 'rgba(255, 255, 255, 0)',
        // 通用颜色 g => general
        'gt-g': {
          func: {
            error: 'rgba(255, 77, 77, 1)',
            bg: 'rgba(0, 0, 0, 0.65)',
            toast: 'rgba(0, 0, 0, 0.75)',
          },
          grey: {
            white: {
              1: 'rgba(255, 255, 255, 1)',
              2: 'rgba(255, 255, 255, 0.48)',
              3: 'rgba(255, 255, 255, 0.32)',
              4: 'rgba(255, 255, 255, 0.16)',
              5: 'rgba(255, 255, 255, 0.12)',
              6: 'rgba(255, 255, 255, 0.08)',
              7: 'rgba(255, 255, 255, 0.04)',
              8: 'rgba(255, 255, 255, 0.8)',
              9: 'rgba(255, 255, 255, 0.64)',
              10: 'rgba(255, 255, 255, 0.02)',
            },
            black: {
              1: 'rgba(0, 0, 0, 1)',
              2: 'rgba(0, 0, 0, 0.48)',
              3: 'rgba(0, 0, 0, 0.32)',
              4: 'rgba(0, 0, 0, 0.16)',
              5: 'rgba(0, 0, 0, 0.12)',
              6: 'rgba(0, 0, 0, 0.08)',
              7: 'rgba(0, 0, 0, 0.04)',
              9: 'rgba(0, 0, 0, 0.64)',
            },
          },
        },
        // d => dark
        'gt-d': {
          text: {
            primary: 'rgba(0, 0, 0, 0.90)',
            secondary: 'rgba(0, 0, 0, 0.65)',
            tertiary: 'rgba(0, 0, 0, 0.45)',
            quaternary: 'rgba(0, 0, 0, 0.25)',
            black: {
              1: '#000',
              2: 'rgba(0, 0, 0, 0.90)',
              3: 'rgba(0, 0, 0, 0.65)',
              4: 'rgba(0, 0, 0, 0.45)',
              5: 'rgba(0, 0, 0, 0.25)',
            },
          },
        },

        // l => light
        'gt-l': {
          text: {
            primary: 'rgba(255, 255, 255, 0.90)',
            secondary: 'rgba(255, 255, 255, 0.65)',
            tertiary: 'rgba(255, 255, 255, 0.45)',
            quaternary: 'rgba(255, 255, 255, 0.35)',
            white: {
              1: '#fff',
              2: 'rgba(255, 255, 255, 0.90)',
              3: 'rgba(255, 255, 255, 0.65)',
              4: 'rgba(255, 255, 255, 0.45)',
              5: 'rgba(255, 255, 255, 0.35)',
            },
          },
        },
      },
    },
  },
  plugins: [],
};
