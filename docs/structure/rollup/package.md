## package.json 解读
## 描述配置 
1、`name`: 项目的名称

2、`version`: 项目的版本号

3、`repository`: 项目的仓库地址以及版本控制信息。

4、`description`: 项目的描述

5、`keywords`: 项目的关键词(可以帮助别人在 npm 官网上更好地检索到该项目，增加曝光率)

6、`homepage`: 项目主页的链接

7、`bugs`: 项目 `bug` 反馈地址

8、`license`: 项目的开源许可证

9、`author`: 项目作者
```json
{
  "name": "vue-router",
  "version": "3.6.5",
  "repository": {
    "type": "git",
    "url": "https://github.com/vuejs/vue-router.git"
  },
  "description": "Official router for Vue.js 2",
  "keywords": ["vue", "router", "routing"],
  "homepage": "https://github.com/vuejs/vue-router#readme",
  "bugs": {
    "url": "https://github.com/vuejs/vue-router/issues"
  },
  "license": "MIT",
  "author": "Evan You"
}
```
## 文件配置
1、`files`
::: tip
项目发布时默认会包括 `package.json`，`license`，`README` 和 `main` 字段里指定的文件，

在此基础上，我们可以通过 `files` 指定需要跟随一起发布的内容（可以是单独的文件，整个文件夹，或者使用通配符匹配到的文件）

注: 一般情况下，files 里会指定构建出来的产物以及类型文件。
::: 
2、`main`:
项目的入口文件(不设置 `main` 字段，入口文件就是根目录下的 `index.js`)

3、`module`:
指定 `ES` 模块的入口文件

4、`unpkg`:
让 `npm` 上所有的文件都开启 `CDN` 服务。

5、`jsdelivr`:
与 `unpkg` 类似

6、`sideEffects`:
设置某些模块具有副作用，用于 `webpack` 的 `tree-shaking` 优化。

7、`types` 或者 `typings`:
指定 `TypeScript` 类型定义的入口文件

8、`browserslist`: 设置项目的浏览器兼容情况(`babel` 和 `autoprefixer` 等工具会使用该配置对代码进行转换)。另外我们也可以使用 .`browserslistrc` 文件进行配置。
```json
{
  "files": [
    "src",
    "dist/*.js",
    "dist/*.mjs",
    "types/*.d.ts"
  ],
  "main": "dist/vue-router.common.js",
  "module": "dist/vue-router.esm.js",
  "unpkg": "dist/vue-router.js",
  "jsdelivr": "dist/vue-router.js",
  "sideEffects": false,
   "typings": "types/index.d.ts",
}
```
## 脚本配置
1、`scripts`: 指定项目的内置脚本命令，基于 `npm run xx` 运行，通常包含项目开发、构建、代码格式化、测试、发布、文档部署等命令。
```json
{
  "scripts": {
    "dev": "node examples/server.js",
    "dev:dist": "rollup -wm -c build/rollup.dev.config.js",
    "build": "node build/build.js",
    "lint": "eslint src examples test",
    "test": "npm run lint && npm run flow && npm run test:unit && npm run test:e2e && npm run test:types",
    "flow": "flow check",
    "test:unit": "jasmine JASMINE_CONFIG_PATH=test/unit/jasmine.json",
    "test:e2e": "node test/e2e/runner.js",
    "test:e2e:ci": "node test/e2e/runner.js --local -e ie,android44 -c test/e2e/nightwatch.browserstack.js test/e2e/specs/active-links.js",
    "test:e2e:ff": "node test/e2e/runner.js -e firefox -c test/e2e/nightwatch.config.js",
    "test:e2e:ie9": "node test/e2e/runner.js --local -e ie9 -c test/e2e/nightwatch.browserstack.js --skiptags history,ie9-fail",
    "test:types": "tsc -p types/test",
    "docs": "vuepress dev docs",
    "docs:build": "vuepress build docs",
    "changelog": "conventional-changelog -p angular -r 2 -i CHANGELOG.md -s",
    "release": "bash scripts/release.sh",
    "commit": "git-cz"
  }
}
```
## 依赖配置
1、`dependencies`: 项目运行依赖(项目生产环境下需要用到的依赖)。使用 `npm install xxx` 或则 `npm install xxx --save` 时，会被自动插入到该字段中。

2、`devDependencies`: 项目开发依赖(项目开发环境需要用到)，用于辅助开发。使用 `npm install xxx -D` 或者 `npm install xxx --save-dev` 时，会被自动插入到该字段中。

3、`peerDependencies`: 同伴依赖，一种特殊的依赖，不会被自动安装，通常用于表示与另一个包的依赖与兼容性关系来警示使用者。
```json
{
  "devDependencies": {},
  "dependencies": {},
  "peerDependencies": {}
}
```

## 发布配置
1、`private`: 设置为 `true` 表示私有项目，不希望发布到公共 `npm` 仓库上。

## 系统配置
1、`engines`: 项目由于兼容性问题会对 `node` 或者包管理器有特定的版本号要求。举例如下:
```json
"engines": {
  "node": ">=14 <16", // node 版本大于等于 14 且小于 16
  "pnpm": ">7" // pnpm 版本号需要大于 7
}
```

