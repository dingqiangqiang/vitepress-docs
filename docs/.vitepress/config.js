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
  // 主题配置
  themeConfig: {
    // logo: '/niumowang.jpeg',
    nav: [
      { text: '组件库', link: '/component-library/guide'},
      { text: '脚手架', link: 'https://dingqiangqiang.github.io/vue-cli/01.html'},
      { text: 'Vue.js 技术揭秘', link: 'https://dingqiangqiang.github.io/vue/guide/'},
      { text: '数据结构与算法', link: '/algorithm/tree'},
      { 
        text: '构建工具', 
        link: '/structure/vite/'
      },
      {
        text: '测试',
        items: [
          {
            text: '单元测试',
            items: [
              {
                text: 'jest',
                link: '/test/jest/'
              }
            ]
          }
        ]
      }
    ],
    sidebar: {
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
              text: '单元测试',
              link: '/test/jest/'
            }
          ]
        }
      ],
      '/vue3/': [
        {
          text: 'Vue.js设计与实现',
          items: [
            {
              text: '权衡的艺术',
              link: '/vue3/guide'
            }
          ]
        }
      ],
      '/test/': [
        {
          text: 'jest',
          items: [
            {
              text: '进阶语法',
              link: '/test/jest/'
            }
          ]
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
              text: '性能优化',
              link: '/structure/webpack/'
            }
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
            }
          ]
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