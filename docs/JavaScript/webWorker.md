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