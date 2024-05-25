export default {
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
                { text: '01-21 Vue3 项目搭建', link: '/dailyNote/project' },
                { text: '04-14 HTTP 缓存', link: '/dailyNote/cache' },
                { text: '04-14 TCP', link: '/dailyNote/tcp' },
                { text: '04-17 js 语法编写优化', link: 'dailyNote/syntax-optimize'},
                { text: '04-20 websocket 实操', link: 'dailyNote/websocket'},
                { text: '04-21 部署', link: 'dailyNote/deploy'}
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
            text: '常用语法梳理',
            link: '/typescript/syntax'
        },
        {
            text: 'TS 从零实现 Axios',
            items: [
                {
                    text: '初识 TypeScript',
                    collapsed: false,
                    items: [
                        {
                            text: '简介',
                            link: '/typescript/初识 TypeScript/01.简介'
                        },
                        {
                            text: '安装 TypeScript',
                            link: '/typescript/初识 TypeScript/02.安装 TypeScript'
                        },
                        {
                            text: '编写第一个 TypeScript 程序',
                            link: '/typescript/初识 TypeScript/03.编写第一个 TypeScript 程序'
                        }
                    ]
                },
                {
                    text: 'TypeScript 常用语法',
                    collapsed: false,
                    items: [
                        {
                            text: '基础类型',
                            link: '/typescript/TypeScript 常用语法/01.基础类型'
                        },
                        {
                            text: '变量声明',
                            link: '/typescript/TypeScript 常用语法/02.变量声明'
                        },
                        {
                            text: '接口',
                            link: '/typescript/TypeScript 常用语法/03.接口'
                        },
                        {
                            text: '类',
                            link: '/typescript/TypeScript 常用语法/04.类'
                        },
                        {
                            text: '函数',
                            link: '/typescript/TypeScript 常用语法/05.函数'
                        },
                        {
                            text: '泛型',
                            link: '/typescript/TypeScript 常用语法/06.泛型'
                        },
                        {
                            text: '类型推断',
                            link: '/typescript/TypeScript 常用语法/07.类型推断'
                        },
                        {
                            text: '高级类型',
                            link: '/typescript/TypeScript 常用语法/08.高级类型'
                        }
                    ]
                },
                {
                    text: '项目初始化',
                    collapsed: false,
                    items: [
                        {
                            text: '需求分析',
                            link: '/typescript/项目初始化/01.需求分析'
                        },
                        {
                            text: '初始化项目',
                            link: '/typescript/项目初始化/02.初始化项目'
                        },
                        {
                            text: '编写基础请求代码',
                            link: '/typescript/项目初始化/03.编写基础请求代码'
                        }
                    ]
                },
                {
                    text: '基础功能实现',
                    collapsed: false,
                    items: [
                        {
                            text: '处理请求 url 参数',
                            link: '/typescript/基础功能实现/01.处理请求 url 参数'
                        },
                        {
                            text: '处理请求 body 数据',
                            link: '/typescript/基础功能实现/02.处理请求 body 数据'
                        },
                        {
                            text: '处理请求 header',
                            link: '/typescript/基础功能实现/03.处理请求 header'
                        },
                        {
                            text: '获取响应数据',
                            link: '/typescript/基础功能实现/04.获取响应数据'
                        },
                        {
                            text: '处理响应 header',
                            link: '/typescript/基础功能实现/05.处理响应 header'
                        },
                        {
                            text: '处理响应 data',
                            link: '/typescript/基础功能实现/06.处理响应 data'
                        }
                    ]
                },
                {
                    text: '异常情况处理',
                    collapsed: false,
                    items: [
                        {
                            text: '错误处理',
                            link: '/typescript/异常情况处理/01.错误处理'
                        },
                        {
                            text: '错误信息增强',
                            link: '/typescript/异常情况处理/02.错误信息增强'
                        }
                    ]
                },
                {
                    text: '接口扩展',
                    collapsed: false,
                    items: [
                        {
                            text: '扩展接口',
                            link: '/typescript/接口扩展/01.扩展接口'
                        },
                        {
                            text: '函数重载',
                            link: '/typescript/接口扩展/02.函数重载'
                        },
                        {
                            text: '响应数据支持泛型',
                            link: '/typescript/接口扩展/03.响应数据支持泛型'
                        }
                    ]
                },
                {
                    text: '拦截器实现',
                    collapsed: false,
                    items: [
                        {
                            text: '拦截器设计与实现',
                            link: '/typescript/拦截器实现/01.拦截器设计与实现'
                        }
                    ]
                },
                {
                    text: '配置化实现',
                    collapsed: false,
                    items: [
                        {
                            text: '合并配置的设计与实现',
                            link: '/typescript/配置化实现/01.合并配置的设计与实现'
                        },
                        {
                            text: '请求和响应配置化',
                            link: '/typescript/配置化实现/02.请求和响应配置化'
                        },
                        {
                            text: '扩展 create 静态接口',
                            link: '/typescript/配置化实现/03.扩展 create 静态接口'
                        }
                    ]
                },
                {
                    text: '取消功能实现',
                    collapsed: false,
                    items: [
                        {
                            text: '取消功能的设计与实现',
                            link: '/typescript/取消功能实现/01.取消功能的设计与实现'
                        }
                    ]
                },
                {
                    text: '更多功能实现',
                    collapsed: false,
                    items: [
                        {
                            text: 'withCredentials',
                            link: '/typescript/更多功能实现/01.withCredentials'
                        },
                        {
                            text: 'XSRF 防御',
                            link: '/typescript/更多功能实现/02.XSRF 防御'
                        },
                        {
                            text: '上传和下载的进度监控',
                            link: '/typescript/更多功能实现/03.上传和下载的进度监控'
                        },
                        {
                            text: 'HTTP 授权',
                            link: '/typescript/更多功能实现/04.HTTP 授权'
                        },
                        {
                            text: '自定义合法状态码',
                            link: '/typescript/更多功能实现/05.自定义合法状态码'
                        },
                        {
                            text: '自定义参数序列化',
                            link: '/typescript/更多功能实现/06.自定义参数序列化'
                        },
                        {
                            text: 'baseURL',
                            link: '/typescript/更多功能实现/07.baseURL'
                        },
                        {
                            text: '静态方法扩展',
                            link: '/typescript/更多功能实现/08.静态方法扩展'
                        }
                    ]
                },
                {
                    text: '单元测试',
                    collapsed: false,
                    items: [
                        {
                            text: '前言',
                            link: '/typescript/单元测试/01.前言'
                        },
                        {
                            text: 'Jest 安装和配置',
                            link: '/typescript/单元测试/02.Jest 安装和配置'
                        },
                        {
                            text: '辅助模块单元测试',
                            link: '/typescript/单元测试/03.辅助模块单元测试'
                        },
                        {
                            text: '请求模块单元测试',
                            link: '/typescript/单元测试/04.请求模块单元测试'
                        },
                        {
                            text: 'headers 模块单元测试',
                            link: '/typescript/单元测试/05.headers 模块单元测试'
                        },
                        {
                            text: 'Axios 实例模块单元测试',
                            link: '/typescript/单元测试/06.Axios 实例模块单元测试'
                        },
                        {
                            text: '拦截器模块单元测试',
                            link: '/typescript/单元测试/07.拦截器模块单元测试'
                        },
                        {
                            text: 'mergeConfig 模块单元测试',
                            link: '/typescript/单元测试/08.mergeConfig 模块单元测试'
                        },
                        {
                            text: '请求取消模块单元测试',
                            link: '/typescript/单元测试/09.请求取消模块单元测试'
                        },
                        {
                            text: '剩余模块单元测试',
                            link: '/typescript/单元测试/10.剩余模块单元测试'
                        }
                    ]
                },
                {
                    text: '部署与发布',
                    collapsed: false,
                    items: [
                        {
                            text: '编译与发布',
                            link: '/typescript/部署与发布/01.ts-axios 编译与发布'
                        },
                        {
                            text: '引用 typescript 库',
                            link: '/typescript/部署与发布/02.引用 ts-axios 库'
                        }
                    ]
                },
            ]
        }
    ],
    '/axios/': [
        {
            text: '介绍',
            items: [
                { text: '介绍', link: '/axios/01' },
                { text: '入口', link: '/axios/02' },
                { text: '拦截器', link: '/axios/03' },
                { text: '合并配置', link: '/axios/04' },
                { text: 'dispatchRequest', link: '/axios/05' },
                { text: 'xhr', link: '/axios/06' },
                { text: '取消请求', link: '/axios/07' },
                { text: '错误处理', link: '/axios/08' }
            ]
        },
    ],
    '/vue-cli/': [
        {
            text: 'vue-cli 技术揭秘',
            items: [
                { text: '入口', link: '/vue-cli/01' },
                { text: '项目生成', link: '/vue-cli/02' },
                { text: '第三方依赖包', link: '/vue-cli/03' }
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
            collapsed: false,
            items: [
                {
                    text: 'Introduction',
                    link: '/analysis/guide/'
                }
            ]
        },
        {
            text: '准备工作',
            collapsed: false,
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
            collapsed: false,
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
            collapsed: false,
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
            collapsed: false,
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
            collapsed: false,
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
            collapsed: false,
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
            collapsed: false,
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
            collapsed: false,
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
            collapsed: false,
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
    ],
    '/database/': [
        {
            text: 'mysql',
            collapsed: false,
            items: [
                {
                    text: '常用语法',
                    link: '/database/mysql/'
                },
                {
                    text: 'mysql2',
                    link: '/database/mysql/mysql2'
                }
            ]
        },
    ],
}