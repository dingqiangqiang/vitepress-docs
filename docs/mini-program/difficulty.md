# 疑难杂症汇总

## 图区元素清除失败

## 自定义气泡相关
::: details 自定义气泡与大头针距离过远 (`anchorY` 失效)
![An image](./images/q1.png)

方案: 气泡外套一层标签，高度写死，背景设置为透明，内部的气泡底部对齐

![An image](./images/q2.png)
::: 
::: danger 自定义气泡文案遮挡
**文案右侧被遮挡: 定宽；底部被遮挡: 设置行高**
:::
::: details 自定义气泡宽高如何获取
:::
::: details 自定义气泡点击不会透出点击位置
  
方案: **地图外层套一层标签，在标签上加点击事件**
```txt
<view bindtap="handleTap">
  <map></map>
</view>
handleTap(e) { // e.detil: {x: number, y: number} }
```
:::

## 其它
::: details 解决面板穿透
::: 
## 经验
- 自定义气泡内不支持自定义点击事件，可通过 `callouttap` 捕获点击事件
