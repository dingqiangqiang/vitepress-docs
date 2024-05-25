import { defineConfig } from 'vitepress'
import sidebarConfig from './sidebarConfig'
import navConfig from './navConfig'

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
    nav: navConfig,
    sidebar: sidebarConfig,
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