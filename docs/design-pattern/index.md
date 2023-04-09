# 设计模式
## 单例模式
无论实例化多少次，得到的都是同一个实例。
```js
class Person {
  static instance
  constructor(name) {
    if (Person.instance) {
      return Person.instance
    }
    Person.instance = this
    this.name = name
  }
}

let p1 = new Person('张三')
let p2 = new Person('李四')
console.log(p1, p2)
```
## 发布订阅模式
:::tip
发布和订阅之前没有任何关系，不订阅也可以发布，两个人的关系不耦合在一起。需要用户手动触发 `emit`
:::
```js
const fs = require("fs");

let events = {
  list: [],
  on (fn) {
    this.list.push(fn)
  },
  emit () {
    this.list.forEach(fn => fn())
  }
}

events.on(function () {
  console.log('每次读取完毕后都执行')
})

events.on(function () {
  if(Object.keys(school).length === 2){
    console.log('文件读取完毕')
  }
})

const result = {};
fs.readFile("./a.txt", "utf8", function (err, data) {
  result.name = data;
  events.emit();
});

fs.readFile("./b.txt", "utf8", function (err, data) {
  result.age = data;
  events.emit();
});
```
## 观察者模式
```js
class Subject { // 被观察者 （需要有一个自身的状态 ，状态变化了要通知所有的观察者）
  constructor (name) {
    this.name = name
    this.observers = []
    this.state = '我开心的在玩'
  }

  attach(observe){
    this.observers.push(observe);
  }

  setState(newState){
    this.state = newState;
    this.observers.forEach(observe => observe.update(this));
  }
}

class Observer{ // 观察者
  constructor(name){
    this.name = name;
  }

  update (s) {
    console.log(this.name + ":" + s.name + '当前的状态是' + s.state)
  }
}

let subject = new Subject('小宝宝')
let o1 = new Observer('爸爸');
let o2 = new Observer('妈妈');

// 订阅模式
subject.attach(o1)
subject.attach(o2)
subject.setState('有人咬我，不开心')
```