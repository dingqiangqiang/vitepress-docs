import{_ as s,c as n,o as a,V as l}from"./chunks/framework.85f79a96.js";const p="/vitepress-docs/assets/tapable.de8872be.png",e="/vitepress-docs/assets/tapable2.456e3974.png",m=JSON.parse('{"title":"tapable","description":"","frontmatter":{},"headers":[],"relativePath":"structure/webpack/tapable.md","filePath":"structure/webpack/tapable.md","lastUpdated":1698666626000}'),o={name:"structure/webpack/tapable.md"},r=l(`<h1 id="tapable" tabindex="-1">tapable <a class="header-anchor" href="#tapable" aria-label="Permalink to &quot;tapable&quot;">​</a></h1><p><a href="https://github.com/webpack/tapable" target="_blank" rel="noreferrer">官网链接</a></p><p><code>tapable</code> 是一个类似于 <code>EventEmitter</code> 的库, 主要控制钩子函数的发布与订阅，控制着 <code>webpack</code> 的插件系统。</p><p><code>tapable</code> 暴露了很多 <code>Hook</code>(钩子)类，为插件提供挂载的钩子</p><h2 id="hooks" tabindex="-1">hooks <a class="header-anchor" href="#hooks" aria-label="Permalink to &quot;hooks&quot;">​</a></h2><table><thead><tr><th>钩子名称</th><th style="text-align:left;">类型</th></tr></thead><tbody><tr><td>SyncHook</td><td style="text-align:left;">同步钩子</td></tr><tr><td>SyncBailHook</td><td style="text-align:left;">同步熔断钩子</td></tr><tr><td>SyncWaterfallHook</td><td style="text-align:left;">同步流水钩子</td></tr><tr><td>SyncLoopHook</td><td style="text-align:left;">同步循环钩子</td></tr><tr><td>AsyncParallelHook</td><td style="text-align:left;">异步并发钩子</td></tr><tr><td>AsyncParallelBailHook</td><td style="text-align:left;">异步并发熔断钩子</td></tr><tr><td>AsyncSeriesHook</td><td style="text-align:left;">异步串行钩子</td></tr><tr><td>AsyncSeriesBailHook</td><td style="text-align:left;">异步串行熔断钩子</td></tr><tr><td>AsyncSeriesWaterfallHook</td><td style="text-align:left;">异步串行流水钩子</td></tr></tbody></table><h2 id="使用方式" tabindex="-1">使用方式 <a class="header-anchor" href="#使用方式" aria-label="Permalink to &quot;使用方式&quot;">​</a></h2><p><code>tapable</code> 暴露出来的都是类方法</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">SyncHook</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">SyncBailHook</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">SyncWaterfallHook</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">SyncLoopHook</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">AsyncParallelHook</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">AsyncParallelBailHook</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">AsyncSeriesHook</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">AsyncSeriesBailHook</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">AsyncSeriesWaterfallHook</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;tapable&quot;</span><span style="color:#E1E4E8;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><code>new</code> 一个类方法获得我们需要的钩子，参数可传可不传</p><h2 id="钩子的绑定与执行" tabindex="-1">钩子的绑定与执行 <a class="header-anchor" href="#钩子的绑定与执行" aria-label="Permalink to &quot;钩子的绑定与执行&quot;">​</a></h2><p><code>tapable</code> 提供了同步、异步绑定钩子的方法，并且他们都有绑定事件和执行事件对应的方法。</p><table><thead><tr><th>类型</th><th style="text-align:center;">绑定</th><th style="text-align:center;">执行</th></tr></thead><tbody><tr><td>Async</td><td style="text-align:center;">tapAsync/tapPromise/tap</td><td style="text-align:center;">callAsync/promise</td></tr><tr><td>Sync</td><td style="text-align:center;">tap</td><td style="text-align:center;">call</td></tr></tbody></table><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">SyncHook</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;tapable&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">hook</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SyncHook</span><span style="color:#E1E4E8;">([</span><span style="color:#9ECBFF;">&quot;arg1&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;arg2&quot;</span><span style="color:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">hook.</span><span style="color:#B392F0;">tap</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;hook&#39;</span><span style="color:#E1E4E8;">, (</span><span style="color:#FFAB70;">arg1</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">arg2</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(arg1, arg2)) </span><span style="color:#6A737D;">//绑定事件</span></span>
<span class="line"><span style="color:#E1E4E8;">hook.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">// 触发事件</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="tapable-关联-webpack" tabindex="-1">tapable 关联 webpack <a class="header-anchor" href="#tapable-关联-webpack" aria-label="Permalink to &quot;tapable 关联 webpack&quot;">​</a></h2><p><img src="`+p+`" alt="An image"></p><p><code>options</code> 是我们定义的 <code>webpack</code> 配置文件，通常都会配置对象形式。其中 <code>plugins</code> 是数组，可以看到每一个 <code>plugin</code> 都会接受 <code>compiler</code> 实例作为参数(如下配置)。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { </span><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">xxxPlugin</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><code>compiler</code> 实例上有 <code>hooks</code> 对象，代码如下截图</p><p><img src="`+e+`" alt="An image"></p><h2 id="流程模拟" tabindex="-1">流程模拟 <a class="header-anchor" href="#流程模拟" aria-label="Permalink to &quot;流程模拟&quot;">​</a></h2><h3 id="模拟-compiler" tabindex="-1">模拟 Compiler <a class="header-anchor" href="#模拟-compiler" aria-label="Permalink to &quot;模拟 Compiler&quot;">​</a></h3><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">SyncHook</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">AsyncSeriesHook</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;tapable&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Compiler</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.hooks </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      accelerate: </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SyncHook</span><span style="color:#E1E4E8;">([</span><span style="color:#9ECBFF;">&#39;newspeed&#39;</span><span style="color:#E1E4E8;">]),</span></span>
<span class="line"><span style="color:#E1E4E8;">      brake: </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SyncHook</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">      calculateRoutes: </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AsyncSeriesHook</span><span style="color:#E1E4E8;">([</span><span style="color:#9ECBFF;">&quot;source&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;target&quot;</span><span style="color:#E1E4E8;">])</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">accelerate</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">break</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">calculateRoutes</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Async&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;hook&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">accelerate</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">speed</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.hooks.accelerate.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(speed);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">break</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.hooks.brake.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">calculateRoutes</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">...</span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.hooks.calculateRoutes.</span><span style="color:#B392F0;">promise</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">args).</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    }, </span><span style="color:#FFAB70;">err</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        console.</span><span style="color:#B392F0;">error</span><span style="color:#E1E4E8;">(err);</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><h3 id="模拟-plugin" tabindex="-1">模拟 plugin <a class="header-anchor" href="#模拟-plugin" aria-label="Permalink to &quot;模拟 plugin&quot;">​</a></h3><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Compiler</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./Compiler&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MyPlugin</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">apply</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">compiler</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    compiler.hooks.brake.</span><span style="color:#B392F0;">tap</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;brake&quot;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;brake&#39;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">    compiler.hooks.accelerate.</span><span style="color:#B392F0;">tap</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;accelerate&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">newSpeed</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">\`accelerate to \${</span><span style="color:#E1E4E8;">newSpeed</span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">    compiler.hooks.calculateRoutes.</span><span style="color:#B392F0;">tapPromise</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;calculateRoutes&quot;</span><span style="color:#E1E4E8;">, (</span><span style="color:#FFAB70;">source</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">resolve</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">reject</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">\`calculateRoutes to \${</span><span style="color:#E1E4E8;">source</span><span style="color:#9ECBFF;">} \${</span><span style="color:#E1E4E8;">target</span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      })</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="模拟插件执行" tabindex="-1">模拟插件执行 <a class="header-anchor" href="#模拟插件执行" aria-label="Permalink to &quot;模拟插件执行&quot;">​</a></h3><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">options</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MyPlugin</span><span style="color:#E1E4E8;">()]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">compiler</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Compiler</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">plugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">of</span><span style="color:#E1E4E8;"> options.plugins) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> plugin </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;function&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    plugin.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(compiler, compiler)</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    plugin.</span><span style="color:#B392F0;">apply</span><span style="color:#E1E4E8;">(compiler)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">compiler.</span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">()</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div>`,27),t=[r];function c(E,y,i,b,F,u){return a(),n("div",null,t)}const B=s(o,[["render",c]]);export{m as __pageData,B as default};
