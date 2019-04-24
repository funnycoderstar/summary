## JS异步解决方案的发展历程以及优缺点
JavaScript在发展过程中，共经历了回调函数，Promise对象，Generator函数， async函数来处理异步；

## 1. 回调函数
缺点: 回调地狱，不能用try catch捕获错误，不能return；
回调地狱的根本问题在于：
- 缺乏顺序性：回调地狱导致的调试困难，和大脑的思维方式不符
- 嵌套函数存在耦合性，一旦有所改动，就会牵一发而动全身
- 嵌套函数过多的话，很难处理错误
```js
ajax('XXX1', () => {
    // callback 函数体
    ajax('XXX2', () => {
        // callback 函数体
        ajax('XXX3', () => {
            // callback 函数体
        })
    })
})
```
优点: 解决了同步问题
## 2. promise

promise就是为了解决callback的问题而产生的
promise实现了链式调用，也就是每次then后返回的都是一个全新的Promise,如果我们在then中return, return的结果会被Promise.resolve()包装
优点：解决了回调地狱的问题
```js
ajax('XXX1')
  .then(res => {
      // 操作逻辑
      return ajax('XXX2')
  }).then(res => {
      // 操作逻辑
      return ajax('XXX3')
  }).then(res => {
      // 操作逻辑
  })
```
缺点：无法取消Promise,错误需要通过回调函数来捕获，

## 3. Generator
特点：可以控制函数的执行，可以配合 co 函数库使用
```js
function *fetch() {
    yield ajax('XXX1', () => {})
    yield ajax('XXX2', () => {})
    yield ajax('XXX3', () => {})
}
let it = fetch()
let result1 = it.next()
let result2 = it.next()
let result3 = it.next()
```
## 4. Async/await

async,await是异步的终极解决方案
优点：代码清晰，不用像Promise写一大堆 then链， 处理了回调地狱的问题
缺点：await将异步代码改造成同步代码，如果多个异步操作没有依赖性而是用await会导致性能上的降低


## 参考
https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/11



