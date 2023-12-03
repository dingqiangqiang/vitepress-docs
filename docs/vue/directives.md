# 自定义指令封装
## loading
> 数据请求过程中添加 loading，加载完成后移除 loading，优化产品交互，提升用户体验。
+ loading 组件开发
::: code-group
```vue
<template>
  <div class="loading">
    <div class="loading-content">
      <img width="24" height="24" src="./loading.gif">
      <p class="desc">{{title}}</p>
    </div>
  </div>
</template>
```
```javascript
<script>
  export default {
    name: 'loading',
    data() {
      return {
        title: '正在载入...'
      }
    },
    methods: {
      setTitle(title) {
        this.title = title
      }
    }
  }
</script>
```
```css
<style lang="scss" scoped>
  .loading {
    // 绝对定位(水平、垂直居中)
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    .loading-content {
      text-align: center;
      .desc {
        line-height: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
      }
    }
  }
</style>
```
:::
+ loading 指令开发
```javascript
import Loading from './loading'
import creatDirective from 'create-directive'
const loadingDirective = creatDirective(Loading)

export default loadingDirective

// creatDirective.js 实现
import { createApp } from 'vue'

const relativeCls = 'g-relative'

export default function creatDirective(Comp) {
  return {
    mounted(el, binding) {
      // el: 指令绑定到的元素, 可用于直接操作 DOM
      // binding: value: 传递给指令的值; oldValue: 之前的值; arg: 传递给指令的参数
      const app = createApp(Comp)
      const instance = app.mount(document.createElement('div')) // 创建组件实例
      const name = Comp.name
      // 确保多个指令应用在同一 DOM 元素时, instance 不会错乱
      if (!el[name]) {
        el[name] = {}
      }
      el[name].instance = instance
      // 获取指令动态参数，并设置
      const title = binding.arg
      if (typeof title !== 'undefined') {
        instance.setTitle(title)
      }

      if (binding.value) {
        append(el) // 挂载指令对应的 DOM 元素
      }
    },
    updated(el, binding) {
      const title = binding.arg
      const name = Comp.name
      if (typeof title !== 'undefined') {
        el[name].instance.setTitle(title)
      }
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    }
  }

  function append(el) {
    const name = Comp.name
    const style = getComputedStyle(el)
    // 确保指令作用元素的父元素的定位不为 static, 因为指令对应组件内部为绝对定位
    if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
      addClass(el, relativeCls)
    }
    // el[name].instance.$el 为 指令对应的 DOM 元素
    el.appendChild(el[name].instance.$el)
  }

  function remove(el) {
    const name = Comp.name
    removeClass(el, relativeCls)
    el.removeChild(el[name].instance.$el)
  }
}

// 添加类名
function addClass(el, className) {
  if (!el.classList.contains(className)) {
    el.classList.add(className)
  }
}
// 移除类名
function removeClass(el, className) {
  el.classList.remove(className)
}
```
+ 使用
```javascript
import loadingDirective from '@/components/base/loading/directive'
// 指令注册
createApp(App).directive('loading', loadingDirective)

// 组件内使用
<div v-loading="loading"></div>

computed: {
  loading() {
    return !this.sliders.length
  }
}
```
## no-result
+ no-result 组件开发
> 为页面添加暂无结果的样式，比如搜索无果等
::: code-group
```vue
<template>
  <div class="no-result">
    <div class="no-result-content">
      <div class="icon"></div>
      <p class="text">{{title}}</p>
    </div>
  </div>
</template>
```
```javascript
<script>
  export default {
    name: 'no-result',
    data() {
      return {
        title: '抱歉，没有结果'
      }
    },
    methods: {
      setTitle(title) {
        this.title = title
      }
    }
  }
</script>
```
```css
<style lang="scss" scoped>
  .no-result {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    .no-result-content {
      text-align: center;
      .icon {
        width: 86px;
        height: 90px;
        margin: 0 auto;
        @include bg-image('no-result');
        background-size: 86px 90px;
      }
      .text {
        margin-top: 30px;
        font-size: $font-size-medium;
        color: $color-text-d;
      }
    }
  }
</style>
```
:::
+ no-result 指令开发
```javascript
import NoResult from './no-result'
import creatDirective from 'create-directive'
const noResultDirective = creatDirective(NoResult)

export default noResultDirective
```
+ 使用
```javascript
import noResultDirective from '@/components/base/no-result/directive'
// 指令注册
createApp(App).directive('no-result', noResultDirective)

// 组件内使用
<scroll
  v-loading="loading"
  v-no-result:[noResultText]="noResult"
>
  ...
</scroll>
props: {
  noResultText: {
    type: String,
    default: '抱歉，暂无结果'
  }
},
computed: {
  noResult() {
    return !this.loading && !this.songs.length
  }
}
```

