# 关于对 import type 的理解
> `import type` 是 ECMAScript 模块系统中的一种语法，**用于引入类型信息而不引入实际的运行时代码。**

举个例子：
```ts
// types.ts
export interface Type = {
  id: number;
  name: string;
};
// main.ts
import type { Type } from './types';
const myVariable: Type = {
  id: 1,
  name: 'test',
};
```
在这个例子中，我们使用 import type 引入，编译后的 JavaScript 代码如下： 
```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const myVariable = {
    id: 1,
    name: 'test',
};
```
编译后的代码中只包含了**变量的声明和赋值，并没有 Type 的定义**；因为 import type { Type } from './types' 语句并没有引入实际的类型定义到生成的 JavaScript 代码中。

反之我们不使用 import type，而是直接使用 import { Type } from './types' 的方式引入，编译结果如下：
```js
const types_1 = require("./types");
const myVariable = {
    id: 1,
    name: 'test',
};
```
生成的代码中包含了**变量的声明和赋值及 Type 的定义**，因为我们使用了普通的 import，Type 的定义被包含在生成的 JavaScript 代码中。这可能导致在运行时引入不必要的类型信息，增加了代码的大小。
