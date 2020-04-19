
## 麦座技术


TOB业务，分为 后台管理端和用户端，后端管理负责管理项目，上下架，刚来的时候正是转型的时候，开始接入集团内的各种工具，技术栈，重构原有系统，从原来的每家商户单独部署系统到现在的平台化建设。
期间接了几个重大的客户，男篮世界杯，军运会，19年初开始做平台化建设，补全原有功能，前端开始分域，一个人基本要负责两个域，我主要负责生产和基础设置部分，生产是从生产项目，规划票房，到项目上下架。
内部的cli工具，
内部的组件库，
webpack、babel等工程化建设。



## 为什么想要离职，对新工作的期望

部门被合并，前途未卜
希望去一个技术氛围浓厚的团队。
期望团队中有机会实践更多的技能实践技能

自己的优势是什么，和别人相比

主动积极的学习，总结一些问题，对遇到的问题刨根问底，对一些新的技术保持关注，
有自己的博客，开源项目，目前公众号xxxx粉丝


项目经验，难点，亮点是什么，自己的核心竞争力

难点：
## 一键换肤
    - 问题描述： 麦座是服务于多剧院的票务系统, 每个剧院肯定都想要自己家的网站和别人的不一样, 能够有自己的风格和特色, 最常见的需求就是网站的主题色, 这家想要红色, 那家想要蓝色, 另外一家又想要黄色....., 作为一个成熟的票务系统, 肯定要快速的支持这些需求.该篇文章从换肤功能入手介绍了我们实现该功能的技术方案演进
    - 尝试过的方案: 1. 定义"皮肤"的css文件 2. 使用style标签给每个需要主题色的地方单独加颜色 3. 使用css自定义变量来实现
    - 业界的方案： 
        elementui: 
        antd: less的modifyVars
    - 最后选择的方案： 使用css自定义变量来实现
[聊一聊前端换肤](https://juejin.im/post/5ca41617f265da3092006155)
## 多场馆打包问题
    - 问题描述： 很多家场馆
    - 尝试过的方案: 
    - 最后选择的方案： 使用webpack alias配置不同的场馆，引用不同的场馆相关的文件，编写自动化部署脚本
## CND部署方案：
    - 
## webpack打包体积
    - iview，moment, loadsh 按需加载，
    - 使用 DLLPlugin 和 DLLReferencePlugin 插件，提前打包一些不经常变动的框架代码，比如 Vue，vue-router等
    - @babel/polyfill按需加载，配置 useBuiltIns

webpack-bundle-analyzer 分析包的体积

### tree-shaking原理是什么
依赖于ES6的模块特性
[Tree-Shaking性能优化实践 - 原理篇](https://juejin.im/post/5a4dc842518825698e7279a9)

### npm 包A和 npm 包B 同时依赖npm包C
- 当引入包C的版本存在兼容版本，则只在node_modules下安装兼容版本
- 二者不存在兼容版本，则后面的版本保留在依赖树中

考察 npm 模块扁平化

foo 依赖 lodash@^2.0.0，bar 依赖 lodash@^1.1.0
```js
node_modules -- foo ---- lodash@version1
-- bar ---- lodash@version2
```

假设 version1 和 version2 是兼容版本，则经过 dedupe 会成为下面的形式：
```js
node_modules -- foo

-- bar

-- lodash（保留的版本为兼容版本）
```
假设 version1 和 version2 为非兼容版本，则后面的版本保留在依赖树中：
```js
node_modules -- foo -- lodash@version1

-- bar ---- lodash@version2
```

[semver 语义化版本规范](https://www.jianshu.com/p/a7490344044f)
[第 20 题：介绍下 npm 模块安装机制，为什么输入 npm install 就可以自动安装对应的模块？](https://muyiy.cn/question/tool/20.html)

### loash怎么做的按需加载，比如只用到了deepCopy如何引入
- 单独引入 import deepCopy from 'lodash.deepCopy';
- 直接引入 import loash from 'loadsh'，使用loash.deepCopy会按需引入么，不会按需引入，但是此时可以通过配置  [lodash-webpack-plugin](https://github.com/lodash/lodash-webpack-plugin)

## webpack编译速度
  - 升级webpack4.x和babel 7.x
  - 多进程，happypack
  - 使用 DLLPlugin 和 DLLReferencePlugin 插件，提前打包一些不经常变动的框架代码，比如 Vue，vue-router等
  - 缓存：babel-loader开启缓存， babel的cache Directory为 true
  - 惰性编译，使用 lazy-compile-webpack-plugin， 通过延迟编译动态导入来提升Webpack启动时间

webapck的构建流程
- 初始化：启动构建，读取与合并配置参数，加载plugin, 实例化 Compiler
- 编译： 从 Entry 出发，针对每个 module串行调用对应的 loader去翻译文件内容，再找到 该 module 依赖的 module，递归地进行编译处理
- 输出：对编译后的 module 组合成 chunk，把 chunk 转换成 文件，输出到本地

使用speed-measure-webpack-plugin来检测webpack打包过程中各个部分所花费的时间

[Webpack4+Babel7优化70%速度](https://juejin.im/post/5c763885e51d457380771ab0)
## 首页的性能优化
    - 加载的资源更少
        - 按需加载，减少不必要的依赖； 非首屏资源懒加载，重要资源预加载（prefetch, preload）
        - defer和async
    - 加载的更快：gzip，cdn， HTTP2（多路复用，头部压缩），缓存
    - 用户视觉欺骗: loading, 骨架屏

preload: 预加载的方式，它通过声明向浏览器声明一个需要提交加载的资源,当资源真正被使用的时候立即执行，就无需等待网络的消耗
prefetch: 预判加载，它的作用是告诉浏览器未来可能会使用到的某个资源，浏览器就会在闲时去加载对应的资源，若能预测到用户的行为
计算白屏时间：

白屏时间 = 地址栏输入网址后回车 - 浏览器出现第一个元素  firstPaint - performance.timing.navigationStart
首屏时间 = 地址栏输入网址后回车 - 浏览器第一屏渲染完成  performance.timing.responseStart - performance.timing.navigationStart

Performance.timing

[使用 Preload/Prefetch 优化你的应用](https://zhuanlan.zhihu.com/p/48521680)
[Web 性能优化：Preload,Prefetch的使用及在 Chrome 中的优先级](https://blog.fundebug.com/2019/04/11/understand-preload-and-prefetch/)
[Web 性能优化-首屏和白屏时间](https://lz5z.com/Web%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96-%E9%A6%96%E5%B1%8F%E5%92%8C%E7%99%BD%E5%B1%8F%E6%97%B6%E9%97%B4/)

## cli工具：
    - 问题描述
    - 使用Vuecli3.x自己定义一些插件
## 细节的点
    - Select数据量较大时的优化
    - 网页特殊字体过大的优化
        - 使用 字蛛 对字体进行压缩
    - 时间的时区问题：
    - sameSite治理
    - package.json的版本号问题：测试环境有问题，本地却复现不了

自己的开源项目，基于Vue-next实现的一个博客主题：
实现的功能及遇到的问题



手写Promise.all, Promise.all 失败的处理,

1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函

tree-shaking的原理
es6 modules的 类的引用
小程序的原理： https://juejin.im/post/5afd136551882542682e6ad7
metor的原理