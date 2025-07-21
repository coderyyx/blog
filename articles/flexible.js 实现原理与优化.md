# 移动端响应式布局实践：基于 rem 的适配方案

## 一、背景介绍

在移动端开发中，我们经常需要面对不同尺寸的设备屏幕。为了让页面在各种设备上都能呈现出良好的显示效果，响应式布局变得尤为重要。本文将基于一个实际项目中的 [flexible.ts](../src/utils/flexible.ts) 代码，详细介绍一种基于 rem 的响应式布局方案。

## 二、使用
在项目入口文件引入 `flexible.ts` 文件，并调用 `flexible` 函数即可。

```typescript
import { flexible } from '@/utils/flexible';

flexible();
```

## 三、核心实现原理

### 2.1 基准设定

```typescript
const UI_WIDTH = 375;  // 设计稿基准宽度
const baseFontSize = 100;  // 基准字体大小
```

这里设定了两个重要的基准值：
- 设计稿基准宽度
- 基准字体大小：采用 100px 作为基准值，便于计算

### 2.2 响应式计算核心

```typescript
const MAX_WIDTH = 750;

function setRootFontSize() {
  const width = document.documentElement.clientWidth;
  const maxWidth = Math.min(parseFloat(width.toString()), MAX_WIDTH);
  const fontSize = ((maxWidth / UI_WIDTH) * baseFontSize).toFixed(4);
  document.documentElement.style.fontSize = fontSize + 'px';
}
```

核心计算逻辑：
1. 获取当前设备宽度
2. 限制最大宽度为 750px，避免在大屏设备上过度放大
3. 根据当前宽度与设计稿宽度的比例，计算根元素字体大小
4. 设置根元素字体大小，作为 rem 的基准值

### 2.4 设备兼容性处理

```typescript
const nowFontSize = parseFloat(getComputedStyle(document.documentElement, false)['font-size']);
if (nowFontSize + '' !== fontSize) {
  const fixedFontSize = (fontSize * fontSize) / nowFontSize;
  document.documentElement.style.fontSize = fixedFontSize + 'px';
}
```

针对某些设备对字体大小进行额外处理的情况，增加了修正逻辑，确保实际效果与预期一致。

## 四、工具函数

### 3.1 px 转 rem

```typescript
export function px2rem(px: number) {
  return round(px / baseFontSize, 4);
}
```

将设计稿中的 px 值转换为 rem 值，便于在样式中使用。

### 3.2 px 转实际像素

```typescript
export function px2px(px: number) {
  return round(px2rem(px) * parseFloat(window.__ROOT_FONT_SIZE__).toFixed(4), 1);
}
```

将设计稿中的 px 值转换为实际显示的像素值，用于特殊场景下的精确计算。

### 3.3 等比例转换

```typescript
export function pxTransform(size: number) {
  const result = size * (DeviceWidth / UI_WIDTH);
  return round(result);
}
```

根据当前设备宽度进行等比例转换，保持与设计稿的比例一致。

## 五、实践建议
**最大宽度限制**
   ```typescript
   const maxWidth = Math.min(parseFloat(width.toString()), 750);
   ```
   设置最大宽度限制，避免在平板等大屏设备上页面过度放大。有个比较常见的场景，移动端页面分享出去后如果在 PC 设备上打开，如果不加限制整体就会很大，影响最基本的展示。

## 六、疑问🤔

### 为什么选择 `100px` 作为基准字体大小

在 `flexible.ts` 中，基准字体大小被设置为 `100px`。这个值的选择基于以下考虑：

- 计算便利性：100 是一个容易计算的数值，便于开发者进行单位转换。设计稿尺寸除以 100 就是 rem 值，非常方便。
- 精度控制：使用 100 作为基准，可以保持较高的计算精度
- 行业标准：这是移动端响应式布局中常用的基准值


假设在 375px 宽度的设备上：
 - 根元素字体大小 = (375 / 375) × 100 = 100px
 - 此时 1rem = 100px

在 750px 宽度的设备上：
 - 根元素字体大小 = (750 / 375) × 100 = 200px
 - 此时 1rem = 200px

这样设计稿中的元素就能在不同设备上保持等比例缩放，实现响应式布局。

## 七、总结

这套响应式布局方案的优点：
1. 实现简单，容易理解和维护
2. 兼容性好，处理了各种设备适配问题
3. 提供了完整的工具函数，方便开发使用
4. 性能优化，使用防抖处理 resize 事件

建议在实际项目中：
1. 根据设计稿尺寸调整基准宽度
2. 合理使用工具函数进行单位转换
3. 注意设置合适的最大宽度限制
4. 在必要时增加设备特殊适配

通过这套方案，我们可以更好地处理移动端的响应式布局问题，提供更好的用户体验。