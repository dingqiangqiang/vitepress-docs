import{_ as s,c as n,o as a,V as l}from"./chunks/framework.85f79a96.js";const m=JSON.parse('{"title":"Vue.js 源码构建","description":"","frontmatter":{},"headers":[],"relativePath":"analysis/prepare/build.md","filePath":"analysis/prepare/build.md","lastUpdated":1708780763000}'),p={name:"analysis/prepare/build.md"},e=l(`<h1 id="vue-js-源码构建" tabindex="-1">Vue.js 源码构建 <a class="header-anchor" href="#vue-js-源码构建" aria-label="Permalink to &quot;Vue.js 源码构建&quot;">​</a></h1><p>Vue.js 源码是基于 <a href="https://github.com/rollup/rollup" target="_blank" rel="noreferrer">Rollup</a> 构建的，它的构建相关配置都在 scripts 目录下。</p><h2 id="构建脚本" tabindex="-1">构建脚本 <a class="header-anchor" href="#构建脚本" aria-label="Permalink to &quot;构建脚本&quot;">​</a></h2><p>通常一个基于 NPM 托管的项目都会有一个 package.json 文件，它是对项目的描述文件，它的内容实际上是一个标准的 JSON 对象。</p><p>我们通常会配置 <code>script</code> 字段作为 NPM 的执行脚本，Vue.js 源码构建的脚本如下：</p><div class="language-json line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;script&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;build&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;node scripts/build.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;build:ssr&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;npm run build -- web-runtime-cjs,web-server-renderer&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;build:weex&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;npm run build -- weex&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>这里总共有 3 条命令，作用都是构建 Vue.js，后面 2 条是在第一条命令的基础上，添加一些环境参数。</p><p>当在命令行运行 <code>npm run build</code> 的时候，实际上就会执行 <code>node scripts/build.js</code>，接下来我们来看看它实际是怎么构建的。</p><h2 id="构建过程" tabindex="-1">构建过程 <a class="header-anchor" href="#构建过程" aria-label="Permalink to &quot;构建过程&quot;">​</a></h2><p>我们对于构建过程分析是基于源码的，先打开构建的入口 JS 文件，在 <code>scripts/build.js</code> 中：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> builds </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./config&#39;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">getAllBuilds</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// filter builds via command line arg</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (process.argv[</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">filters</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> process.argv[</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">].</span><span style="color:#B392F0;">split</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;,&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  builds </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> builds.</span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">b</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> filters.</span><span style="color:#B392F0;">some</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">f</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> b.output.file.</span><span style="color:#B392F0;">indexOf</span><span style="color:#E1E4E8;">(f) </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> b._name.</span><span style="color:#B392F0;">indexOf</span><span style="color:#E1E4E8;">(f) </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// filter out weex builds by default</span></span>
<span class="line"><span style="color:#E1E4E8;">  builds </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> builds.</span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">b</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> b.output.file.</span><span style="color:#B392F0;">indexOf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;weex&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">build</span><span style="color:#E1E4E8;">(builds)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>这段代码逻辑非常简单，先从配置文件读取配置，再通过命令行参数对构建配置做过滤，这样就可以构建出不同用途的 Vue.js 了。接下来我们看一下配置文件，在 <code>scripts/config.js</code> 中：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">builds</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Runtime only (CommonJS). Used by bundlers e.g. Webpack &amp; Browserify</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;web-runtime-cjs&#39;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    entry: </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;web/entry-runtime.js&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    dest: </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;dist/vue.runtime.common.js&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    format: </span><span style="color:#9ECBFF;">&#39;cjs&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    banner</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Runtime+compiler CommonJS build (CommonJS)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;web-full-cjs&#39;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    entry: </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;web/entry-runtime-with-compiler.js&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    dest: </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;dist/vue.common.js&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    format: </span><span style="color:#9ECBFF;">&#39;cjs&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    alias: { he: </span><span style="color:#9ECBFF;">&#39;./entity-decoder&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">    banner</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Runtime only (ES Modules). Used by bundlers that support ES Modules,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// e.g. Rollup &amp; Webpack 2</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;web-runtime-esm&#39;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    entry: </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;web/entry-runtime.js&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    dest: </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;dist/vue.runtime.esm.js&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    format: </span><span style="color:#9ECBFF;">&#39;es&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    banner</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Runtime+compiler CommonJS build (ES Modules)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;web-full-esm&#39;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    entry: </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;web/entry-runtime-with-compiler.js&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    dest: </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;dist/vue.esm.js&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    format: </span><span style="color:#9ECBFF;">&#39;es&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    alias: { he: </span><span style="color:#9ECBFF;">&#39;./entity-decoder&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">    banner</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// runtime-only build (Browser)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;web-runtime-dev&#39;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    entry: </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;web/entry-runtime.js&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    dest: </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;dist/vue.runtime.js&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    format: </span><span style="color:#9ECBFF;">&#39;umd&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    env: </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    banner</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// runtime-only production build (Browser)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;web-runtime-prod&#39;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    entry: </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;web/entry-runtime.js&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    dest: </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;dist/vue.runtime.min.js&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    format: </span><span style="color:#9ECBFF;">&#39;umd&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    env: </span><span style="color:#9ECBFF;">&#39;production&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    banner</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Runtime+compiler development build (Browser)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;web-full-dev&#39;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    entry: </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;web/entry-runtime-with-compiler.js&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    dest: </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;dist/vue.js&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    format: </span><span style="color:#9ECBFF;">&#39;umd&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    env: </span><span style="color:#9ECBFF;">&#39;development&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    alias: { he: </span><span style="color:#9ECBFF;">&#39;./entity-decoder&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">    banner</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Runtime+compiler production build  (Browser)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;web-full-prod&#39;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    entry: </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;web/entry-runtime-with-compiler.js&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    dest: </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;dist/vue.min.js&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    format: </span><span style="color:#9ECBFF;">&#39;umd&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    env: </span><span style="color:#9ECBFF;">&#39;production&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    alias: { he: </span><span style="color:#9ECBFF;">&#39;./entity-decoder&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">    banner</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br></div></div><p>这里列举了一些 Vue.js 构建的配置，关于还有一些服务端渲染 webpack 插件以及 weex 的打包配置就不列举了。</p><p>对于单个配置，它是遵循 Rollup 的构建规则的。其中 <code>entry</code> 属性表示构建的入口 JS 文件地址，<code>dest</code> 属性表示构建后的 JS 文件地址。<code>format</code> 属性表示构建的格式，<code>cjs</code> 表示构建出来的文件遵循 <a href="http://wiki.commonjs.org/wiki/Modules/1.1" target="_blank" rel="noreferrer">CommonJS</a> 规范，<code>es</code> 表示构建出来的文件遵循 <a href="http://exploringjs.com/es6/ch_modules.html" target="_blank" rel="noreferrer">ES Module</a> 规范。 <code>umd</code> 表示构建出来的文件遵循 <a href="https://github.com/umdjs/umd" target="_blank" rel="noreferrer">UMD</a> 规范。</p><p>以 <code>web-runtime-cjs</code> 配置为例，它的 <code>entry</code> 是 <code>resolve(&#39;web/entry-runtime.js&#39;)</code>，先来看一下 <code>resolve</code> 函数的定义。</p><p>源码目录：<code>scripts/config.js</code></p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">aliases</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./alias&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">base</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> p.</span><span style="color:#B392F0;">split</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;/&#39;</span><span style="color:#E1E4E8;">)[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (aliases[base]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(aliases[base], p.</span><span style="color:#B392F0;">slice</span><span style="color:#E1E4E8;">(base.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&#39;../&#39;</span><span style="color:#E1E4E8;">, p)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>这里的 <code>resolve</code> 函数实现非常简单，它先把 <code>resolve</code> 函数传入的参数 <code>p</code> 通过 <code>/</code> 做了分割成数组，然后取数组第一个元素设置为 <code>base</code>。在我们这个例子中，参数 <code>p</code> 是 <code>web/entry-runtime.js</code>，那么 <code>base</code> 则为 <code>web</code>。<code>base</code> 并不是实际的路径，它的真实路径借助了别名的配置，我们来看一下别名配置的代码，在 <code>scripts/alias</code> 中：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">path</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;path&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  vue: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&#39;../src/platforms/web/entry-runtime-with-compiler&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">  compiler: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&#39;../src/compiler&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">  core: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&#39;../src/core&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">  shared: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&#39;../src/shared&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">  web: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&#39;../src/platforms/web&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">  weex: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&#39;../src/platforms/weex&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">  server: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&#39;../src/server&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">  entries: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&#39;../src/entries&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">  sfc: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&#39;../src/sfc&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>很显然，这里 <code>web</code> 对应的真实的路径是 <code>path.resolve(__dirname, &#39;../src/platforms/web&#39;)</code>，这个路径就找到了 Vue.js 源码的 web 目录。然后 <code>resolve</code> 函数通过 <code>path.resolve(aliases[base], p.slice(base.length + 1))</code> 找到了最终路径，它就是 Vue.js 源码 web 目录下的 <code>entry-runtime.js</code>。因此，<code>web-runtime-cjs</code> 配置对应的入口文件就找到了。</p><p>它经过 Rollup 的构建打包后，最终会在 dist 目录下生成 <code>vue.runtime.common.js</code>。</p><h2 id="runtime-only-vs-runtime-compiler" tabindex="-1">Runtime Only VS Runtime + Compiler <a class="header-anchor" href="#runtime-only-vs-runtime-compiler" aria-label="Permalink to &quot;Runtime Only VS Runtime + Compiler&quot;">​</a></h2><p>通常我们利用 vue-cli 去初始化我们的 Vue.js 项目的时候会询问我们用 Runtime Only 版本的还是 Runtime + Compiler 版本。下面我们来对比这两个版本。</p><ul><li>Runtime Only</li></ul><p>我们在使用 Runtime Only 版本的 Vue.js 的时候，通常需要借助如 webpack 的 vue-loader 工具把 .vue 文件编译成 JavaScript，因为是在编译阶段做的，所以它只包含运行时的 Vue.js 代码，因此代码体积也会更轻量。</p><ul><li>Runtime + Compiler</li></ul><p>我们如果没有对代码做预编译，但又使用了 Vue 的 template 属性并传入一个字符串，则需要在客户端编译模板，如下所示：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#6A737D;">// 需要编译器的版本</span></span>
<span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Vue</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  template: </span><span style="color:#9ECBFF;">&#39;&lt;div&gt;{{ hi }}&lt;/div&gt;&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 这种情况不需要</span></span>
<span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Vue</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">h</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">h</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;div&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.hi)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>因为在 Vue.js 2.0 中，最终渲染都是通过 <code>render</code> 函数，如果写 <code>template</code> 属性，则需要编译成 <code>render</code> 函数，那么这个编译过程会发生运行时，所以需要带有编译器的版本。</p><p>很显然，这个编译过程对性能会有一定损耗，所以通常我们更推荐使用 Runtime-Only 的 Vue.js。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>通过这一节的分析，我们可以了解到 Vue.js 的构建打包过程，也知道了不同作用和功能的 Vue.js 它们对应的入口以及最终编译生成的 JS 文件。尽管在实际开发过程中我们会用 Runtime Only 版本开发比较多，但为了分析 Vue 的编译过程，我们这门课重点分析的源码是 Runtime + Compiler 的 Vue.js。</p>`,33),o=[e];function r(c,E,t,i,y,b){return a(),n("div",null,o)}const d=s(p,[["render",r]]);export{m as __pageData,d as default};
