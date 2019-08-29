# Flux架构
基本概念
- View：视图层
- Action（动作）：视图层发出的消息(比如mouseClick)
- Dispatcher（派发器）：用来接收Actions，执行回调函数
- Store(数据层)：用来存放应用的状态，一旦发生改变，就提醒Views要更新页面

最大特点：数据的”单向流动“

# redux 用法
将Flux与函数式编程结合在一起
# redux saga
用于管理异步操作的Redux中间件

# RxJS

RxJS是一个库，它通过observable序列来编写异步和基于事件的程序。

# redux-obserable
是Redux的一个中间件，使用了 RxJs 来驱动 action 副作用。与其目的类似的有大家比较熟悉的 redux-thunk 和 redux-saga。通过集成 redux-observable，我们可以在 Redux 中使用到 RxJS 所提供的函数响应式编程（FRP）的能力，从而更轻松的管理我们的异步副作用（前提是你熟悉了 RxJS）。
# mobx

# 其他

如何合理设计state和props,尽可能避免使用redux

# 参考
- [Flux 架构入门教程](http://www.ruanyifeng.com/blog/2016/01/flux.html)
- [Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
- [Redux 入门教程（二）：中间件与异步操作](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)
- [Vuex、Flux、Redux、Redux-saga、Dva、MobX](https://zhuanlan.zhihu.com/p/53599723)
- [使用 redux-observable 实现组件自治](https://juejin.im/post/5b798501f265da43473130a1)