# React Hooks
## Hooks 的概念与意义
`Hooks` 是 `React 16.8` 的新增特性。它可以让你在不编写类组件的情况下使用 `state` 以及其它的 `React` 特性。
:::warning 类组件不足
- 状态逻辑难复用
  
  + 缺少复用机制
  + 渲染属性和高阶组件导致层级冗余
- 趋向复杂难以维护

  + 生命周期函数混杂不相干逻辑
  + 相干逻辑分散在不同生命周期

- `this` 指向困扰

  + 内联函数过度创建新句柄
  + 类成员函数不能保证 `this`
::: 

:::tip `Hooks` 优势
- 方便复用状态逻辑

- 副作用的关注点分离

- 函数组件无 `this` 问题
:::
## useState
以计数器为例，用类组件的方式实现如下: 
```js
import React, { Component } from 'react'

class App extends Component {
  state = { count: 0 }
  render () {
    const { count } = this.state
    return (
      <button type="button"
        onClick={() => {
          this.setState({
            count: count + 1
          })
        }}
      >Click({ count })</button>
    )
  }
}
export default App
```
用 `hooks` 的方式实现如下: 
```js
import React, { useState } from 'react'

function App () {
  const [count, setCount] = useState(0)
  return (
    <button type="button" onClick={() => { setCount(count + 1) }}>
      Click({ count })
    </button>
  )
}
```
通过调用 `useState` 为函数组件添加一些内部 `state`，`React` 会在重复渲染时保留这个 `state`。

`useState` 返回一对值：**当前状态和更新函数**。你可以在事件处理函数或其它一些地方调用这个更新函数。它类似 `class` 组件的 `setState`，`useState` 唯一的参数就是初始 `state`。
:::tip 运行规则
多次调用 `useState` 时，返回结果是按照第一次运行的次序来返回的。

可以断定，组件每次渲染的时候，`useState` 第一次调用一定是返回 `count`，第二次调用一定是返回 `name`
```js
const [count, setScount] = useState(0)
const [name, setName] = useState('name')
```
:::
### 延迟初始化
由于 `useState` 有个默认值，因为是默认值，所以在不同的渲染周期去传入不同的值是没有意义的，只有第一次传入的才有效。
```js
const defaultCount = props.defaultCount || 0
const [count, setCount] = useState(defaultCount)
```
上面代码 `count` 的默认值是基于 `props` 计算而来，组件每次渲染的时候 `const defaultCount = props.defaultCount || 0` 都会运行一次，如果复杂度比较高的话，那么性能肯定不可观。

`useState` 支持传入函数，来延迟初始化(函数的返回值即为 `state` 的默认值)
```js
const [count, setCount] = useState(() => {
  return props.defaultCount || 0 // 只会执行 1 次
})
```
:::danger `setCount` 两种用法
- `setCount(count + 1)`

- `setCount(count => count + 1)`
:::
## useEffect
可以在函数组件中执行副作用操作。比如数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用。

> `useEffect` 标准上是在组件每次渲染之后调用，并且会根据自定义状态来决定是否调用还是不调用。一个 `useEffect` 可以涵盖 `componentDidMount`、 `componentDidUpdate`、 `componentWillUnmount` 等三个场景。第一次调用相当于 `componentDidMount`，后面的调用相当于 `componentDidUpdate`。

`useEffect` 还可以返回一个回调函数，这个函数的执行时机很重要。作用是清除上一次副作用遗留下来的状态(严格来讲，是在前一次的渲染视图清除之前)，回调函数在视图被销毁之前触发，销毁的原因有两种：**重新渲染和组件卸载**。

### 执行时机
`useEffect` 第二个参数是一个可选的数组参数，只有数组的每一项都不变的情况下，`useEffect` 才不会执行。空数组只会执行 1 次，不传的话每次都会执行。
```js
function App (props) {
  const [count, setCount] = useState(0);

  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });

  const onResize = () => {
    setSize({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    )
  }

  useEffect(() => { // count 变化就会执行 
    document.title = count; 
  })

  useEffect(() => { // 只会执行 1 次
    window.addEventListener('resize', onResize, false);
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])

  return (
    <button type="button" onClick={() => { setCount(count +　1) }}>
      Click({ count })
      size: { size.width } x { size.height }
    </button>
  )
}
```
## useContext
> `useContext` 的参数必须是 `context` 对象本身

- 使用 `Context`，顶层首先声明 `Provier` 组件，并声明 `value` 属性。接着在后代组件中声明 `Consumer` 组件，这个 `Consumer` 子组件，只能是唯一的一个函数，函数参数即是 `Context` 的负载。
```js
import { Component, createContext, useState } from 'react'

const CountContext = createContext()

function App (props) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button type="button" onClick={() => { setCount(count + 1) }}>
        Click({ count })
      </button>
      <CountContext.Provider value={ count }>
        <Foo />
        <Bar />
        <Counter />
      </CountContext.Provider>
    </div>
  )
}

class Foo extends Component {
  render () {
    return (
      <CountContext.Consumer>
        { count => <h1>{ count }</h1> }
      </CountContext.Consumer>
    )
  }
}
```

- 我们还可以使用 `contextType` 来简化对 `Context` 负载的获取。但在一个组件中，即使消费多个 `Context`，`contextType` 也只能指向其中一个。
```js
class Bar extends Component { // 适用于类组件
  static contextType = CountContext; 
  render () {
    const count = this.context
    return (<h1>{ count }</h1>)
  }
}
```
- 使用 `useContext` 方式
```js
function Counter () {
  const count = useContext(CountContext)
  return (<h1>{ count }</h1>
}
```
## useMemo
> 根据指定的依赖决定一段逻辑是否需要重新执行，从而达到优化性能的目的。

`useMemo` 语法与 `useEffect` 是一致的。第一个参数是需要执行的逻辑函数，第二个参数是这个逻辑依赖输入变量组成的数组，如果不传第二个参数，`useMemo` 的逻辑每次都会运行，`useMemo` 本身的意义就不存在了。

传入空数组只会运行 1 次，策略与 `useEffect` 是一样的，但有一点比较大的差异就是调用时机：`useEffect` 执行的是副作用，所以一定是渲染后才执行，但 `useMemo` 是需要返回值的，而返回值可以直接参与渲染，因此 `useMemo` 是在渲染期间完成的。

```js
function Foo (props) {
  return (<h1>{ props.count }</h1>)
}

function App (props) {
  const [count, setCount] = useState(0);

  const double = useMemo(() => {
    return count * 2
  }, []) // [] 只会执行 1 次；[count] 当 count 变化时，useMemo 才会执行。
  
  return (
    <div>
      <button type="button" onClick={() => { setCount(count +　1) }}>
        Click({ count }) double: ({ double })
      </button>
      <Foo count = { count }/>
    </div>
  )
}
```
## useCallback
> `useCallback` 解决的是传入子组件的参数过多变化，导致子组件过多渲染的问题。
```js
import { memo } from 'react'

const Counter = memo (function Counter (props) {
  console.log('Counter render')
  return (<h1>{ props.double }</h1>)
})

function App (props) {
  const [count, setCount] = useState(0);

  const double = useMemo(() => {
    return count * 2
  }, [count === 3])

  return (
    <div>
      <button type="button" onClick={() => {setCount(count +　1) }}>
        Click({ count }) double: ({ double })
      </button>
      <Counter double={ double }/>
    </div>
  )
}
```
如上 `Counter` 组件只有在 `double` 变化后才会重新渲染。现在给 `Counter` 组件 `h1` 添加点击事件：
```js
const Counter = memo (function Counter (props) {
  console.log('Counter render')
  return (<h1 onClick={ props.onClick }>{ props.double }</h1>)
})
```
然后在 `App` 组件中声明 `onClick` 并传给 `Counter` 组件：
```js
function App (props) {
  ...
  const onClick = () => {
    console.log('Click')
  }
  return (
    <div>
      ...
      <Foo count = { double } onClick = { onClick }/>
    </div>
  )
}
```
此时每次点击，不管 `double` 是否有变化, `Counter` 组件都会被渲染。那就说明每次 `App` 重新渲染之后， `onClick` 句柄的变化，导致 `Counter` 也被连带重新渲染了。`double` 经常变化可以理解，但是 `onClick` 就不应该经常变化了，毕竟只是一个函数而已，所以我们要想办法让 `onClick` 句柄保持不变。

我们用 `useMemo` 来优化 `onClick` 函数:
```js
const onClick = useMemo(() => {
  return () => {
    console.log('click')
  }
}, [])
```
由于我们传给 `useMemo` 的第二个参数是一个空数组，那么整个逻辑就只会运行一次，理论上我们返回的 `onClick` 就只有一个句柄。

现在我们用 `useCallback` 来实现上面 `useMemo` 的逻辑。
```js
const onClick = useCallback(() => {
  console.log('click')
},[])
```
:::warning 两者关联
`useMemo` 如果返回的是一个函数，可以直接使用 `useCallback` 来省略顶层的函数。只是简写而已，实际并没有区别。
> `useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`
:::
### 总结
当依赖变化时，我们能断定 `useMemo` 一定重新执行。但是即使依赖不变化我们不能假定它就一定不会重新执行，它可能会执行，就是考虑内在优化结果。

我们可以把 `useMemo`、`useCallback` 当做锦上添花的优化手段，不可以过度依赖它是否重新渲染。

## useRef
`useRef` 主要有两个使用场景：
- 获取子组件或者 `DOM` 节点的句柄
```js
function TextInputWithFocusButton() {
  const inputEl = useRef();

  const onButtonClick = () => {
    inputEl.current.focus();
  };

  return (
    <>
      <input ref={ inputEl } type="text" />
      <button onClick={ onButtonClick }>Focus the input</button>
    </>
  );
}
```
- 渲染周期之间的共享数据的存储(`state` 也可跨越渲染周期保存，但是 `state` 的赋值会触发重渲染，`ref` 则不会)
```js
function App (props) {
  const [count, setCount] = useState(0);
  let it

  useEffect(() => {
    it = setInterval(() => {
      setCount(count => count + 1) // 每隔 1 秒对 count 加 1
    }, 1000)
  } , [])

  useEffect(() => {
    if (count >= 5) { // count 大于等于 5 时，清除计时器
      clearInterval(it) 
    }
  })

  return (<div><h1>{ count }</h1></div>)
}
```
当 `count` 为 `5` 的时候计时器并没有停止，这是因为 `clearInterval` 时， `it` 这个变量已经不是 `setInterval` 赋值时的那个了。因为 `App` 每次渲染都会重置它，这时候就可以使用 `useRef` 来解决这个问题。
```js
function App (props) {
  const [count, setCount] = useState(0);
  const it = useRef(null)
  
  useEffect(() => {
    it.current = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
  } , [])

  useEffect(() => {
    if (count >= 5) {
      clearInterval(it.current)
    }
  })
  return (...)
}
```
## useReducer

## 自定义 Hook
> 自定义 `Hook` 是一个函数，其名称以 `use` 开头，函数内部可以调用其他的 `Hook`。

我们把上面的例子用到 `count` 的逻辑的用自定义 `Hook` 封装起来
```js
function useCount(defaultCount) {
  const [count, setCount] = useState(defaultCount);
  const it = useRef()
      
  useEffect(() => {
    it.current = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
  } , [])

  useEffect(() => {
    if (count >= 5) {
      clearInterval(it.current)
    }
  })
  
  return [count]
}

function App (props) {
  const [count] = useCount(0);
  return (<div><h1>{count}</h1> </div>)
}
```
在上述代码不变的条件下，我们在加一个自定义 `Hook` 内容如下：
```js
function useCounter(count) {
  return (<h1>{ count }</h1>)
}

// 自定义 useCounter Hook返回的是一个 JSX，运行效果是一样的，所以 Hook 是可以返回 JSX 来参与渲染的，更说明 Hook 与函数组件的相似性
function App (props) {
  const [count, setCount] = useCount(0);
  const Counter = useCounter(count)
  return (<div>{ Counter }</div>)
}
```

## 使用 `Hook` 规则
:::warning 规则如下
- 只在最顶层使用 `Hook`(不要在循环、条件、嵌套中调用 `Hook`，确保总是在 `React` 函数的最顶层调用它们，只有这样才能确保 `Hook` 在每一次渲染中都按照同样的顺序被调用)
- 只在 `React` 函数中调用 `Hook`(不要在普通的 `JavaScript` 函数中调用 `Hook`)
  + 在函数组件中调用 `Hook`
  + 在自定义 `Hook` 中调用其它 `Hook`
:::