## 浏览器和Node事件循环的区别

Node10一下是和浏览器有区别的, Node11以上, 浏览器和Node的事件循环就保持一致了
```js
function test () {
   console.log('start')
    setTimeout(() => {
        console.log('children2')
        Promise.resolve().then(() => {console.log('children2-1')})
    }, 0)   
    setTimeout(() => {
        console.log('children3')
        Promise.resolve().then(() => {console.log('children3-1')})
    }, 0)
    Promise.resolve().then(() => {console.log('children1')})
    console.log('end') 
}

test()

// 以上代码在node11以下版本的执行结果(先执行所有的宏任务，再执行微任务)
// start
// end
// children1
// children2
// children3
// children2-1
// children3-1

// 以上代码在node11及浏览器的执行结果(顺序执行宏任务和微任务)
// start
// end
// children1
// children2
// children2-1
// children3
// children3-1
```
Promise.nextTick和Promise的回调函数，追加在本轮循环，即同步任务一旦完成，就开始执行他们；
而setTimeout， setInterval，setImmediate的回调函数，追加在次轮循环

JS事件分为同步和异步，异步认为宏任务和微任务

肯定会先执行同步任务，所以前两个会先输出 `start`， `end`


第一个setTimeout开启一个宏任务1，第二个setTimeout开启一个宏任务2，但没有宏任务可以执行

`Promise.resolve().then(() => {console.log('children1')})`开启一个微任务，立即执行，输出 `children1`,因为是追加在本轮循环的，且在同步任务后立即执行

接下来就有所不同了
### Node11之前的是执行完所有宏任务，再执行所有微任务

1. <b>执行一个宏任务: 执行 宏任务1，</b>
```js
setTimeout(() => {
        console.log('children2')
        Promise.resolve().then(() => {console.log('children2-1')})
}, 0)  
```
输出 `children2`, 
同时开启一个微任务1

2. <b>执行一个宏任务: 执行 宏任务2，</b>
```js
setTimeout(() => {
        console.log('children3')
        Promise.resolve().then(() => {console.log('children3-1')})
}, 0)  
```
输出 `children3`, 
同时开启一个微任务1

3. <b>执行一个微任务: 宏任务执行完成，开始执行微任务1</b>：立即执行`children2-1'`

4. <b>执行一个微任务:  开始执行微任务2</b>：立即执行`children3-1'`

所以最后结果为
```js
// 以上代码在node11及浏览器的执行结果(顺序执行宏任务和微任务)
start
end
children1
children2
children3
children2-1
children3-1
```

### 浏览器和Node11都是先执行一个宏任务，再清空所有的微任务，再执行一个宏任务，再清空一个微任务......

1. <b>执行一个宏任务: 执行 宏任务1</b>
```js
setTimeout(() => {
        console.log('children2')
        Promise.resolve().then(() => {console.log('children2-1')})
}, 0)  
```
输出 `children2`, 
同时开启一个微任务1

2. <b>执行一个微任务: 宏任务1执行完成，开始执行微任务1</b>：立即执行`children2-1'`

3. <b>执行一个宏任务: 执行 宏任务2，</b>
```js
setTimeout(() => {
        console.log('children3')
        Promise.resolve().then(() => {console.log('children3-1')})
}, 0)  
```
输出 `children3`, 
同时开启一个微任务1

4. <b>执行一个微任务: 宏任务2执行完成，开始执行微任务2</b>：立即执行`children3-1'`

所以最后结果为
```js
// 以上代码在node11及浏览器的执行结果(顺序执行宏任务和微任务)
start
end
children1
children2
children2-1
children3
children3-1
```


## 浏览器的事件循环
- 1.执行一个宏任务, 比如setTimeout, setInterval, script, I/O, 页面渲染
- 2.执行完微任务, 比如promise.resolve(), process.nextTick()

## Node的事件循环
1.执行完一个阶段的所有任务
2.执行完nextTick队列里面的内容
2.然后执行完微任务队列的内容

## Node的事件循环是libuv实现的

![libuv](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1554106811355.png?width=750&height=679&imageView2/3/)

Javascript是单线程运行, 异步操作很重要.libuv这个库负责各种回调函数的执行时间, 毕竟异步任务最后还是要回到主线程,一个个排队执行

每一轮的事件循环, 分成六个阶段,这些阶段会依次执行
1. timers(定时器): 本阶段已经安排的`setTimeout()`和`setInterval()`的回调函数

2. I/O callbacks: 
除了以下的操作函数, 其他的回调函数都在这个阶段执行.
- setTimeout()和 setInterval()的回调函数
- setImmediate()的回调函数
- 用于关闭请求的回调函数, 比如`socket.on('close', ...)`

3. idle(空闲), prepare: 该阶段只供libuv内容调用, 这里可以忽略
4. poll(轮询): 
轮询时间, 用于等待还未返回的 I/O事件, 比如服务器的响应, 用户移动鼠标等等;
这个阶段的时间会比较长, 如果没有其他异步任务要处理(比如到时的定时器),会一直停留在这个阶段, 等到 I/O 请求返回结果
5. check: 该阶段执行`setImmediate()`的回调函数
6. close callbacks: 改阶段执行关闭请求的回调函数, 比如`socket.on('close', ...)`


## JS实现异步的原理

### 1.线程和进程

Javascript是单线程的
一个进程包括很多个线程

### 2.多进程和多线程


## 参考
[Node 定时器详解](http://www.ruanyifeng.com/blog/2018/02/node-event-loop.html)
[浏览器和Node 事件循环的区别](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/26)
[浏览器与Node的事件循环(Event Loop)有何区别?](https://juejin.im/post/5c337ae06fb9a049bc4cd218#heading-12)
