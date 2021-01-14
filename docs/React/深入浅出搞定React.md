链接：https://kaiwu.lagou.com/course/courseInfo.htm?courseId=510#/detail/pc?id=4856

下面的内容需要背会!
下面的内容需要背会!
下面的内容需要背会!
古人说"读书百遍，其义自见"，意思是看书一百遍，它的含义自然就理解记忆了。其实就是看书刚开始看看不懂不要紧，多看几遍就会了。
其实跟现在学习是一样的，没有很难的东西，面试也是一样，常问的也就那些，所以要多看几遍，可以以上学的时候背诵课文是一样的道理。看书记笔记的时候想想考试的时候看书的时候，记笔记，会带着问题，会大概猜到考试会问哪些问题。
上几年学，其实教会给自学的能力，是可以一生受益的。

## 2.为什么 React 16 要更改组件的生命周期？（上）
原来的声明周期
组件挂载：constructor -> componentWillMount -> render -> componentDidMount
组件更新：componentWillReceiveProps(nextProps)(由父组件触发) ->  shouldComponentUpdate(nextProps, nextState) (由组件自身触发) -> componentWillUpdate(nextProps, nextState)  -> render -> componentDidUpdate(nextProps, nextState)
组件卸载：componentWillUnmount()

### 组件挂载
componentWillMount、componentDidMount 方法同样只会在挂载阶段被调用一次。
一些不好的操作，在 componentWillMount 中做一些初始化的操作。
比如有些同学会在componentWillMount中请求接口数据，componentWillMount 结束后，render 会迅速地被触发，所以说首次渲染依然会在数据返回之前执行。这样做不仅没有达到你预想的目的，还会导致服务端渲染场景下的冗余请求等额外问题，得不偿失。

注意 render 在执行过程中并不会去操作真实 DOM（也就是说不会渲染），它的职能是把需要渲染的内容返回出来。真实 DOM 的渲染工作，在挂载阶段是由 ReactDOM.render 来承接的。

componentDidMount 方法在渲染结束后被触发，此时因为真实 DOM 已经挂载到了页面上，我们可以在这个生命周期里执行真实 DOM 相关的操作。此外，类似于异步请求、数据初始化这样的操作也大可以放在这个生命周期来做（侧面印证了 componentWillMount 真的很鸡肋）。
### 组件更新
组件的更新分为两种：一种是由父组件更新触发的更新；另一种是组件自身调用自己的 setState 触发的更新。
componentWillReceiProps 到底是由什么触发的？
父组件触发的更新和组件自身的更新相比，多出了这样一个生命周期方法：
```js
componentWillReceiveProps(nextProps)
```
在这个生命周期方法里，nextProps 表示的是接收到新 props 内容，而现有的 props （相对于 nextProps 的“旧 props”）我们可以通过 this.props 拿到，由此便能够感知到 props 的变化。
不严谨的说法"`componentWillReceiveProps` 是在组件的 props 内容发生了变化时被触发的"
例子：`this.state.ownText` 这个状态和子组件完全无关。但是当我点击“修改父组件自有文本内容”这个按钮的时候，componentReceiveProps 仍然被触发了
`componentReceiveProps` 并不是由 props 的变化触发的，而是由父组件的更新触发的

componentWillUpdate 和 componentDidUpdate :
componentWillUpdate 会在 render 前被触发，它和 componentWillMount 类似，允许你在里面做一些不涉及真实 DOM 操作的准备工作；而 componentDidUpdate 则在组件更新完毕后被触发，和 componentDidMount 类似，这个生命周期也经常被用来处理 DOM 操作。此外，我们也常常将 componentDidUpdate 的执行作为子组件更新完毕的标志通知到父组件。

shouldComponentUpdate
render 方法由于伴随着对虚拟 DOM 的构建和对比，过程可以说相当耗时。而在 React 当中，很多时候我们会不经意间就频繁地调用了 render。为了避免不必要的 render 操作带来的性能开销，React 为我们提供了 shouldComponentUpdate 这个口子。


组件的卸载： componentWillUnmount()
这个生命周期本身不难理解，我们重点说说怎么触发它。组件销毁的常见原因有以下两个。

- 组件在父组件中被移除了：这种情况相对比较直观，对应的就是我们上图描述的这个过程。
- 组件中设置了 key 属性，父组件在 render 的过程中，发现 key 值和上一次不一致，那么这个组件就会被干掉。

## 3.为什么 React 16 要更改组件的生命周期？（下）
react 16.x 版本之后的生命周期：https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

### 组件渲染：constructor -> getDerivedStateFromProps -> render -> componentDidMount

消失的 componentWillMount，新增的 getDerivedStateFromProps
> React 16 对 render 方法也进行了一些改进。React 16 之前，render方法必须返回单个元素，而 React 16 允许我们返回元素数组和字符串。

getDerivedStateFromProps 不是 componentWillMount 的替代品

componentWillMount 的存在不仅“鸡肋”而且危险，因此它并不值得被“代替”，它就应该被废弃.

而 getDerivedStateFromProps 这个 API，其设计的初衷不是试图替换掉 componentWillMount，而是试图替换掉 componentWillReceiveProps，因此它有且仅有一个用途：使用 props 来派生/更新 state。
getDerivedStateFromProps 直译过来就是“从 Props 里派生 State”

getDerivedStateFromProps 在更新和挂载两个阶段都会“出镜”（这点不同于仅在更新阶段出现的 componentWillReceiveProps）。这是因为“派生 state”这种诉求不仅在 props 更新时存在，在 props 初始化的时候也是存在的。React 16 以提供特定生命周期的形式，对这类诉求提供了更直接的支持。

1. getDerivedStateFromProps 是一个静态方法。静态方法不依赖组件实例而存在，因此你在这个方法内部是访问不到 this 的。
```js
static getDerivedStateFromProps(props, state)
```
> [静态方法](https://es6.ruanyifeng.com/#docs/class#%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95)， 加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用， 加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用

2. 该方法可以接收两个参数：props 和 state，它们分别代表当前组件接收到的来自父组件的 props 和当前组件自身的 state。

3. getDerivedStateFromProps 需要一个对象格式的返回值。如果你没有指定这个返回值，那么大概率会被 React 警告一番，
getDerivedStateFromProps 的返回值之所以不可或缺，是因为 React 需要用这个返回值来更新（派生）组件的 state。因此当你确实不存在“使用 props 派生 state ”这个需求的时候，最好是直接省略掉这个生命周期方法的编写，否则一定记得给它 return 一个 null
getDerivedStateFromProps 方法对 state 的更新动作并非“覆盖”式的更新，而是针对某个属性的定向更新

### 组件更新
getDerivedStateFromProps (由父组件触发) ->  shouldComponentUpdate(nextProps, nextState) (由组件自身触发) -> getSnapshotBeforeUpdate  -> render -> componentDidUpdate(nextProps, nextState)

React 16.4 的挂载和卸载流程都是与 React 16.3 保持一致的，差异在于更新流程上：

- 在 React 16.4 中，任何因素触发的组件更新流程（包括由 this.setState 和 forceUpdate 触发的更新流程）都会触发 getDerivedStateFromProps；
- 而在 v 16.3 版本时，只有父组件的更新会触发该生命周期。

1. getDerivedStateFromProps 是作为一个试图代替 componentWillReceiveProps 的 API 而出现的；
2. getDerivedStateFromProps不能完全和 componentWillReceiveProps 画等号，其特性决定了我们曾经在 componentWillReceiveProps 里面做的事情，不能够百分百迁移到getDerivedStateFromProps 里。

从 getDerivedStateFromProps 直接被定义为 static 方法这件事上就可见一斑—— static 方法内部拿不到组件实例的 this，这就导致你无法在 getDerivedStateFromProps 里面做任何类似于 this.fetch()、不合理的 this.setState（会导致死循环的那种）这类可能会产生副作用的操作。

getDerivedStateFromProps 生命周期替代 componentWillReceiveProps 的背后，是 React 16 在强制推行“只用 getDerivedStateFromProps 来完成 props 到 state 的映射”这一最佳实践。意在确保生命周期函数的行为更加可控可预测，从根源上帮开发者避免不合理的编程方式，避免生命周期的滥用；同时，也是在为新的 Fiber 架构铺路。

消失的 componentWillUpdate 与新增的 getSnapshotBeforeUpdate
 getSnapshotBeforeUpdate 的返回值会作为第三个参数给到 componentDidUpdate。它的执行时机是在 render 方法之后，真实 DOM 更新之前。在这个阶段里，我们可以同时获取到更新前的真实 DOM 和更新前后的 state&props 信息。

 实现一个内容会发生变化的滚动列表，要求根据滚动列表的内容是否发生变化，来决定是否要记录滚动条的当前位置。这个需求的前半截要求我们对比更新前后的数据（感知变化），后半截则需要获取真实的 DOM 信息（获取位置），这时用 getSnapshotBeforeUpdate 来解决就再合适不过了。
 getSnapshotBeforeUpdate 要想发挥作用，离不开 componentDidUpdate 的配合。

 为什么 componentWillUpdate 就非死不可呢？说到底，还是因为它“挡了 Fiber 的路”。

### Fiber 架构简析

Fiber 会使原本同步的渲染过程变成异步的。
在React 16 之前，没当我们触发 一次组件的更新，React都会构建一颗虚拟 DOM 树，通过与上一次的虚拟DOM树进行diff, 实现对 DOM 的定向更新。这个过程，是一个递归的过程
同步渲染的递归调用栈是非常深的，只有最底层的调用返回了，整个渲染过程才会开始逐层返回。

这个漫长且不可打断的更新过程，将会带来用户体验层面的巨大风险：同步渲染一旦开始，便会牢牢抓住主线程不放，直到递归彻底完成。在这个过程中，浏览器没有办法处理任何渲染之外的事情，会进入一种无法处理用户交互的状态。因此若渲染时间稍微长一点，页面就会面临卡顿甚至卡死的风险。

Fiber 会将一个大的更新任务拆解为许多个小任务。每当执行完一个小任务时，渲染线程都会把主线程交回去，看看有没有优先级更高的工作要处理，确保不会出现其他任务被“饿死”的情况，进而避免同步渲染带来的卡顿。在这个过程中，渲染线程不再“一去不回头”，而是可以被打断的，这就是所谓的“异步渲染”，

Fiber 架构的重要特征就是可以被打断的异步渲染模式。但这个“打断”是有原则的，根据“能否被打断”这一标准，React 16 的生命周期被划分为了 render 和 commit 两个阶段，而 commit 阶段又被细分为了 pre-commit 和 commit。

- render 阶段：纯净且没有副作用，可能会被 React 暂停、终止或重新启动。
- pre-commit 阶段：可以读取 DOM。
- commit 阶段：可以使用 DOM，运行副作用，安排更新。

总的来说，render 阶段在执行过程中允许被打断，而 commit 阶段则总是同步执行的。

由于 render 阶段的操作对用户来说其实是“不可见”的，所以就算打断再重启，对用户来说也是零感知。
而 commit 阶段的操作则涉及真实 DOM 的渲染，再狂的框架也不敢在用户眼皮子底下胡乱更改视图，所以这个过程必须用同步渲染来求稳

render 阶段是允许暂停、终止和重启的。这就导致 render 阶段的生命周期都是有可能被重复执行的。
带着这个结论，我们再来看看 React 16 打算废弃的是哪些生命周期：

- componentWillMount；
- componentWillUpdate；
- componentWillReceiveProps。

这些生命周期的共性，就是它们都处于 render 阶段，都可能重复被执行，而且由于这些 API 常年被滥用，它们在重复执行的过程中都存在着不可小觑的风险。

React 16 改造生命周期的主要动机是为了配合 Fiber 架构带来的异步渲染机制


- [React生命周期（16.x之前和之后的）](https://github.com/funnycoderstar/blog/issues/134)

## 4. 数据是如何在React组件之间流动的（上）

理解事件的发布-订阅机制
```js
target.addEventListener(type, listener, useCapture);
```
通过调用 addEventListener 方法，我们可以创建一个事件监听器，这个动作就是“订阅”。比如我可以监听 click（点击）事件：
```js
el.addEventListener("click", func, false);
```
这样一来，当 click 事件被触发时，事件会被“发布”出去，进而触发监听这个事件的 func 函数。这就是一个最简单的发布-订阅案例。

使用发布-订阅模式的优点在于，监听事件的位置和触发事件的位置是不受限的，就算相隔十万八千里，只要它们在同一个上下文里，就能够彼此感知。这个特性，太适合用来应对“任意组件通信”这种场景了。

发布-订阅模式中有两个关键的动作：事件的监听（订阅）和事件的触发（发布）

- on()：负责注册事件的监听器，指定事件触发时的回调函数。
- emit()：负责触发事件，可以通过传参使其在触发的时候携带数据 。
- off()：负责监听器的删除。

```js
class myEventEmitter {
  // 事件和监听函数的对应关系如何处理？
  // 提到“对应关系”，应该联想到的是“映射”。在 JavaScript 中，处理“映射”我们大部分情况下都是用对象来做的。所以说在全局我们需要设置一个对象，来存储事件和监听函数之间的关系：
  constructor() {
    // eventMap 用来存储事件和监听函数之间的关系
    this.eventMap = {};
  }
  // 如何实现订阅？
  // 所谓“订阅”，也就是注册事件监听函数的过程。这是一个“写”操作，具体来说就是把事件和对应的监听函数写入到 eventHome 里面去：
  // type 这里就代表事件的名称
  on(type, handler) {
    // hanlder 必须是一个函数，如果不是直接报错
    if (!(handler instanceof Function)) {
      throw new Error("哥 你错了 请传一个函数");
    }
    // 判断 type 事件对应的队列是否存在
    if (!this.eventMap[type]) {
      // 若不存在，新建该队列
      this.eventMap[type] = [];
    }
    // 若存在，直接往队列里推入 handler
    this.eventMap[type].push(handler);
  }
  // 如何实现发布？
  // 订阅操作是一个“写”操作，相应的，发布操作就是一个“读”操作。发布的本质是触发安装在某个事件上的监听函数，我们需要做的就是找到这个事件对应的监听函数队列，将队列中的 handler 依次执行出队：
  // 别忘了我们前面说过触发时是可以携带数据的，params 就是数据的载体
  emit(type, params) {
    // 假设该事件是有订阅的（对应的事件队列存在）
    if (this.eventMap[type]) {
      // 将事件队列里的 handler 依次执行出队
      this.eventMap[type].forEach((handler, index) => {
        // 注意别忘了读取 params
        handler(params);
      });
    }
  }
  off(type, handler) {
    if (this.eventMap[type]) {
      this.eventMap[type].splice(this.eventMap[type].indexOf(handler) >>> 0, 1);
    }
  }
}
```
创建一个 myEvent 对象作为 myEventEmitter 的实例，然后针对名为 “test” 的事件进行监听和触发：
```js
// 实例化 myEventEmitter
const myEvent = new myEventEmitter();
// 编写一个简单的 handler
const testHandler = function (params) {
  console.log(`test事件被触发了，testHandler 接收到的入参是${params}`);
};
// 监听 test 事件
myEvent.on("test", testHandler);
// 在触发 test 事件的同时，传入希望 testHandler 感知的参数
myEvent.emit("test", "newState");
```


## 7. React-Hooks 设计动机与工作模式（下）
useState() 为函数组件引入状态
useEffect() 允许函数组件执行副作用操作，原来放在 componentDidMount、componentDidUpdate 和 componnentWillUnmount三个生命周期中做的事情，现在都可以放在 useEffect中操作


## 8. react-hooks的原理
- 只在 React 函数中调用 Hook；
- 不要在循环、条件或嵌套函数中调用 Hook。
```js
import React, { useState } from "react";
// isMounted 用于记录是否已挂载（是否是首次渲染）
let isMounted = false;
function PersonalInfoComponent() {
  // 定义变量的逻辑不变
  let name, age, career, setName, setCareer;
  // 这里追加对 isMounted 的输出，这是一个 debug 性质的操作
  console.log("isMounted is", isMounted);
  // 这里追加 if 逻辑：只有在首次渲染（组件还未挂载）时，才获取 name、age 两个状态
  if (!isMounted) {
    // eslint-disable-next-line
    [name, setName] = useState("修言");
    // eslint-disable-next-line
    [age] = useState("99");
    // if 内部的逻辑执行一次后，就将 isMounted 置为 true（说明已挂载，后续都不再是首次渲染了）
    isMounted = true;
  }
  // 对职业信息的获取逻辑不变
  [career, setCareer] = useState("我是一个前端，爱吃小熊饼干");
  // 这里追加对 career 的输出，这也是一个 debug 性质的操作
  console.log("career", career);
  // UI 逻辑的改动在于，name和age成了可选的展示项，若值为空，则不展示
  return (
    <div className="personalInfo">
      {name ? <p>姓名：{name}</p> : null}
      {age ? <p>年龄：{age}</p> : null}
      <p>职业：{career}</p>
      <button
        onClick={() => {
          setName("秀妍");
        }}
      >
        修改姓名
      </button>
    </div>
  );
}
export default PersonalInfoComponent;
```
修改后的组件在初始渲染的时候，界面与上个版本无异：都涉及对 name、age、career 三个状态的获取和渲染
理论上来说，变化应该发生在我单击“修改姓名”之后触发的二次渲染里：二次渲染时，isMounted 已经被置为 true，if 内部的逻辑会被直接跳过。

组件不仅没有像预期中一样发生界面变化，甚至直接报错了。报错信息提醒我们，这是因为“组件渲染的 Hooks 比期望中更少”。
确实，按照现有的逻辑，初始渲染调用了三次 useState，而二次渲染时只会调用一次。但仅仅因为这个，就要报错吗？

按道理来说，二次渲染的时候，只要我获取到的 career 值没有问题，那么渲染就应该是没有问题的（因为二次渲染实际只会渲染 career 这一个状态），React 就没有理由阻止我的渲染动作

二次渲染时，isMounted 为 true，这个没毛病。但是 career 竟然被修改为了“秀妍”，

确实，代码是没错的，我们调用的是 setName，那么它修改的状态也应该是 name，而不是 career。

那为什么最后发生变化的竟然是 career 呢？

从源码调用流程看原理：Hooks 的正常运作，在底层依赖于顺序链表
1. 从源码调用流程看原理：Hooks 的正常运作，在底层依赖于顺序链表
2. 原理 !== 源码，阅读源码只是掌握原理的一种手段，

重点：理解 Hooks在每个关键环节都做了哪些工作，同时可以理解这些关键环节是如何对最终的渲染结果产生影响的，

理解 Hooks 在每个关键环节都做了哪些事情

### 首次渲染的过程

mounState 的主要工作是初始化 Hooks

mountWorkInProgressHook 方法，它为我们道出了 Hooks 背后的数据结构组织形式

```js
function mountWorkInProgressHook() {
  // 注意，单个 hook 是以对象的形式存在的
  var hook = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };
  if (workInProgressHook === null) {
    // 这行代码每个 React 版本不太一样，但做的都是同一件事：将 hook 作为链表的头节点处理
    firstWorkInProgressHook = workInProgressHook = hook;
  } else {
    // 若链表不为空，则将 hook 追加到链表尾部
    workInProgressHook = workInProgressHook.next = hook;
  }
  // 返回当前的 hook
  return workInProgressHook;
}
```
hook相关的所有信息收敛在一个hook对象里，而hook 对象之间以单向链表的形式相互串联。

### 更新的过程

首次渲染和更新渲染的区别，在于调用的是 mountState，还是 updateState。updateState做的事情，按顺序去遍历之前构建好的链表，取出对应的数据信息进行渲染。
mountState（首次渲染）构建链表并渲染；updateState 依次遍历链表并渲染。
hooks 的渲染是通过“依次遍历”来定位每个 hooks 内容的。如果前后两次读到的链表在顺序上出现差异，那么渲染的结果自然是不可控的。


## 09. 真正理解虚拟DOM
虚拟DOM是什么
1. 虚拟DOM是JS 对象
2. 虚拟DOM是对真实 DOM 的描述

虚拟DOM是如何工作的
- 挂载阶段， React结合 JSX 的描述， 构建出虚拟DOM树，然后通过  ReactDOM.render 实现虚拟 DOM 到真实 DOM 的映射（触发渲染流水线）；
- 更新阶段，页面的变化在作用于真实 DOM 之前，会先作用于虚拟 DOM，虚拟 DOM 将在 JS 层借助算法先对比出具体有哪些真实 DOM 需要被改变，然后再将这些改变作用于真实 DOM。

为什么需要虚拟 DOM？
虚拟 DOM 的优势何在？
虚拟 DOM 是否伴随更好的性能？


模板引擎一般需要做下面几件事情：
1. 读取 HTML 模板并解析它，分离出其中的 JS 信息；
2. 将解析出的内容拼接成字符串，动态生成 JS 代码；
3. 运行动态生成的 JS 代码，吐出“目标 HTML”
4. 将“目标 HTML”赋值给 innerHTML，触发渲染流水线，完成真实 DOM 的渲染。
它更新 DOM 的方式是将已经渲染出 DOM 整体注销后再整体重渲染，并且不存在更新缓冲这一说。在 DOM 操作频繁的场景下，模板引擎可能会直接导致页面卡死。

越来越多的模板引擎正在引入虚拟 DOM，模板引擎最终也将走向现代化。

### 虚拟DOM和模板引擎的关系和区别

区别就在于多出了一层虚拟 DOM 作为缓冲层。这个缓冲层带来的利好是：当 DOM 操作（渲染更新）比较频繁时，它会先将前后两次的虚拟 DOM 树进行对比，定位出具体需要更新的部分，生成一个“补丁集”，最后只把“补丁”打在需要更新的那部分真实 DOM 上，实现精准的“差量更新”。

虚拟 DOM 并不一定会带来更好的性能：
虚拟 DOM 的优越之处在于，它能够在提供更爽、更高效的研发模式（也就是函数式的 UI 编程方式）的同时，仍然保持一个还不错的性能。

如果非要从性能的角度分析虚拟DOM，我们可以从以下几个角度来分析
1. 数据内容变化非常大（或者说整个发生了改变），促使差量更新计算出来的结果和全量更新极为接近（或者说完全一样）。这种情况下，DOM更新的工作量基本一致，而虚拟DOM却需要开销更大的JS计算
2. 数据内容白变化不是很大的时候，模板渲染和虚拟 DOM 之间 DOM 操作量级的差距就完全拉开了，虚拟 DOM 将在性能上具备绝对的优势。因为虚拟 DOM 的劣势主要在于 JS 计算的耗时，而 DOM 操作的能耗和 JS 计算的能耗根本不在一个量级，



虚拟 DOM 解决的关键问题有以下两个。
1. 研发体验/研发效率的问题：这一点前面已经反复强调过，DOM 操作模式的每一次革新，背后都是前端对效率和体验的进一步追求。虚拟 DOM 的出现，为数据驱动视图这一思想提供了高度可用的载体，使得前端开发能够基于函数式 UI 的编程方式实现高效的声明式编程。

2. 跨平台的问题：虚拟 DOM 是对真实渲染内容的一层抽象。若没有这一层抽象，那么视图层将和渲染平台紧密耦合在一起，为了描述同样的视图内容，你可能要分别在 Web 端和 Native 端写完全不同的两套甚至多套代码。但现在中间多了一层描述性的虚拟 DOM，它描述的东西可以是真实 DOM，也可以是iOS 界面、安卓界面、小程序......同一套虚拟 DOM，可以对接不同平台的渲染逻辑，从而实现“一次编码，多端运行”，如下图所示。其实说到底，跨平台也是研发提效的一种手段，它在思想上和1是高度呼应的。

除了差量更新以外，“批量更新”也是虚拟 DOM 在性能方面所做的一个重要努力：“批量更新”在通用虚拟 DOM 库里是由 batch 函数来处理的。在差量更新速度非常快的情况下（比如极短的时间里多次操作同一个 DOM），用户实际上只能看到最后一次更新的效果。这种场景下，前面几次的更新动作虽然意义不大，但都会触发重渲染流程，带来大量不必要的高耗能操作。

这时就需要请 batch 来帮忙了，batch 的作用是缓冲每次生成的补丁集，它会把收集到的多个补丁集暂存到队列中，再将最终的结果交给渲染函数，最终实现集中化的 DOM 批量更新。

## 10.React 中的“栈调和”（Stack Reconciler）过程是怎样的？
学习知识需要建立必要且完整的上下文。
如果不清楚React 15的运行机制，就无从把握它的局限性，无法从根本理解 React 16改版最后的动机。

> 技术文章的写作思路：之前有什么问题，然后大家想了哪些方法解决，最后使用xxx api解决了。
> 学习并没有什么捷径可言，你比别人看的多，了解的多，并且把他们都转成了自己的知识，那你就是比别人牛逼。我觉得之前有个朋友说的一句话特别好 “背诵知识点”，一些东西看一遍的远远不够的，需要不停的看，哪怕你现在看不懂没有关系，背诵下来，就好比上学的时候背诵古诗文是一样的，当时也是不理解，但是现在基本都烂熟于心了，并且碰到差不多的场景，你可以张口就来。

调和指的是将虚拟 DOM映射到真实 DOM 的过程
Diff 是“找不同”的过程，它只是“使一致”过程中的一个环节。
React 从大的板块上将源码划分为了 Core、Renderer 和 Reconciler 三部分
调和器所做的工作是一系列的，包括组件的挂载、卸载、更新等过程，其中更新过程涉及对 Diff 算法的调用。
Diff 确实是调和过程中最具代表性的一环：根据 Diff 实现形式的不同，调和过程被划分为了以 React 15 为代表的“栈调和”以及 React 16 以来的“Fiber 调和”。

栈调和”指的就是 React 15 的 Diff 算法。

要想找出两个树结构之间的不同, 传统的计算方法是通过循环递归进行树节点的一一对比,  这个过程的算法复杂度是 O (n3) 。尽管这个算法本身已经是几代程序员持续优化的结果，但对计算能力有限的浏览器来说，O (n3) 仍然意味着一场性能灾难。
若一张页面中有 100 个节点（这样的情况在实际开发中并不少见），1003 算下来就有十万次操作了，这还只是一次 Diff 的开销；若应用规模更大一点，维护 1000 个节点，那么操作次数将会直接攀升到 10 亿的量级。

OJ 中相对理想的时间复杂度一般是 O(1) 或 O(n)。当复杂度攀升至 O(n2) 时，我们就会本能地寻求性能优化的手段，更不必说是人神共愤的 O(n3) 了！我们看不下去，React 自然也看不下去。React 团队结合设计层面的一些推导，总结了以下两个规律， 为将 O (n3) 复杂度转换成 O (n) 复杂度确立了大前提：
- 当若两个组件属于同一个类型，那么它们将拥有相同的 DOM 树形结构；
- 处于同一层级的一组子节点，可用通过设置 key 作为唯一标识，从而维持各个节点在不同渲染过程中的稳定性。

### Diff 算法性能突破的关键点在于“分层对比”；
1. Diff 算法性能突破的关键点在于“分层对比”；
2. Diff 算法性能突破的关键点在于“分层对比”；
3. key 属性的设置，可以帮我们尽可能重用同一层级内的节点。

1. 改变时间复杂度量级的决定性思路：分层对比
DOM 节点之间的跨层级操作并不多，同层级操作是主流。
 React 的 Diff 过程直接放弃了跨层级的节点比较，它只针对相同层级的节点作对比

2. 减少递归的“一刀切”策略：类型的一致性决定递归的必要性

3. 重用节点的好帮手：key 属性帮 React “记住”节点


虚拟 DOM 中还有一个叫作“batch”的东西。“batch”描述的是“批处理”机制，这个机制和 Diff 一样，在 React 中都可以由 setState 来触发。


## 11. setState 到底是同步的，还是异步的？
一道复杂多变的面试题
```js
import React from "react";
import "./styles.css";
export default class App extends React.Component{
  state = {
    count: 0
  }
  increment = () => {
    console.log('increment setState前的count', this.state.count)
    this.setState({
      count: this.state.count + 1
    });
    console.log('increment setState后的count', this.state.count)
  }
  triple = () => {
    console.log('triple setState前的count', this.state.count)
    this.setState({
      count: this.state.count + 1
    });
    this.setState({
      count: this.state.count + 1
    });
    this.setState({
      count: this.state.count + 1
    });
    console.log('triple setState后的count', this.state.count)
  }
  reduce = () => {
    setTimeout(() => {
      console.log('reduce setState前的count', this.state.count)
      this.setState({
        count: this.state.count - 1
      });
      console.log('reduce setState后的count', this.state.count)
    },0);
  }
  render(){
    return <div>
      <button onClick={this.increment}>点我增加</button>
      <button onClick={this.triple}>点我增加三倍</button>
      <button onClick={this.reduce}>点我减少</button>
    </div>
  }
}
```
依次点击，分别输出什么
```js
increment setState前的count 0
increment setState前的count 0

triple setState前的count 1
triple setState前的count 1

reduce setState前的count 2
reduce setState后的count 1
```

### 异步的动机和原理——批量更新的艺术
setState调用之后都发生了哪些事情？
```js
setState -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate
```
一次完整的更新过程，涉及包括了 re-render 在内的多个过程，re-redender 本身包括 对DOM的操作，会有较大的性能开销。如果每次调用setState，就重新触发一次 render, 可能操作不了几次，视图就卡死了。

setState 设计为异步的动机就是为了避免过多的 re-render
### 从源码角度看 setState 工作流
上面实行 reduce，代码时同步执行的，在setTimeout 里 setState是同步执行的，为什么呢


## 12.如何理解 Fiber 架构的迭代动机与设计思想？
### 前置知识：单线程的JavaScript和多线程的浏览器
浏览器的多线程，包括，渲染线程，JavaScript线程，定时器线程等
其中渲染线程和JavaScript线程是互斥的，因为JavaScript可能会修改DOM,如果这两个不是互斥的话，JS修改完DOM之后，渲染进又需要重新工作，所以为了避免无效的渲染，所以这两个线程互斥。这就意味着一个线程在工作的时候另一个线程必须等待。（渲染线程等待的时候，就意味着界面不更新，卡顿，JS等待的时候就会意味着操作无响应）
事件线程这是这样的，浏览器的事件循环，是一个异步队列来控制的，触发了事件后，事件不会立即执行，而是放在一个任务队列中，等JS的同步代码执行完成，才会执行
### 为什么会卡顿
diff过程是一个同步递归的过程，DOM会被解析为渲染树进行深度优先遍历，它的过程是同步的，不能被打断。这意味着如果有比较复杂的DOM结构，Diff的时候占用的时候会很多，这样，JavaScript线程长时间占用主线程，页面就会卡顿
### Fiber如何解决
将任务拆分成更细颗粒度的，可以中断和恢复执行，调度器会将给每个更新任务分配一个优先级，如果右优先级高的任务，那会暂停执行 diff 过程，优先执行优先级更高的任务

## 13.
初始化、render 和 commit 等过程
 ReactDOM.render 的调用栈划分为三个阶段：
 - 

## 不能按照自己的话术总记的真正原因
- 不相信自己的话，总觉得书中的比自己的好太多
- 改进：尝试逼迫自己在看完一段的时候，用自己的话总结一下
- 总结的内容要经常回过头来复习
- 给自己积极的鼓励，自己总结的真棒
带来的好处
- 慢慢变成一个有独立思想的人，像真岛那样
- 写文章的时候不会再被质疑是直接将人家其他的文章照搬过来，更容易写出原创
- 面试的时候，会很能说，毕竟知识能已经变成自己的了
## 要多注意复习，将之前的东西真正装进脑袋里，变成自己的营养

这是一个过程，只有学会和养成这样的习惯，看的书中的知识才能真正转化为自己的。
读书效率关键是看读完能讲出来多少，而不是看了多少。
记笔记，用自己的话描述，虽然会很慢（尤其是初始养成这种习惯的时候，但是养成习惯就会慢慢快了，但是肯定比之前走马看花的读书还是慢），但实际上这是另一种程度的”快“，因为你能真正吸收书中的营养，变成自己的，会使自己的一生受益
- [如何有效阅读一本书](https://book.douban.com/subject/26789567/)
