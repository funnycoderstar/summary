中后台应用如何在高重复性页面开发中通过技术方案提高开发效率

redux 解决什么问题，可有替代方案

react hooks 解决什么问题，为什么不能在表达式里定义

图片防盗链原理是什么

随着 http2 的发展，webpack 有没有更好的打包方案

package-lock.json 有什么作用，如果项目中没有它会怎么样，举例说明

如何使用 react/vue 实现一个 message API

前端如何进行多分支部署

在 Node 应用中如何利用多核心CPU的优势


笔试题

一面：

执行代码求输出，并说明为什么，严格模式下输出有变化吗，为什么
var a = function () {this.b = 3;}
var c = new a();
a.prototype.b = 9;
var b = 7;
a();

console.log(b);
console.log(c.b);
给定一个升序整型数组[0,1,2,4,5,7,13,15,16],找出其中连续出现的数字区间，输出为["0->2","4->5","7","13","15->16"]
function summaryRanges(arr){
    //TODO
}
请实现以下的函数，可以批量请求数据，所有的URL地址在urls参数中，同时可以通过 max 参数控制请求的并发度，当所有请求结束之后，需要执行 callback 回调函数。发请求的函数可以直接使用 fetch 即可
function sendRequest(urls: sring[],max:number,callback:()=>void){
    //TODO
}
二面：

实现一个字符串反转：输入：www.toutiao.com.cn 输出：cn.com.toutiao.www
要求：1.不使用字符串处理函数 2.空间复杂度尽可能小

不借助变量，交换两个数。
function swap(a, b) {
    //TODO
}
观察者模式与发布订阅者区别，并写出其模型
与项目无绝对相关的问答题

vue 事件机制是如何实现的 (https://juejin.im/post/59ca5e975188257a8908959b)
vue 的组件通信方式有哪些
react fiber 的实现原理 (https://juejin.im/post/5dadc6045188255a270a0f85#comment)
vue 响应式数据原理(vue2/vue3/依赖收集/发布订阅/watcher消息队列控制/Vue.set实现)
vue 转小程序怎么实现(ast/生命周期对齐/跨平台模块兼容/兼容细节点实现过程)
性能指标，如何理解TTI，如何统计，与FID有什么区别，如何实现统计，还聊了很多性能的东西
说说你所了解的安全问题及防护方法（Web安全总结(面试必备良药)）
说说你知道的设计模式，并举个对应的模式例子
未来规划及学习方法

遇到的最大挑战/过去的最大收获分别是什么


笔试题

笔试题比较简单
编写函数convert(money) ，传入金额，将金额转换为千分位表示法。例如：12345.6 => 12,345.6
实现对象的深拷贝,输出：新的对象
请完成React组件封装，能够实现长度展示功能封装，并且不失input原生组件能力。
面试题

进程线程的区别 [event loop 事件循环 ]
聊一聊缓存 [浏览器缓存+http缓存]
如果浏览器关闭了再打开, 请求还是from cache吗?  [浏览器缓存+http缓存]
Service Worker 了解过么? 
聊一下常见的前端安全问题. [前端安全攻防]
你的网站是怎么阻止 csrf 攻击的? [前端安全攻防]
为什么用 token 就可以防止 csrf 攻击?
token 的刷新机制是怎么样的， 为什么这么设置？
讲一下 跨域 [跨域]
如何处理项目的异常.
script error 怎么捕获
脚手架做了什么功能.
webpack做了什么优化
webpack原理 [webpack]
维护的公共组件需要发布大更新, 如何做?
react 怎么做优化
用 react hook 来实现 class 的几种生命周期.
react hook 相比较 class, 哪些不太容易实现?
react 原理
聊一下高阶组件 hoc
聊一聊组件设计, 领域模型
mobx 和 redux , 为什么选择了 mobx , 技术选型有标准
mobx 过于灵活, 如何规范约束
mobx 原理与 redux 原理
项目的最大难点是什么? 怎么解决?
聊一下 node 的事件循环.
node 架构中容灾
pm2 的原理.
有没有读过 egg 源码.
了解过 grahql 么
聊一下微服务
小程序跟 h5 的区别是什么? [小程序底层实现]
讲一下 taro 小程序的底层原理，跟 mpvue 的区别 [AST, babel]
SPA 项目如何监控 pv, uv 值
如何在用户刷新、跳转、关闭浏览器时向服务端发送统计的数据？
错误日志上报遇到的问题.
规范 [eslint, prettier, git commit hook]
如何制定规范？
可视化表单了解过么?
聊一下 axios .有什么优点, 跟 fetch, ajax对比
axios 为什么既可以在浏览器发请求,又可以在node层发请求?
职业规划
考虑杭州么
家人情况

其实单单看面经, 很难说学到什么. 建议每一个知识点系统的学习一下,列了一份清单, 希望对你有帮助. 基础知识基本是每次面试都会随机抽问. 建议刷书. 记笔记总结.
基础知识
跨域
执行上下文/作用域链/闭包
事件循环
安全
缓存
模块化
深拷贝浅拷贝
异步处理 async await promise
防抖节流
类型转换
http 请求头, http2 http 相关知识
webpack 知识点
webpack 热更新的原理
loader 和 plugin 的区别
手写一个plugin
webpack 底层 Tapable 原理
webpack 做的性能优化
tree-shaking
webpack 的构建流程
多页面打包怎么做?
文件指纹
webpack 如何实现异步加载
react 知识点
jsx 的原理
为什么要使用 key , 有什么好处
diff 原理
fiber 架构
setState 更新机制
react hook 原理
原生事件和 React事件的区别？
虚拟 dom 有啥好处?
高阶组件(HOC), Mixin, hook 对比和用处.
node 知识点
koa中间件原理
介绍下 stream

babel
transform-runtime, stage-2 说一下他们的作用
babel 如何将字符串解析成 AST ?
讲一下 AST 语法树
babel-runtime 和 babel-polyfill
npm package.json
npx
说一下对 package.json 的理解,它都有哪些作用