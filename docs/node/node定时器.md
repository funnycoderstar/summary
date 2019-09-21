
## 简介

javascript是单线程运行的

```js
setTimeout()
setInterval()
setImmediate()
process.nextTick()
```
前两个是语言的标准,后两个是node独有
执行一下代码
```js
setTimeout(()=> {
    console.log(1);
});
setImmediate(() => {
    console.log(2);
})
process.nextTick(() => {
    console.log(3);
});

Promise.resolve().then(()=> {
    console.log(4);
});
(() => {
    console.log(5);
})();

```
执行结果
```
5
3
4
1
2

```
### 1.同步任务与异步任务
同步代码比异步代码会先执行;
只有最后一行代码是同步执行
```
(() => {
    console.log(5);
})();
```
### 2.本轮循环与次轮循环
异步任务分两种
- 追加在本轮循环的异步任务
- 追加在次轮循环的异步任务

node对象, process.nextTick和promise的回调函数,追加在本轮循环,即同步任务一旦执行完成,就开始执行他们;
setTimeout, setInterval, setImmediate的回调,是加在次轮循环

```js
// 下面两行是加在次轮循环的
setTimeout(()=> {
    console.log(1);
});
setImmediate(() => {
    console.log(2);
})
// 下面两行是加在本轮循环的
process.nextTick(() => {
    console.log(3);
});

Promise.resolve().then(()=> {
    console.log(4);
});
```
### 3.process.nextTick()
本轮循环执行, 而且是所有异步任务执行最快的

Node执行完所有同步任务,接下来就会执行process.nextTick的任务队列
```js
process.nextTick(() => {
    console.log(3);
});
```
如果你希望异步任务尽快地执行,那就使用process.nextTick();
### 4.微任务

promise对象的回调函数,会进入异步任务里面的'微任务'队列
微任务追加在process.nextTick队列后面,也属于本轮循环

所以下面的代码总是先输出3 ,再输出4
```js
process.nextTick(() => {
    console.log(3);
});

Promise.resolve().then(()=> {
    console.log(4);
});
```
只有前一个队列全部清空之后,才会执行下一个队列
```js
process.nextTick(() => console.log(1));
Promise.resolve().then(() => console.log(2));
process.nextTick(() => console.log(3));
Promise.resolve().then(() => console.log(4));
// 1
// 3
// 2
// 4
```
全部process.nextTick的回调函数,执行 都早于Promise的

本轮循环的执行顺序

## 参考
[Node 定时器详解](http://www.ruanyifeng.com/blog/2018/02/node-event-loop.html)