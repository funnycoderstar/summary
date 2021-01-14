module.exports = {
    base: '/summary/',
    title: '前端学习总结', 
    description: '前端学习总结',
    head: [
        ['link', { rel: 'icon', href: 'https://cdn.wangyaxing.cn/icon-128x128.png' }],
    ],
    themeConfig: {
        nav: [
            { 
                text: '首页', 
                link: '/'
            },
            {  text: '基础', 
               items: [
                    // {
                    //     text: 'HTML',
                    //     link: '/HTML/'
                    // },
                    {
                        text: 'CSS',
                        link: '/CSS/'
                    },
                    {
                        text: 'JavaScript',
                        link: '/JavaScript/'
                    },
                    {
                        text: 'HTTP',
                        link: '/HTTP/'
                    },
                ]
            },
            { text: '框架',
                items: [
                    {
                        text: 'Vue',
                        link: '/vue/'
                    },
                    {
                        text: 'React',
                        link: '/React/'
                    },
                    {
                        text: 'Node',
                        link: '/node/'
                    },
                ]
            },
            { 
                text: '工具',
                items: [
                    {
                        text: 'webpack',
                        link: '/tool/webpack/'
                    },
                    {
                        text: 'babel',
                        link: '/tool/babel'
                    },
                    {
                        text: '更多',
                        link: '/tool/other'
                    },
                ]
            },
            { text: '面试题', link: '/interview/' },
            {   
                text: '更多',
                items: [
                    { 
                        text: '新技术',
                        link: '/new/' 
                    },
                    {
                         text: '翻译', 
                         link: '/translation/' 
                    },
                    {
                        text: 'Linux',
                        link: '/linux/'
                    },
                    {
                        text: 'Nginx',
                        link: '/nginx/'
                    },
                    {
                        text: 'Meteor',
                        link: '/meteor/'
                    },
                    {
                        text: 'Test',
                        link: '/test/'
                    },
                    {
                        text: '微信小程序',
                        link: '/wxapp/'
                    },
                    {
                        text: 'Webkit',
                        link: '/Webkit/'
                    },
                    {
                        text: '安全',
                        link: '/Safe/'
                    },
                ]
             },
            { text: '算法', link: 'https://github.com/funnycoderstar/leetcode' },
            { text: 'Github', link: 'https://github.com/funnycoderstar/Front-end-summary' },
        ],
        sidebar: {

            '/CSS/': [
                {
                    title: 'CSS',
                    collapsable: true,
                    children: [
                        ['去除默认样式', '去除默认样式'],
                        ['less语法', 'less语法'],
                        ['css布局之flex', 'css布局之flex'],
                        ['css常见布局', 'css常见布局'],
                        ['css-variable', 'css自定义变量'],
                        ['cssModule', '怎么避免css相互覆盖呢?'],
                        ['css-change-skin', '换肤功能?'],
                    ]
                },
            ],
            '/JavaScript/': [
                {
                    title: 'JavaScript',
                    collapsable: true,
                    children: [
                        ['Throttling&&Debounce', '函数节流和函数防抖'],
                        ['javascript垃圾回收机制', '垃圾回收机制'],
                        ['module', '介绍模块化发展历程'],
                        ['promise', '实现一个promise'],
                        ['date', '常见日期格式的处理'],
                        ['Function_curry', '函数柯里化'],
                        ['evnet-Loop', '浏览器和Node的Event Loop'],
                    ]
                },
                {
                    title: 'JavaScript设计模式',
                    collapsable: true,
                    children: [
                        ['/JsDesignPattern/观察者模式', '观察者模式'],
                    ]
                },
                
            ],
            '/HTTP/': [
                {
                    title: 'HTTP',
                    collapsable: true,
                    children: [
                        ['HTTP基础', 'HTTP基础'],
                        ['cookie&&session&&token', '理解cookie，session, token'],
                        ['CORS', 'CORS原理及@koa/cors源码解析'],
                    ]
                },
            ],
            '/vue/': [
                {
                    title: 'vue',
                    collapsable: true,
                    children:[
                        ['vuex', 'vuex'],
                        ['vue-router', 'vue-router的常见用法'],
                        ['vue-proxy', 'vue3.0中的proxy'],
                    ],
                }
            ],
            '/React/': [
                {
                    title: 'React',
                    collapsable: true,
                    children:[
                        ['redux', 'redux'],
                    ],
                }
            ],
            '/node/': [
                {
                    title: 'Node',
                    collapsable: true,
                    children:[
                        ['node-path', 'node的path模块'],
                        ['node-fs', 'node的fs模块'],
                        ['node定时器', 'node定时器'],
                        ['npm', 'npm'],
                        ['npm-publish', '发布npm'],
                        ['npm-scripts', 'npm scripts'],
                        ['npm-package-version', 'Node.js中package.json中库的版本号'],
                        ['编写一个cli工具', '编写一个cli工具'],
                    ],
                }
            ],
            '/webpack/': [
                {
                    title: 'webpack',
                    collapsable: true,
                    children:[
                        ['webpack常见面试题', 'webpack常见面试题'],
                    ],
                }
            ],
            '/interview/': [
                {
                    title: '面试题',
                    collapsable: true,
                    children:[
                        ['18道js笔试题', '18道JavaScript面试题'],
                        ['AlgorithmInterview', '算法面试题'],
                    ],
                },
            ],
        }
    }
}