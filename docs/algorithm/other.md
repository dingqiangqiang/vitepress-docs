# 其他常用算法
## 函数柯里化
:::tip 概念
把接受多个参数的函数转变为接受一个单一参数的函数，并且返回接受余下的参数且返回结果的新函数的技术。

函数柯里化有两种不同的场景，一种为函数参数个数定长的函数，另一种为函数参数个数不定长的函数
:::
### 函数参数个数定长
```js{1-14}
const currying = (fn) => {
  let len = fn.length;
  let args = []
  return function _c (...newArgs) {
    args = [...args, ...newArgs]
    if(args.length < len){
      return _c
    }
    return fn.apply(this, args)
  }
}

function add (a, b, c, d, e) {
  return [...arguments].reduce((prev, curr) => prev + curr, 0)
}
let formatCurry = currying(add)
console.log(formatCurry(1)(2, 3)(4, 5), '函数参数个数定长')
```
### 函数参数个数不定长
```js{1-10}
const currying = (fn) => {
  let args = []
  return function _c (...newArgs) {
    if (newArgs.length) {
      args = [...args, ...newArgs]
      return _c
    }
    return fn.apply(this, args)
  }
}

function add (...args) {
	return args.reduce((prev, curr) => prev + curr, 0)
}
let formatCurry = currying(add)
console.log(formatCurry(1)(2)(3)(4, 5)(), '函数参数个数不定长') // 注意调用方式
```
