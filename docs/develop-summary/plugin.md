# 框架中的插件机制
## 插件的概念
什么是插件?

插件是一种遵循一定规范的应用程序接口编写出来的程序，其只能运行在特定的框架下，而不能脱离指定的框架单独运行。

为什么需要插件?

一个框架往往是要面向持续性迭代的，在开发之初很难把所有需要支持的功能都想清楚，有时候还需要借助社区的力量去持续生产新的功能，这就要求框架具备一定的可扩展性。

插件化架构的优势:
- **插件与框架解耦、便于开发维护**
   
  比如在一个非插件化的系统中，业务系统就算经过良好设计，随着功能模块的增多，代码量激增，我们想要给系统加入新的功能，甚至是修复已有功能的BUG，都会越来越困难和低效，但插件化架构的系统，增加新功能，不是在一个庞大系统代码库中，而是在一个较小的系统或代码仓库中，因此不管已有系统多复杂，开发新的功能的接入复杂度始终一样。另外由于插件是一个独立的程序，它可以独立开发、修改、测试、发版等，当出现 BUG 时，修复测试一个插件，也比针对整个系统要简单得多。

- **框架扩展性极强**

  基于插件机制，开发者可以把重心聚焦于框架的核心实现，其它的能力可通过插件的方式来解决(比如 Vue 从设计上就是一个渐进式 JavaScript 框架，它本身的核心是解决视图渲染的问题，像国际化、路由等功能可以通过相应的插件来实现)。这样的架构设计清晰明了，易于理解，便于维护，另外可以减小类库的包体积，提高加载速度。另外框架可以通过接入不同插件的方式，来不断丰富框架的功能。开发者想要实现某个功能，只需引入相应的插件即可
  
- **可插拔**
  
  由于插件可以按需引入，开发者可动态化引入、配置，非常灵活。另外通过对多个单一职责的插件进行组合，开发者可实现多种复杂逻辑。

框架与插件的对接:

框架需要实现一套接口，用来对接插件，因此插件的编写必须要满足框架提供的规范(契约)。另外由于不同的框架对于插件的实现不同，因此不同框架之间的插件编写方式是不一样的
## Vue 中的插件机制
> **插件是一种能为 `Vue` 添加全局功能的工具代码**。 

::: tip Vue 的插件机制
每个插件都需要实现一个静态的 `install` 方法，当执行 `Vue.use` 注册插件的时候，就会执行这个 `install` 方法，并且在这个 `install` 方法的第一个参数我们可以拿到 `Vue` 对象。

这样的好处就是**作为插件的编写方不需要再额外去导入 Vue 了**。因为作为 `Vue` 的插件对 `Vue` 对象是有依赖的，但又不能单独去导入，因为那样会增加包体积，另外可能还会出现版本兼容的问题，所以就通过这种方式拿到 `Vue` 对象。
:::

下面是如何安装一个插件的示例：
```js
Vue.use(myPlugin, { /* 可选的选项 */ })

const myPlugin = {
  install(Vue, options) { 
    // 配置此应用 
  }
}
```
### `vue-router` 安装函数实现
```js{23-32}
Vue.use(VueRouter) // 将 vue-router 作为 vue 的插件来使用

export function install (Vue) {
  // 为了确保 install 逻辑只执行一次
  if (install.installed) return
  install.installed = true

  Vue.mixin({
    beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this
        this._router = this.$options.router // vue-router 实例
        this._router.init(this) // 执行实例的 init 方法
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
      ...
    },
    destroyed () {...}
  })

  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })

  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)
  ...
}
```
路由的 `install` 函数会在 `Vue` 原型上定义 `$router` 和 `$route` 2 个属性的 `get` 方法，这就是为什么我们可以在组件实例上可以访问 `this.$router` 以及 `this.$route`。 接着又通过 `Vue.component` 方法定义了全局的 `RouterLink` 和 `RouterView` 2 个组件，这也是为什么我们在写模板的时候可以使用这两个标签。

### `Vue.use` 的实现原理
```js{8-11}
Vue.use = function (plugin: Function | Object) {
  const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
  if (installedPlugins.indexOf(plugin) > -1) {
    return this
  }

  const args = toArray(arguments, 1)
  args.unshift(this)
  if (typeof plugin.install === 'function') {
    plugin.install.apply(plugin, args)
  } else if (typeof plugin === 'function') {
    plugin.apply(null, args)
  }
  installedPlugins.push(plugin)
 return this
}
```
`Vue.use` 接受一个 `plugin` 参数，并且维护了一个 `_installedPlugins` 数组，它存储所有注册过的 `plugin`；接着又会判断 `plugin` 有没有定义 `install` 方法，如果有的话则调用该方法，并且该方法执行的第一个参数是 `Vue`；最后把 `plugin` 存储到 `installedPlugins` 中。

[参考链接](https://dingqiangqiang.github.io/vue/vue-router/install.html)
## Webpack 中的插件机制
基于事件流的编程范例，一系列的插件运行
> `plugins` 选项用于以各种方式自定义 `webpack` 构建过程；使用阶段式的构建回调，开发者可以在 `webpack` 构建流程中引入自定义的行为
::: tip Webpack 的插件结构
- 一个 JavaScript 命名函数或 JavaScript 类。
- 在插件函数的 prototype 上定义一个 apply 方法。
- 指定一个绑定到 webpack 自身的事件钩子。
- 处理 webpack 内部实例的特定数据。
- 功能完成后调用 webpack 提供的回调。
:::
下面是如何安装一个插件的示例：
```js
// custom-webpack-plugin.js
class CustomPlugin { // 插件名称
  constructor(options) { // 插件参数
    this.options = options
  }
  // apply 方法在安装插件时，会被 webpack compiler 调用一次。
  // apply 方法可以接收一个 webpack compiler 对象的引用，从而可以在回调函数中访问到 compiler 对象。
  apply(compiler) {  // apply 方法
    compiler.hooks.done.tap('CustomPlugin', () => { // 插件处理逻辑
      console.log('编译完成~~~')
    })
  }
}
module.exports = CustomPlugin

// webpack.config.js
const CustomPlugin = require('./custom-webpack-plugin');
module.exports = {
  // ... 这里是其他配置 ...
  // 插件是由「具有 apply 方法的 prototype 对象」所实例化出来的
  plugins: [ new CustomPlugin({...}) ]
};
```
### 插件的调用过程
创建完 `Compiler` 对象过后，`Webpack` 就开始注册我们配置中的每一个插件了，因为再往后 `Webpack` 工作过程的生命周期就要开始了，所以必须先注册，这样才能确保插件中的每一个钩子都能被命中。
```js{6-9}
//  lib/webpack.js
const webpack = (options, callback) => {
	const compiler = new Compiler(options.context, options);
	if (Array.isArray(options.plugins)) {
		for (const plugin of options.plugins) {
			if (typeof plugin === "function") {
				plugin.call(compiler, compiler);
			} else {
				plugin.apply(compiler);
			}
		}
	}
	return compiler;
}

module.exports = webpack;
```
### Compiler
```js
// lib/Compiler.js
const { AsyncSeriesHook, SyncHook } = require("tapable");

class Compiler {
	constructor(context, options = {}) {
		this.hooks = Object.freeze({
			done: new AsyncSeriesHook(["stats"]),
			emit: new AsyncSeriesHook(["compilation"]),
      compilation: new SyncHook(["compilation", "params"]),
		})
  }
}
```
### Compilation
```js
// lib/Compilation.js
const { SyncHook } = require("tapable");

class Compilation {
  this.hooks = Object.freeze({
    buildModule: new SyncHook(["module"]),
    stillValidModule: new SyncHook(["module"])
  })
}
```
### tapable
[参考链接](/structure/webpack/tapable.html)
### 编写统计模块利用率的插件
```js
// stats-cache-plugin.js
const fs = require('fs-extra')
const chalk = require('chalk')
const PLUGINN_NAME = 'StatsCacheRatePlugin'
module.exports = class StatsCacheRatePlugin {
  constructor (options) {
    this.noCacheModules = 0
    this.cacheModules = 0
    this.cacheRate = 0
    this.fileName = options.fileName
  }

  apply (compiler) {
    compiler.hooks.compilation.tap(PLUGINN_NAME, compilation => {
      // 缓存模块
      compilation.hooks.stillValidModule.tap(PLUGINN_NAME, (module) => {
        this.cacheModules++
      })
      // 非缓存模块
      compilation.hooks.buildModule.tap(PLUGINN_NAME, (module) => {
        this.noCacheModules++
      })
    })
    compiler.hooks.done.tap(PLUGINN_NAME, (stats) => {
      const totalModules = this.noCacheModules + this.cacheModules
      this.cacheRate = (this.cacheModules / totalModules * 100).toFixed(2)
      const strRate = this.cacheRate + '\n'
      fs.outputFile(this.fileName, strRate) // 写入文件
        .then(data => {
          console.log(chalk.green(`缓存利用率收集成功:${this.fileName}. \n`))
        }).catch(e => {
          console.log(chalk.red(`缓存利用率收集失败:${JSON.stringify(e)}. \n`))
        })
    })
  }
}
// webpack.config.js
const StatsCacheRatePlugin = require('./stats-cache-plugin')
const path = require('path')

function resolveDist (filename) {
  return path.resolve(__dirname, filename)
}

module.exports = {
  plugins: [
    new StatsCacheRatePlugin({
      fileName: resolveDist(`${mode}_rate.txt`)
    })
  ]
}

```
[参考链接](https://www.webpackjs.com/contribute/writing-a-plugin/)