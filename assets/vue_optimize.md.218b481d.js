import{_ as s,c as n,o as a,V as l}from"./chunks/framework.85f79a96.js";const p="/vitepress-docs/assets/vue2.e466f1ce.png",e="/vitepress-docs/assets/vue3.9c1c1ab7.png",o="/vitepress-docs/assets/diff.533e3f3b.png",c="/vitepress-docs/assets/composition.75fe62d3.png",g=JSON.parse('{"title":"Vue.js 3.0 的优化","description":"","frontmatter":{},"headers":[],"relativePath":"vue/optimize.md","filePath":"vue/optimize.md","lastUpdated":1688386541000}'),t={name:"vue/optimize.md"},r=l('<h1 id="vue-js-3-0-的优化" tabindex="-1">Vue.js 3.0 的优化 <a class="header-anchor" href="#vue-js-3-0-的优化" aria-label="Permalink to &quot;Vue.js 3.0 的优化&quot;">​</a></h1><h2 id="源码" tabindex="-1">源码 <a class="header-anchor" href="#源码" aria-label="Permalink to &quot;源码&quot;">​</a></h2><p>源码优化主要体现在使用 <code>monorepo</code> 和 <code>TypeScript</code> 管理和开发源码，可以提升代码可维护性，让代码更易于开发和维护。</p><h3 id="更好的代码管理方式" tabindex="-1">更好的代码管理方式 <a class="header-anchor" href="#更好的代码管理方式" aria-label="Permalink to &quot;更好的代码管理方式&quot;">​</a></h3><p>2.x 源码托管在 <code>src</code> 目录，依据功能做了以下拆分:</p><table><thead><tr><th>目录名</th><th style="text-align:left;">含义</th></tr></thead><tbody><tr><td>compiler</td><td style="text-align:left;">模板编译</td></tr><tr><td>core</td><td style="text-align:left;">与平台无关的通用运行时代码</td></tr><tr><td>platforms</td><td style="text-align:left;">平台专有代码</td></tr><tr><td>server</td><td style="text-align:left;">服务端渲染</td></tr><tr><td>sfc</td><td style="text-align:left;">.vue 单文件解析相关代码</td></tr><tr><td>shared</td><td style="text-align:left;">共享工具代码</td></tr></tbody></table><p><img src="'+p+'" alt="An image"></p><p>3.x 源码通过 <code>monorepo</code> 方式维护，根据功能将不同的模块拆分到 <code>packages</code> 目录下面不同的子目录中： <img src="'+e+`" alt="An image"> 每个模块有各自的 <code>API</code>、类型定义和测试，使得模块拆分更细化，职责划分更明确，模块之间的依赖关系也更加明确，开发人员也更容易阅读、理解和更改所有模块源码，提高代码的可维护性。</p><p>另外 <code>reactivity</code> 是可以独立于 <code>Vue.js</code> 使用的，如果用户只想使用3.0的响应式能力，可以单独依赖这个响应式库而不用去依赖整个 <code>Vue.js</code>，减小了引用包的体积大小，而 2.x 是做不到这一点的。</p><h3 id="更好的-typescript-支持" tabindex="-1">更好的 TypeScript 支持 <a class="header-anchor" href="#更好的-typescript-支持" aria-label="Permalink to &quot;更好的 TypeScript 支持&quot;">​</a></h3><p>3.x 源码采用了 <code>TypeScript</code> 开发。由于 <code>TypeScript</code> 提供了更好的类型检查，能支持复杂的类型推导，省去了单独维护 <code>d.ts</code> 文件的麻烦。</p><div class="danger custom-block"><p class="custom-block-title">Flow 的不足</p><p><code>Flow</code> 是 <code>Facebook</code> 出品的 <code>js</code> 静态类型检查工具，它可以以非常小的成本对已有的 <code>js</code> 代码迁入，非常灵活，这也是 2.x 当初选型它时一方面的考量。但是 <code>Flow</code> 对于一些复杂场景类型的检查，支持得并不好。</p><p>2.x 源码在在组件更新 <code>props</code> 的地方出现了对 <code>Flow</code> 的吐槽:</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">propOptions</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> vm.$options.props </span><span style="color:#6A737D;">// wtf flow?</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>由于 <code>Flow</code> 没有正确推导出 <code>vm.$options.props</code> 的类型 ，开发人员不得不强制声明 <code>propsOptions</code> 的类型为 <code>any</code>，显得很不合理。</p></div><h2 id="性能" tabindex="-1">性能 <a class="header-anchor" href="#性能" aria-label="Permalink to &quot;性能&quot;">​</a></h2><h3 id="源码体积优化" tabindex="-1">源码体积优化 <a class="header-anchor" href="#源码体积优化" aria-label="Permalink to &quot;源码体积优化&quot;">​</a></h3><ul><li>移除一些冷门的 <code>feature</code>(如 <code>filter</code>、<code>inline-template</code> 等)</li><li>引入 <code>tree-shaking</code>，减少打包体积。</li></ul><div class="warning custom-block"><p class="custom-block-title">原理</p><p>依赖 ES2015 模块语法的静态结构（即 <code>import</code> 和 <code>export</code>），通过编译阶段的静态分析，找到没有引入的模块并打上标记。</p><p>压缩阶段会利用如 <code>uglify-js</code>、<code>terser</code> 等压缩工具真正地删除没有用到的代码。</p></div><p>举个例子，<code>math</code> 模块定义了 2 个方法 <code>square</code> 和 <code>cube</code></p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">square</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">x</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> x </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> x</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cube</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">x</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> x </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> x </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> x</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>只引入了 <code>cube</code> 方法并使用</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { cube } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./math.js&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">cube</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">))</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><code>math</code> 模块被 <code>webpack</code> 打包生成如下代码：未被引入的 <code>square</code> 函数被打上了标记</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">module</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">__webpack_exports__</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">__webpack_require__</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;use strict&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/* unused harmony export square */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/* harmony export (immutable) */</span><span style="color:#E1E4E8;"> __webpack_exports__[</span><span style="color:#9ECBFF;">&#39;a&#39;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> cube;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">square</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">x</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> x </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> x;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cube</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">x</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> x </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> x </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> x;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="数据劫持优化" tabindex="-1">数据劫持优化 <a class="header-anchor" href="#数据劫持优化" aria-label="Permalink to &quot;数据劫持优化&quot;">​</a></h3><p>实现前提: 必须劫持数据的访问和更新。</p><p>2.x 通过 <code>Object.defineProperty</code> 来劫持数据的 <code>getter</code> 和 <code>setter</code>，具体是这样的：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#E1E4E8;">Object.</span><span style="color:#B392F0;">defineProperty</span><span style="color:#E1E4E8;">(data, </span><span style="color:#9ECBFF;">&#39;a&#39;</span><span style="color:#E1E4E8;">,{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;"> () {</span><span style="color:#6A737D;">// track</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;"> () { </span><span style="color:#6A737D;">// trigger</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><div class="danger custom-block"><p class="custom-block-title">缺陷</p><ul><li>必须要预先知道要拦截的 <code>key</code> 值，因此不能检测对象属性的添加和删除(虽然 <code>Vue.js</code> 提供了 <code>$set</code> 和 <code>$delete</code>，不过对于用户来说，还是增加了一定的心智负担）</li><li>对于嵌套层级比较深的对象，如果要劫持它内部深层次的对象变化，就需要递归遍历这个对象，执行 <code>Object.defineProperty</code> 把每一层对象都变成响应式。如果用户定义的响应式数据过于复杂，此时会有相当大的性能负担。</li></ul></div><p>3.x 使用了 <code>Proxy</code> 来做数据劫持，具体是这样的：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">proxy</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">(data, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;"> () {</span><span style="color:#6A737D;">// track</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">() { </span><span style="color:#6A737D;">// trigger</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><div class="tip custom-block"><p class="custom-block-title">优势</p><ul><li>由于劫持的是整个对象，因此对于对象属性的增加和删除都能检测到。</li><li>由于 <code>Proxy</code> 并不能监听内部深层次的对象变化，3.x 实现了在 <code>getter</code> 中去递归响应式。只有真正访问到的内部对象才会变成响应式，而不是无脑递归，这样无疑在很大程度上提升了性能。</li></ul></div><h3 id="编译优化" tabindex="-1">编译优化 <a class="header-anchor" href="#编译优化" aria-label="Permalink to &quot;编译优化&quot;">​</a></h3><p>通过数据劫持和依赖收集，2.x 的数据更新并触发重新渲染的粒度是组件级的。虽然能保证触发更新的组件最小化，但在单个组件内部依然需要遍历该组件的整个 <code>vnode</code> 树。举个例子，比如我们要更新这个组件：</p><div class="language-vue line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;content&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;">&gt;static text&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;">&gt;static text&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;">&gt;{{ message }}&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;">&gt;static text&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;">&gt;static text&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>整个 diff 过程如图所示： <img src="`+o+'" alt="An image"> 由于这段代码中只有一个动态节点，所以这里有很多 <code>diff</code> 和遍历其实都是不需要的，这就导致了 <code>vnode</code> 的性能跟模版大小正相关，跟动态节点的数量无关，当一些组件的整个模版内只有少量动态节点时，这些遍历都是性能的浪费。</p><p>对于上述例子，理想状态只需要 <code>diff</code> 这个绑定 <code>message</code> 动态节点的 <code>p</code> 标签即可。</p><p>3.x 通过编译阶段对静态模板的分析，编译生成了 <code>Block tree</code>。它是一个将模版基于动态节点指令切割的嵌套区块，每个区块内部的节点结构是固定的，而且每个区块只需要以一个 <code>Array</code> 来追踪自身包含的动态节点。借助 <code>Block tree</code>，Vue.js 将 <code>vnode</code> 更新性能由与模版整体大小相关提升为与动态内容的数量相关，这是一个非常大的性能突破。</p><p>除此之外，3.x 在编译阶段还包含了对 <code>slot</code> 的编译优化、事件侦听函数的缓存优化，另外在运行时重写了 <code>diff</code> 算法。</p><h2 id="语法" tabindex="-1">语法 <a class="header-anchor" href="#语法" aria-label="Permalink to &quot;语法&quot;">​</a></h2><h3 id="优化逻辑组织" tabindex="-1">优化逻辑组织 <a class="header-anchor" href="#优化逻辑组织" aria-label="Permalink to &quot;优化逻辑组织&quot;">​</a></h3><div class="warning custom-block"><p class="custom-block-title">options vs Composition</p><p><code>options</code>: 写法非常符合直觉思维，依照 <code>methods</code>、<code>computed</code>、<code>data</code>、<code>props</code> 进行分类。当组件小的时候，这种方式一目了然。在大型组件中，一个组件可能有多个逻辑关注点，此时每一个关注点都有自己的 <code>options</code>，如果需要修改一个逻辑点关注点，就需要在单个文件中不断上下切换和寻找。</p><p><code>composition</code>: 1、将某个逻辑关注点相关的代码放在一个函数里。当需要修改一个功能时，不在需要在文件中跳来跳去。2、更好的类型支持(因为它们都是函数，在函数调用时，自然所有的类型就被推导出来了) 3、对 <code>tree-shaking</code> 友好，代码更容易压缩。</p></div><p>通过下图，我们可以很直观地感受到 <code>Composition</code> 在逻辑组织方面的优势： <img src="'+c+`" alt="An image"></p><h3 id="优化逻辑复用" tabindex="-1">优化逻辑复用 <a class="header-anchor" href="#优化逻辑复用" aria-label="Permalink to &quot;优化逻辑复用&quot;">​</a></h3><p>2.x 通常会用 <code>mixins</code> 去复用逻辑，使用单个 <code>mixin</code> 似乎问题不大，但是当一个组件混入大量不同的 <code>mixins</code> 的时候，会带来两个非常明显的问题：<strong>命名冲突和数据来源不清晰</strong>。</p><blockquote><p>命名冲突：每个 <code>mixin</code> 都可以定义自己的 <code>props</code>、<code>data</code>，它们之间是无感的，因此很容易定义相同的变量，导致命名冲突。</p></blockquote><blockquote><p>数据来源不清晰: 对组件而言，如果模板中使用不在当前组件中定义的变量，那么就不太容易知道这些变量是在哪里定义的。</p></blockquote><ul><li>用 <code>mixin</code> 的方式来复用侦听鼠标位置的例子，</li></ul><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">mousePositionMixin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      x: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      y: </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">mounted</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    window.</span><span style="color:#B392F0;">addEventListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;mousemove&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.update)</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">destroyed</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    window.</span><span style="color:#B392F0;">removeEventListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;mousemove&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.update)</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  methods: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">update</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> e.pageX</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.y </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> e.pageY</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> mousePositionMixin</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><ul><li>在组件中使用</li></ul><div class="language-vue line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    Mouse position: x {{ x }} / y {{ y }}</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> mousePositionMixin </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./mouse&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    mixins: [mousePositionMixin]</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>在 3.x 中我们可以通过自定义 <code>hook</code> 的方式定义 <code>useMousePosition</code> 函数：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { ref, onMounted, onUnmounted } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useMousePosition</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">x</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">y</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">update</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    x.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> e.pageX</span></span>
<span class="line"><span style="color:#E1E4E8;">    y.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> e.pageY</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">onMounted</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    window.</span><span style="color:#B392F0;">addEventListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;mousemove&#39;</span><span style="color:#E1E4E8;">, update)</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">onUnmounted</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    window.</span><span style="color:#B392F0;">removeEventListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;mousemove&#39;</span><span style="color:#E1E4E8;">, update)</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> { x, y }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>在组件中使用</p><div class="language-vue line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    Mouse position: x {{ x }} / y {{ y }}</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> useMousePosition </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./mouse&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">x</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">y</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useMousePosition</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> { x, y }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>可以看到，整个数据来源清晰了，即使去编写更多的 <code>hook</code>，也不会出现命名冲突的问题。</p><div class="tip custom-block"><p class="custom-block-title">总结</p><p><code>Composition</code> 属于 <code>API</code> 的增强，它并不是 3.x 版本组件开发的范式，如果组件足够简单，我们还是可以继续使用 <code>Options API</code> 的。</p></div><h3 id="引入-rfc" tabindex="-1">引入 RFC <a class="header-anchor" href="#引入-rfc" aria-label="Permalink to &quot;引入 RFC&quot;">​</a></h3><p><strong>保证每个版本改动可控</strong></p><div class="tip custom-block"><p class="custom-block-title">简介</p><p>全称 <code>Request For Comments</code>。旨在为新功能进入框架提供一个一致且受控的路径。当社区有一些新需求的想法时，可以提交一个 <code>RFC</code>，然后由社区和 <code>Vue.js</code> 核心团队一起讨论，如果这个 <code>RFC</code> 最终被通过了，那么它才会被实现。</p></div><p>3.x 目前已被实现并合并的 <code>RFC</code> 都在<a href="https://github.com/vuejs/rfcs/pulls?q=is%3Apr+is%3Amerged+label%3A3.x" target="_blank" rel="noreferrer">这里</a>，通过阅读它们，你也可以大致了解 3.0 的一些变化，以及为什么会产生这些变化，帮助你了解它的前因后果。</p>`,59),E=[r];function i(y,d,u,b,m,F){return a(),n("div",null,E)}const v=s(t,[["render",i]]);export{g as __pageData,v as default};
