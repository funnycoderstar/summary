## webWorker
### 线程和进程
# 线程(process)和进程(thread)
一个cpu同时只能运行一个进程, 其他进程处于非运行状态;
线程: 一个进程可以包含好几个线程

进程的内存空间是共享的,每个线程都使用这些共享内存

防止多个线程同时读写某一块内存区域。(互斥锁)
内存区域只能给固定数目的线程使用(信号量)

# 总结
- 多进程: 允许多个任务同时运行
- 多线程: 允许单个任务分成不同的部分运行
- 提供协调机制,一方面防止进程和线程之间产生冲突,另一方面允许进程之间和线程之间共享资源

# 参考
[进程与线程的一个简单解释](http://www.ruanyifeng.com/blog/2013/04/processes_and_threads.html)
### JS是单线程的

### webWorker
HTML5提出了webWorker标准, 表示允许JS多线程, 但是子线程完全受主线程控制并且不能操作DOM,只有主线程可以操作DOM, 所以JS本质上依然是单线程语言.

webWorker就是在JS单线程执行的基础上开启一个子线程,进程程序处理,而不影响主线程的执行,当子线程执行完之后再回到主线程, 在这个过程中不影响主线程的执行.子线程和主线程之间提供了数据交互的接口 postMessage和onmessage, 来进行数据发送和接受;

```js
const worker = new Worker('./worker.js'); // 创建一个子线程
worker.postMessage('Hello');
worker.onmessage  = (e) => {
    console.log(e.data);
    worker.terminate(); // 结束线程
}

onmessage = (e) => {
    console.log(e.data);
    postMessage('Hi'); // 向主线程发送消息
}
```


## 参考
[Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)


[Web Worker](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)
为JavaScript创造多线程环境

[service worker](https://lavas.baidu.com/pwa)
一个独立的 worker 线程，独立于当前网页，有自己独立的 worker context.service worker的Web Worker的基础上加了持久缓存的能力
[worker box](https://developers.google.com/web/tools/workbox/)
用于生成 Service Worker, 预缓存，路由及运行时缓存的一个库。
[H5离线存储 appCache](https://juejin.im/entry/5acde43bf265da2393776fc8)
但是 AppCache 存在很多 [不能忍受的缺点](https://alistapart.com/article/application-cache-is-a-douchebag/)。W3C 决定 AppCache 仍然保留在 HTML 5.0 Recommendation 中，在 HTML 后续版本中移除。
[H5离线存储 manifest简介](https://imweb.io/topic/5703a99606f2400432c1397b)
已经从web 标准中移除