## react
## Immber
Immber核心实现是Es6的Proxy。

### 解决引用类型对象被修改的办法
1. 深度拷贝，但是深拷贝的成本较高，会影响性能
2. [ImmutableJS](https://github.com/immutable-js/immutable-js),非常棒的一个不可变数据结构的库，可以解决上面的问题，但是，跟Immer比起来，ImmutableJS有两个较大的不足：
- 需要使用者学习它的数据结构的操作方式，没有Immber 提供的使用原生对象的操作方式简单、易用。
- 它的操作结果需要通过 `toJS`方法才能得到原生对象，这使得在操作一个对象的时候，时刻要注意要操作的对象是原生对象还是 immutableJS的返回结果，稍不注意，就会产生意向不到的Bug

## redux-saga
解决异步的中间件。
### redux-saga 辅助函数
saga提供了一些辅助函数，包装了一些内部方法，用来在一些特定的action 被发起到 store时派生任务
### takeEvery

### takeLatest

### Effects
概念
sagas都是Generator函数实现，可以用yield对js对象来表达 saga的逻辑，这些对象就是effect,
1. sagas都是Generator函数实现的
2. 在Generator 函数中，yield右边的任何表达式都会被求值，结果会被 yield 给调用者
3. 用 yield 对Effect(简单对象)，进行解释执行
4. Effect是一个简单的对象，这个对象包含了一些给Middleware解释执行的意思。
### 一些概念
1. call
2. take
3. put
4. fork
5. cancel：针对非fork方法返回的任务，进行取消
6. select: 可以从全局state中获取状态
7. saga: 就是用 * 注册的函数，一个函数就是一个saga
8. effect： 上面的call, put, take...就是effect



## 参考
- [Immer 实战讲解](https://github.com/ronffy/immer-tutorial)
- [Redux 入门教程（二）：中间件与异步操作](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)
- [Redux-saga-整理](https://www.cnblogs.com/feng9exe/p/11727847.html)