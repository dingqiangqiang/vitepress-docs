# REST
::: details 简介
> 万维网软件架构风格，用来创建网络服务(Representational State Transfer)

Representational: 数据的表现形式(JSON、XML...)

State: 当前状态或者数据

Transfer: 数据传输
:::
::: tip 6个限制
- 客户-服务器(Client-Server)：
  关注点分离，服务端专注数据存储，提升了简单性。前端专注用户界面，提升了可移植性
- 无状态(Stateless)：所有用户会话信息都保存在客户端，每次请求必须包括所有信息，不能依赖上下文信息。服务端不用保存会话信息，提升了简单性、可靠性、可见性
- 缓存(Cache)
  所有服务端响应都要被标为可缓存或不可缓存，减少前后端交互，提升了性能。
- **统一接口**(Uniform Interface) 
  接口设计尽可能统一通用，提升了简单性、可见性。接口与实现解耦，使前后端可以独立开发迭代

  1、资源的标识(每个资源可以通过 URI 被唯一的标识) 2、通过表述来操作资源(客户端不能直接操作服务端资源，应该通过表述(比如JSON)来操作资源) 3、自描述信息(每个请求或响应必须提供足够的信息让接受者理解) 4、超媒体作为应用状态引擎(点击链接跳转到另一个网页)

- 分层系统(Layered System)
  每层只知道相邻的一层，后面隐藏的就不知道了。比如客户端不知道是和代理还是真实服务器通信
- 按需代码(Code-On-Demand 可选)
  客户端可以下载运行服务端传来的代码，通过减少一些功能，简化了客户端
:::
## RESTful
- 组成: 标准的URI，标准HTTP方法、传输的数据媒体类型
- 最佳实践: 增删改查应该返回什么响应?

  增：新增的那一项，删：返回204(没有内容，但是成功了)，改：修改的那一项，查：数组、某一项
  

<!-- PATCH: 部分更新
PUT: 整体替换 -->
## 参数获取
`options` 方法的作用: 1、检测服务器所支持的请求方法 2、 CORS 中的预检请求

- 获取 HTTP 请求参数

  获取 query: `ctx.query`

  获取 url: `ctx.url`

  获取路由参数: `ctx.params`

  获取 body: `ctx.request.body`(npm install koa-bodyparser)

  获取 header: `ctx.header`
- 发送 HTTP 响应

  发送 status: `ctx.status = xxx`

  发送 body: `ctx.body = xxx`

  发送 header: `ctx.set('Allow', 'GET, POST')`

## 路由
```sh
npm install koa-router --save
```
```js
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const userRouter = new Router({
  prefix: '/users'
})

userRouter.get('/', (ctx) => {
  ctx.body = '<h1>访问了 userRouter</h1>'
})

app.use(userRouter.routes()).use(userRouter.allowedMethods())

app.listen(3001, () => {
  console.log('server is running at 3001 port')
})
```
> allowedMethods 作用： 1、响应 options 方法，返回接口所支持的请求方法 2、相应的返回405(不允许)和501(没实现)


