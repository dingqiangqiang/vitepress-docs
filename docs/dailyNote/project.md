# 项目搭建
## 集成 vant
- main.ts 导入样式
```ts{2}
// 样式全局使用
import 'vant/lib/index.css'
```
- 组件按需引用
```vue
<script setup lang="ts">
import { Button as VanButton } from 'vant'
</script>
<template>
  <van-button>按钮</van-button>
</template>
```
## 移动端适配
- 安装 [postcss-px-to-viewport](https://blog.csdn.net/sinat_17775997/article/details/127101451)
- 配置文件
```js
// 项目根目录新建 postcss.config.cjs 文件
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // 设备宽度 375 计算 vw 的值
      viewportWidth: 375
    },
  },
};
```
::: tip postcss-px-to-viewport 注意事项:
1. vant 组件库、css/scss/less、组件内 style 都会转换
2. 元素行内样式不会转换
3. 控制台警告可忽略，或使用 postcss-px-to-viewport-8-plugin 替换当前插件
::: 
## 集成 axios
- 封装
```ts
import { useUserStore } from '@/stores'
import router from '@/router'
import axios, { AxiosError, type Method } from 'axios'

const baseURL = 'https://consult-api.itheima.net/'
const instance = axios.create({
  baseURL,
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    const store = useUserStore()
    if (store.user?.token) { // 携带 token
      config.headers.Authorization = `Bearer ${store.user.token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    // 状态码约定，比如 code 10000 为成功，非 10000 为失败
    if (res.data?.code !== 10000) {
      return Promise.reject(res.data)
    }
    return res.data
  },
  (err) => {
    if (err.response.status === 401) {// 401: 未授权
      const store = useUserStore()
      store.delUser() // 删除用户信息
      // 跳转登录，带上接口失效所在页面地址，登录完成后回跳
      router.push(`/login?returnUrl=${router.currentRoute.value.fullPath}`)
    }
    return Promise.reject(err)
  }
)

type Response<T> = {
  code: number
  message: string
  data: T
}

// 请求工具函数(支持不同接口设置不同响应数据类型)
export const request = <T>(url: string, method: Method = 'get', payload?: object) => {
  return instance.request<T, Response<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: payload
  })
}
```
- 测试
```vue
<script setup lang="ts">
import { request } from './utils/request'

type User = {
  token: string
  id: number
  account: string
  mobile: string
  avatar: string
  refreshToken: string
}

const login = async () => {
  const res = await request<User>('/login/password', 'POST', {
    mobile: '13230000001', password: 'abc12345'
  })
}
/** res.data 格式
 * {
    "code": 10000,
    "message": "请求成功",
    "data":{
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMCIsImlhdCI6MTcwNTg0NjQyMiwiZXhwIjoxNzA2MDE5MjIyfQ.N8VZGK9NqCSaCAkvR-QlKlZJjctxhbo3VOJ6O8ZuIMM",
        "id": 100,
        "account": "用户100",
        "mobile": "132****0001",
        "avatar": "http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/consult/production/20230818/6931857085501440.png",
        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMCIsImlhdCI6MTcwNTg0NzQ0NiwiZXhwIjoxNzA3MTQzNDQ2fQ.zOlpPDrXD34UpTV_wPFt7yRUylIJ6U8QQezxHC7xUXo"
    }
}
*/
</script>
```
![An image](./images/type.png)


