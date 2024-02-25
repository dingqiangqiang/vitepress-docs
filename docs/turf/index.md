[Turf.js 中文网](https://turfjs.fenxianglu.cn/)

## 计算两点之间的距离
```sh
npm install @turf/helpers
npm install @turf/distance
```
```js
import { point as turfPoint } from '@turf/helpers'
import distance from '@turf/distance'

const start = {
  latitude: 40.04811,
  longitude: 116.28066
}

const user = {
  latitude: 40.048126,
  longitude: 116.2814
}

const sPoint = turfPoint([start.longitude, start.latitude])
const uPoint = turfPoint([user.longitude, user.latitude])
// 乘 1000 转化成米, 不乘 1000 还是 km
return distance(sPoint, uPoint, { units: 'kilometers' }) * 1000 
```

## 判断点是否在多边形内
```sh
npm install @turf/boolean-point-in-polygon
```
```js
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
```
## 判断矩形是否相交
```ts
interface IRect = { 
  x: number; 
  y: number; 
  width: number; 
  height: number 
}
function checkIntersection(rect1: IRect, rect2: IRect): boolean {
  const { x: x1, y: y1, width: w1, height: h1 } = rect1
  const { x: x2, y: y2, width: w2, height: h2 } = rect2
  // 矩形框1位于矩形框2的左侧或右侧 或者 矩形框1位于矩形框2的上侧或下侧
  if (x1 > x2 + w2 || x1 + w1 < x2 || y1 > y2 + h2 || y1 + h1 < y2) {
    return false
  }
  // 其他情况下，矩形框1与矩形框2相交
  return true
}
```
## 计算矩形相交面积
```ts
function calcIntersectionArea (rect1: IRect, rect2: IRect): number {
  const x1 = Math.max(rect1.x, rect2.x)
  const y1 = Math.max(rect1.y, rect2.y)
  const x2 = Math.min(rect1.x + rect1.width, rect2.x + rect2.width)
  const y2 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height)

  if (x1 > x2 || y1 > y2) {
    return 0
  }
  return (x2 - x1) * (y2 - y1)
}
```
## 计算点是否位于可视区域内
```ts
interface IRegion {
  leftTop: { x: number, y: number },
  rightBottom: { x: number, y: number }
}
function checkInView(region: IRegion, point: IRect): boolean {
  if (region.leftTop.x <= point.x && region.leftTop.y <= point.y &&
    region.rightBottom.x >= point.x + point.width &&
    region.rightBottom.y >= point.y + point.height
  ) { return true }
  
  return false
}
```
## 异步加载类库
```js
let _lib
async function asyncLoadLib() {
  return new Promise((resolve, reject) => {
    if (_lib) { resolve(_lib) }
    require.async('类库 name').then((obj = { default: {} }) => {
      _lib = obj
      resolve(_lib)
    }).catch(({ errMsg }) => { reject(errMsg) })
  })
}
// 使用
async function getList () {
  const lib = await asyncLoadLib() // 加载类库
  // lib.函数名
}
```
## 异步加载工具函数
```js
function loadAsyncFn() {
  return require.async('./asyncFn').catch(err => { // asyncFn.js 为函数定义文件位置
    throw err
  })
}

function getList(params) {
  return loadAsyncFn().then(module => {
    return module.getList(params)
  })
}
```
## Vue 实现高亮搜索关键词

效果如下: ![An image](./image/highlight.png)

[作品链接](https://page.xiaojukeji.com/package/transit-platform/index.html#/home)

```js
// <h3 class="name" v-html="setHighLight(name)"></h3>
setHighLight(name) { // name: 后端下发地名
  if (!name) return ""
  if (props.query) {
    const replaceReg = new RegExp(props.query, 'g')
    const replaceString = '<span style="color: #EA5E1E">' + props.query + '</span>'
    name = name.replace(replaceReg, replaceString);
  }

  if (poi_type === 2) { // 地铁站高亮
    const replaceString = '<span style="color: #EA5E1E">' + '-地铁站' + '</span>'
    name = name.replace('-地铁站', replaceString);
  }

  return name
}
```
## css 实现图片上下跳动
```css
@keyframes move {
  0% { top: -10px }
  50% { top: -15px }
  100% { top: -20px }
}

.img { // 图片类名
  width: 30px;
  height: 30px;
  position: absolute;
  top: -20px;
  animation: move .5s linear infinite alternate;
}
``` 




