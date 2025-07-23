# Tailwind CSS 移动端适配详解

## 背景

本文主要介绍如何使用 Tailwind CSS 进行移动端适配以及原理的详解。

## 前置知识

接触过 Tailwind CSS 的同学应该都知道，Tailwind CSS 中的一个单位是 `4px`。

举个例子 🌰：平时写 `tw-mr-1`，最终会编译成 `margin-right: 0.25rem;`，而一般 PC 端默认 html 的 `font-size` 是 `16px`，所以 `0.25rem` 就是 `4px`。也就有了在 tailwindcss 中一个单位就是 `4px` 的说法。

## 移动端适配
