## vue的nextTick实现原理以及应用场景
vue是异步驱动视图更新的,即当我们在事件中修改数据时, 视图并不会即时的更新, 而是在等同一事件循环的所有数据变化完成后,再进行事件更新;

> [vue文档中的介绍](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97)
异步更新队列
vue异步执行更新队列，只要观察到数据变化，Vue将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个watcher被多次触发，只会被推入到队列中一次，这种在缓冲时去除重复数据对于避免不必要的计算和DOM操作上非常重要。然后，在下一个的事件循环`tick`中， Vue刷新队列并执行实际(已去重)的工作。Vue在内部尝试对异步队列使用原生`Promise.then`和 `MessageChannel`, 如果执行环境不支持，会采用`setTimeout(fn, 0)`代替；



### 应用场景及原因
(1).在Vue声明周期的created()钩子函数中进行的DOM操作一定要放在 Vue.nextTick()的回调函数中
(2).在数据变化之后要进行某个操作, 而这个操作需要使用随数据改变而改变的DOM结构的时候, 这个操作都应该放进 vue.nextTick()的回调函数中;

## 参考
https://juejin.im/post/5a6fdb846fb9a01cc0268618
https://juejin.im/entry/5aced80b518825482e39441e