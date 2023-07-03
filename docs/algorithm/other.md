# 其他常用算法
## 最长递增子序列(Vue3 Diff 精华)
```ts
function getSequence(arr: number[]): number[] { // [5, 3, 4, 0] -> [1, 2]
  const p = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = (u + v) >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }
  return result;
}
```
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
## [取出对象中的某个属性](https://github.com/developit/dlv)
```js
const obj = {
  a: {
    b: {
      c: 1,
      d: undefined,
      e: null
    }
  }
}
// 需支持以下实现: 
// 1、delve(obj, 'a.b.c') === 1;
// 2、delve(obj, ['a', 'b', 'c']) === 1;
// 3、delve(obj, 'a.b.f') === undefined;
// 4、delve(obj, 'a.b.f', 'foo') === 'foo';
// 5、delve(obj, 'a.b.d', 'foo') === 'foo';
// 6、delve(obj, 'a.b.e', 'foo') === null

function delve(obj, key, def, p, undef) {
	key = key.split ? key.split('.') : key;
	for (p = 0; p < key.length; p++) {
		obj = obj ? obj[key[p]] : undef;
	}
	return obj === undef ? def : obj;
}
```
