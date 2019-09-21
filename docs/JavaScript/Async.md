## 谈谈对 async/await 的理解，async/await 的实现原理是什么?
async/await是Generator的语法糖，使得异步操作变得更加方便，
一比较就会发现，async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。

**async函数的实现原理，就是将 Generator函数和自动执行器，包含在一个函数里**
asyn函数对Generator函数的改进，体现在一下四点。
1. 内置执行器
函数调用之后，会自动执行
2. 更好的语义
async和await,比起(*)和yield,语义更加清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果
3. 更广的适用性
co模块约定， yield命令后面只能是Thunk函数或者Promise对象，而async函数的await命令后面，可以是Promise对象和原始类型的值（数值，字符串，布尔值，但这时会自动转成立即resolved的Promise对象
4. 返回值是Promise
async函数的返回值是Promise对象，这比Generator函数的返回值Iterator对象方便多了，你可以用then方法指定下一步操作；

## 使用 async/await 需要注意什么？
1. await命令后面的Promise对象，运行结果可能是rejected, 此时等同于async函数返回的Promise对象被reject。因此需要加上错误处理,可以给每一个await后的Promise增加catch方法；也可以将await的代码放到 `try ... catch`中
2. 多个await命令后面的异步操作， 如果不存在继发关系，最好让它们同时触发
```js
/下面两种写法都可以同时触发
//法一
async function f1() {
    await Promise.all([
        new Promise((resolve) => {
            setTimeout(resolve, 600);
        }),
        new Promise((resolve) => {
            setTimeout(resolve, 600);
        })
    ])
}
//法二
async function f2() {
    let fn1 = new Promise((resolve) => {
            setTimeout(resolve, 800);
        });
    
    let fn2 = new Promise((resolve) => {
            setTimeout(resolve, 800);
        })
    await fn1;
    await fn2;
}

```
3. await命令只能用在async函数之中，如果用在普通函数，就会报错

## ，Promise.all的地方用async怎么写
```js
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = await Promise.all(promises);
  console.log(results);
}

// 或者使用下面的写法

async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = [];
  for (let promise of promises) {
    results.push(await promise);
  }
  console.log(results);
}
```

## 实现一个sleep
```js

async function sleep(ms) {
    await new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}
(async function() {
    console.log(111);
    await sleep(1000);
    console.log(222);
    await sleep(1000);
    console.log(333);
})()
```
