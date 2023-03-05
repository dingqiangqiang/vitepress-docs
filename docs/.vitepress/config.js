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
      { text: '脚手架', link: '/scaffold/guide'}
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
            }
          ]
        }
      ],
      '/scaffold/': [
        {
          text: '原理揭秘',
          items: [
            {
              text: '导读',
              link: '/scaffold/guide'
            }
          ]
        }
      ],
      '/vite/': [
        {
          text: '原理揭秘',
          items: [
            {
              text: 'vite 导读',
              link: '/vite/guide'
            }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    footer: {
      // message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Strive'
    }
  }
})