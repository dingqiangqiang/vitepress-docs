# 常用布局
## em
>相对单位，相对于**当前元素**或**父元素**进行换算。
:::tip 特点
1、值不是固定的。

2、会继承父元素的字体大小。
:::
### 相对于当前元素
```css
.box {
  font-size: 12px;
  border: 2em solid red; // 24px
}
```
### 相对于父元素
- 第一种情况
```css
body {
  font-size: 14px
}
.box {
  border: 2em solid red; // 28px
}
```

- 第二种情况
```css
body {
  font-size: 14px
}
.box {
  font-size: 2em;
  border: 2em solid red; // 56px
}
```
## rem
> 相对单位，相对于**HTML**根元素，只修改根元素就可以成比例的调整所有字体。
- 第一种方式 `flexible`

- 第二种方式 `vw`
> 页面可视区分成了100vw 和 100vh

以 `iphone6` 机型为例，100vw = 375px，那 100px ≈ 26.666667vw = 1rem；

当切换到 `iphone6 plus` 时，由于100vw = 414px，此时 1rem = 26.666667vw/(100/4.14)* 100px ≈ 110.4px
```css
html {
  font-size: 26.666667vw
}
body {
  font-size: 16px; // 重置 font-size
}
.box {
  width: 1rem; // iphone6: 100px，iphone6 plus: 110.4px
  height: 1rem;
  background: pink;
  border: 0.2rem solid red; // 6: 20px 6p: 22px
}
```
:::danger 警告
- `rem` 布局一定要在 `body` 重置 `font-size` 大小(如上)

- 由于量取的是物理像素，`css` 需要设置逻辑像素，因此需要对量取的值进行 **除2** 操作。比如量的是144px，最终转换成 0.72rem。
:::




