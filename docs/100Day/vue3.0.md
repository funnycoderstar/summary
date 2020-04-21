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
