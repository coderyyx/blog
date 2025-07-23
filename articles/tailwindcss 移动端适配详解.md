# Tailwind CSS 移动端适配详解

## 背景

本文主要介绍如何使用 Tailwind CSS 进行移动端适配以及原理的详解。

## 前置知识

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

经过探索，我们摸索出了一套通用的方案，可以满足大部分场景。**把构建时的单位迁移至运行时确定，引入一个中间 `css 变量`**

## 实现原理

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
px: '1px',
0: '0px',
1: '0.25rem', // 4px
2: '0.5rem',  // 8px
3: '0.75rem', // 12px
4: '1rem',    // 16px
5: '1.25rem', // 20px
6: '1.5rem',  // 24px
7: '1.75rem', // 28px
8: '2rem',    // 32px
9: '2.25rem', // 36px
10: '2.5rem', // 40px
10.5: '2.625rem', // 42px
// 其余预设单位同理
```

通过上面对比，可以知道我们在 `gtThemeAdapter` 函数中，将 `mr-1` 转换为 `calc(4 * var(--tpx))`。只要在标准设备尺寸下将 `tpx` 始终保持为 `1px` 的大小，我们就可以继续沿用 TailwindCSS 的“1 个基本单位为 4px”的规则。

以下是一些具体案例：

- 在标准设备尺寸下使用 rem 布局，`RootFontSize` 为 16px，`tpx` 为 0.0625rem，即 1 / 16 = 0.0625。
- 在标准设备尺寸下使用 rem 布局，`RootFontSize` 为 100px，`tpx` 为 0.01rem，即 1 / 100 = 0.01。详情可见 [apps/tailwindcss-demo/about](../apps/tailwindcss-demo/src/pages/about/index.jsx)
- 在标准设备尺寸下使用 vw 布局，假设屏幕宽度为 375px，100vw = 375px，因此 1vw = 3.75px，则 1px 为 1vw/3.75，即 `tpx` 为 (100/375)vw。
- 如果移动端和 PC 端在同一个应用中，那么在页面尺寸发生变化时，动态修改 `--tpx` 的值即可。例如，在 PC 端设置 `--tpx` 为 1px，而在移动端设置 `--tpx` 为 0.01rem 或(1/3.75)vw。
