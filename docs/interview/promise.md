## 目录
- Promise内部实现原理
- async函数的实现原理
- Generator

13. Promise内部实现原理, 手写Promise实现, Promise实现原理, 一句话概述什么是 promise; promise解决了什么问题;在没有 promise 之前，怎么解决异步回调; 自己实现一个promise
## Promise.prototype.then()
作用： 为 Promise 实例添加状态改变时的回调函数
## Promise.prototype.catch()
用于指定发生错误时的回调函数。
## Promise.prototype.finally() 
finally 方法用于指定 不管 Promise 对象最后如何，都会执行的操作。

finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。


```js
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```
##  Promise.all()
```js
const p = Promise.all([p1, p2, p3]);
```
上面代码中，Promise.all方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。（Promise.all方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。）

## Promise.race()
```js
const p = Promise.race([p1, p2, p3]);
```
上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

## Promise.resolve()
有时需要将现有对象转为 Promise 对象， Promise.resolve 方法就起到这个作用。

如果希望得到一个 Promise 对象，比较方便的方法就是直接调用 promise.resolve() 方法;
## Promise.try()
```js
const f = () => console.log('now');
Promise.resolve().then(f);
console.log('next');
// next
// now
```
那么有没有一种方法，让同步函数同步执行，异步函数异步执行，并且让它们具有统一的 API 呢？
```js
const f = () => console.log('now');
Promise.try(f);
console.log('next');
// now
// next
```
Promise.prototype.catch()

## 需要注意的点
1. 调用 resolve 和reject并不会终结 Promise 的参数函数的执行
```js
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
```
上面代码中，调用resolve(1)以后，后面的console.log(2)还是会执行，并且会首先打印出来。这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。

2. Promise新建之后就会立即执行
```js
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```

3.  Promise 的状态一旦改变，就永久保持该状态，不会再变了

已经变成 resolved ,再抛出错误是无效的。
```js
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok
```

4. Promise ”会吃掉错误“
```js
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});

setTimeout(() => { console.log(123) }, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123
```
上面代码中，someAsyncThing函数产生的 Promise 对象，内部有语法错误。浏览器运行到这一行，会打印出错误提示ReferenceError: x is not defined，但是不会退出进程、终止脚本执行，2 秒之后还是会输出123。这就是说，Promise 内部的错误不会影响到 Promise 外部的代码.

5. Promise.resolve(),是在本轮”事件循环“的结束时执行，而不是下一轮”事件循环“的开始时
```js
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');

// one
// two
// three
```
上面代码中， `setTimeout(fn, 0)`在下一轮”事件循环“开始时执行， `Promise.resolve()` 在本轮"事件循环"结束时执行，`console.log('one')`则是立即执行，因此最先输出。

6. Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。这一点与Promise.resolve方法不一致。

```js
const thenable = {
  then(resolve, reject) {
    reject('出错了');
  }
};

Promise.reject(thenable)
.catch(e => {
  console.log(e === thenable)
})
// true
```
上面代码中，Promise.reject方法的参数是一个thenable对象，执行以后，后面catch方法的参数不是reject抛出的“出错了”这个字符串，而是thenable对象。
47. async和await实现原理: 基于generator实现的，generator又是基于promise实现的



48. 说一下你对generator的了解？


## for of 循环

## Generator 函数的异步应用


### 基于 Promise 对象的自动执行
```js
var fs = require('fs');

var readFile = function (filename) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, function(error, data) {
            if(error) {
                return reject(error);
            }
            resolve(data);
        })
    })
};

var gen = function* () {
    var f1 = yield readFile('/etc/fstab');
    var f2 = yield readFile('/etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
};

var g = gen();

g.next().value.then(function(data) {
    g.next(data).value.then(function(data) {
        g.next(data);
    })
})
```
手动执行就是用 then 方法， 层层添加回调函数，理解这一点，就可以写出一个自执行器。
```js
function run(gen) {
    var g = gen();

    function next(data) {
        var result = g.next(data);
        if(result.done) {
            return result.value;
        }
        result.value.then(function(data) {
            next(data);
        })
    }
    next();
}
run(gen);
```
上面代码中，只要Generator 函数 还没执行到最后一步，next就调用自身，以此实现自动执行。
```js
function co(gen) {
    var ctx = this;
    return new Promise(function(resolve, reject) {
        if(typeof gen === 'function') {
            gen = gen.call(ctx);
        }
        if(!gen || typeof gen.next !== 'function') {
            return resolve(gen);
        }
        onFulfilled();
        function onFulfilled(res) {
            var ret;
            try {
                ret = gen.next(res);
            } catch(e) {
                return reject(e);
            }
            next(ret);
        }
        function next(ret) {
            if(ret.done) {
                return resolve(ret.value);
            }
            var value = toPromise.call(ctx, ret.value);
            if(value && isPromise(value)) {
                return value.then(onFulfilled, onRejected);
            }
            return onRejected(
                new TypeError(
                    'You may only yield a function, promise, generator, array, or object, '
                    + 'but the following object was passed: "'
                    + String(ret.value)
                    + '"'
                )
            )
        }
    })
}
```