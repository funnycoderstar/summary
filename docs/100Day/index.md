
## 7. class + 有序数组转成二叉搜索树


最近发起了个100天前端进阶计划，每天一个知识点背后的原理加一道算法题。第7天的内容：《class》+ 《有序数组转成二叉搜索树》
简单总结一下：
class:
1. class是一个语法糖，底层其实就是 ES5的构造函数。静态方法和静态属性都是类上面的，不会被实例继承。
2. class使用 extend来继承。es5 的构造函数在调用父构造函数前可以访问 this, 但 es6 的构造函数在调用父构造函数(即 super)前不能访问 this。
3. super: 作为函数调用，代表父类的构造函数。作为对象调用，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

有序数组转成二叉搜索树：
1.如果nums长度为0，返回null 2.如果nums长度为1，返回一个节点 3.如果nums长度大于1，首先以中点作为根节点，然后将两边的数组作为左右子树。




## 8. 装饰器 + 路径总和

最近发起了个100天前端进阶计划，每天一个知识点背后的原理加一道算法题。今天是第8天，《装饰器》+ 《路径总和》
简单总结一下：
装饰器：https://juejin.im/post/5e683e11518825495e105de6
装饰器(Decorator)用来注释或修改类和类的方法，依赖于ES5的Object.defineProperty 方法。写成 @ + 函数名。可以起到注释，类型检查的作用。
装饰器只能用于类和类的方法，不能用于函数，因为存在函数提升。
路径总和：
利用递归，遍历整棵树：1. 如果当前节点不是叶子，对它的所有孩子节点，递归调用 hasPathSum 函数，其中 sum 值减去当前节点的值；2.如果当前节点是叶子，检查 sum 值是否为当前节点的值，也就是是否找到了给定的目标和。

## 8. 简单通俗理解Vue3.0中的Proxy + 两句话中不常见的单词
最近发起了个100天前端进阶计划，每天一个知识点背后的原理加一道算法题。今天是第9天，《简单通俗理解Vue3.0中的Proxy》+ 《路径总和》

简单总结一下：
简单通俗理解Vue3.0中的Proxy: 




## 题目
### JS题目
- 实现 sleep(5).then(console.log), sleep(4), sleep(5).then(console.log); 执行.then的时候才输出，执行sleep函数的时候不输出
- 实现一个发布订阅模式和观察者模式
- 实现一个Promise.all
- 手写call/apply/bind
- 手写函数防抖和节流
- 实现一个 iterator
- 实现一个 async函数（gernerator + promise版本）
- 实现一个 new
- 手写两列布局和三列布局（你知道的所有）
- 手写深拷贝和浅拷贝

### 经典算法题目
- 实现随机抽奖程序 接受一个数组 arr, n , 从数组中抽出n个人
- 斐波那契数列
- 不使用新的变量交换两个变量的值

##  实现 sleep(5).then(console.log), sleep(4), sleep(5).then(console.log); 执行.then的时候才输出，执行sleep函数的时候不输出

```js
let count = 0;
function sleep(s) {
    count += s;
    return {
        then: () => {
            setTimeout(() => console.log(s), count * 1000)
        }
    }
}

sleep(3).then();
sleep(4);
sleep(5).then();
```

##  实现一个发布订阅模式和观察者模式

- [观察者模式和发布订阅模式有什么不同？](https://www.zhihu.com/question/23486749)
- [观察者模式 vs 发布-订阅模式](https://juejin.im/post/5a14e9edf265da4312808d86)



## 实现一个Promise.all

### Promise.all的特点：
- 1. Promise.all方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。
- 2. 返回值组成一个数组
- 3. p1、p2、p3中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

```js
   static all(promises) {
        return new Promise((resolve, reject) => {
            let promiseCount = 0;
            let promisesLength = promises.length;
            let result = [];
            for(let i = 0; i < promises.length; i++) {
                // promises[i]可能不是Promise类型，可能不存在then方法，中间如果出错,直接返回错误
                Promise.resolve(promises[i])
                    .then(res => {
                        promiseCount++;
                        // 注意这是赋值应该用下标去赋值而不是用push，因为毕竟是异步的，哪个promise先完成还不一定
                        result[i] = res;
                        if(promiseCount === promisesLength) {
                        return resolve(result);
                        }
                    },(err) => {
                        return reject(err);
                    }
                )
            }
        })
    }
```

## 手写call/apply/bind

实现一个call：
- 如果不指定this，则默认指向window
- 将函数设置为对象的属性
- 指定this到函数并传入给定参数执行函数
- 执行&删除这个函数，返回函数执行结果

```js
Function.prototype.myCall = function(thisArg = window) {
    // thisArg.fn 指向当前函数 fn (fn.myCall)
    thisArg.fn = this;
    // 第一个参数为 this，所以要取剩下的参数
    const args = [...arguments].slice(1);
    // 执行函数
    const result = thisArg.fn(...args);
    // thisArg上并不存在fn，所以需要移除
    delete thisArg.fn;
    return result;
}

function foo() {
    console.log(this.name);
}
const obj = {
    name: 'litterStar'
}
const bar = function() {
    foo.myCall(obj);
}
bar();
// litterStar
```
实现一个apply
过程很call类似，只是参数不同，不再赘述

```js
Function.prototype.myApply = function(thisArg = window) {
    thisArg.fn = this;
    let result;
    // 判断是否有第二个参数
    if(arguments[1]) {
        // apply方法调用的时候第二个参数是数组，所以要展开arguments[1]之后再传入函数
        result = thisArg.fn(...arguments[1]);
    } else {
        result = thisArg.fn();
    }
    delete thisArg.fn;
    return result;
}
```


实现一个bind

MDN上的解释：bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

```js
Function.prototype.myBind = function(thisArg) {
    // 保存当前函数的this
    const fn = this;
    // 保存原先的参数
    const args = [...arguments].slice(1);
    // 返回一个新的函数
    return function() {
        // 再次获取新的参数
        const newArgs = [...arguments];
        /**
         * 1.修改当前函数的this为thisArg
         * 2.将多次传入的参数一次性传入函数中
        */
        return fn.apply(thisArg, args.concat(newArgs))
    }
}

const obj1 = {
    name: 'litterStar',
    getName() {
        console.log(this.name)
    }
}
const obj2 = {
    name: 'luckyStar'
}

const fn = obj1.getName.myBind(obj2)
fn(); // luckyStar
```

## 手写函数防抖和节流

### 函数防抖(debounce)
防抖：不管事件触发频率多高，一定**在事件触发 n 秒后才执行**，如果在一个事件执行的 n秒内又触发了这个事件，就以新的事件的时间为准，n秒后才执行，总之，触发完事件 n 秒内不再触发事件，n秒后再执行。

思路：
1. 返回一个函数； 
2. 每次触发事件时都取消之前的定时器

需要注意问题：
1. this指向
2. 参数的传递 
3. 是否要立即调用一次

```js
function debounce(fn, wait, immediate) {
    let timer = null;
    //  返回一个函数
    return function(...args) {
        // 每次触发事件时都取消之前的定时器
        clearTimeout(timer);
        // 判断是否要立即执行一次
        if(immediate && !timer) {
            fn.apply(this, args);
        }
        // setTimeout中使用箭头函数，就是让 this指向 返回的该闭包函数，而不是 debounce函数的调用者
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}
```
通过闭包保存一个标记(timer)来保存setTimeout返回的值, 每当要触发函数的时候, 需要先把上一个setTimeout清除掉, 然后再创建一个新的setTimeout, 这样就能保证执行函数后的 wait 间隔内如果还要触发函数, 就不会执行fn

### 使用场景
1. 监听resize或scroll，执行一些业务处理逻辑
```js
window.addEventListener('resize', debounce(handleResize, 200));
window.addEventListener('scroll', debounce(handleScroll, 200));
```
window 的 resize、scroll， mousedown、mousemove， keyup、keydown等高频触发的事件

2. 搜索输入框，在输入后200毫秒搜索
```js
debounce(fetchSearchData, 200);
```
可以这样去理解记忆：函数防抖是 **在事件触发 n 秒后才执行**，在监听  scroll事件和 resize 事件时，只要 n 秒后才执行一次就可以了，不需要每次只要一触发 `scroll`或 `resize`的时候就执行，n秒内的执行是没有意义的(用户可能都感受不到，而且很容易造成卡顿)。

## 函数节流(throttle)
函数节流：不管事件触发频率有多高，只在单位时间内执行一次。

有两种思路实现： 使用时间戳和定时器

### 使用时间戳

```js
function throttle(fn, wait)  {
    // 记录上一次执行的时间戳
    let previous = 0;
    return function(...args) {
        // 当前的时间戳，然后减去之前的时间戳，大于设置的时间间隔，就执行函数，否则不执行
        if(Date.now() - previous > wait) {
            // 更新上一次的时间戳为当前时间戳
            previous = Date.now();
            fn.apply(this, args);
        }
    }
}
```
第一次事件肯定触发，最后一次不会触发(比如说监听 onmousemove，则鼠标停止移动时，立即停止触发事件)

### 使用定时器
```js
function throttle(fn, wait)  {
    // 设置一个定时器
    let timer = null;
    return function(...args) {
        // 判断如果定时器不存在就执行，存在则不执行
        if(!timer) {
            // 设置下一个定时器
            timer = setTimeout(() => {
                // 然后执行函数，清空定时器
                timer = null;
                fn.apply(this, args)
            }, wait)
        }
    }
}
```
第一次事件不会触发(fn是放在 setTimeout中执行的，所以第一次触发事件至少等待 wait 毫秒之后才执行)，最后一次一定触发

### 定时器和时间戳结合

两者结合可以实现，第一次事件会触发，最后一次事件也会触发
```js
function throttle(fn, wait)  {
    // 记录上一次执行的时间戳
    let previous = 0;
    // 设置一个定时器
    let timer = null;
    return function(...args) {
        // 当前的时间戳，然后减去之前的时间戳，大于设置的时间间隔
        if(Date.now() - previous > wait) {
            clearTimeout(timer);
            timer = null
            // 更新上一次的时间戳为当前时间戳
            previous = Date.now();
            fn.apply(this, args);
        } else if(!timer) {
            // 设置下一个定时器
            timer = setTimeout(() => {
                timer = null;
                fn.apply(this, args)
            }, wait)
        }
    }
}
```


## 实现一个 iterator
```js
function makeIterator(array) {
   let nextIndex = 0;
   return {
      next: function() {
         return nextIndex < array.length ?  {
            value: array[nextIndex++];
            done:false,
         }
         : {
            value: undefined,
            done: true,
         }

      },

   }
}
```
## 实现一个 async函数（gernerator + promise版本）
```js

```
## 实现一个 new

```js

```

------

## 实现随机抽奖程序 接受一个数组 arr, n , 从数组中抽出n个人

代码一：
按照我们正常的抽奖的最简单做法，一般是把工号写到一个球上面，摇 n 次，然后每次摇出1个号，该号码即为中奖号码，同时将该球拿出去，重复 n 次。
```js
function foo(arr, n) {
    const result = [];
    let i = 0;
    while( i < n) {
        // 每次从数组中随机抽出一个值，使用 slice将该值从原数组数组中删除，将该值添加到 result中
        const value = arr.splice(Math.floor(Math.random() * arr.length), 1)
        result.push(value[0]);
        i++;
    }
    return result;
}
```

代码二：
还有一种思路是将数组打乱，直接截取 前 n 个数。就是著名的 洗牌算法。

打乱数组（洗牌算法）：从最后一个元素开始，从数组中随机选出一个位置，交换，直到第一个元素。
```js
function disorder(array) {
    const length = array.length;
    let current = length - 1;
    let random;
    while(current > -1) {
        random = Math.floor(length * Math.random());
        // 数组的每个值都会和另外一个随机位置的值交换位置
        // 使用数组的解构赋值，交换数组中的两个元素的位置
        [array[current], array[random]] = [array[random], array[current]];
        current--;
    }
    return array;
}
```

```js
const arr1 = disorder(arr);
arr1.slice(0, n)
```

具体的可以查看下面几篇文章

-  [神一样的随机算法](https://mp.weixin.qq.com/s?__biz=MzU4NTIxODYwMQ==&mid=2247484310&idx=1&sn=916f92afff6016256648cfb3c7fd83e7&chksm=fd8cacd0cafb25c670587f22524b111d74b4ddd9954070930b6ef6efb1bd8fba13d4250e57d8&token=885428195&lang=zh_CN#rd)
-  [JS中随机排列数组顺序（经典洗牌算法）和数组的排序方法](https://zhuanlan.zhihu.com/p/27589512)


## 斐波那契数列

### 1.暴力递归
```js
/**
 * @param {number} N
 * @return {number}
 */
var fib = function(N) {
    // N小于等于1，则直接返回 N
    f (N <= 1) {
        return N;
    }
    // 通过递归关系调用自身
    return fib(N-1) + fib(N-2);
};
```
- 时间复杂度：O(2^n)。这是计算斐波那契数最慢的方法。因为它需要指数的时间。
- 空间复杂度：O(N)，在堆栈中我们需要与 N 成正比的空间大小。该堆栈跟踪 fib(N) 的函数调用，随着堆栈的不断增长如果没有足够的内存则会导致 栈溢出。

### 2. 递归加缓存
```js
let cache = {
    0: 0,
    1: 1,
}
function fib(N) {
    return typeof cache[N] === 'number' ? cache[N] : cache[N] = fib(N - 1) + fib(N - 2);
}
```
- 时间复杂度：O(N)O(N)。
- 空间复杂度：O(N)O(N)，使用了空间大小为 N 的数组。
### 3. 动态规划

使用 dp数组
```js
function Fibonacci(n) {
    const dp = [0, 1];
    for(let i = 2; i <= n; i++) {
        dp[i] = dp[i -1] + dp[i-2];
    }
    return dp[n];
}
```
优化空间复杂度，使用数组存储没有必要
```js
function fib(n) {
    if(n < 2) {
        return n;
    }
    let i =  1;
    let pre = 0;
    let cur = 1;
    let result = 0;
    while(i++ < n) {
         result = pre + cur;
         pre = cur;
         cur = result;
    }
    return result;
}
```

## 不使用新的变量交换两个变量的值

### 1. 算数交换
针对的是Number，或者类型可以转换成数字的变量类型
```js
 function swap(a, b) {
    a = a + b;
    b = a - b;
    a = a - b;
 }
```
通过算术运算过程中的技巧，可以巧妙地将两个值进行互换。但是，有个缺点就是变量数据溢出。因为JavaScript能存储数字的精度范围是 -2^53 到 2^53。所以，加法运算，会存在溢出的问题。

### 2. 异或
^ 按位异或 若参加运算的两个二进制位值相同则为0，否则为1 此算法能够实现是由异或运算的特点决定的，通过异或运算能够使数据中的某些位翻转，其他位不变。这就意味着任意一个数与任意一个给定的值连续异或两次，值不变.

```js
a = a ^ b;
b = a ^ b; 
a = a ^ b;
```

### 3. ES6的解构
```js
[a, b] = [b , a]
```