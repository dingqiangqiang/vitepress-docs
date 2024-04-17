# 语法优化

## 三元表达式
- 优化前
```js
function a() {
  if (flag) { return xx }
  return null
}
```
- 优化后
```js
function a() { return flag ? xx : null }
```
## 可选链操作符
> 前提: 下述代码中的 data 可能为 null

- 优化前
```js
const c = data && data.a && data.a.b && data.a.b.c
```
- 使用可选链操作符优化
```js
const c = data?.a?.b?.c
// 缺点: 会使编译后的代码体积变大(辨析结果如下)
const c = (_data = data) === null || _data === void 0 || (_data = _data.a) === null || _data === void 0 || (_data = _data.b) === null || _data === void 0 ? void 0 : _data.c;
```
- 使用变量保存每层数据
```js
let i;
let d = data.a;
if (d && (i = d.b) && (i = i.c)) { console.log(i) }
```
## 扩展运算符
- 根据判断条件动态声明函数
```js
methods: {
  ...(flag ? {
    async a() {}
  } : {})
}
created() {
  if (flag) { this.a() }
}
```

## Object.assign
```js
const p = Object.assign({ a: 1 }, {
  ...flag ? { b: 1 } : {}
})
```

## 优化代码量
- 优化前
```js
if (this.selectedPoint &&
  this.selectedPoint.__response &&
  this.selectedPoint.__response.card_info &&
  this.selectedPoint.__response.card_info.bottom_card_info &&
  this.selectedPoint.__response.card_info.bottom_card_info.card_top) {
    name = this.selectedPoint.__response.card_info.bottom_card_info.card_top.content_1 || ''
    desc = this.selectedPoint.__response.card_info.bottom_card_info.card_top.content_2 || ''
}
```
- 优化后
```js
let cardTop
const sp = this.selectedPoint

if (sp && sp.__response &&
  sp.__response.minibus_card_info &&
  sp.__response.minibus_card_info.bottom_card_info &&
  (cardTop = sp.__response.minibus_card_info.bottom_card_info.card_top)) {
  name = cardTop.content_1 || ''
  desc = cardTop.content_2 || ''
}
```

