## 浏览器引擎(内核)
GUI渲染线程
JavaScript引擎线程
定时触发器线程
事件触发线程
异步HTTP线程

它们的关系:
JavaScript引擎和GUI渲染引擎互斥,不能一边操作DOM,一边渲染页面;
JavaScript引擎是单线程的,所以需要按照事件处理队列来处理相应的代码;
JavaScript引擎有一个监听事件的功能,会持续不断地检查引擎的主线程执行栈是否为空,如果为空就会取事件触发线程存放在事件队列中的回调函数执行

[从浏览器多进程到JS单线程，JS运行机制最全面的一次梳理](https://juejin.im/post/5a6547d0f265da3e283a1df7)
[浏览器的渲染：过程与原理](https://juejin.im/entry/59e1d31f51882578c3411c77)

script的async就是告诉解析器，当前的这个script可以放到DCL之后执行，如果没有async,浏览器就无法准备判断当前的JS对DOM和CSSOM是否有影响，为了保险起见，会按照有影响的方式处理，因为JS中可以操作DOM也可以修改样式，解析器如果遇到没有加async的script标签，它就会停下来当前的DOM或CSSOM构建，去下载并执行js, 执行完JS之后再接着进行DOM或CSSOM构建，但是要注意async是对外联的JS来说的，如果是内联的就不是这样的了，内联的好处是浏览器需要等待任何外部资源，网页已经内置了所有资源。



