# 工具函数盘点
- ## `once`
```js
/**
 * Ensure a function is called only once.
 */
export function once (fn: Function): Function {
  let called = false
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}
```
## `extend`
```js
/**
 * Mix properties into target object.
 * 把多个属性插入目标对象
 */
export function extend (to: Object, _from: ?Object): Object {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}
```
## `cached`
```js
/**
 * Create a cached version of a pure function.
 * 创建一个纯函数的缓存版本
 */
export function cached<F: Function> (fn: F): F {
  const cache = Object.create(null)
  return (function cachedFn (str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }: any)
}
// 使用
import { cached, camelize } from 'shared/util'

const normalize = cached(camelize)
normalize('xx')
normalize('xx')
normalize('xx')
```
## `toArray`
```js
/**
 * Convert an Array-like object to a real Array.
 */
export function toArray (list: any, start?: number): Array<any> {
  start = start || 0
  let i = list.length - start
  const ret: Array<any> = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}
```
## `toObject`
```js
/**
 * Merge an Array of Objects into a single Object.
 */
export function toObject (arr: Array<any>): Object {
  const res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}
```
## 类型判断
```js
export function isUndef (v: any): boolean %checks {
  return v === undefined || v === null
}
export function isDef (v: any): boolean %checks {
  return v !== undefined && v !== null
}

export function isObject (obj: mixed): boolean %checks {
  return obj !== null && typeof obj === 'object'
}

export function isTrue (v: any): boolean %checks {
  return v === true
}

export function isPrimitive (value: any): boolean %checks {
  return (typeof value === 'string' || typeof value === 'number' || typeof value === 'symbol' || typeof value === 'boolean')
}
export function isFalse (v: any): boolean %checks {
  return v === false
}

const _toString = Object.prototype.toString

export function toRawType (value: any): string {
  return _toString.call(value).slice(8, -1)
}

export function isPlainObject (obj: any): boolean {
  return _toString.call(obj) === '[object Object]'
}

export function isRegExp (v: any): boolean {
  return _toString.call(v) === '[object RegExp]'
}

export function isPromise (val) {
  return val && typeof val.then === 'function'
}
/**
 * Check whether the object has the property.
 * 用来判断一个属性是定义在对象本身而不是继承自原型链
 */
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn (obj: Object | Array<*>, key: string): boolean {
  return hasOwnProperty.call(obj, key)
}
// let obj = { a: 1 }; Object.prototype.b = 2
// Object.prototype.hasOwnProperty.call(obj, 'a') true
// Object.prototype.hasOwnProperty.call(obj, 'b') false
```
## 类型转化
```js
export function toString (val: any): string {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

export function toNumber (val: string): number | string {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}
```
## `array` 相关
```js
/**
 * Remove an item from an array
 */
export function remove (arr: Array<any>, item: any): Array<any> | void {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}
```
## 函数定义相关
```js
export function noop (a?: any, b?: any, c?: any) {} // Perform no operation
export const no = (a?: any, b?: any, c?: any) => false // Always return false
export const identity = (_: any) => _ // Return same value
```
## 字符串相关
```js
/**
 * Capitalize a string.
 * 字符串首字母转大写
 */
export const capitalize = cached((str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})
```