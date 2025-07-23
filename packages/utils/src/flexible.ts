import { debounce, round } from 'lodash-es';

const UI_WIDTH = 375;
const baseFontSize = 100;

const DeviceWidth = document.documentElement && document.documentElement.clientWidth;

function setRootFontSize(rootFontSize?: number) {
  const width = document.documentElement && document.documentElement.clientWidth;

  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // 不无限缩放，最大宽度为750px
  const maxWidth = Math.min(parseFloat(width.toString()), 750);
  const fontSize = ((maxWidth / UI_WIDTH) * (rootFontSize || baseFontSize)).toFixed(4);
  document.documentElement.style.fontSize = fontSize + 'px';
  window.__ROOT_FONT_SIZE__ = fontSize + 'px';

  // 适配对font-size额外处理的手机
  const nowFontSize = parseFloat(getComputedStyle(document.documentElement, false)['font-size']);
  if (nowFontSize + '' !== fontSize) {
    const fixedFontSize = (fontSize * fontSize) / nowFontSize;
    document.documentElement.style.fontSize = fixedFontSize + 'px';
    window.__ROOT_FONT_SIZE__ = fixedFontSize + 'px';
  }
}

const handler = debounce(function () {
  setRootFontSize();
}, 300);

export const flexible = (rootFontSize?: number) => {
  // 设置全局 CSS 变量，用于在组件中便捷地使用响应式单位
  document.documentElement.style.setProperty('--tpx', '0.01rem');

  setRootFontSize(rootFontSize);
  window.addEventListener('resize', handler);
  // 一些设备初始计算有 bug，延迟重新计算
  setTimeout(() => setRootFontSize(rootFontSize), 1000);
};

export function px2rem(px: number) {
  return round(px / baseFontSize, 4);
}

export function px2px(px: number) {
  return round(px2rem(px) * parseFloat(window.__ROOT_FONT_SIZE__).toFixed(4), 1);
}

export function pxTransform(size: number) {
  const result = size * (DeviceWidth / UI_WIDTH);
  return round(result);
}
