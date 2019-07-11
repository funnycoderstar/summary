## vue
1. vue的nextTick实现原理以及应用场景 
2. vue组件间通信
3. Vue2.0 怎么实现双向绑定的, Vue3.0 怎么实现双向绑定的
4. vue中用到的设计模式
5. Vue hash 路由和 history 路由的区别
6. Vue 计算属性和 watch 在什么场景下使用
7. Vue3 proxy解决了哪些问题？Vue3 proxy的优劣, vue 的双向绑定原理（vue 2.0 和 vue 3.0，两种实现的优缺点）
8. Vue响应式原理

rxjs相关
1. vue项目中如何约束rxjs数据的类型
2. rxjs高阶数据流定义，常用高阶数据流操作符
3. RxJS冷热流区别
4. RxJS调试方法
5. RxJS相对于其他状态管理方案的优势？
___
## react
1. 针对React的性能优化手段 http://www.alloyteam.com/2016/05/react-mobile-web-optimization/
2. mobx-react如何驱动react组件重渲染
3. hooks
4. SSR对性能优化的提升在哪里
5. react组件，如何更换主题
6. Fiber(https://juejin.im/post/5c92f499f265da612647b754)
7. 生命周期
8. SetState
9. HOC(高阶组件)
10. Redux

11. React Hooks
12. 函数式编程
13. forceUpdate经历了哪些生命周期，子组件呢?

___
## vue && react
1. vue和react谈谈区别和选型考虑
2. Vue/React 的 diff 算法
3. key的作用, React key场景题：列表使用index做key，删除其中一个后，如何表现？
4. vuex, mobx, redux各自的特点和区别, vuex数据流动过程
5. react和vue更新机制的区别, react 更新机制，diff算法,  vue 更新机制，双向绑定
6. ssr性能优化，node中间层细节处理

___
## JS
1. ES6的Set内部实现
2. 跨域
https://segmentfault.com/a/1190000015597029
https://segmentfault.com/a/1190000011145364
3. 事件循环机制，node和浏览器的事件循环机制区别, node中事件队列模型, 事件循环, 如何解决同步调用代码耗时太高的问题, setTimeout(function(){},0)和process.nextTick()的区别
4. stypescript有什么好处
5. JWT优缺点, JWT细节，适用场景
6. 基本数据类型
7. 选择器优先级
8. 前端性能优化手段, 各方面谈谈性能优化, 谈谈性能优化(高频)
9. 谈谈XSS防御，以及Content-Security-Policy细节
10. ES6特性

11. 闭包和this一起谈谈
12. postcss配置
13. Promise内部实现原理, 手写Promise实现, Promise实现原理, 一句话概述什么是 promise; promise解决了什么问题;在没有 promise 之前，怎么解决异步回调; 自己实现一个promise
14. serviceworker如何保证离线缓存资源更新, service work
15. virtual dom有哪些好处
16. 发布订阅模式和观察者模式的异同
17. 图片懒加载实现
18. 事件模型，阻止冒泡
19. CI/CD流程, CI/CD整体流程
20. canvas优化绘制性能

21. symbol应用
22. 深拷贝 和浅拷贝的区别, 怎么实现一个浅拷贝, 怎么实现一个深拷贝
23. 贝塞尔曲线
24. 正则的捕获组概念
25. 图片上传是怎么做的？能不能同时上传？
26. 操作系统里面进程和线程的区别
27. 前端安全：XSS（跨站脚本攻击），CSRF跨站请求伪造）
28. js原型链
29. 闭包
30. v8引擎区别浏览器做的优化

31. 编译型和解释型语言的区别
32. 跟缓存相关的配置
33. node 的一些特点
32. node对于字节流的控制
33. 如何处理js的错误:eslint。
34. node垃圾回收
35. js内存溢出
36. if([]){} 是true，但是[]==false,因为任何类型跟bool比较都会先转化为数值型。[]是object if的时候不是false
37. this的作用域，()=>{} 箭头函数
38. setImmediate 
39. require和import的区别： require是CommonJS模块， import是Es6模块，CommonJS是运行时加载， es6模块是编译时加载
40. 箭头函数的好处

41. 判断数组
42. typeof和instanceof的区别
43. new和instanceof的内部机制
44. for...in迭代和for...of有什么区别？
45. 原型链中prototype和__proto__分别指什么
46. class实现原理： class是一个语法糖，很多都可以用es5的语法实现
47. async和await实现原理: 基于generator实现的，generator又是基于promise实现的
48. 说一下你对generator的了解？
49. 说一下macrotask 和 microtask？
50. fetch api

51. 知道什么是事件委托吗？
52. 如何让网页离线后还能访问
53. 强缓存和协商缓存
54. script 标签的属性有哪些, script 标签的 defer 和 async 标签的作用与区别, script intergrity的作用
55. 页面加载白屏的原因有哪些，以及如何监控白屏时间，如何优化
56. 数组去重的几种方法
57. 浏览器缓存原理
58. apply和call的区别
59. 原生ajax实现步骤, ajax/jsonp区别,jsonp原理


## css && html
1. 水平垂直居中
2. 谈谈css预处理器机制
3. 双栏布局，7:3，border 10px，中间交线加起来是10px
4. flex布局 ie10 11不支持
5. CSS选择器的解析为什么是从右向左而不是从左向右(http://www.cnblogs.com/zhaodongyu/p/3341080.html)
6. window.onload和document.ready的区别
7. Window.onload和domcontentloaded谁先谁后
8. iframe，如何在页面中改变另一个iframe的样式
9. 尽可能多的方法隐藏一个html元素
10. 盒模型,IE盒模型和标准盒模型，如何改变

11. 选择器优先级（内联样式在何处）
12. LESS和SCSS的好处
13. rem布局实现原理
14. css变量
15. 块标签和行标签的区别, 行元素怎么变成块元素, 块元素怎么变成行元素
16. display: inline-block 有间隙怎么处理
___
## HTTP
1. 三次握手和四次挥手详细介绍
2. TCP有哪些手段保证可靠交付(https://blog.csdn.net/u012495483/article/details/77345823)
    - 1.将数据截断为合理长度
    - 2.超时重发
3. URL从输入到页面渲染全流程,输入url发生了什么(高频)

4. 如何预防中间人攻击(https://www.zhihu.com/question/20744215)

5. DNS解析会出错吗，为什么
https://www.zhihu.com/question/22195153
https://www.ymw.cn/news/viewnews-1846.html
DNS劫持, 是对域名服务器的资源进行篡改
DNS污染
6. 如何应对流量劫持
https://www.zhihu.com/question/35720092
7. HTTP和HTTPS, HTTP和HTTPS的区别，如何升级成HTTPS, https 的过程和服务器搭建
8. 301 302 307 308 401 403
9. DNS解析全过程, DNS 解析的详细过程(https://www.zhihu.com/question/23042131)
10. Http请求中的keep-alive有了解吗。

11. http的无状态
12. 复杂请求和简单请求，  跨域 用CORS会多一种请求
13. 概述 http 的缓存控制（http2 与相关缓存控制）
14. 三次握手, 四次挥手
15. http的缓存可以分几种, 禁止浏览器缓存的话, http头部怎么设置, 什么是CORS

16. cookie设置不同的域，不同的path
17. HTTP/2.0 协议的新特性
18. 什么是webSocket协议？webSocket有什么特点？
___
## 算法 
1. 算法：top-K问题，分成top-1,top-2,top-K三小问, 如果有一个大的数组，都是整型，怎么找出最大的前10个数， TopK问题
2. 进制转16进制，最好用位运算
3. 手写冒泡排序
4. 回文判断
7. 红黑树
8. 求二叉树最大宽度, 宽度定义: 每层节点的个数
10. 数组去除重复且连续的数字, 如果去掉某些数字后, 新连起来的数字仍然符合重复且连续, 则也需要去掉. 例如 [1, 2, 3, 3, 2, 4]应返回 [1, 4], 要求O(n)复杂度

11. 二叉搜索树, 前序遍历, 中序遍历, 后序遍历
12. 链表, 从头到尾打印链表
___
## 手写代码
1. 算法：实现setter(obj, 'a.b.c' ,val)
2. promise：Promise串行, promise并行怎么实现？promise.all, 手写promise.all(高频)
4. 手写vue自定义事件，on，emit，参考js自定义事件
5. 手写bind函数
6. 取得body下所有元素的tagname，并去重输出。
7. 实现一个function 输入字符串，验证其字符串是合法的html标签，只要开闭合理就可以。使用栈来解决。
8. 函数节流,函数防抖
9. sleep(5).catch(console.log); 效果是执行5s后, 打印入参5
   如果仅执行sleep(5)则无输出
10. 请为所有数组对象添加一个findDuplicate(n)方法，用于返回该数组中出现频率>=n的元素列表
[1,2,3,4,1,2,2,2].findDuplicate(2) => [1,2]
[1,2,3,4,1,2,2,2].findDuplicate(5) => []
[1,2,3,4,1,2,2,2].findDuplicate(-1) => [1,2,3,4]

11. 三个输入框
低于4个字符提示超出
超与4个字符且和其他有重复， 提示有重复
超与4个字符且和其他无重复， 提示OK

12. 手写轮播图
13. 手写放大镜
14. 如何遍历一个树，并对其进行优化。
15. 场景题：一个气球从右上角移动到中间，然后抖动，如何实现
16. 场景题：一个关于外边距合并的高度计算
17. js上拉加载和下拉刷新 实现的方法
___
## webpack
1. 常见的loader和plugin，loader和plugin的区别, webpack的plugins和loaders的实现原理
2. webpack如何优化编译速度,
3. webpack性能优化手段
4. 如何编写loaders和plugins
5. webpack 热更新原理
6. webpack babel配置中的stage-0是什么意思？
7. 如何提高webpack打包的速度
8. webpack 打包的过程
9. webpack按需加载
10. webpack manifest & runtime
11. webpack tree-shaking
[如何评价 Webpack 2 新引入的 Tree-shaking 代码优化技术？](https://www.zhihu.com/question/41922432)
12. webpack code-splitting
[在Webpack中使用Code Splitting实现按需加载](http://www.alloyteam.com/2016/02/code-split-by-routes/)

___
## git
- git rebase
- git reset
- git commit --amend
- git cherry-pick
___
## 其他
1. 方案题：不同前端技术栈的项目，如何实现一套通用组件方案？
2. nginx负载均衡配置
3. nginx转发的配置
4. 前端国际化

