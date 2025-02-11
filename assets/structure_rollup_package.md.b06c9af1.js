import{_ as s,c as n,o as a,V as p}from"./chunks/framework.85f79a96.js";const o="/vitepress-docs/assets/package-exports.bc432c30.png",b=JSON.parse('{"title":"package.json 解读","description":"","frontmatter":{},"headers":[],"relativePath":"structure/rollup/package.md","filePath":"structure/rollup/package.md","lastUpdated":1684413339000}'),l={name:"structure/rollup/package.md"},e=p(`<h1 id="package-json-解读" tabindex="-1">package.json 解读 <a class="header-anchor" href="#package-json-解读" aria-label="Permalink to &quot;package.json 解读&quot;">​</a></h1><h2 id="描述配置" tabindex="-1">描述配置 <a class="header-anchor" href="#描述配置" aria-label="Permalink to &quot;描述配置&quot;">​</a></h2><p>1、<code>name</code>: 项目的名称</p><p>2、<code>version</code>: 项目的版本号</p><p>3、<code>repository</code>: 项目的仓库地址以及版本控制信息。</p><p>4、<code>description</code>: 项目的描述</p><p>5、<code>keywords</code>: 项目的关键词(可以帮助别人在 npm 官网上更好地检索到该项目，增加曝光率)</p><p>6、<code>homepage</code>: 项目主页的链接</p><p>7、<code>bugs</code>: 项目 <code>bug</code> 反馈地址</p><p>8、<code>license</code>: 项目的开源许可证</p><p>9、<code>author</code>: 项目作者</p><div class="language-json line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;name&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;vue-router&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;version&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;3.6.5&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;repository&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;git&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;url&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;https://github.com/vuejs/vue-router.git&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;description&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Official router for Vue.js 2&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;keywords&quot;</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;vue&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;router&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;routing&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;homepage&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;https://github.com/vuejs/vue-router#readme&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;bugs&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;url&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;https://github.com/vuejs/vue-router/issues&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;license&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;MIT&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;author&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Evan You&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="文件配置" tabindex="-1">文件配置 <a class="header-anchor" href="#文件配置" aria-label="Permalink to &quot;文件配置&quot;">​</a></h2><p>1、<code>files</code></p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>项目发布时默认会包括 <code>package.json</code>，<code>license</code>，<code>README</code> 和 <code>main</code> 字段里指定的文件，</p><p>在此基础上，我们可以通过 <code>files</code> 指定需要跟随一起发布的内容（可以是单独的文件，整个文件夹，或者使用通配符匹配到的文件）</p><p>注: 一般情况下，files 里会指定构建出来的产物以及类型文件。</p></div><p>2、<code>main</code>: 项目的入口文件(不设置 <code>main</code> 字段，入口文件就是根目录下的 <code>index.js</code>)</p><p>3、<code>module</code>: 指定 <code>ES</code> 模块的入口文件</p><p>4、<code>unpkg</code>: 让 <code>npm</code> 上所有的文件都开启 <code>CDN</code> 服务。</p><p>5、<code>jsdelivr</code>: 与 <code>unpkg</code> 类似</p><p>6、<code>sideEffects</code>: 设置某些模块具有副作用，用于 <code>webpack</code> 的 <code>tree-shaking</code> 优化。</p><p>7、<code>types</code> 或者 <code>typings</code>: 指定 <code>TypeScript</code> 类型定义的入口文件</p><p>8、<code>browserslist</code>: 设置项目的浏览器兼容情况(<code>babel</code> 和 <code>autoprefixer</code> 等工具会使用该配置对代码进行转换)。另外我们也可以使用 .<code>browserslistrc</code> 文件进行配置。</p><p>9、<code>exports</code></p><blockquote><p>条件导出(node &gt;= 14.13)。 该字段可以配置不同环境对应的模块入口文件，当它存在时，优先级最高。</p></blockquote><p>比如使用 <code>require</code> 和 <code>import</code> 字段根据模块规范分别定义入口：</p><div class="language-json line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;exports&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;require&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;../dist/vue-router.common.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;import&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./dist/vue-router.esm.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>当使用 <code>import &#39;xxx&#39;</code> 和 <code>require(&#39;xxx&#39;)</code> 时会从不同的入口引入文件。另外 <code>exports</code> 也支持使用 <code>browser</code> 和 <code>node</code> 字段定义 <code>browser</code> 和<code> node</code> 环境中的入口。</p><p>上方的写法其实等同于：</p><div class="language-json line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;exports&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;.&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;require&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;../dist/vue-router.common.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;import&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./dist/vue-router.esm.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>之所以要加一个层级，把 <code>require</code> 和 <code>import</code> 放在 &quot;.&quot; 下面，是因为 <code>exports</code> 除了支持配置包的默认导出，还支持配置包的子路径。</p><p>示例如下: <img src="`+o+`" alt="An image"></p><div class="warning custom-block"><p class="custom-block-title">注意</p><p>除了对导出的文件路径进行封装，<code>exports</code> 还限制了使用者不可以访问未在 <code>exports</code> 中定义的任何其他路径。</p><p>比如发布的 <code>dist</code> 文件里有一些内部模块 <code>dist/internal/module</code> ，被用户单独引入使用的话可能会导致主模块不可用。为了限制外部的使用，我们可以不在 <code>exports</code> 定义这些模块的路径，这样外部引入 <code>packageA/dist/internal/module</code> 模块的话就会报错。</p></div><p>10、<code>lint-staged</code>: 对 <code>git</code> 暂存区的文件进行操作(一般用于在代码提交前执行 <code>lint</code> 校验)</p><p>11、<code>gitHooks</code>: 当 <code>git</code> 存储库中发生特定事件时会自动运行特定脚本，允许开发者定制 <code>git</code> 的内部行为。</p><p>我们来看看上述字段在 <code>vue-router</code> 中的配置情况:</p><div class="language-json line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;files&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;src&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;dist/*.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;dist/*.mjs&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;types/*.d.ts&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;main&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;dist/vue-router.common.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;module&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;dist/vue-router.esm.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;unpkg&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;dist/vue-router.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;jsdelivr&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;dist/vue-router.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;sideEffects&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;typings&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;types/index.d.ts&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;exports&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;.&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;import&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;node&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./dist/vue-router.mjs&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;default&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./dist/vue-router.esm.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;require&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./dist/vue-router.common.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;types&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./types/index.d.ts&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;./composables&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;import&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./composables.mjs&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;require&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./composables.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;types&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./composables.d.ts&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;./dist/*&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./dist/*&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;./types/*&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./types/*&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;./package.json&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./package.json&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;lint-staged&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;*.{js,vue}&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;eslint --fix&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;git add&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;gitHooks&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;pre-commit&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;lint-staged&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;commit-msg&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;node scripts/verifyCommitMsg.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br></div></div><p><code>scripts/verifyCommitMsg.js</code> 校验逻辑如下:</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">yorkie</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--save-dev(</span><span style="color:#B392F0;">^2.0.0</span><span style="color:#79B8FF;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">chalk</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;chalk&#39;</span><span style="color:#E1E4E8;">)  </span><span style="color:#6A737D;">// eslint-disable-line</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">msgPath</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> p<wbr>rocess.env.</span><span style="color:#79B8FF;">GIT_PARAMS</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">msg</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;fs&#39;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">readFileSync</span><span style="color:#E1E4E8;">(msgPath, </span><span style="color:#9ECBFF;">&#39;utf-8&#39;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">trim</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">commitRE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#F97583;">^</span><span style="color:#DBEDFF;">(v</span><span style="color:#79B8FF;">\\d</span><span style="color:#F97583;">+</span><span style="color:#85E89D;font-weight:bold;">\\.</span><span style="color:#79B8FF;">\\d</span><span style="color:#F97583;">+</span><span style="color:#85E89D;font-weight:bold;">\\.</span><span style="color:#79B8FF;">\\d</span><span style="color:#F97583;">+</span><span style="color:#DBEDFF;">(-(alpha</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">beta</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">rc</span><span style="color:#79B8FF;">.\\d</span><span style="color:#F97583;">+</span><span style="color:#DBEDFF;">))</span><span style="color:#F97583;">?$</span><span style="color:#DBEDFF;">)</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">((revert: )</span><span style="color:#F97583;">?</span><span style="color:#DBEDFF;">(feat</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">fix</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">docs</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">style</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">refactor</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">perf</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">test</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">workflow</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">ci</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">chore</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">types</span><span style="color:#F97583;">|</span><span style="color:#DBEDFF;">build)(</span><span style="color:#85E89D;font-weight:bold;">\\(</span><span style="color:#79B8FF;">.</span><span style="color:#F97583;">+</span><span style="color:#85E89D;font-weight:bold;">\\)</span><span style="color:#DBEDFF;">)</span><span style="color:#F97583;">?</span><span style="color:#DBEDFF;">: </span><span style="color:#79B8FF;">.</span><span style="color:#F97583;">{1,50}</span><span style="color:#DBEDFF;">)</span><span style="color:#9ECBFF;">/</span></span>
<span class="line"><span style="color:#6A737D;">// ^(build|chore|ci|docs|feat|fix|wip|perf|refactor|revert|style|test|temp|)(\\(.+\\))?: .{1,50}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">commitRE.</span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(msg)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">error</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`  \${</span><span style="color:#E1E4E8;">chalk</span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;">bgRed</span><span style="color:#9ECBFF;">.</span><span style="color:#B392F0;">white</span><span style="color:#9ECBFF;">(</span><span style="color:#9ECBFF;">&#39; ERROR &#39;</span><span style="color:#9ECBFF;">)</span><span style="color:#9ECBFF;">} \${</span><span style="color:#E1E4E8;">chalk</span><span style="color:#9ECBFF;">.</span><span style="color:#B392F0;">red</span><span style="color:#9ECBFF;">(</span><span style="color:#9ECBFF;">\`invalid commit message format.\`</span><span style="color:#9ECBFF;">)</span><span style="color:#9ECBFF;">}</span><span style="color:#79B8FF;">\\n\\n</span><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">    chalk.</span><span style="color:#B392F0;">red</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">\`  Proper commit message format is required for automated changelog generation. Examples:</span><span style="color:#79B8FF;">\\n\\n</span><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`    \${</span><span style="color:#E1E4E8;">chalk</span><span style="color:#9ECBFF;">.</span><span style="color:#B392F0;">green</span><span style="color:#9ECBFF;">(</span><span style="color:#9ECBFF;">\`feat(compiler): add &#39;comments&#39; option\`</span><span style="color:#9ECBFF;">)</span><span style="color:#9ECBFF;">}</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`    \${</span><span style="color:#E1E4E8;">chalk</span><span style="color:#9ECBFF;">.</span><span style="color:#B392F0;">green</span><span style="color:#9ECBFF;">(</span><span style="color:#9ECBFF;">\`fix(v-model): handle events on blur (close #28)\`</span><span style="color:#9ECBFF;">)</span><span style="color:#9ECBFF;">}</span><span style="color:#79B8FF;">\\n\\n</span><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">    chalk.</span><span style="color:#B392F0;">red</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">\`  See .github/COMMIT_CONVENTION.md for more details.</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">    chalk.</span><span style="color:#B392F0;">red</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">\`  You can also use \${</span><span style="color:#E1E4E8;">chalk</span><span style="color:#9ECBFF;">.</span><span style="color:#B392F0;">cyan</span><span style="color:#9ECBFF;">(</span><span style="color:#9ECBFF;">\`npm run commit\`</span><span style="color:#9ECBFF;">)</span><span style="color:#9ECBFF;">} to interactively generate a commit message.</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#E1E4E8;">  process.</span><span style="color:#B392F0;">exit</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">// 以非 0 值退出，放弃提交</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h2 id="脚本配置" tabindex="-1">脚本配置 <a class="header-anchor" href="#脚本配置" aria-label="Permalink to &quot;脚本配置&quot;">​</a></h2><p>1、<code>scripts</code>: 指定项目的内置脚本命令，基于 <code>npm run xx</code> 运行，通常包含项目开发、构建、代码格式化、测试、发布、文档部署等命令。</p><div class="language-json line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;scripts&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;dev&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;node examples/server.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;dev:dist&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;rollup -wm -c build/rollup.dev.config.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;build&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;node build/build.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;lint&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;eslint src examples test&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;test&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;npm run lint &amp;&amp; npm run flow &amp;&amp; npm run test:unit &amp;&amp; npm run test:e2e &amp;&amp; npm run test:types&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;flow&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;flow check&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;test:unit&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;jasmine JASMINE_CONFIG_PATH=test/unit/jasmine.json&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;test:e2e&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;node test/e2e/runner.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;test:e2e:ci&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;node test/e2e/runner.js --local -e ie,android44 -c test/e2e/nightwatch.browserstack.js test/e2e/specs/active-links.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;test:e2e:ff&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;node test/e2e/runner.js -e firefox -c test/e2e/nightwatch.config.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;test:e2e:ie9&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;node test/e2e/runner.js --local -e ie9 -c test/e2e/nightwatch.browserstack.js --skiptags history,ie9-fail&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;test:types&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;tsc -p types/test&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;docs&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;vuepress dev docs&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;docs:build&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;vuepress build docs&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;changelog&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;conventional-changelog -p angular -r 2 -i CHANGELOG.md -s&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;release&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;bash scripts/release.sh&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;commit&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;git-cz&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h2 id="依赖配置" tabindex="-1">依赖配置 <a class="header-anchor" href="#依赖配置" aria-label="Permalink to &quot;依赖配置&quot;">​</a></h2><p>1、<code>dependencies</code>: 项目运行依赖(项目生产环境下需要用到的依赖)。使用 <code>npm install xxx</code> 或则 <code>npm install xxx --save</code> 时，会被自动插入到该字段中。</p><p>2、<code>devDependencies</code>: 项目开发依赖(项目开发环境需要用到)，用于辅助开发。使用 <code>npm install xxx -D</code> 或者 <code>npm install xxx --save-dev</code> 时，会被自动插入到该字段中。</p><p>3、<code>peerDependencies</code>: 同伴依赖，一种特殊的依赖，不会被自动安装，通常用于表示与另一个包的依赖与兼容性关系来警示使用者。</p><div class="language-json line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;devDependencies&quot;</span><span style="color:#E1E4E8;">: {},</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;dependencies&quot;</span><span style="color:#E1E4E8;">: {},</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;peerDependencies&quot;</span><span style="color:#E1E4E8;">: {}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="发布配置" tabindex="-1">发布配置 <a class="header-anchor" href="#发布配置" aria-label="Permalink to &quot;发布配置&quot;">​</a></h2><p>1、<code>private</code>: 设置为 <code>true</code> 表示私有项目，不希望发布到公共 <code>npm</code> 仓库上。</p><h2 id="系统配置" tabindex="-1">系统配置 <a class="header-anchor" href="#系统配置" aria-label="Permalink to &quot;系统配置&quot;">​</a></h2><p>1、<code>engines</code>: 项目由于兼容性问题会对 <code>node</code> 或者包管理器有特定的版本号要求。举例如下:</p><div class="language-json line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;engines&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;node&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&gt;=14 &lt;16&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// node 版本大于等于 14 且小于 16</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;pnpm&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&gt;7&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// pnpm 版本号需要大于 7</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div>`,52),t=[e];function c(r,E,y,i,u,F){return a(),n("div",null,t)}const m=s(l,[["render",c]]);export{b as __pageData,m as default};
