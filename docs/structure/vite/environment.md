# 开发环境搭建(下)
## [vitest](https://cn.vitest.dev/)
:::tip vitest 优势
- 1、 基于 `vite`，可以做到与 `vite` 通用配置
- 2、 兼容 `Jest` API
- 3、 注重性能，尽可能多地使用 `worker` 线程并发执行，可以提高测试的运行效率。
:::

::: warning 配置 `vitest` 测试组件需要以下两个库：
- 1、`happy-dom` 用于提供测试所需要的 `Dom` 仿真。由于测试是在 `node` 环境中运行，而不是浏览器中，因而需要提供 `Dom` 对象的仿真
- 2、`@vue/test-utils` 可以简化 `vue` 组件的测试流程。实际上使用 `jest` 或者 `vitest` 也可以直接对 `vue` 进行测试。但是每次都需要编写初始化 `vue` 实例、渲染组件等操作，并且对 `dom` 断言也比较频，比较好的办法是将这些针对 `vue` 测试的过程进程封装。
:::
- 1、装包
```sh
pnpm i -D vitest @vue/test-utils happy-dom
```
- 2、在 `vite.config.ts` 中新增 `test` 配置项
```ts
/// <reference types = "vitest" />

export default defineConfig({
  test: {
    globals: true,
    environment: "happy-dom", // 提供测试所需要的 dom 仿真
    transformMode: { 
      web: [/.tsx$/] // 支持 tsx
    }
  },
})
```
- 3、在 `package.json` 中新增 `test` 执行命令
```json
"scripts": {
  "test": "vitest", // 监听模式
  "test:run": "vitest run" // 执行完测试退出命令行
}
```
- 4、新建 `src/tests/unit/todo.spec.ts` 测试文件
```ts
import Todo from "@/components/todo/index.vue" 
import { shallowMount, mount } from "@vue/test-utils"

// describe: 创建分组
describe("测试 todo 组件功能是否正常", () => {
  it("测试输入框中输入内容会引发组件的数据发生变化", () => {
    const wrapper = shallowMount(Todo)  // 浅渲染，只会渲染当前组件，不会渲染它的子组件
    const input = wrapper.find("input")
    input.setValue("hello")
    expect(wrapper.vm.todo).toBe("hello")
  })

  it("测试输入框内容存在时，点击按钮会新增一条数据", async () => {
    const wrapper = mount(Todo) // 深度挂载
    const input = wrapper.find("input")
    input.setValue("")
    const button = wrapper.find("button")
    await button.trigger("click")
    expect(wrapper.findAll("li").length).toBe(0)
    input.setValue("hello")
    await button.trigger("click")
    expect(wrapper.findAll("li").length).toBe(1)
  })

  it("测试新增的数据内容和输入框中的内容完全相同", async () => {
    const wrapper = mount(Todo)
    const input = wrapper.find("input")
    const button = wrapper.find("button")
    input.setValue("hello")
    await button.trigger("click")
    expect(wrapper.find("li").text()).toBe("hello")
  })
})
```
- 5、代码被 `push` 之前执行测试命令
```sh
npx husky add .husky/pre-push "pnpm test:run"
```

## mock 数据
- 1、装包
```sh
pnpm install mockjs vite-plugin-mock -D
```
- 2、在 `vite.config.ts` 中使用插件
```ts
import { viteMockServe } from "vite-plugin-mock"

export default defineConfig({
  plugins: [
    viteMockServe()
  ]
})
```
- 3、新建 `mock/user.ts`
```ts
export default [
  {
    url: "/api/login",
    method: "post",
    response: (res) => { // express
      return {
        code: 0,
        data: {
          token: "xxxxxx",
          username: res.body.username
        }
      }
    }
  }
]
```
- 4、执行 `pnpm dev`，在 http://localhost:5173/api/login 即可看到响应结果

## axios 封装 
- 1、新建 `utils/http.ts` 封装 `axios` 请求
```ts
import axios, { AxiosRequestConfig, AxiosInstance } from "axios"

export interface ResponseData<T> {
  code: number
  data: T
  msg: string
}

class HttpRequest {
  public baseURL:string = import.meta.env.DEV ? "/api" : "/"
  public timeout:number = 3000

  // 每次请求都创建一个独一无二的实例，保证请求之间互不干扰
  public request(options: AxiosRequestConfig) {
    const instance = axios.create()
    options = this.mergeOptions(options)
    this.setInterceptors(instance)
    return instance(options)
  }

  setInterceptors(instance: AxiosInstance) {
    instance.interceptors.request.use(
      (config) => {
        // config.headers!["token"] = "bearer token" // 伪代码，可用于添加 token
        return config
      },
      (err) => { return Promise.reject(err) }
    )

    instance.interceptors.response.use(
      (res) => {
        // const { code } = res.data // 根据 code 去做对应操作
        return res
      },
      (err) => { return Promise.reject(err) }
    )
  }

  mergeOptions(options: AxiosRequestConfig) {
    return Object.assign({
      baseURL: this.baseURL,
      timeout: this.timeout
    }, options)
  }

  public get<T>(url: string, config: unknown): Promise<ResponseData<T>> {
    return this.request({
      method: "get",
      url,
      params: config
    }).then(
      (res) => {
        return Promise.resolve(res.data)
      },
      (err) => {
        return Promise.reject(err)
      }
    )
  }
  public post<T>(url: string, data: unknown): Promise<ResponseData<T>> {
    return this.request({
      method: "post",
      url,
      data
    }).then(
      (res) => {
        return Promise.resolve(res.data)
      },
      (err) => {
        return Promise.reject(err)
      }
    )
  }
}

export default new HttpRequest()
```
- 2、新建 `api/user.ts` 用户请求模块
```ts
import http from "@/utils/http"

export const enum USERAPI_LIST {
  login = "/login"
}

export interface IUserData {
  username: string
  password: string
}

export async function login<T>(data: IUserData) {
  return http.post<T>(USERAPI_LIST.login, data)
}
```
- 3、调用请求方法
```ts
import { login } from "@/api/user"

type UserInfo = { username: string; token: string }

login<UserInfo>({
  username: "test",
  password: "test"
}).then((res) => {
  console.log(res.data?.username) // test
})
```
## 代理设置
1、`vite.config.ts` 中新增 `server` 配置项
```ts
export default defineConfig({
  server: {
    // 实际是一个反向代理: 1、不需要配置跨域 2、对于用户是无感的
    // http://127.0.0.1:5173/api/login 实际上访问的是 http://127.0.0.1:3000/login
    proxy: {
      // http-proxy 在中间做了个中间层  客户端->(中间层*透明的* -> 真实服务器)
      "/api": {
        target: "http://localhost:3000/",
        changeOrigin: true, // 这里不加服务端无法拿到 origin 属性
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
})
```
- 2、新建 `server.js`，基于 `express` 搭建服务器
```sh
pnpm install express
```
```js
const express = require("express")
const app = express()

app.post("/login", function (req, res) {
  res.send({
    code: 0,
    data: { username: "test", token: "test" },
    msg: 'success'
  })
})

app.listen(3000)
```
启动服务
```sh
nodemon server.js
```
## pinia 集成
::: warning vuex 缺点
1、`store` 单一(通过 `new Vue` 实现)

2、命名空间 `namesapced` 通过树形结构维护，获取属性冗长，书写方式不友好

3、`js` 编写，类型推导需要自己封装
:::
::: tip pinia 优势
1、多 `store` (通过 `reactive` 实现)

2、扁平化管理

3、摒弃 `mutations`

4、`ts` 编写，类型推导强
:::
- 1、装包
```sh
pnpm install pinia
```
- 2、新建 `stores/counter.ts`
```ts
export const useCounterStore = defineStore("counter", () => { //相当于 setup 函数
  const count = ref(0)
  const doubleCount = computed(() => {
    return count.value * 2
  })
  const changeCount = (payload: number) => {
    count.value += payload
  }

  return { 
    count, 
    doubleCount, 
    changeCount 
  }
})
```
- 3、`main.ts` 导入 `createPinia`
```ts
app.use(createPinia())
```
- 4、在模板中使用 
```vue
<template>
  <div>
    <button @click="handleClick" class="block rounded-lg text-#fff bg-black-1">计数器</button>
    <span block text-center>{{ store.count }}</span>
    <span block text-center>{{ store.doubleCount }}</span>
  </div>
</template>

<script lang="ts" setup>
import { useCounterStore } from "@/stores/counter"

const store = useCounterStore()
const handleClick = () => {
  store.changeCount(5)
}
</script>
```

## GitHub Actions 自动部署
根目录新建`.github/workflows/main.yml` 文件
```yml
# This is a basic workflow to help you get started with Actions

name: CI

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the "master" branch
  push:
    branches: ["master"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v3 ## 拉代码
      - uses: pnpm/action-setup@v2.2.2 ## 安装pnpm
        with:
          # Version of pnpm to install
          version: "7.5.0"

      - name: Instanll Deps ## 安装依赖
        run: pnpm install

      - name: Build Website ## pnpm build
        run: pnpm build

      - name: ssh deploy
        uses: easingthemes/ssh-deploy@v2.2.11
        with:
          # Private Key
          SSH_PRIVATE_KEY: ${{ secrets.PRIVATE_KEY }}
          # Remote host
          REMOTE_HOST: ${{ secrets.HOST }}
          # Remote user
          REMOTE_USER: ${{ secrets.USERNAME }}
          # Remote port
          SOURCE: ./dist/
          # Target directory
          TARGET: /home/test ## 上传到服务器的目录

```