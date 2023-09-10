[VitePress 中文网](https://vitejs.cn/vitepress/)
## 常用配置
### 目录
[[toc]]
### tab 切换
::: code-group

```javascript
const add = function (a, b) { return a + b}
```

```typescript
const add = function (a: number, b: number): number { return a + b}
```
:::

### 自定义容器
::: tip
default
:::
::: warning 重要提示
warning
:::
::: danger 警告
danger
:::
::: info 附录
- [关于 StriveDocs](https://ding1992.gitee.io/docs/)
:::
::: details 可折叠
- Vue
- React
:::
### 辅助提示
> 学如逆水行舟，不进则退。

### 列表

- 不规则列表1111
- 不规则列表2222
### 文案加粗
文案加粗效果展示: **加粗效果展示**
### 表格

| :bamboo: `:bamboo:` | :gift_heart: `:gift_heart:` | :dolls: `:dolls:` |
|---|---|---|
| :school_satchel: `:school_satchel:` | :mortar_board: `:mortar_board:` | :flags: `:flags:` |
| :fireworks: `:fireworks:` | :sparkler: `:sparkler:` | :wind_chime: `:wind_chime:` |

|           文案           |                 对应描述                  |
| :----------------------: | :---------------------------------------: |
|      useNewBubble      |                     是否启用新版气泡                  |
### 语法高亮
```js{1,4,6-7}
export default { // 高亮1、4、6-7行
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum'
    }
  }
}
```
### 链接
[关于 StriveDocs](https://ding1992.gitee.io/docs/)