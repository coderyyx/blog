# Tailwind CSS 接入指南

## 简介

Tailwind CSS 是一个功能强大的 CSS 框架，它采用原子化 CSS 的方案，通过组合预定义的工具类来构建用户界面。这篇文档主要介绍如何快速接入、配置 Tailwind CSS 以及最佳实践。

## 安装依赖

首先需要安装 Tailwind CSS 及其依赖项：

```bash
pnpm add -D tailwindcss postcss autoprefixer
```

## 初始化配置文件

### PostCSS 配置

创建 `postcss.config.js` 文件：

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### Tailwind 配置

创建 `tailwind.config.js` 文件，这是 Tailwind CSS 的主要配置文件：

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  // 配置类名前缀，防止与现有样式冲突
  prefix: "tw-",

  // 配置需要处理的文件路径
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],

  // 主题配置
  theme: {
    // 自定义颜色
    colors: {
      // 可以根据项目需求自定义颜色系统
    },

    // 响应式断点配置
    screens: {
      sm: { max: "523px" },
      md: { max: "659px" },
      lg: { max: "884px" },
      xl: { max: "1024px" },
    },

    // 扩展现有主题
    extend: {
      // 在这里添加额外的主题配置
    },
  },

  // 插件配置
  plugins: [],
};
```

## 项目集成

### 在 CSS 文件中引入 Tailwind

在你的主 CSS 文件（如 `src/index.css` 或 `src/App.css`）中添加以下代码：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 使用示例

在 React 组件中使用 Tailwind CSS 类名：

```jsx
const App = () => {
  return (
    <div className="tw-text-[20px]">
      <h1>Hello Tailwind</h1>
      <p className="tw-text-sm tw-leading-3 tw-flex-center">
        使用 Tailwind CSS 构建界面
      </p>
    </div>
  );
};
```

## 最佳实践

### 1. 使用类名前缀

建议配置 `prefix` 选项（如 `tw-`），这样可以：

- 避免与现有样式冲突
- 明确标识 Tailwind 类名

### 2. 色盘配置

默认情况下，所有与颜色相关的核心插件（如 backgroundColor 、 borderColor 、 textColor 等）都会继承这些颜色。所以配置色盘后收益的是站点中所有与颜色相关的都可以使用色盘中的颜色。

可以按照以下方式组织颜色：

- 按照功能分类（如 functional colors）
- 按照主题分类（如 light/dark theme）
- 使用语义化命名（如 primary, secondary）

例如：

- [颜色配置](../apps/tailwindcss-demo/src/tailwindcss/colors/index.js)

> 笔者在公司项目中，通过维护统一的色盘，可以很方便的进行颜色管理。对一个站点或者一条产品线来说，设计师通常也会有一套色盘，我们和设计师约定好色值命名规则就可以配置色盘，后续使用时就可以快速选择颜色，而不需要去设计稿复制。

### 3. 响应式设计

Tailwind CSS 提供了强大的响应式设计支持：

- 使用 `screens` 配置自定义断点
- 使用响应式前缀（如 `sm:`, `md:`, `lg:`）
- 建议使用移动优先的设计方案

### 4. 自定义插件

可以通过插件机制扩展 Tailwind 的功能：

- 创建自定义工具类
- 添加新的组件样式

例如：

- [滚动条的样式](../apps/tailwindcss-demo/src/tailwindcss/plugins/scrollbar.js)
- [常用组合类](../apps/tailwindcss-demo/src/tailwindcss/plugins/base.js)

## 常见问题

### 1. 构建优化

Tailwind CSS 默认会生成大量工具类，要优化生产环境构建：

- 确保正确配置 `content` 选项
- 考虑使用 `@apply` 抽取常用组合

### 2. IDE 支持

为获得更好的开发体验：

- 安装 Tailwind CSS vscode [bradlc.vscode-tailwindcss](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- 使用支持 Tailwind CSS 的代码格式化工具 (推荐 prettier)

VSCode 相关配置（`.vscode/settings.json`）：

```json
{
  "tailwindCSS.rootFontSize": 16
}
```

- `tailwindCSS.rootFontSize`: 设置根元素字体大小（单位：px），这会影响 vscode 的提示。例如，当设置为 16px 时：
  - `1rem = 16px`
  - `0.25rem = 4px`（Tailwind 默认的 1 个间距单位）

### 3. 间距系统

Tailwind CSS 提供了一套完整的间距系统，默认情况下：

- 一个间距单位等于 0.25rem（通常为 4px）
- 间距值是成比例的，例如 16 是 8 的两倍
- 支持小数点值，如 0.5、1.5、2.5 等

> **重要说明：**
>
> 以 `tw-pl-1` 为例：
>
> - Tailwind 中的定义：`padding-left: 0.25rem`
> - VSCode 提示：当 `tailwindCSS.rootFontSize: 16px` 时，提示 `padding-left: 4px`
> - **注意**：实际渲染的像素值取决于 HTML 根元素的字体大小（即 `html` 元素的 `font-size`）

可以通过以下两种方式自定义间距：

1. 扩展默认间距

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      spacing: {
        13: "3.25rem", // 52px
        15: "3.75rem", // 60px
        128: "32rem", // 512px
        144: "36rem", // 576px
      },
    },
  },
};
```

2. 覆盖默认间距

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    spacing: {
      sm: "8px",
      md: "12px",
      lg: "16px",
      xl: "24px",
    },
  },
};
```

> 注意：间距配置会影响 padding、margin、width、height、gap、inset、space、translate、scrollMargin 和 scrollPadding 等核心插件。建议在项目初期就规划好间距系统，以保持一致性。

## 总结

笔者通过在公司项目中广泛使用 Tailwind CSS 后，发现它有如下几大优势，供参考：

- 可以不用定义 classname，直接使用 tailwind 的工具类，减少了命名成本。也不用在 template 和 script 中来回切换。
- 可以维护统一的色盘，方便统一管理颜色。
- 因为是原子类，所以可以很方便的进行组合，减少重复代码。这个收益会随你站点复杂度增加而增加。
