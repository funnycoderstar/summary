# React hook
## 1. 为什么要在React中引入Hook?
解决长时间使用和维护react过程中遇到的一些难以避免的问题
- 难以重用和共享组件中与状态相关的逻辑
- 逻辑复杂的组件难以开发和维护，当我们的组件需要处理多个互不相关的local state 时，每个生命周期中可能包含着各种互不相关的逻辑在里面。
- 类组件中的this增加学习成本，类组件在基于现有工具的优化上存在些许问题
- 由于业务变动，函数组件不得不改为类组件等等
## 2. 什么是hook
内置hook
useState
useEffect：会在组件 mount和unmount以及每次重新渲染的时候都会执行，也就是会在 componentDidMount， componentDidUpdate，componentWillUnmount这三个时期执行。

只能在顶层代码中调用hooks,不能在循环和判断语句等里面调用，这样是为了让我们的hooks在每次渲染的时候都按照相同的顺序调用，因为这里有一个很关键的问题，那就是useState需要依赖参照第一次渲染的调用顺序来匹配state,否则useState会无法正确返回它对应的state

## 3. Hooks解决的问题
- 如何难以重用和共享组件中与状态相关的逻辑
没有hooks之前是通过
1. render props通过props接受一个返回react element的函数，来动态决定自己要渲染的结果
```js
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>
```
2. HOC(Higher-Order Components)
```js
function getComponent(WrappedComponent) {

  return class extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      // doSomething
    }
    componentWillUnmount() {
      // doSomething
    }
    render() {
      return WrappedComponent {...this.props};
    }
  };
}
```
现在是用 custom Hooks, 这并不是一个api,而是一个规则。具体实现就是通过一个函数来封装跟状态有关的逻辑，将这些逻辑从组件中抽取出来。而这个函数中我们可以使用其他的Hooks，也可以单独进行测试，甚至将它贡献给社区。
```js
import { useState, useEffect } from 'react';

function useCount() {
  const [count, setCount] = useState(0);
  useEffect(() = {
    document.title = `You clicked ${count} times`;
  });
  
  return count
}
```
- 具有复杂逻辑的组件的开发和维护
使用hooks对于状态和相关的处理逻辑可以按照功能进行划分，不必散落在各个生命周期中，大大降低了开发和维护的难度。
## 4. 如何工作以及在什么场景下使用

# react fiba架构
React Fiba 是对核心算法的一次重新实现;
为什么要搞?
reactV15版本的一些局限
### 同步更新的局限
更新过程是同步的，可能导致性能问题。因为Javascript 单线程的特点，每个同步任务不能耗时太长，不然就会让程序不会对其他输入作出响应，React的更新过程就是犯了这个禁忌，而React Fiber就是要改变现状
### react fiber的工作方式
更新过程碎片化，

fiber,含义是”纤维“，比Thread更细的线，也就是比线程（Thread）控制得更精密的并发处理机制。

[React Fiber是什么](https://zhuanlan.zhihu.com/p/26027085)
# 生命周期
添加了: getDerivedFromProps, getSnapshotBeforeUpdate
准备废弃：componentWillMount， componentWillReceiveProps, componentWillUpdate.为什么要废弃，因为fiber架构，导致上面的这些生命周期函数在一次加载或更新过程中可能被调用多次，



[为何要在componentDidMount里面发送请求？](https://juejin.im/post/5c70e67f6fb9a049ba42326b)
# 其他
一些概念

纯组件：没有生命周期，不含任何状态的组件
受控组件
非受控组件：