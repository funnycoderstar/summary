# Web worker & Service Worker & Workbox

## 什么是Web worker
**Web worker为JavaScript 创造多线程环境，允许主线程创建Worker线程，将一些任务分配给后者运行。在主线程运行的同时，Worker线程在后台运行**， 两者互不干扰。等到Worker线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被Worker线程负担了，主线程（通常负责UI交互）就会很流畅，不会被阻塞或拖慢。

[Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)
## 什么是[Service Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers)
Service Worker是一个HTML5 API，主要用来做持久的离线缓存。
浏览器中的javaScript都是运行在一个单一主线程上的。在同一个时间内只能做一件事情。随着Web业务不断复杂，我们逐渐在js中加了很多耗资源，耗时间的复杂运算过程，这些过程导致的性能问题在WebApp的复杂过程中更加凸显出来。

W3C组织早早的洞察到了这些问题可能造成的影响，这个是有有个web worker的API被造出来了，这个API的唯一目的就是解放主线程，Web Worker 是脱离在主线程之外的，将一些复杂的耗时的活儿交给它完成，完成后通过postMessage 方法告诉主进程，而主进程通过 onMessage方法得到Web Worker的结果反馈。

一切问题好像是解决了，但Web worker是临时的，每次做的事情的结果还不能被持久存下来，如果下次有同样的复杂操作，还得费时间的重新来一遍。那我们能不能有一个Worker是一直持久存在的，并且随时准备接受主线程的命令呢？基于这样的需求推出了最初的Service Worker, **Service Worker在Web Worker的基础上加了持久离线缓存能力**。当然在Service Worker之前也有在HTML5上做离线缓存的API叫AppCache，但是但是 AppCache 存在很多 不能[忍受的缺点](https://alistapart.com/article/application-cache-is-a-douchebag)。 


Service Worker有以下功能和特性：
- 一个独立的worker,独立于当前网页进程，有自己独立的 worker context。
- 一旦被install， 就永选存在，除非被手动 unregister
- 用到的时候可以直接唤醒，不用的时候自己睡眠
- 可编程拦截代理请求和返回，缓存文件，缓存的文件可以被网页进程取到（包括网络离线状态）
- 离线内容开发者可控
- 能向客户端推动消息
- 不能直接操作DOM
- 必须在HTTPS环境下才可工作
- 异步实现，内部大都是通过Promise实现

[Service Worker 简介](https://lavas.baidu.com/pwa/offline-and-cache-loading/service-worker/service-worker-introduction)

## 什么是Workbox

https://juejin.im/post/5b38bc886fb9a00e5b120437

https://zoumiaojiang.com/article/amazing-workbox-3/
