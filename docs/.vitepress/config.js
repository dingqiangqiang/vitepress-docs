import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/docs/',
  title: '前端乐园',
  description: 'Vite & Vue powered static site generator.',
  appearance: true,
  ignoreDeadLinks: true,
  lang: 'zh-CN',
  lastUpdated: true,
  markdown: {
    theme: 'github-dark',
    lineNumbers: true
  },
  head: [
    ['link', { rel: 'icon', href: '/niumowang.jpeg'}]
  ],
  // 主题配置
  themeConfig: {
    logo: '/niumowang.jpeg',
    nav: [
      { text: '组件库', link: '/component-library/guide'},
      { text: '脚手架', link: 'https://dingqiangqiang.github.io/vue-cli/01.html'},
      { text: 'Vue.js 技术揭秘', link: 'https://dingqiangqiang.github.io/vue/guide/'},
      { text: 'React', link: '/react/hooks'},
      {
        text: '前端进阶',
        items: [
          { 
            text: 'Typescript', 
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
      { text: '开发汇总', link: '/develop-summary/string'},
    ],
    sidebar: {
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
      '/vue3/': [
        {
          text: 'Vue.js设计与实现',
          items: [
            {
              text: '一文看懂 Vue.js 3.0 的优化',
              link: '/vue3/optimize'
            },
            {
              text: '权衡的艺术',
              link: '/vue3/weigh'
            },
            {
              text: 'setup 语法糖',
              link: '/vue3/setup'
            },
            {
              text: '权限校验',
              link: '/vue3/permission'
            },
            {
              text: '指令妙用',
              link: '/vue3/directive'
            },
            {
              text: '组件封装',
              link: '/vue3/components'
            }
          ]
        }
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
          text: '数据结构与算法',
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