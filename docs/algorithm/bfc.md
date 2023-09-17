# 什么是 BFC 及应用场景 
## 概念

> BFC 即 block formatting context (**块级格式化上下文**)，它是一个独立的渲染区域，并且拥有一套渲染规则。它决定了其子元素如何定位，以及与其他元素的关系和相互作用。

特点: 只有区域内元素参与渲染，且不会影响其外部元素

## 布局规则
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之也如此。
- 内部的 Box 会在垂直方向，一个接一个地放置。
- Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的上下 margin 会发生重叠。
- BFC 的区域不会与 float box重叠（可以用此来解决自适应布局的问题）。
- 计算 BFC 的高度时，浮动元素也参与计算（撑开父元素，不会出现高度塌陷问题）。
- 每个盒子（块盒与行盒）的 margin box 的左边，与包含块 border box 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。

## 触发条件
- 根元素，即 HTML 元素
- `float` 不为 `none`
- `overflow`为 `auto`、 `scroll`、`hidden`(不为 `visible`: 内容不会被修剪，会呈现在元素框之外)
- `display` 为 `inline-block`、`table-cell`、`table-caption` 、`flex`、`inline-flex`
- `position` 为 `absolute` 或 `fixed`

## 使用场景
- 解决高度塌陷(父元素没有设置高度且子元素浮动(元素脱离文档流)时，父元素会出现高度塌陷)。
  解决方案: 父元素添加 overflow: hidden; 触发 BFC 即可解决(计算 BFC 高度时，浮动元素也参与计算)
- 实现自适应两列布局(BFC 的区域不会与 float box 重叠)
- 解决垂直方向 margin 合并问题(同一个 BFC 两个相邻 Box 的上下 margin 会发生重叠)
