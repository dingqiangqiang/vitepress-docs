# 大杂脍汇总
## v-once
> 内置指令: 只渲染一次元素或组件，重新渲染时，元素、组件及其所有的子节点将被视为静态内容并跳过(可以缓存虚拟节点)，用于优化更新性能。

使用场景:
```vue
<div v-once>我是静态内容 {{ msg }} </div>
```
编译结果如下:
```js
function render(_ctx, _cache) {
  return _cache[0] || (
    _setBlockTracking(-1),
    _cache[0] = _createElementVNode("div", null, [
      _createTextVNode("我是静态内容 " + _toDisplayString(_ctx.msg), 1 /* TEXT */)
    ]),
    _setBlockTracking(1),
    _cache[0]
  )
}
```
::: danger 缺点
 使用该指令后，如果 msg 发生变化，模板也不会重新渲染
:::
> vue3.2之后，新增了 v-memo 指令，通过依赖列表的方式控制页面渲染
```vue
<div v-memo="[msg]">
  <p v-once>我是静态内容 {{ msg }} </p>
</div>
```
编译结果如下:
```js
function render(_ctx, _cache) {
  return _withMemo([_ctx.msg], () => (_openBlock(), _createElementBlock("div", null, [
    _cache[0] || (
      _setBlockTracking(-1),
      _cache[0] = _createElementVNode("p", null, [
        _createTextVNode("我是静态内容 " + _toDisplayString(_ctx.msg), 1 /* TEXT */)
      ]),
      _setBlockTracking(1),
      _cache[0]
    )
  ])), _cache, 1)
}
```
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
vue2 中: `v-for 优先级更高(先解析v-for，在解析v-if，导致先循环在判断，浪费性能)`

vue3 中: `v-if 优先级更高(会被移至外层标签)`

> 可以使用计算属性代替两者互相有依赖的场景

```vue
<ul><li v-for="item in list" v-if="exist"></li></ul>
```
上述模板会被编译成如下 render 函数：
```js
// vue2
function render() {
  with(this) {
    return _c('ul', _l((list), function (item) {
      return (exist) ? _c('li') : _e()
    }), 0)
  }
}

// vue3
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("ul", null, [
    (_ctx.exist)
      ? (_openBlock(true), _createElementBlock(_Fragment, { key: 0 }, _renderList(_ctx.list, (item) => {
          return (_openBlock(), _createElementBlock("li"))
        }), 256 /* UNKEYED_FRAGMENT */))
      : _createCommentVNode("v-if", true)
  ]))
}
```
## Vue.use 实现原理

> `用于安装 Vuejs 插件`: 如果插件是对象，必须提供 install 方法，如果是函数，它将被作为 install 方法。 install 方法调用时，会把 Vue 作为参数传入，这样插件中就不在需要依赖 Vue 了。

作用:
- 1、添加全局指令、全局过滤器、全局组件
- 2、通过全局混入来添加一些组件选项
- 3、添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现

插件简单实现:
```js
const plugin1 = {
  install(_Vue, ...args) {
    console.log(_Vue, args)
  }
}
const plugin2 = (_Vue, ...args) => {
  console.log(_Vue, args)
}

Vue.use(plugin1, 1, 2, 3)
Vue.use(plugin2, 1, 2, 3)
```
源码实现:
```js
Vue.use = function (plugin: Function | Object) {
  const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
  if (installedPlugins.indexOf(plugin) > -1) { // 如果已经有插件，直接返回
    return this
  }

  const args = toArray(arguments, 1) // 除了第一项其它的参数整合成数组
  args.unshift(this) // 将 Vue 放入到数组中
  if (typeof plugin.install === 'function') {
    plugin.install.apply(plugin, args)
  } else if (typeof plugin === 'function') {
    plugin.apply(null, args)
  }
  installedPlugins.push(plugin) // 缓存插件
  return this
}
```
Vue.use 接受一个 plugin 参数，并且维护了一个 _installedPlugins 数组，它存储所有注册过的 plugin；
接着又会判断 plugin 有没有定义 install 方法，如果有的话则调用该方法，并且该方法执行的第一个参数是 Vue；最后把 plugin 存储到 installedPlugins 中。 

可以看到 Vue 提供的插件注册机制很简单，每个插件都需要实现一个静态的 install 方法。当我们执行 Vue.use 注册插件的时候，就会执行这个 install 方法，并且在这个 install 方法的第一个参数我们可以拿到 Vue 对象，这样的好处就是作为插件的编写方不需要再额外去 import Vue 了。

[vue-router install 实现](https://dingqiangqiang.github.io/vue/vue-router/install.html)

[vuex install 实现](https://dingqiangqiang.github.io/vue/vuex/init.html)
## Vue.set 实现原理
> 为了解决 Vue2 中新增属性无法实现响应式的问题，Object.defineproperty 只会劫持已经存在的属性，而且数组也没有处理索引和长度问题。

源码实现:
```js
function set (target: Array<any> | Object, key: any, val: any): any {
  // 开发环境 && target 没定义 或者 是基础类型则报错
  if (process.env.NODE_ENV !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
  }
  // 数组调用 splice
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  // 如果是对象本身的属性，直接添加即可
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  // 如果是 Vue 实例或 根数据 $data 时报警告
  const ob = (target: any).__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    )
    return val
  }
  // 如果对象本身不是响应式也不需要将其定义成响应式属性
  if (!ob) {
    target[key] = val
    return val
  }
  // 将属性定义成响应式的
  defineReactive(ob.value, key, val)
  // 通知视图更新
  ob.dep.notify()
  return val
}
```
## Vue.mixin 实现原理
> 用来扩展组件，将公共逻辑进行抽离，在需要该逻辑时进行'混入',采用策略模式针对不同的属性进行合并(混入的数据和组件本身的数据冲突，以组件数据为准)。缺陷: `命名冲突、数据来源不清晰`

> 组件的扩展除了 mixin 之外还有一个属性叫 extends, 但是不怎么常用。

::: tip 合并策略:

1、props、methods、inject、computed 同名时会被替换

2、data 会被合并

3、声明周期、watch 会被合并成队列

4、components、directives、filters 会创建原型链
:::

源码实现:
```js
Vue.mixin = function (mixin: Object) {
  this.options = mergeOptions(this.options, mixin)
  return this
}

function mergeOptions(parent: Object, child: Object) {
  ...
  const extendsFrom = child.extends
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm)
  }
  if (child.mixins) { // 使用场景: 子组件定义了 mixins: [mixin] 选项
    for (let i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm)
    }
  }
  const options = {}
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField (key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}
// 不同的属性有不同的合并策略，以下是生命周期的合并逻辑
const LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', ...]

LIFECYCLE_HOOKS.forEach(hook => {
  strats[hook] = mergeHook
})

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (parentVal, childVal){
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}
```

## Vue.extend 实现原理
> 创建子类的构造函数，参数是一个包含组件选项的对象(data 必须是函数),子类继承 Vue 的构造函数。

```vue
const Profile = Vue.extend({
  template: '<p>{{ firstName }}</p>',
  data() {
    return {
      firstName: 'demo'
    }
  }
})
new Profile().$mount('#demo')
```
源码实现:
```js{4-8}
Vue.extend = function (extendOptions: Object): Function {
  const Super = this // Vue
  ...
  const Sub = function VueComponent (options) {
    this._init(options)
  }
  Sub.prototype = Object.create(Super.prototype)
  Sub.prototype.constructor = Sub
  ...
  return Sub
}
```
:::tip 优势
1、用于`手动挂载`组件。

2、所有组件创建时都会调用该方法进行创建。

3、后端存储的字符串模板可以通过该方法进行渲染，但是需要引入编译时。
::: 

## Vue.observable(object)
> 让一个对象可响应

源码实现:
```js
// 2.6 explicit observable API(2.6.0新增)
Vue.observable = <T>(obj: T): T => {
  observe(obj)
  return obj
}
```
返回的对象可以直接用于渲染函数和计算属性内，并且会在发生变更时触发相应的更新。

也可以作为最小化的跨组件状态存储器，用于简单的场景：
## 组件 data 为什么必须是函数?
- 1、根实例对象 data 可以是对象也可以是函数(单利)，不会产生数据污染的问题。

- 2、组件实例对象 data 必须为函数，防止多个组件实例对象之间公用一个 data，产生数据污染。所以需要通过工厂函数返回新的 data 作为组件的数据源。

- 3、`vue3 中的 data 都是函数`。

示例如下:
```js
// 对象版本如下
function Vue() {}
Vue.extend = function (options) {
  function Sub() {
    this.data = this.constructor.options.data
  }
  Sub.options = options
  return Sub
}
const Child = Vue.extend({
  data: { name: 'test' }
})
const child1 = new Child()
const child2 = new Child()
child1.data.name = 'haha'
// 修改 child1 中的 name，child2 中的 name 也变化了
console.log(child1.data.name, child2.data.name) // 'haha' 'haha'

// 函数版本如下
Vue.extend = function (options) {
  function Sub() {
    this.data = this.constructor.options.data()
  }
  ...
}
const Child = Vue.extend({
  data() { return {name: 'test'} }
})
...
child1.data.name = 'haha'
// 修改 child1 中的 name，child2 中的 name 不会变化
console.log(child1.data.name, child2.data.name) // 'haha' 'test'
```
## 权限校验(菜单、按钮)