# [Jest](https://jestjs.io/)

## 快照
:::tip 作用
确保 `UI` 不会有意外的改变。在渲染了 `UI` 组件后，保存一个快照文件， 检测它是否与保存在单元测试旁的快照文件相匹配。 若两个快照不匹配，测试将失败。
:::

新建 `config.js`，导出 `genConfig`
```js
module.exports = function genConfig() {
  return {
    port: 8080,
    host: 'localhost123',
    time: new Date()
  }
}
```
测试
```js
const genConfig = require('./config')

test('测试快照功能', () => {
  expect(genConfig()).toMatchSnapshot({
    time: expect.any(Date) // time 是动态的
  }) 
})
```
此时会在 `__snapshots__` 文件夹下生成 `snapshot.test.js.snap`，内容如下:
```js
exports[`测试快照功能 1`] = `
Object {
  "host": "localhost123",
  "port": 8080,
  "time": Any<Date>,
}
`;
```
### 内联快照

将会在测试文件里生成快照，如下
```js
test('测试快照功能', () => {
  expect(genConfig()).toMatchInlineSnapshot({
  time: expect.any(Date),
  num: expect.any(Number) }, `
Object {
  "host": "localhost123",
  "port": 8080,
  "time": Any<Date>,
}
`)
})
```
## 模拟函数
在项目中，一个模块的方法常常会去调用另外一个模块的方法。在单元测试中，我们可能并不需要关心内部调用的方法的执行过程和结果，只想知道它是否被正确调用即可，甚至会指定该函数的返回值。此时，使用 `mock` 函数是十分有必要的。

:::tip `mock` 函数提供了以下三种特性
- 1、捕获函数调用情况
- 2、设置函数返回值
- 3、改变函数的内部实现
:::


- 1、`jest.fn()` 

特点: 如果没有定义函数内部的实现，会返回 `undefined`。
```js
function runQueue(cb, index) {
  cb(index)
}

test('测试 jest.fn()', () => {
  const func = jest.fn() // const func = jest.fn(() => 'jest')
  // mock 返回值的多种方式
  // 1、func.mockReturnValue('jest')

  // 2、func.mockReturnValueOnce('第一次调用返回')

  // 3、func.mockImplementationOnce(() => '第一次调用返回'); 
  // 注：func.mockImplementationOnce 相当于 jest.fn(() => '第一次调用返回')

  // 4、func.mockImplementation()

  // 调用 3 次
  runQueue(func, '第一次调用')
  runQueue(func, '第二次调用')
  runQueue(func, '第三次调用')

  // 常用断言:
  // expect(func).toHaveBeenCalled()(别名: toBeCalled)
  // expect(func).toHaveBeenCalledTimes(3)(别名: toBeCalledTimes)
  // expect(func).toHaveBeenCalledWith(123) // 别名为: toBeCalledWith
  // expect(func).toHaveBeenLastCalledWith('第三次调用')
  // expect(func).toHaveBeenNthCalledWith(1, '第一次调用') // 别名: nthCalledWith
  // expect(func).nthCalledWith(2, '第二次调用')

  // func.mock：{
  //     calls: [ [ '第一次调用' ], [ '第二次调用' ], [ '第三次调用' ] ], // 函数被调用次数以及每次调用的传参
  //     contexts: [ undefined, undefined, undefined ],
  //     instances: [ undefined, undefined, undefined ], // this 的指向
  //     invocationCallOrder: [ 1, 2, 3 ], // 多次调用时函数的执行顺序
  //     results: [
  //       { type: 'return', value: '第一次调用返回' },
  //       { type: 'return', value: '第二次调用返回' },
  //       { type: 'return', value: '第三次调用返回' }
  //     ],
  //     lastCall: [ '第三次调用' ]
  //   }

  // expect(func.mock.calls.length).toBe(3)
  // expect(func.mock.calls[1][0]).toBeDefined()
  // expect(func.mock.calls[1][0]).toBe('第二次调用'）
  // expect(func.mock.results[2].value).toBe('第三次调用返回')
})
```

- 2、`jest.mock()`模拟整个模块

由于 `getData.js` 文件夹中封装的请求方法可能我们在其他模块被调用的时候，并不需要进行实际的请求（请求方法已经通过单测或需要该方法返回非真实数据）。此时，使用 `jest.mock` 去模拟整个模块是十分有必要的。

- 2-1、模拟 `axios`

新建 `getData.js`
```js
function getData() {
  return axios.get('/list').then(res => res.data)
}
function getNum() {
  return 123
}

module.exports = {
  getData,
  getNum
}
```

测试
```js
const { getData } = require('./getData')
const axios = require('axios')
jest.mock('axios')

test('获取异步数据', async () => {
  // 模拟axios.get，不会发送真实的请求，同步模拟数据
  // axios.get.mockResolvedValue({data: 'success'})
  axios.get.mockResolvedValueOnce({data: 'success'})
  // await getData().then(result => {
  //   expect(result).toBe('success')
  // })
  const result  = await getData()
  expect(result).toBe('success')
})
```
- 2-2、不模拟 `axios`，模拟 `getData` 函数: 

新建 `__mocks__` 文件夹，建同名文件 `getData.js`，通过返回 `promise` 来代替真实的 `getData` 请求。
```js
module.exports = function getData() {
  return new Promise((resolve) => {
    resolve('success')
  })
}
```
测试
```js
jest.mock('./getData') // 实际会引用__mocks__/getData.js
// jest.unmock('./getData') 取消模拟
const { getData } = require('./getData')

test('获取异步数据', async () => {
  const result  = await getData()
  expect(result).toBe('success')
})
```
**延伸:**

由于 `getData.js` 中同时导出了 `getNum` 和 `getData`，但是 `__mocks__/getData.js` 仅导出了 `getData`，如果我们想引用 `getNum`，可以用如下方式:
```js
const { getNum } = jest.requireActual('./getData') // actual真正的
```
- 3、`mockReturnThis`
```js
test.only('test 返回 this', () => {
  // const func = jest.fn(() => this)
  const func = jest.fn()
  // func.mockImplementation(() => this)
  func.mockReturnThis()
  expect(func.mock.calls[0]).toBeUndefined()
}) 
```
## 模拟定时器

新建 `timer.js`
```js
module.exports = function timer (callback) => {
  setTimeout(() => {
    callback()
    setTimeout(() => {
      callback()
    }, 3000)
  }, 3000)
}
```
- 1、`jest.runAllTimers`：运行所有计时器
```js
const timer = require('./timer')
jest.useFakeTimers()

test('测试 runAllTimers 功能', () => {
  const fn = jest.fn()
  timer(fn)
  expect(fn).not.toBeCalled()
  jest.runAllTimers()
  expect(fn).toHaveBeenCalledTimes(2)
})
```
- 2、`jest.runOnlyPendingTimers`: 运行等待计时器
```js
test('测试 runOnlyPendingTimers 功能', () => {
  const fn = jest.fn()
  timer(fn)

  jest.runOnlyPendingTimers()
  expect(fn).toHaveBeenCalledTimes(1)
})
```
- 3、`jest.advanceTimersByTime`：使用时间的高级计时器
```js
test.only('测试 advanceTimersByTime 功能', () => {
  const fn = jest.fn()
  timer(fn)

  jest.advanceTimersByTime(3000) // 快进 3 秒
  expect(fn).toHaveBeenCalledTimes(1)

  jest.advanceTimersByTime(3000) // 又快进 3 秒(时间会累加，此时是 6 秒)
  expect(fn).toHaveBeenCalledTimes(2)

  // jest.advanceTimersByTime(6000)
  // expect(callback).toHaveBeenCalledTimes(2)
})
```
## ES6 类的模拟
新建 `util.js`
```js
class Util { 
  depend() {} // 逻辑很复杂
  notify() {} // 逻辑很复杂
}
module.exports = Util
```
新建 `demoFunction.js`，内部调用 `Util`。

```js
const Util = require('./Util')

function demoFunction() {
  const util = new Util()
  util.depend()
  util.notify()
}
module.exports = demoFunction
```
测试：执行 `demoFunction` 时我们并不想真正的去执行 `Util` 原型上的方法(内部逻辑很复杂)，我们可以通过以下方式 `mock`
- 1、自动模拟
```js
jest.mock('./Util')
```
- 2、在 `__mocks__` 下新建 `Util.js` 同名文件，手写 `mock` 函数
```js
const Util = jest.fn(() => {
  // 可添加额外逻辑，更灵活
  console.log('执行init2')
})
Util.prototype.depend = jest.fn(() => {
  console.log('执行depend2')
})
Util.prototype.notify = jest.fn(() => {
  console.log('执行notify2')
})
module.exports = Util
```
- 3、属于第 2 种方式的变种
```js
jest.mock('./Util', () => {
  const Util = jest.fn(() => {
    console.log('执行init3')
  })
  Util.prototype.depend = jest.fn(() => {
    console.log('执行depend3')
  })
  Util.prototype.notify = jest.fn(() => {
    console.log('执行notify3')
  })
  return Util
})
```
测试:
```js
const Util = require('./Util')
const demoFunction = require('./demoFunction')

// 不去真正执行 Util 类里面的方法，仅仅去模拟
test('test class', () => {
  demoFunction()
  expect(Util).toHaveBeenCalled()
  expect(Util.mock.instances[0].depend).toHaveBeenCalled()
  expect(Util.mock.instances[0].notify).toHaveBeenCalled()
})
```
## DOM 操作

由于 `node` 环境中没有 `dom` 模型，我们可以模拟 `dom` 对象。模拟 `dom` 对象需要用到 `dom` 仿真，常见的有 `jsdom`、`happydom` 等。

- 1、安装 `jsdom`
```sh
pnpm i jsdom -D
```
- 2、新建 `jsdom-config.js`，配置如下
```js
const jsdom = require('jsdom')
const { JSDOM } = jsdom

const dom = new JSDOM('<!DOCTYPE html><head/><body></body>', {
  url: 'http://localhost/',
  referrer: 'https://example.com/',
  contentType: 'text/html',
  userAgent: 'Mellblomenator/9000',
  includeNodeLocations: true,
  storageQuota: 10000000,
})
global.window = dom.window
global.document = window.document
global.navigator = window.navigator
```
- 3、创建 `dom.js`
```js
exports.generateDiv = () => {
  const div = document.createElement("div");
  div.className = "div";
  document.body.appendChild(div);
};
```
- 4、新建 `dom.test.js`
```js
const { generateDiv } = require('./dom') 
require('./jsdom-config')

describe('dom 测试', () => {
  test('测试 div 数量', () => {
    generateDiv()
    expect(document.getElementsByClassName('div').length).toBe(1)
  })
})
```