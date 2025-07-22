import colors from './src/tailwindcss/colors';
import { basePlugin } from './src/tailwindcss/plugins/base';
import { scrollbarPlugin } from './src/tailwindcss/plugins/scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  // 配置所有 Tailwind 类名的前缀。防止与现有类名冲突
  prefix: 'tw-',
  // 配置所有 HTML 模板、JavaScript 组件以及其他包含 Tailwind 类名的源文件的路径。
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
    // 屏幕断点
    screens: {
      sm: { max: `523px` },
      md: { max: `659px` },
      lg: { max: `884px` },
      xl: { max: `1024px` },
    },
    extend: {
      colors,
    },
  },
  plugins: [basePlugin, scrollbarPlugin],
};
