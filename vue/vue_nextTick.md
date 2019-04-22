## vue的nextTick实现原理以及应用场景
vue是异步驱动视图更新的,即当我们在事件中修改数据时, 视图并不会即时的更新, 而是在等同一事件循环的所有数据变化完成后,再进行事件更新;

### 应用场景及原因
(1).在Vue声明周期的created()钩子函数中进行的DOM操作一定要放在 Vue.nextTick()的回调函数中
(2).在数据变化之后要进行某个操作, 而这个操作需要使用随数据改变而改变的DOM结构的时候, 这个操作都应该放进 vue.nextTick()的回调函数中

## 参考
https://juejin.im/post/5a6fdb846fb9a01cc0268618
https://juejin.im/entry/5aced80b518825482e39441e