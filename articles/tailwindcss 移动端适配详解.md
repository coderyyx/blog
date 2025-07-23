# Tailwind CSS 移动端适配详解

## 背景

本文主要介绍如何使用 Tailwind CSS 进行移动端适配以及原理的详解。

## 传统 Tailwind 单位机制回顾

Tailwind 默认使用 rem 作为单位：

- `tw-m-1` → `margin: 0.25rem` → 默认 16px 字体大小下，等于 4px
- 所有 spacing、lineHeight、borderRadius 等都基于 1rem = 16px 的假设

但在移动端开发中，常见的做法是：

- 使用 flexible.js 动态设置 html.fontSize，以实现等比缩放（如 html.fontSize = 100px）
- 或使用 vw 布局（如 1vw = 3.75px）

这就导致 Tailwind 的默认单位系统不再适用，因为：

- tw-m-1 在 html.fontSize = 100px 下，变成了 0.25rem = 25px，而不是期望的 4px
- Tailwind 无法感知设备的缩放比例

接触过 Tailwind CSS 的同学应该都知道，Tailwind CSS 中的一个单位是 `4px`。

举个例子 🌰：平时写 `tw-mr-1`，最终会编译成 `margin-right: 0.25rem;`，而一般 PC 端默认 html 的 `font-size` 是 `16px`，所以 `0.25rem` 就是 `4px`。也就有了在 `tailwindcss` 中一个单位就是 `4px` 的说法。

<img width="291" height="87" alt="image" src="https://github.com/user-attachments/assets/86a0b908-7249-4910-941a-b89514aab82c" />

可以在 `apps/tailwindcss-demo` 根路由下查看，根路由下使用 `16px` 作为基准。

## 移动端适配

根据上面的前置知识，我们知道一个新的移动端项目接入 `tailwindcss` 其实非常简单，仅需如下几步：

1. 将 `RootFontSize` 配置为 16px。
2. 注入 flexible.js 的脚本，随屏幕宽度变化等比设置 RootFontSize。[flexible 函数实现](../packages/utils/src/flexible.ts)
3. 配置好 `px2rem` 等 `PostCSS` 插件，将代码中的 `px` 单位转为合适的 `rem` 单位。
4. 接入 TailwindCSS。

这样我们就可以愉快的进行 `tailwindcss` 在移动端上进行开发了。但现实情况是接入的通常不是一个新项目，所以会存在比较复杂的场景（历史原因，大家都懂的），比如：

1. 已经存在的项目 RootFontSize 是 100px，方便开发进行换算。
2. 同一个项目同时存在 PC 端和移动端
3. 已有的项目使用的是 `vw` 的自适应方案

经过探索，我们摸索出了一套通用的方案，可以满足大部分场景。**将 Tailwind 的单位系统从静态的 rem 转换为动态可配置的单位，从而实现跨设备、跨布局方式（如 rem、vw）的统一适配。**

## 实现原理

> 将 Tailwind 的单位系统从 rem 拆离出来，通过 --tpx 这个变量控制单位大小

✅ 原理简述

- `--tpx` 表示 1px 的缩放值
- 所有 Tailwind 的单位都基于 `--tpx` 来计算
- 例如：`tw-m-1` → `margin: calc(4 * var(--tpx))`

这样做的好处是：

- Tailwind 的单位不再依赖 html.fontSize
- 可以动态控制单位大小（如响应式设计、多端适配）

### 代码解析：gtThemeAdapter(unit = "--tpx")

这个函数是整个适配方案的核心抽象层，它的作用是：

> 将 Tailwind 的单位从静态值（如 0.25rem）转换为基于 --tpx 的动态表达式

1. `convert(value)` 函数

```js
const convert = (value) => `calc(${16 * value} * var(${unit}))`;
```

- `value` 是 Tailwind 中的单位值（如 0.25 表示 4px）
- `16 * value` 表示转换为像素值（如 0.25 → 4px）
- 最终表达式为：`calc(4px * var(--tpx))`

2. `spacing` 的生成逻辑

```js
spacing: () => ({
  ...Array.from({ length: 96 }, (_, index) => index * 0.5)
    .filter((i) => i)
    .reduce((acc, i) => ({ ...acc, [i]: `${convert(i / 4)}` }), {}),
}),
```

- 生成从 0.5 到 47.5 的所有 tw-m-_、tw-p-_ 等间距值
- 每个值都通过 `convert(i / 4)` 转换为 `calc(... * var(--tpx))`

3. `lineHeight` 和 `borderRadius` 的生成逻辑

与 `spacing` 类似，这些属性也通过 `convert()` 转换为基于 `--tpx` 的表达式。

### Tailwind 配置中使用 `gtThemeAdapter`

```js
export default {
  theme: {
    extend: {
      ...gtThemeAdapter(),
      colors,
    },
  },
};
```

- `gtThemeAdapter()` 返回的配置对象被合并到 Tailwind 的 `theme.extend` 中
- 最终生成的 Tailwind 工具类样式中，所有单位都变成了 `calc(... * var(--tpx))`

### 运行时控制 `--tpx` 的值

在 `flexible.js` 中，通过动态设置 `--tpx` 的值来控制单位大小：

```js
document.documentElement.style.setProperty(
  "--tpx",
  `${1 / parseFloat(window.__ROOT_FONT_SIZE__)}rem`
);
```

📌 示例：
`html.fontSize` 表示标准设备尺寸下的大小

| 场景        | html.fontSize           | --tpx 值                             | tw-m-1 实际大小 |
| ----------- | ----------------------- | ------------------------------------ | --------------- |
| PC 默认     | 16px                    | 1 / 16 = 0.0625rem → 1px             | 4px             |
| 移动端      | 100px                   | 1 / 100 = 0.01rem → 1px              | 4px             |
| vw 布局     | N/A                     | (100 / 375)vw → 1px                  | 4px             |
| PC & 移动端 | PC: 16px, 移动端: 100px | PC: 1px = 4px, 移动端: 1px = 0.01rem | 4px             |

> 🎯 无论使用哪种布局方式，只要 `--tpx` 始终代表 1px，Tailwind 的单位系统就能保持一致！

核心代码如下，有删减，完整代码见 [gtThemeAdapter](../apps/tailwindcss-demo/src/tailwindcss/themes/index.js)

```js
export const gtThemeAdapter = (unit = "--tpx") => {
  const convert = (value) => `calc(${16 * value} * var(${unit}))`;

  return {
    spacing: () => ({
      ...Array.from({ length: 96 }, (_, index) => index * 0.5)
        .filter((i) => i)
        .reduce((acc, i) => ({ ...acc, [i]: `${convert(i / 4)}` }), {}),
    }),
    lineHeight: {
      3: `${convert(0.75)}` /* 12px */,
      3.25: `${convert(0.8125)}` /* 13px */,
      4: `${convert(1)}` /* 16px */,
      4.5: `${convert(1.125)}` /* 18px */,
      5: `${convert(1.25)}` /* 20px */,
      6: `${convert(1.5)}` /* 24px */,
      6.5: `${convert(1.625)}` /* 26px */,
      7: `${convert(1.75)}` /* 28px */,
      8: `${convert(2)}` /* 32px */,
      9: `${convert(2.25)}` /* 36px */,
      10: `${convert(2.5)}` /* 40px */,
      10.5: `${convert(2.625)}` /* 42px */,
    },
    borderRadius: {
      sm: `${convert(0.125)}` /* 2px */,
      DEFAULT: `${convert(0.25)}` /* 4px */,
      md: `${convert(0.375)}` /* 6px */,
      lg: `${convert(0.5)}` /* 8px */,
      xl: `${convert(0.75)}` /* 12px */,
      "2xl": `${convert(1)}` /* 16px */,
      "3xl": `${convert(1.5)}` /* 24px */,
    },
  };
};
```

修改 tailwindcss 的配置文件，引入 `gtThemeAdapter` 函数，并配置 `theme` 中的 `extend` 属性。

```js
export default {
  prefix: "tw-",
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      ...gtThemeAdapter(),
      colors,
    },
  },
  plugins: [basePlugin, scrollbarPlugin],
};
```

我们通过 `spacing` 分析一下是如何处理的。根据上述代码 `spacing` 生成如下结果：

```js
0.5: "calc(2 * var(--tpx))",
1: "calc(4 * var(--tpx))",
1.5: "calc(6 * var(--tpx))",
2: "calc(8 * var(--tpx))",
2.5: "calc(10 * var(--tpx))",
3: "calc(12 * var(--tpx))",
3.5: "calc(14 * var(--tpx))",
4: "calc(16 * var(--tpx))",
4.5: "calc(18 * var(--tpx))",
5: "calc(20 * var(--tpx))",
5.5: "calc(22 * var(--tpx))",
6: "calc(24 * var(--tpx))",
6.5: "calc(26 * var(--tpx))",
7: "calc(28 * var(--tpx))",
7.5: "calc(30 * var(--tpx))",
8: "calc(32 * var(--tpx))",
8.5: "calc(34 * var(--tpx))",
9: "calc(36 * var(--tpx))",
9.5: "calc(38 * var(--tpx))",
10: "calc(40 * var(--tpx))",
10.5: "calc(42 * var(--tpx))",
// 其余预设单位同理
```

对比 `tailwindcss` 的默认配置

```js
  0: '0px',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
// 其余预设单位同理
```

## 疑问

### convert 函数

convert 中为什么是 `16 * value`?

🧠 一句话总结：

> `16 * value` 是为了将 rem 单位转换为 px，因为默认情况下 `1rem = 16px`。

分析一下生成 spacing 的代码

```js
Array.from({ length: 96 }, (_, index) => index * 0.5)
  .filter((i) => i)
  .reduce((acc, i) => ({ ...acc, [i]: convert(i / 4) }), {});
```

部分如下：

| i（px） | i / 4 | convert(i / 4)         | 最终 CSS 值 |
| ------- | ----- | ---------------------- | ----------- |
| 0.5     | 0.125 | calc(2 \* var(--tpx))  | 2px         |
| 1       | 0.25  | calc(4 \* var(--tpx))  | 4px         |
| 1.5     | 0.375 | calc(6 \* var(--tpx))  | 6px         |
| 2       | 0.5   | calc(8 \* var(--tpx))  | 8px         |
| 2.5     | 0.625 | calc(10 \* var(--tpx)) | 10px        |
| 3       | 0.75  | calc(12 \* var(--tpx)) | 12px        |
| 3.5     | 0.875 | calc(14 \* var(--tpx)) | 14px        |
| 4       | 1.0   | calc(16 \* var(--tpx)) | 16px        |
| 5       | 1.25  | calc(20 \* var(--tpx)) | 20px        |
| 6       | 1.5   | calc(24 \* var(--tpx)) | 24px        |
| 8       | 2.0   | calc(32 \* var(--tpx)) | 32px        |
| 10      | 2.5   | calc(40 \* var(--tpx)) | 40px        |
| 12      | 3.0   | calc(48 \* var(--tpx)) | 48px        |
| 16      | 4.0   | calc(64 \* var(--tpx)) | 64px        |
| 20      | 5.0   | calc(80 \* var(--tpx)) | 80px        |
| 24      | 6.0   | calc(96 \* var(--tpx)) | 96px        |

所以对于 `tw-mt-1` -> `convert(1/4)` === `convert(0.25)` -> `calc(${16 * 0.25} * var(--tpx))` === `calc(4 * var(--tpx))`

当 --tpx 保持 1px，上述 `tw-mt-1` === `calc(4px)` 与 tailwind 默认保持一致
