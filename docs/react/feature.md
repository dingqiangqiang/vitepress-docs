# feature
## memo 
> 针对的是一个组件的渲染是否重复执行

用来优化函数组件重渲染的行为，当传入属性值都不变的情况下，就不会触发组件的重渲染，否则就会触发组件重渲染。
```js
class App extends Component {
  state = { count: 0 }
  callback = () => {} // 类属性
  render () {
    return (
      <div>
        <button onClick={() => {
          this.setState({
            count: this.state.count + 1
          })
        }}>add</button>
        <Foo name='mike'></Foo>
      </div>
    )
  }
}

class Foo extends Component {
  // 不加 shouldComponentUpdate 逻辑的话，App 组件的重渲染会导致 Foo 组件的重新渲染
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.name === this.props.name) {
      return false
    }
    return true
  }
  render () {
    console.log('Foo re-render')
    return null
  }
}
```
### 类组件: PureComponent
:::danger 注意
`PureComponent` 只是传入属性本身的对比，属性的内部发生变化，它就搞不定了。仅适用于类组件
:::
```js
import { PureComponent } from 'react'

class Foo extends PureComponent { 
  render () {
    console.log('Foo re-render')
    return null
  }
}
```
### 函数组件: memo
```js
import { memo } from 'react'

class App extends Component {
  state ={
    count: 0,
    person: {
      age: 1
    }
  }
  render() {
    const person = this.state.person
    return (
      <div>
         <button onClick={() => {
           person.age++
           this.setState({
            count: this.state.count + 1
           })
        }}>{ person.age }</button>
        <Foo person = { person }></Foo>
      </div>
    );
  }
}

// 如果不加 memo，Foo 组件每次都会重新渲染
const Foo = memo(function Foo(props) { // 无状态组件
  console.log('Foo re-render')
  return <div>{ props.person.age }</div>
})
```
:::tip 推论
拆分粒度越细的组件，传入的属性越简单，使用 `memo`、`PureComponent` 的机会就越多。
:::
## lazy
```js
import React, { Component, lazy } from "react";

export default class About extends Component {
  render () { return <div>About</div> }
}

// webpackChunkName: 魔法注释
const About = lazy(() => import(/* webpackChunkName: "about" */'./About.jsx')) 

class App extends Component {
  render () {
    return (
      <div>
        <About></About>
      </div>
    )
  }
}
export default App;
```
## 渲染属性
:::tip `render props`
用一个函数属性的执行结果来当做自己的渲染结果
:::
```js{37}
class Resizable extends Component {
  state = {
    size: [window.innerWidth, window.innerHeight]
  }

  onResize = () => {
    this.setState({
      size: [window.innerWidth, window.innerHeight]
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  render() {
    return this.props.render(this.state.size)
  }
}

class Foo extends Component {
  render () {
    const [width, height] = this.props.size
    return (
      <div>{ width }:{ height }</div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div><Resizable render = {size => <Foo size={size}></Foo>}></Resizable></div>
    )
  }
}
export default App
```
## 高级组件(HOC)
```js{36}
function Resizable(ChildComponent) {
  return class Wrapper extends Component {
    state = {
      size: [window.innerWidth, window.innerHeight]
    }

    onResize = () => {
      this.setState({
        size: [window.innerWidth, window.innerHeight]
      })
    }

    componentDidMount() {
      window.addEventListener('resize', this.onResize)
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.onResize)
    }
  
    render() {
      return <ChildComponent size={ this.state.size }></ChildComponent>
    }
  } 
}

class Foo extends Component {
  render () {
    const [width, height] = this.props.size
    return (
      <div>{ width }:{ height }</div>
    )
  }
}

const WrapperedComponent = Resizable(Foo)

class App extends Component {
  render () {
    return (<div><WrapperedComponent/></div>)
  }
}
export default App;
```


