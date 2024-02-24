import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/docs/',
  title: 'StriveDocs',
  // outDir: '../dist',
  description: '前端技术博客',
  appearance: 'dark',
  ignoreDeadLinks: true,
  lang: 'zh-CN',
  lastUpdated: true,
  markdown: {
    theme: 'github-dark',
    lineNumbers: true
  },
  head: [
    ['link', { rel: 'icon', href: '/docs/favicon.ico' }]
  ],
  
  // 主题配置
  themeConfig: {
    logo: './logo.svg',
    outline: 'deep',
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    returnToTopLabel: '返回顶部',
    outlineTitle: '导航栏',
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '归档',
    editLink: {
      pattern: 'https://gitee.com/ding1992/vitepress-starter/tree/master/docs/:path',
      text: '在 Gitee 上编辑此页',
    },
    lastUpdatedText: '上次更新',
    search: {
      provider: 'local'
    },
    // algolia: {
    //   appId: 'RHX6KGJ4PT',
    //   apiKey: '9ccfcfff5b8b2ca6318229be055a524b',
    //   indexName: 'chocn',
    //   placeholder: '请输入关键词',
    //   translations: {
    //     button: {
    //       buttonText: '搜索文档',
    //     }
    //   }
    // },
    nav: [
      // { text: '🔥 Vue.js 技术揭秘', link: 'https://dingqiangqiang.github.io/vue/guide/'},
      { text: '🔥 Vue.js 技术揭秘', link: '/analysis/guide/'},
      { text: 'React', link: '/react/hooks'},
      { text: '⭐ 小程序', link: '/mini-program/design'},
      {
        text: '前端进阶',
        items: [
          { text: 'Axios 源码解析', link: '/axios/01'},
          { text: '组件库', link: '/component-library/guide'},
          { text: '脚手架', link: '/vue-cli/01'},
          { 
            text: 'TS', 
            link: '/typescript/api'
          },
          { 
            text: '构建工具', 
            link: '/structure/vite/'
          },
          {
            text: '数据结构与算法',
            link: '/algorithm/tree'
          },
          { 
            text: '设计模式', 
            link: '/design-pattern/'
          },
          {
            text: '单元测试',
            items: [
              {
                text: 'Jest',
                link: '/test/jest/'
              }
            ]
          },
          { 
            text: '网络、协议', 
            link: '/network/'
          },
        ]
      },
      {
        text: '全栈基石',
        items: [
          { 
            text: 'Node', 
            link: '/node/'
          },
          {
            text: 'Express',
            link: '/express/'
          },
          { 
            text: 'Koa', 
            link: '/koa/onion'
          }
        ]
      },
      { text: '📝 备忘录', link: '/develop-summary/string'},
    ],
    sidebar: {
      '/': [
        {
          text: '开始阅读',
          collapsed: false,
          items: [
            { text: '阅读须知', link: '/guide' }
          ],
        },
        {
          text: '🍏 Turf',
          collapsed: false,
          items: [
            { text: '常用工具函数', link: '/turf/' },
          ],
        },
        // {
        //   text: '安全',
        //   collapsed: false,
        //   items: [
        //     { text: 'CSRF', link: '/secure/csrf' },
        //     { text: 'XSS', link: '/secure/xss' },
        //   ]
        // },
        // {
        //   text: '🍎 VitePress',
        //   collapsed: false,
        //   items: [
        //     { text: '常用配置', link: '/vitepress/' },
        //   ],
        // },
        {
          text: '🔥 每日一记',
          collapsed: true,
          items: [
            { text: '01-20 关于 import type 的理解', link: '/dailyNote/type' },
            { text: '01-21 Vue3 项目搭建', link: '/dailyNote/project' }
          ],
        },
        // {
        //   text: '🔥 Electron',
        //   collapsed: false,
        //   items: [
        //     { text: '起步', link: '/electron/' },
        //   ],
        // }
      ],
      '/mini-program/': [
        { 
          text: '原理篇',
          items: [
            {
              text: '底层实现',
              link: '/mini-program/design'
            }
          ]
        }
        // { 
        //   text: '应用篇',
        //   collapsed: true,
        //   items: [
        //     {
        //       text: '场景梳理',
        //       link: '/mini-program/'
        //     },
        //     {
        //       text: '技术攻坚',
        //       link: '/mini-program/difficulty'
        //     }
        //   ]
        // }
      ],
      '/react/': [
        {
          text: '常用语法',
          items: [
            {
              text: 'hooks',
              link: '/react/hooks'
            },
            {
              text: 'feature',
              link: '/react/feature'
            },
            {
              text: 'redux',
              link: '/react/redux'
            }
          ]
        }
      ],
      '/component-library/': [
        {
          text: '组件库',
          // collapsed: true,
          items: [
            {
              text: '导读',
              link: '/component-library/guide'
            },
            {
              text: '快速开始',
              link: '/component-library/getting-started'
            },
            {
              text: '原子化 CSS',
              link: '/component-library/unocss'
            },
            {
              text: '文档系统',
              link: '/component-library/document'
            },
            {
              text: 'Jest 单元测试',
              link: '/test/jest/'
            },
            {
              text: '集成 vitest',
              link: '/component-library/vitest'
            }
          ]
        }
      ],
      '/typescript/': [
        {
          text: 'Typescript',
          items: [
            {
              text: '常用语法梳理',
              link: '/typescript/api'
            },
            {
              text: '进阶特性',
              link: '/typescript/advanced'
            }
          ]
        }
      ],
      '/axios/': [
        {  
          text: '介绍',
          items: [
            { text: '介绍', link: '/axios/01'},
            { text: '入口', link: '/axios/02'},
            { text: '拦截器', link: '/axios/03'},
            { text: '合并配置', link: '/axios/04'},
            { text: 'dispatchRequest', link: '/axios/05'},
            { text: 'xhr', link: '/axios/06'},
            { text: '取消请求', link: '/axios/07'},
            { text: '错误处理', link: '/axios/08'}
          ]
        },
      ],
      '/vue-cli/': [
        {
          text: 'vue-cli 技术揭秘',
          items: [
            { text: '入口', link: '/vue-cli/01'},
            { text: '项目生成', link: '/vue-cli/02'},
            { text: '第三方依赖包', link: '/vue-cli/03'}
          ],
        }
      ],
      '/vue/': [
        {
          text: 'Vue 专栏',
          collapsed: false,
          items: [
            {
              text: '一文看懂 Vue.js 3.0 的优化',
              link: '/vue/optimize'
            },
            {
              text: '权衡的艺术',
              link: '/vue/weigh'
            },
            {
              text: '响应式原理剖析',
              link: '/vue/reactive'
            },
            {
              text: '揭秘 diff 神秘面纱',
              link: '/vue/diff'
            },
            {
              text: '编译相关',
              link: '/vue/compile'
            },
            {
              text: 'setup 语法糖',
              link: '/vue/setup'
            },
            {
              text: '组件封装',
              link: '/vue/components'
            },
            {
              text: '自定义指令封装',
              link: '/vue/directives'
            },
            {
              text: '大杂脍',
              link: '/vue/interview'
            },
            {
              text: '工具函数盘点',
              link: '/vue/util'
            },
            {
              text: 'jsx',
              link: '/vue/jsx'
            }
          ]
        }
      ],
      '/analysis/': [
        {  
          text: '介绍',
          items: [
            {
              text: 'Introduction',
              link: '/analysis/guide/'
            }
          ]
        },
        {
          text: '准备工作',
          items: [
            {
              text: 'Introduction',
              link: '/analysis/prepare/introduction'
            },
            {
              text: '认识 Flow',
              link: '/analysis/prepare/flow'
            },
            {
              text: 'Vue.js 源码目录设计',
              link: '/analysis/prepare/directory'
            },
            {
              text: 'Vue.js 源码构建',
              link: '/analysis/prepare/build'
            },
            {
              text: '从入口开始',
              link: '/analysis/prepare/entrance'
            }
          ]
        },
        {
          text: '数据驱动',
          items: [
            {
              text: 'Introduction',
              link: '/analysis/data-driven/introduction'
            },
            {
              text: 'new Vue 发生了什么',
              link: '/analysis/data-driven/new-vue'
            },
            {
              text: 'Vue 实例挂载的实现',
              link: '/analysis/data-driven/mounted'
            },
            {
              text: 'render',
              link: '/analysis/data-driven/render'
            },
            {
              text: 'Virtual DOM',
              link: '/analysis/data-driven/virtual-dom'
            },
            {
              text: 'createElement',
              link: '/analysis/data-driven/create-element'
            },
            {
              text: 'update',
              link: '/analysis/data-driven/update'
            }
          ]
        },
        {
          text: '组件化',
          items: [
            {
              text: 'Introduction',
              link: '/analysis/components/introduction'
            },
            {
              text: 'createComponent',
              link: '/analysis/components/create-component'
            },
            {
              text: 'patch',
              link: '/analysis/components/patch'
            },
            {
              text: '合并配置',
              link: '/analysis/components/merge-option'
            },
            {
              text: '生命周期',
              link: '/analysis/components/lifecycle'
            },
            {
              text: '组件注册',
              link: '/analysis/components/component-register'
            },
            {
              text: '异步组件',
              link: '/analysis/components/async-component'
            }
          ]
        },
        {
          text: '深入响应式原理',
          items: [
            {
              text: 'Introduction',
              link: '/analysis/reactive/introduction'
            },
            {
              text: '响应式对象',
              link: '/analysis/reactive/reactive-object'
            },
            {
              text: '依赖收集',
              link: '/analysis/reactive/getters'
            },
            {
              text: '派发更新',
              link: '/analysis/reactive/setters'
            },
            {
              text: 'nextTick',
              link: '/analysis/reactive/next-tick'
            },
            {
              text: '检测变化的注意事项',
              link: '/analysis/reactive/questions'
            },
            {
              text: '计算属性 VS 侦听属性',
              link: '/analysis/reactive/computed-watcher'
            },
            {
              text: '组件更新',
              link: '/analysis/reactive/component-update'
            },
            {
              text: 'Props (v2.6.11)',
              link: '/analysis/reactive/props'
            },
            {
              text: '原理图',
              link: '/analysis/reactive/summary'
            }
          ]
        },
        {
          text: '编译',
          items: [
            {
              text: 'Introduction',
              link: '/analysis/compile/introduction'
            },
            {
              text: '编译入口',
              link: '/analysis/compile/entrance'
            },
            {
              text: 'parse',
              link: '/analysis/compile/parse'
            },
            {
              text: 'optimize',
              link: '/analysis/compile/optimize'
            },
            {
              text: 'codegen',
              link: '/analysis/compile/codegen'
            },
          ]
        },
        {
          text: '扩展',
          items: [
            {
              text: 'Introduction',
              link: '/analysis/extend/introduction'
            },
            {
              text: 'event',
              link: '/analysis/extend/event'
            },
            {
              text: 'v-model',
              link: '/analysis/extend/v-model'
            },
            {
              text: 'slot',
              link: '/analysis/extend/slot'
            },
            {
              text: 'keep-alive',
              link: '/analysis/extend/keep-alive'
            },
            {
              text: 'transition',
              link: '/analysis/extend/transition'
            },
            {
              text: 'transition-group',
              link: '/analysis/extend/transition-group'
            },
          ]
        },
        {
          text: 'Vue Router',
          items: [
            {
              text: 'Introduction',
              link: '/analysis/vue-router/introduction'
            },
            {
              text: '路由注册',
              link: '/analysis/vue-router/install'
            },
            {
              text: 'VueRouter 对象',
              link: '/analysis/vue-router/router'
            },
            {
              text: 'matcher',
              link: '/analysis/vue-router/matcher'
            },
            {
              text: '路径切换',
              link: '/analysis/vue-router/transition-to'
            }
          ]
        },
        {
          text: 'Vuex',
          items: [
            {
              text: 'Introduction',
              link: '/analysis/vuex/introduction'
            },
            {
              text: 'Vuex 初始化',
              link: '/analysis/vuex/init'
            },
            {
              text: 'API',
              link: '/analysis/vuex/api'
            },
            {
              text: ' 插件',
              link: '/analysis/vuex/plugin'
            }
          ]
        },
        {
          text: 'Pinia',
          items: [
            {
              text: 'Introduction',
              link: '/analysis/pinia/introduction'
            }
          ]
        },
      ],
      '/test/': [
        {
          text: 'Jest',
          items: [
            {
              text: '进阶语法',
              link: '/test/jest/'
            }
          ]
        }
      ],
      '/design-pattern/': [
        {
          text: '设计模式',
          link: '/design-pattern/'
        }
      ],
      '/network/': [
        {
          text: '网络、协议',
          link: '/network/'
        }
      ],
      '/structure/': [
        {
          text: 'vite',
          collapsed: false,
          items: [
            {
              text: '从零搭建 vite 开发环境(上)',
              link: '/structure/vite/'
            },
            {
              text: '从零搭建 vite 开发环境(下)',
              link: '/structure/vite/environment'
            }
          ]
        },
        {
          text: 'webpack',
          collapsed: false,
          items: [
            {
              text: '配置',
              link: '/structure/webpack/dispose'
            },
            {
              text: '优化',
              link: '/structure/webpack/optimize'
            },
            {
              text: 'tapable',
              link: '/structure/webpack/tapable'
            },
            {
              text: 'loader',
              link: '/structure/webpack/loader'
            },
            {
              text: 'plugin',
              link: '/structure/webpack/plugin'
            },
            {
              text: '迷你 webpack',
              link: '/structure/webpack/webpack'
            }
          ]
        },
        {
          text: 'rollup',
          collapsed: false,
          items: [
            {
              text: '一文看懂 rollup',
              link: '/structure/rollup/'
            },
            {
              text: 'rollup 打包 vue-router',
              link: '/structure/rollup/router'
            },
            {
              text: '从 vue-router 看 package.json',
              link: '/structure/rollup/package'
            },
          ]
        },
        {
          text: 'parcel',
          items: [
            {
              text: '一文看懂 parcel',
              link: '/structure/parcel/'
            },
          ]
        }
      ],
      '/algorithm/': [
        {
          text: 'CSS 核心概念',
          collapsed: false,
          items: [
            {
              text: 'BFC 及应用场景',
              link: '/algorithm/bfc'
            },
            {
              text: '自适应三列布局',
              link: '/algorithm/layout'
            },
            {
              text: 'flex 布局 && grid 布局',
              link: '/algorithm/flex-grid'
            },
            {
              text: '其它',
              link: '/algorithm/other-css'
            }
          ]
        },
        {
          text: '数据结构与算法',
          collapsed: false,
          items: [
            {
              text: '树',
              link: '/algorithm/tree'
            },
            {
              text: '位运算',
              link: '/algorithm/byte'
            },
            {
              text: '其他',
              link: '/algorithm/other'
            }
          ]
        }
      ],
      '/develop-summary/': [
        {
          text: '字符串转义',
          link: '/develop-summary/string'
        },
        {
          text: 'charles',
          link: '/develop-summary/charles'
        },
        {
          text: '常用布局',
          link: '/develop-summary/layout'
        },
        {
          text: '跨域',
          link: '/develop-summary/cross-domain'
        },
        {
          text: 'bignumber',
          link: '/develop-summary/bignumber'
        },
        {
          text: '开发技术汇总',
          link: '/develop-summary/tips'
        },
        {
          text: '分享: 框架中的插件机制',
          link: '/develop-summary/plugin'
        }
      ],
      '/node/': [
        {
          text: '常用 API 盘点',
          link: '/node/'
        }
      ],
      '/express/': [
        {
          text: 'express',
          link: '/express/'
        }
      ],
      '/koa/': [
        {
          text: '洋葱模型/导航守卫',
          link: '/koa/onion'
        },
        {
          text: 'RESTful',
          link: '/koa/restful'
        },
        {
          text: 'MongoDB',
          link: '/koa/mongodb'
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      { icon: {
        svg: `<svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5875 6.77268L21.8232 3.40505L17.5875 0.00748237L17.5837 0L13.3555 3.39757L17.5837 6.76894L17.5875 6.77268ZM17.5863 17.3955H17.59L28.5161 8.77432L25.5526 6.39453L17.59 12.6808H17.5863L17.5825 12.6845L9.61993 6.40201L6.66016 8.78181L17.5825 17.3992L17.5863 17.3955ZM17.5828 23.2891L17.5865 23.2854L32.2133 11.7456L35.1768 14.1254L28.5238 19.3752L17.5865 28L0.284376 14.3574L0 14.1291L2.95977 11.7531L17.5828 23.2891Z" fill="#1E80FF"/>
        </svg>`
      }, link: 'https://juejin.cn/user/1398234521812008/posts' }
    ],
    footer: {
      // message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present 强强'
    }
  }
})