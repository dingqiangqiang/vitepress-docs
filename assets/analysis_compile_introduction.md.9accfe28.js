import{_ as e,c as t,o,V as c}from"./chunks/framework.85f79a96.js";const f=JSON.parse('{"title":"编译","description":"","frontmatter":{"title":"编译","date":"2023-02-04T00:00:00.000Z","tags":["vue"],"categories":["frontend"]},"headers":[],"relativePath":"analysis/compile/introduction.md","filePath":"analysis/compile/introduction.md","lastUpdated":1708780763000}'),a={name:"analysis/compile/introduction.md"},d=c("<p>之前我们分析过模板到真实 DOM 渲染的过程，中间有一个环节是把模板编译成 <code>render</code> 函数，这个过程我们把它称作编译。</p><p>虽然我们可以直接为组件编写 <code>render</code> 函数，但是编写 <code>template</code> 模板更加直观，也更符合我们的开发习惯。</p><p>Vue.js 提供了 2 个版本，一个是 Runtime + Compiler 的，一个是 Runtime only 的，前者是包含编译代码的，可以把编译过程放在运行时做，后者是不包含编译代码的，需要借助 webpack 的 <code>vue-loader</code> 事先把模板编译成 <code>render </code>函数。</p><p>这一章我们就来分析编译的过程，对编译过程的了解会让我们对 Vue 的指令、内置组件等有更好的理解。不过由于编译的过程是一个相对复杂的过程，我们只要求理解整体的流程、输入和输出即可，对于细节我们不必抠太细。有些细节比如对于 <code>slot</code> 的处理我们可以在之后去分析插槽实现的时候再详细分析。</p>",4),n=[d];function r(i,s,_,p,l,m){return o(),t("div",null,n)}const T=e(a,[["render",r]]);export{f as __pageData,T as default};
