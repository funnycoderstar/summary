## Suspense
异步组件

## 更好的TS支持

## 自定义renderAPI

## 第三方生态
vue-router-next
vue-cli-next
devTools


## IE11的支持
Proxy不支持IE11，开发过程中警告部分IE11不支持的API,年终

会单独做一个插件，进行兼容，

vue-next-template-explorer: https://vue-next-template-explorer.netlify.app/
vite: https://github.com/vuejs/vite

输入一个url到页面展示出来的过程
1. HTTP请求阶段（DNS解析，TCP协议的三次握手和四次挥手， HTTP和HTTPS的区别（HTTP2））
2. HTTP响应阶段 (HTTP状态码，304缓存， HTTP报文)
3. 浏览器渲染阶段
当浏览器遇到 link, script, img 等请求，都会开辟全新的线程去加载资源文件（开辟一个任务队列），浏览器是多进程程序，但是只分配给JS一个线程去执行，

DOM树渲染



性能优化
- 减少HTTP的请求次数和大小
    - 资源合并压缩
    - 图片懒加载
    - 音视频走流文件
- 缓存： DNS缓存，304缓存
- 减少回流和重绘

回流和重绘

回流：元素的大小或者位置发生了变化（当页面布局和几何信息发生变化的时候，触发了重新布局导致渲染树重新渲染）
重绘：元素样式的改变（但宽高，大小、位置等不变），如 visibility， color，outline

避免DOM的回流：
- 放弃传统操作DOM的时代，使用vue/react
- 分离读写
```js
// 批量更新队列，
box.style.width = '100px';
box.style.height = '100px';
// 获取
console.log(box.clientWidth);
```
- 批量处理
```js
box.style.cssText = '100px';
box.classname = '100px';
```
- 缓存处理

## CSS盒模型及box-sizing

CSS中的 box-sizing 属性定义了应该如何计算一个元素的总宽度和总高度