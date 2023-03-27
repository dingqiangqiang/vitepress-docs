# 优化

这一节我们来看看如何实现 `webpack` 中的优化。我们先来编写最基本的 `webpack` 配置，然后依次实现优化项。

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 抽离样式文件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = mode => {
  return {
    mode: mode,
    entry: "./src/main.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist") // 出口必须是绝对路径
    },
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif)$/,
          use: "file-loader"
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          include: path.resolve('src'),
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react' // 支持 react，相当于配置 .babelrc
              ]
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            mode !== "development"
              ? MiniCssExtractPlugin.loader
              : "style-loader",
            "css-loader"
          ]
        }
      ]
    },
    plugins: [
      mode !== "development" &&
        new MiniCssExtractPlugin({
          filename: "css/[name].css"
        }),
      new HtmlWebpackPlugin({
        template: "./src/template.html",
        filename: "index.html"
      })
    ].filter(Boolean)
  };
};
```
`package.json` 新增如下运行命令: 
```json
"scripts": {
  "dev": "webpack-dev-server --env=development",
  "dev:build": "webpack --env=development",
  "build": "webpack --env=production"
}
```

## 1.删除无效样式
新建 `main.js`，引入 `style.css`
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './style.css'

ReactDOM.render(<div>hello</div>, document.getElementById('root'));
```
`style.css` 
```css
body {
  background: red
}
.class1 {  
  background: red // 无效样式，需要删掉
}
```

```js
const glob = require('glob');
const PurgecssPlugin = require('purgecss-webpack-plugin');


module.exports = {
  plugins: [
    mode !== "development" && new PurgecssPlugin({
      paths: glob.sync(`${path.join(__dirname, "src")}/**/*`, { nodir: true }) // 不匹配目录，只匹配文件
    })
  ]
}
```

## 2.图片压缩
```sh
npm install image-webpack-loader --save-dev
```

```js
{
  test: /\.(jpe?g|png|gif)/,
  use: [
    {
      loader: "file-loader"
    },
    env !== "development" && {
      loader: "image-webpack-loader",
      options: {
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        optipng: {
          enabled: false
        },
        pngquant: {
          quality: [0.65, 0.9],
          speed: 4
        },
        gifsicle: {
          interlaced: false
        },
    // the webp option will enable WEBP
        webp: {
          quality: 75
        }
      }
    }
  ].filter(Boolean)
}
```


## 3.`cdn` 加载资源
我们可以在 `index.html` 直接引入资源文件，比如下面的代码
```html
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
```
在 `main.js` 中可以按下面的方式来使用
```js
console.log('$', $)
```
此时 `$` 并不知道是哪里来的，因此我们想通过下面的方式进行使用:
```js
import $ from 'jquery'
console.log('$', $)
```
此时会将 `jquery` 进行打包，新增下面的配置即可
```js
externals: {
  'jquery':'$' // 声明 jquery 是外部变量
}
```
如果有多个链接不用全部在 `index.html` 引入，可以通过插件的方式引入，如下
```js
const AddAssetHtmlCdnPlugin = require('add-asset-html-cdn-webpack-plugin')
new AddAssetHtmlCdnPlugin(true,{
  'jquery':'https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js',
  'xxx': 'xxx'
})
```

## 4.1 摇树优化
:::tip
摇树优化，生产环境自动开启，实现前提是 `esModule`。
:::

新建 `calc.js`
```js
export const sum = (a, b) => {
  return a + b
};
export const minus = (a, b) => {
  return a - b
};

// 在 `main.js` 中引入，由于没有使用 sum 函数，生产环境下会自动被tree shaking
import { minus } from "./calc"
minus(1, 1)
```
由于开发环境下不会摇树优化，可以新增如下配置项标识哪个文件被使用了

```js
optimization: {
  usedExports: true 
}
```

新建 `test.js`
```js
export const test = ()=>{
  return 'test'
}
console.log(test());

// 在 `main.js` 中引入，但不执行, 此时会产生副作用代码
import { test } from './test' 
```

`package.json` 中新增如下配置
```json
"sideEffects": false // 不使用副作用(默认 true)
```

如果这样设置，默认就不会使用样式文件了 ，因为 `css` 是按 `import './style.css'` 方式导入的。解决方式如下: 
- 1、使用 `require` 语法导入
```js
require('./style.css')
```
- 2、声明 `css` 不是副作用
```json
"sideEffects":[
  "**/*.css"
]
```

## 4.2 作用域提升

作用域提升,可以减少代码体积，节约内存。
新建 `d.js`
```js
let a = 1
let b = 2
let c = 3
let d = a + b + c

export default d

// main.js
import d from './d';
console.log(d) // 最终打包后的结果会变成 console.log(6)
``` 

## 5.动态链接库
每次构建时第三方模块都需要重新构建，这个性能消耗比较大。我们可以先把第三方库打包好，以后构建时只需要查找构建好的库就好了，这样可以大大节约构建时间，大幅提高构建速度。

```js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<h1>hello</h1>, document.getElementById('root'))
```

### 5.1 DllPlugin 

我们可以将`react`、`react-dom` 单独进行打包，创建 `webpack.dll.js`。

```js
const path = require('path');
const DLLPlugin = require('webpack').DllPlugin

module.exports = {
  entry: ['react','react-dom'],
  mode: 'production',
  output:{
    filename: 'react.dll.js',
    path: path.resolve(__dirname, 'dll'),
    library: 'react',
    // libraryTarget:'commonjs2', // 默认用 var 接收。 commonjs(exports["react"]) commonjs2(module.exports) umd this var
  },
  plugins:[
    new DllPlugin({
      name: 'react', // name 要和上述 library 同名
      path: path.resolve(__dirname, 'dll/manifest.json')
    })
  ]
}
```
`package.json` 新增如下命令
```json
"dll": "webpack --config webpack.dll.js"
```
执行 `npm run dll`，可以看到 `dll` 目录下创建了两个文件分别是 `manifest.json`、`react.dll.js`。我们会通过 `manifest.json` 找到 `react.dll.js` 文件中的模块进行加载。

### 5.2 DllReferencePlugin
在我们的项目中可以引用刚才打包好的动态链接库

```js
const DLLReferencePlugin = require("webpack").DllReferencePlugin;
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');


new DllReferencePlugin({ // 构建时会引用动态链接库的内容
  manifest: path.resolve(__dirname, 'dll/manifest.json')
}),

new AddAssetHtmlWebpackPlugin({ // 手动引入 react.dll.js
  filepath: path.resolve(__dirname,'dll/react.dll.js') 
})
```

## 6.懒加载

```js
let btn = document.createElement('button');
btn.innerHTML = '懒加载';
btn.addEventListener('click',() => {
  import('./calc').then(res => {
    console.log(res.default);
  })
});

document.body.appendChild(btn);
```
魔法注释 `webpackChunkName`
```js
output: {
  // chunkFilename: 给 import 动态导入文件添加文件名
  chunkFilename: "[name].min.js" 
}
import(/* webpackChunkName: "calc" */ './calc').then(res=>{
  console.log(res.default); // 打包后的文件名是 calc.min.js
})
```

## 7.打包体积分析

```sh
npm install --save-dev webpack-bundle-analyzer
```

```js
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
mode !== "development" && new BundleAnalyzerPlugin() // 自动在 8888 端口启动可视化窗口
```

## 8.代码分割

抽离第三方模块、业务公共模块
- 0、准备工作

新建 `a.js`
```js
console.log('a')
```
新建 `b.js`
```js
console.log('b')
```
新建 `index.js`，引入 `a.js` 和 `b.js`
```js
import './a'
import './b'
console.log('index.js')

import $ from 'jquery'
console.log($)
```
新建 `other.js`，引入 `a.js` 和 `b.js`
```js
import './a'
import './b'
console.log('other.js')

import $ from 'jquery'
console.log($);
```
- 1、首先将项目配置成多入口
```js
entry: {
  index: './src/index.js',
  other: './src/other.js'
}

output: {
  filename: "[name].js", // 同步打包的名字
},
```
此时 `a.js`、`b.js`、`jquery` 都会被打包到 `index.js` 和 `other.js` 中，如果我们想实现模块抽离可以新增如下配置: 

```js
module.exports = {
  optimization: {
    splitChunks: { // 分割代码块
      cacheGroups: { // 缓存组
        common: { // 公共的模块 抽离到 common-index-other.js 文件中
          chunks: 'initial'
          minSize: 0,
          minChunks: 2
        },
        vendor: { // 第三方模块 抽离到 vendor-index-other.js 文件中
          test: /node_modules/,
          chunks: 'initial'
          priority: 1,
          minSize: 0,
          minChunks: 2
        }
      }
    }
  }
}
```
## 9.热更新 
模块热替换（HMR - Hot Module Replacement）是 webpack 提供的最有用的功能之一。它允许在运行时替换，添加，删除各种模块，而无需进行完全刷新重新加载整个页面
- 保留在完全重新加载页面时丢失的应用程序的状态
- 只更新改变的内容，以节省开发时间
- 调整样式更加快速，几乎等同于就在浏览器调试器中更改样式

启用热更新，默认样式可以支持热更新，如果不支持热更新则采用强制刷新

```js
devServer:{
  hot: true, // 启用热更新
  port: 3000,
  open: true,
  contentBase: './dist'
}

new webpack.NamedModulesPlugin(), // 打印更新的模块路径
new webpack.HotModuleReplacementPlugin() // 热更新插件
```

```js
import sum from './sum';
console.log(sum(1, 2));

if (module.hot) { // 如果支持热更新
  module.hot.accept('./sum', () => { // 当入口文件变化后重新执行当前入口文件
    const sum = require('./sum')
  }) 
}
```

## 10.IgnorePlugin
```js
new webpack.IgnorePlugin(/\.\/locale/, /moment/) 

// main.js
import moment from 'moment'
import 'moment/locale/zh-cn' // 手动引入所需要的语言
moment.locale('zh-cn')
```
## 11.打包速度分析
```js
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smw = new SpeedMeasureWebpackPlugin();

module.exports = env => {
  return smw.wrap({...})
}
```

## 12.noParse
对 `jquery` 这类库，内部不会在引用其他库。我们在打包的时候就没有必要去解析，这样可以增加打包速率。
```js
module: {
  noParse: /jquery/ // 不去解析 jquery 中的依赖库
}
```

## 13.resolve 
```js
resolve: {
  extensions: [".js",".jsx",".json",".css"],
  alias:{}, // 别名
  modules: ['node_modules'] // 只查找 node_modules，缩小查找范围
},
```
## 14.include、exclude
```js
{
  test: /\.js$/,
  use: "babel-loader",
  // include:path.resolve(__dirname,'src'),
  exclude: /node_modules/
},
```
## 15.多线程打包
多线程打包，我们可以将不同的逻辑交给不同的线程来处理

```sh
npm install --save-dev happypack
```
```js
const HappyPack = require('happypack');

module: {
  rules:[
    {
      test: /\.js$/,
      use: 'HappyPack/loader?id=js'
    },
    {
      test: /\.less$/,
      use: 'HappyPack/loader?id=css'
    }
  ]
}
plugins: [
  new HappyPack({
    id: 'js',
    threads: 4,
    loaders: ['babel-loader']
  }),

  new HappyPack({
    id: 'css',
    threads: 2,
    loaders: ['style-loader', 'css-loader']
  })
]
```