const px2tpx = require('./src/tailwindcss/postcss-px2tpx');
const tailwindcss = require('tailwindcss');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    tailwindcss(),
    postcssPresetEnv(),
    px2tpx({
      source: 'px',
      target: 'var(--tpx)',
    }),
  ],
};
