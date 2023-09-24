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