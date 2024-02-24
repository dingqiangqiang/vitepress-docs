---
title: API
date: 2023-02-22
tags: 
  - vue
  - pinia
categories: 
  - frontend
---
## 为什么要使用 [Pinia](https://pinia.web3doc.top/)
`Pinia` 是 `Vue` 的存储库，它允许您跨组件/页面共享状态。与 Vuex 相比有以下不同:
+ 1、`mutations` 不再存在，他们经常被认为是**非常冗长**。
+ 2、更好的 `TypeScript` 类型推导，用户无需创建自定义复杂包装器来支持 `TypeScript`，所有内容都是类型化的。
+ 3、不再有 `modules` 的嵌套结构，由于扁平架构的设计方式，用户可以随意组合 `store`。
+ 4、没有命名空间模块。

## 使用方式

一、使用 `options` 语法
```js
import { defineStore } from "pinia"

export const useMainStore = defineStore('main', {
  /**
   * 1.必须是函数：这样是为了在服务端渲染的时候避免交叉请求导致的数据状态污染（客户端其实无所谓）
   * 2.必须是箭头函数：为了更好的ts类型推导
   */
  state: () => {
    return {
      count: 0,
      name: 'pinia'
    }
  },
  getters: {
    doubleCount(state) {
      return state.count + 10
    }
  },
  actions: {
    // 同步操作
    changeState(num: number) {
      // 对于批量修改，建议使用patch做优化
      this.$patch((state) => {
        state.count += num
        state.name += num
      })
    },
    // 异步操作
    async loadAllProducts() {
      const ret = await getProducts()
      this.all = ret
    }
  }
})
```
```ts
// 在模板中使用
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMainStore } from '../store'

const mainStore = useMainStore()
const { count, name, doubleCount } = storeToRefs(mainStore)

const changeState = () => {
  // 方式一：直接修改
  // mainStore.count += 2

  // 方式二：使用 $patch(对象)
  // mainStore.$patch({
  //   count: mainStore.count + 2,
  //   name: mainStore.name + 2,
  // })

  // 方式三：使用 $patch(回调函数)
  // mainStore.$patch(state => {
  //   state.count += 2
  //   state.name += 2
  // })

  // 方式四：调用 actions 中封装的方法
  mainStore.changeState(2)
}
</script>
```
二、使用 `setup` 语法
```js
import { ref, computed} from 'vue'

export const useMainStore = defineStore('main', () => {
  const foo = ref('bar')
  const count = ref(0)
  
  const doubleCount = computed(() => {
    return count.value + 2 
  })

  const changeState = (num: number) => {
    count.value += num
    foo.value += num
  }

  return {
    foo,
    count,
    list,
    changeState
  }
})
```
## 总结
我们首先对比了 `pinia` 和 `vuex` 的区别，接着介绍了 2 种比较常用的使用方式，下一节我们来介绍 `pinia` 内部的实现细节。