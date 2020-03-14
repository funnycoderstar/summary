## React 为什么要引入 Fiber 架构，是为了解决什么问题？ 是怎么实现的?

React Fiber 是对核心算法的一次重新实现。

### 为什么要引入？
V15版本的局限
V15， React中，更新过程是同步的，这可能会导致性能问题。
因为 JavaScript 单线程的特点，每个同步任务不能耗时太长，不然就会让程序不会对其他输入做出响应，React的更新过程就是犯了这些禁忌。而React Fiber就是要改变现状。
### React Fiber的方式
破解 JavaScript中同步操作时间过长的方法其实很简单 -- 分片。
把一个耗时的任务分成很多小片，每一个小片的运行时间很短

Fiber在调度的时候会执行如下流程：
1. 将一个state 更新需要执行的同步任务拆分成一个Fiber任务队列
2. 在任务队列中选出优先级高的Fiber执行，如果执行时间超过了 deathLine, 则设置为 pending 状态挂起状态
3. 一个Fiber执行结束或挂起，会调用基于 requestIdleCallback/requestAnimationFrame实现的调度器，返回一个新的Fiber任务队列继续先进性上述过程。

requestIdleCallback会让一个低优先级的任务在空闲期被调用，而requestAnimationFrame会让一个高优先级的任务在下一个栈帧被调用，从而保证了主线程按照优先级执行Fiber单元。
不同类型的任务会被分配不同的优先级，以下是关于优先级的定义：
```js
module.exports = {  
  NoWork: 0, // No work is pending.
  SynchronousPriority: 1, // For controlled text inputs. 
  TaskPriority: 2, // Completes at the end of the current tick.
  AnimationPriority: 3, // Needs to complete before the next frame.
  HighPriority: 4, // Interaction that needs to complete pretty soon to feel responsive.
  LowPriority: 5, // Data fetching, or result from updating stores.
  OffscreenPriority: 6, // Won't be visible but do the work in case it becomes visible.
};
```
由此我们可以看出Fiber任务的优先级顺序为：

文本框输入 > 本次调度结束需完成的任务 > 动画过渡 > 交互反馈 > 数据更新 > 不会显示但以防将来会显示的任务
### 为什么叫 Fiber


### React Fiber对现有代码的影响

在React Fiber中，一次更新过程会分成多个分片完成，所以完全有可能一个更新任务还没有完成，就被另一个更好优先级的更新过程打断，这时候，优先级高的更新任务会优先处理完，而低优先级的更新任务所做的工作则会完全作废，然后等待机会重头再来。
因为一个更新过程可能被打断，所以React Fiber 一个更新过程被分为两个阶段：第一个阶段 调度阶段（Reconciliation Phase）和第二阶段渲染阶段（Commit Phase）。
所以React Fiber会找出需要更新哪些DOM，这个阶段是可以被打断的；但是到了第二阶段，那就一鼓作气把DOM更新完，绝不会被打断。




## 参考

- [浅谈React 16中的Fiber机制](https://tech.youzan.com/react-fiber/)
- [React Fiber是什么](https://zhuanlan.zhihu.com/p/26027085)