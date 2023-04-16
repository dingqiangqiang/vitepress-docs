# 语法糖
3.2最新的使用方式
```vue
<script setup lang="ts">
  import { ref, computed } from 'vue'

  const count = ref(0)
  const doubleCount = computed(() => {
    return count.value * 2
  })
</script>

<template>
  <p>{{ count }}</p>
  <p>{{ doubleCount }}</p>
</template>
```
## defineProps
- 普通声明
```vue
<script setup lang="ts">
  defineProps({
    msg: {
        type: String,
        default: 'hello'
    },
    list: Array
  })
</script>
```
- 类型声明
```vue
<script setup lang="ts">
  const props = withDefaults( // 初始化默认值
    defineProps<{
      msg: string,
      list: Array<number>
    }>(), {
      msg: 'hello',
      list: () => [1, 2]
    }
  )
</script>
```
## defineEmits
- 普通声明

1、定义子组件 `son.vue`
```vue
<script setup lang="ts">
  const emits = defineEmits(['click'])
  const clickEmits = () => {
    emits('click', '子组件提交的数据')
  }
</script>

<template>
  <button @click="clickEmits">点击</button>
</template>
```
2、在父组件引入
```vue
<script setup lang="ts">
  import Son from './son.vue'
  const parentClick = (msg: string) => {
    console.log(msg)
  }
</script>

<template>
  <Son @click="parentClick">点击</Son>
</template>
```
- 类型声明
```vue
<script setup lang="ts">
  const emits = defineEmits<{
    (e: 'click', data: string): void
  }>()
  ...
</script>
```
## useSlots 
```vue
<template>
  <Son>
    <template #header>
      <h1>我是父组件插槽</h1>
    </template>
  </Son>
</template>
```
定义子组件 `son.vue`
```vue
<script setup lang="ts">
  import { useSlots } from 'vue'
  const slots = useSlots()
</script>

<template>
  <slot name = "header" />
</template>
```
## useAttrs
父组件传递给子组件的属性(除了 `props`)
```vue
<template>
  <Son a="1" b="2" msg="hello">
    <template #header>
      <h1>我是父组件插槽</h1>
    </template>
  </Son>
</template>
```

定义子组件 `son.vue`
```vue
<script setup lang="ts">
  import { useSlots, useAttrs } from 'vue'
  defineProps({
    msg: String
  })
  const slots = useSlots()
  const attrs = useAttrs() // 不包含 msg
</script>

<template>
  <slot name = "header" />
</template>
```
## defineExpose
暴露子组件内定义属性
定义子组件 `son.vue`
```vue
<script setup lang="ts">
  import { ref } from 'vue'

  const msg = ref('msg')
  const handle = () => {}

  defineExpose({
    msg,
    handle
  })
</script>
```
父组件引入 
```vue
<script setup lang="ts">
  import Son from './son.vue'
  import { ref, onMounted } from 'vue'

  const child = ref(null)
  onMounted(() => {
    child.value.handle()
  })

</script>

<template>
  <Son ref="child">点击</Son>
</template>
```

