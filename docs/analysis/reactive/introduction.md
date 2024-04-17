---
title: 深入响应式原理
date: 2023-02-04
tags: 
  - vue
categories: 
  - frontend
---

前面 2 章介绍的都是 Vue 怎么实现数据渲染和组件化的，主要讲的是初始化的过程，把原始的数据最终映射到 DOM 中，但并没有涉及到数据变化到 DOM 变化的部分。而 Vue 的数据驱动除了数据渲染 DOM 之外，还有一个很重要的体现就是数据的变更会触发 DOM 的变化。

其实前端开发最重要的 2 个工作，一个是把数据渲染到页面，另一个是处理用户交互。Vue 把数据渲染到页面的能力我们已经通过源码分析出其中的原理了，但是由于一些用户交互或者是其它方面导致数据发生变化重新对页面渲染的原理我们还未分析。

考虑如下示例：

```html
<div id="app" @click="changeMsg">
  {{ message }}
</div>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  },
  methods: {
    changeMsg() {
      this.message = 'Hello World!'
    }
  }
})
```
当我们去修改 `this.message` 的时候，模板对应的插值也会渲染成新的数据，那么这一切是怎么做到的呢？

在分析前，我们先直观的想一下，如果不用 Vue 的话，我们会通过最简单的方法实现这个需求：监听点击事件，修改数据，手动操作 DOM 重新渲染。这个过程和使用 Vue 的最大区别就是多了一步“手动操作 DOM 重新渲染”。这一步看上去并不多，但它背后又潜在的几个要处理的问题：

1. 我需要修改哪块的 DOM？

2. 我的修改效率和性能是不是最优的？

3. 我需要对数据每一次的修改都去操作 DOM 吗？

4. 我需要 case by case 去写修改 DOM 的逻辑吗？

如果我们使用了 Vue，那么上面几个问题 Vue 内部就帮你做了，那么 Vue 是如何在我们对数据修改后自动做这些事情呢，接下来我们将进入一些 Vue 响应式系统的底层的细节。