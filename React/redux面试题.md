# Flux架构
基本概念
- View：视图层
- Action（动作）：视图层发出的消息(比如mouseClick)
- Dispatcher（派发器）：用来接收Actions，执行回调函数
- Store(数据层)：用来存放应用的状态，一旦发生改变，就提醒Views要更新页面


Dispatcher 收集所有的 Action,然后发给所有的 store.
最大特点：数据的”单向流动“

Flux有一些缺点，比如一个应用可以拥有多个Store， 多个 Store 之间可能会有依赖关系， Store封装了数据还有处理数据的逻辑

# redux 用法
将Flux与函数式编程结合在一起;
## 基本概念
- Store：
    - store.getState()：
    - store.dispatch()：redux里里面没有Dispatcher的概念，Store 里面已经集成了 dispatch 方法。store.dispatch()是 View 发出 Action 的唯一方法。
    - store.subscribe()
- Action：Action 就是 View 发出的通知，告诉 Store State 要改变
- Reducer： State的计算过程
   - 为什么叫做reducer呢，reduce 是一个函数式编程的概念，经常和 map 放在一起说，简单来说，map 就是映射，reduce 就是归纳。映射就是把一个列表按照一定规则映射成另一个列表，而 reduce 是把一个列表通过一定规则进行合并，也可以理解为对初始值进行一系列的操作，返回一个新的值。

## Redux流程
1. 用户通过 View 发出 Action
```js
store.dispatch(action);
```
2. 然后 Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action。 Reducer 会返回新的 State 。
```js
let nextState = xxxReducer(previousState, action);
```
3. State 一旦有变化，Store 就会调用监听函数。
```js
store.subscribe(listener);
```
4. listener可以通过 store.getState() 得到当前状态。如果使用的是 React，这时可以触发重新渲染 View。
```js
function listerner() {
  let newState = store.getState();
  component.setState(newState);   
}
```
## 中间件
如何处理异步？

1. redux-thunk 中间件，改造 store.dispatch，使得后者可以接受函数作为参数。
因此，异步操作的第一种解决方案就是，写出一个返回函数的 Action Creator，然后使用redux-thunk中间件改造store.dispatch。

2. 既然 Action Creator 可以返回函数，当然也可以返回其他值。另一种异步操作的解决方案，就是让 Action Creator 返回一个 Promise 对象。
这就需要使用redux-promise中间件。

# react-redux
Redux 和 Flux 类似，只是一种思想或者规范，它和 React 之间没有关系。Redux 支持 React、Angular、Ember、jQuery 甚至纯 JavaScript。

# vuex
mutaitons: 都是同步事务；
action: 执行异步操作，可以在action中 提交 store.commit('increment') 来触发 mutation,一个 Action 里面可以触发多个 mutation

Redux： view——>actions——>reducer——>state变化——>view变化（同步异步一样）

Vuex： view——>commit——>mutations——>state变化——>view变化（同步操作） view——>dispatch——>actions——>mutations——>state变化——>view变化（异步操作）
 
# redux saga
用于管理异步操作的Redux中间件;
刚才介绍了两个Redux 处理异步的中间件 redux-thunk 和 redux-promise，当然 redux 的异步中间件还有很多，他们可以处理大部分场景，这些中间件的思想基本上都是把异步请求部分放在了 action creator 中，理解起来比较简单。

redux-saga 采用了另外一种思路，它没有把异步操作放在 action creator 中，也没有去处理 reductor，而是把所有的异步操作看成“线程”，可以通过普通的action去触发它，当操作完成时也会触发action作为输出。saga 的意思本来就是一连串的事件。

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