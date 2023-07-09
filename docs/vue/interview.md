# 面试题梳理
## v-if 和 v-show 的区别
一、区别：

v-if: 条件不成立不会渲染当前指令所在节点的 dom 元素

v-show: 切换当前 dom 的显示或者隐藏(display: none)

二、模版编译:

[Vue2 链接](https://vue2-template-explorer.vercel.app/#%3Cdiv%20v-if%3D%22exist%22%3EHello%20World%3C%2Fdiv%3E)

[Vue3 链接](https://template-explorer.vuejs.org/#eyJzcmMiOiI8ZGl2IHYtaWY9XCJleGlzdFwiPkhlbGxvIFdvcmxkPC9kaXY+Iiwib3B0aW9ucyI6e319)

1、 v-if
```vue
<div v-if="exist">Hello World</div>
```
上述模板会被编译成如下 render 函数：
```js
// vue2
function render() {
  with(this) {
    return (exist) ? _c('div', [_v("Hello World")]) : _e()
  }
}
// vue3
import { openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode } from "vue"

export function render(_ctx, ...) {
  return (_ctx.exist)
    ? (_openBlock(), _createElementBlock("div", { key: 0 }, "Hello World"))
    : _createCommentVNode("v-if", true)
}
```

2、 v-show
```vue
<div v-show="exist">Hello World</div>
```
上述模板会被编译成如下 render 函数：
```js
// vue2
function render() {
  with(this) {
    return _c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (exist),
        expression: "exist"
      }]
    }, [_v("Hello World")])
  }
}
// vue3
import { vShow as _vShow, withDirectives as _withDirectives, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

export function render(_ctx, ...) {
  return _withDirectives((_openBlock(), _createElementBlock("div", null, "Hello World", 512 /* NEED_PATCH */)), [
    [_vShow, _ctx.exist]
  ])
}
```

:::warning 区别
v-if 被编译成三元表达式， v-show 被编译成 v-show 指令
::: 

## v-if 和 v-for 的优先级

## 权限校验(菜单、按钮)