## 以后写文章常参考的
《JavaScript高级程序设计》
《你不知道的JavaScript》
[ECMAScript 6 入门](https://es6.ruanyifeng.com/#docs/function)
[冴羽博客](https://github.com/mqyqingfeng/Blog)：JavaScript深入系列、JavaScript专题系列、ES6系列、React系列
[JavaScript标准参考教程](https://javascript.ruanyifeng.com/#introduction)
语雀：https://www.yuque.com/fest
博客：https://www.fest.plus
Github：https://github.com/fest-plus

参考文章的时候要尽量去看官方文档， mdn，英文版的文章

## 感想

2020年3月11号，今天发的一篇文章，被别人留言说参考别人的文章，没有写出参考链接。其实之前写的时候一直都带着呢，只是最近刚做公众号，微信公众号上是不允许加外链的，加了参考之后就变成了纯文字，所以就删掉了，想在想想是也不应该的，即使是纯文字也应该带上，毕竟别人辛苦写文章也不容易，不知道多少人写参考都参考 阮一峰的博客，大佬只是没有时间跟我们这些人计较罢了。

被 justjavac 喷了写的一个装饰器的解析，参考的文章过时了，装饰器并不是 ES7的语法，而是一个未来的语法，


2020年3月12号,发表一篇文章，vue3.0中的 proxy, 

## 感想
一篇文章很多个知识点的文章很受欢迎
面试题很受欢迎
标题党

## 好句
有些人只会从学习成本和社区作答，有些人则会从框架特点框架底层去分析
我正想写一篇这样的文章，竟然被你抢先了: 不同的人理解的方向可能也不同，交流总是好的



JavaScript原始装饰器建议的基本功能，TypeScript装饰器中提供大部分功能



最近发起了个100天前端进阶计划，每天一个知识点背后的原理加一道算法题。今天是第8天，《装饰器》+ 《路径总和》

简单总结一下：
装饰器：https://juejin.im/post/5e683e11518825495e105de6juejin.im/post/5e683e115...
装饰器(Decorator)是ES7的一个语法，用来注释或修改类和类的方法，依赖于ES5的Object.defineProperty 方法。写成 @ + 函数名。可以起到注释，类型检查的作用。
装饰器只能用于类和类的方法，不能用于函数，因为存在函数提升。
路径总和：
利用递归，遍历整棵树：1. 如果当前节点不是叶子，对它的所有孩子节点，递归调用 hasPathSum 函数，其中 sum 值减去当前节点的值；2.如果当前节点是叶子，检查 sum 值是否为当前节点的值，也就是是否找到了给定的目标和。



webpack

babel
打包优化，性能优化
metor




自我介绍

我叫王亚星，17年毕业，三年前端开发经验，现在在麦座，做B端的后台管理系统和用户端。之前负责世界杯项目的开发，
单应用到平台化?
单应用：入驻一个商家，将代码部署到商家自己的服务器上面，每次升级的时候都要单独升级
平台化：同一个系统，给入驻的商家提供账号，规则什么的可以自己配置

webpack做了哪些优化
升级webpack4.0，babel7.x版本，
配置懒加载的插件（lazy-compile-webpack-plugin），根据路由来打包不同的模块
happypack：多线程
autoDllPlugin，常用的包缓存起来


你觉得做得不错的一个项目？
男篮世界杯项目是我们承接的第一个国际化的项目，我负责完整的从后台管理到C端用户端的开发，多语言，监控，埋点，安全等。
遇到哪些问题，如何解决的。
页面性能差：编写可复用组件，封装高频函数，减少打包体积；静态资源上CDN，图片懒加载

监控原理，
性能方面：确定几个数据指标，监听这些事件，自动上报
错误上报：监听错误事件
埋点：点击的时候发送一个请求，带上当前页面的数据，使用 1*1的gif图，为什么使用，图片没有跨域问题，体积小，

编写自动化脚本
手动打包，上传打包后的文件


components
实现一个 complete组件，需要注意什么

React hooks
为什么
原理：单链表的形式

fiber架构

高阶组件(HOC) , render props 以及 hook 的对比和用处.
虚拟 DOM 是什么?
react diff 原理, 如何从 O(n^3) 变成 O(n)
为什么要使用 key , 有什么好处?
jsx 的原理
自定义的 React 组件为何必须大写
## setState 什么时候是同步,什么时候是异步?
这里的“异步”不是说异步代码实现. 而是说 react 会先收集变更,然后再进行统一的更新.
setState 在原生事件和 setTimeout 中都是同步的. 在合成事件和钩子函数中是异步的.
在 setState 中, 会根据一个 isBatchingUpdates 判断是直接更新还是稍后更新, 它的默认值是 false. 但是 React 在调用事件处理函数之前会先调用 batchedUpdates 这个函数, batchedUpdates 函数 会将 isBatchingUpdates 设置为 true. 因此, 由 react 控制的事件处理过程, 就变成了异步(批量更新).

React 如何实现自己的事件机制？

React 事件和原生事件有什么区别
聊一聊 fiber 架构

React 事件中为什么要绑定 this 或者 要用箭头函数, 他们有什么区别

React相关文章：
[React Hooks 原理](https://github.com/brickspert/blog/issues/26)
[8 个问题带你进阶 React](https://mp.weixin.qq.com/s/9xWS-rMgMFIDjly9vB70Yw)
[面试官: 聊一聊 HOC、Render props、Hooks](https://juejin.im/post/5e63798f6fb9a07cca1dfac6)

HTTP相关的文章
[(1.6w字)浏览器灵魂之问，请问你能接得住几个？](https://juejin.im/post/5df5bcea6fb9a016091def69)
[面试官，不要再问我三次握手和四次挥手](https://zhuanlan.zhihu.com/p/86426969)

