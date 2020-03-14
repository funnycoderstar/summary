## 前言

本周发起了一个100天前端进阶计划，每天一个知识点，搞明白背后的原理，这是第一周的总结，请注意查收。
以面试题的形式看自己本周掌握了多少。

## 目录
- 5道笔试题
- 10道简单题
- 6道算法题

## 笔试题

### 1.下面代码输出什么
```js
// base.js
let count = 0;
setTimeout(() => {
    console.log("base.count", ++count);
}, 500)

module.exports.count = count;

// commonjs.js
const { count } = require('./base');
setTimeout(() => {
     console.log("count is" + count + 'in commonjs');
}, 1000)


// base1.js
let count = 0;
setTimeout(() => {
    console.log("base.count", ++count);
}, 500)
exports const count = count;

// es6.js
import { count } from './base1';
setTimeout(() => {
     console.log("count is" + count + 'in es6');
}, 1000)
```

<details><summary><b>答案</b></summary>
<p>

#### 答案：1,0,1,1
解析：
1. CommonJs模块输出的是一个值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
2. ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的import有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

> 详细分析请看 [《require和import的区别》](https://github.com/funnycoderstar/blog/issues/106)

</p>
</details>

---


### 2.下面代码输出什么
```js
console.log((function() {
    console.log(1);
    setTimeout(function() {
        console.log(2)
    }, 1000)
    setTimeout(function() {
        console.log(3)
    }, 0);
    setTimeout(function() {
        console.log(4)
    }, 0);
    console.log(5)
})());
```
<details><summary><b>答案</b></summary>
<p>

#### 答案：1, 5, undefined, 3, 4, 2


> 详细分析请看 [《setTimeout和requestAnimationFrame》](https://github.com/funnycoderstar/blog/issues/107)

</p>
</details>

---


### 3.下面代码输出什么
```js
console.log((typeof null ));
console.log((typeof []));

console.log((typeof Symbol()));
console.log((typeof 123n) );

function foo() {
    console.log(111);
};
console.log((typeof foo));
```

<details><summary><b>答案</b></summary>
<p>

#### 答案：

- object
- object
- symbol
- bigint
- function

</p>
</details>

---

### 4.下面代码输出什么
```js
function *foo(x) {
    const y = 2 * (yield (x + 1));
    const z = yield (y / 3);
    return (x + y + z);
}

const  a = foo(5);
console.log(a.next());
console.log(a.next());
console.log(a.next());

const b = foo(5);
console.log(b.next());
console.log(b.next(12));
console.log(b.next(13));
```

<details><summary><b>答案</b></summary>
<p>
#### 答案：
  
```js
{ value: 6, done: false }
{ value: NaN, done: false }
{ value: NaN, done: true }
{ value: 6, done: false }
{ value: 8, done: false }
{ value: 42, done: true }
```

解析：
先看使用Generator函数生成的迭代器`a`:
1. 第一次调用next方法，遇到 yield 停止，返回yield表达式的值，此时为 `5 + 1 = 6`;

2. 第二次调用next方法，遇到 yield 停止，返回yield表达式的值，由于next方法没有带参数，上一个yield表达式返回值为`undefined`, 导致`y`的值等于`2*undefined`即(`NaN`），除以 `3` 以后还是`NaN`，因此返回对象的`value`属性也等于`NaN`。

3. 第三次调用next方法，执行的是 `return (x + y + z)`，此时`x`的值为 `5`， `y`的值为 `NaN`, 由于next方法没有带参数，上一个yield表达式返回值为`undefined`，导致z为 undefined，返回对象的 value属性等于`5 + NaN + undefined`,即 NaN


再来看看使用Generator函数生成的迭代器`b`:

1. 第一次调用next方法，遇到 yield 停止，返回yield表达式的值，此时为 `5 + 1 = 6`;

2. 第二次调用next方法，遇到 yield 停止，返回yield表达式的值，由于next方法带有参数`12`，所以上一个yield表达式返回值为`12`, 因此`y`的值等于`2*12`即(`24`），除以 `3` 是`8`，因此返回对象的`value`属性为`8`。

3. 第三次调用next方法，执行的是 `return (x + y + z)`，此时`x`的值为 `5`， `y`的值为 `24`, 由于next方法没有带参数`13`，因此z为`13`，返回对象的 value属性等于`5 + 24 + 13`,即 `42`

> 详细分析请看 [Generator函数详解》](https://github.com/funnycoderstar/blog/issues/104)

</p>
</details>

---


### 5.下面代码输出什么

```js
let z = 1;
function *foo() {
    const x = yield 2;
    z++;
    const y = yield (x * z);
    console.log(x, y, z);
}
const a = foo();
const b = foo();

let val1 = a.next().value;
console.log(val1);

let val2 = b.next().value;
console.log(val2);

val1 = a.next(val2 * 10).value;
console.log(val1);

val2 = b.next(val1 * 5).value;
console.log(val2);

a.next(val2 / 2);

b.next(val1 / 4);

```

<details><summary><b>答案</b></summary>
<p>

#### 答案：
- 2
- 2
- 40
- 600
- 20 300 3
- 200 10 3

解析
1. `*foo()`的两个实例同时启用，两个`next()` 分别从`yield 2` 语句得到`2`

2. `val2 * 10` 也就是`2 * 10`，发送到第一个生成器实例 `a`, 因为x得到的值`20`。`z`从`1`增加到`2`，然后 `20 * 2`通过 `yield`发出，将`val1`设置为`40`

3. `val1 * 5` 也就是 `40 * 5`，发送到第二个生成器实例 `b`，因此x得到的值`200`。`z`再从 `2`递增到`3`，然后 `200*3`通过 `yield` 发出，将`val2`设置为 `600`

4. `val2 / 2` 也就是 `600 / 2` 发动到第一个生成器实例 `a`, 因此 y得到值 `300`， 然后打印出 `x y z` 的值分别为 `20, 300, 3`。

5. `val1 / 4` 也就是 `40 / 4`, 发送到第二个生成器实例 `b`, 因此 `y`得到的值`10`， 然后打印出 `x y z`的值分别为 `200, 10, 3`。

> 详细分析请看 [《Generator函数》](https://github.com/funnycoderstar/blog/issues/104)

</p>
</details>

---

## 简答题

### 1. commonjs模块和ES6模块的区别

<details><summary><b>答案</b></summary>
<p>

  
- CommonJs模块输出的是一个值的拷贝，ES6模块输出的是值的引用。
- CommonJs模块是运行时加载，ES6模块是编译时输出接口。


> 详细分析请看 [《require和import的区别》](https://github.com/funnycoderstar/blog/issues/106)

</p>
</details>

---


### 2. JS有哪几种数据类型


<details><summary><b>答案</b></summary>
<p>
  
JavaScript有八种内置类型
1. 空值（null)
2. 未定义(undefined)
3. 布尔值（boolean)
4. 数字（number)
5. 字符串（string)
6. 对象 (object)
7. 符号（symbol, ES6中新增)
7. 大整数（BigInt, ES2020 引入）

除对象外，其他统称为“基本类型”。

> 注意新增的  `symbol`和 `BigInt`

</p>
</details>

---


### 3. typeof 原理是什么

<details><summary><b>答案</b></summary>
<p>

`typeof`原理： **不同的对象在底层都表示为二进制，在Javascript中二进制前（低）三位存储其类型信息**。
- 000: 对象
- 010: 浮点数
- 100：字符串
- 110： 布尔
- 1： 整数

typeof null 为"object", 原因是因为 不同的对象在底层都表示为二进制，在Javascript中二进制前（低）三位都为0的话会被判断为Object类型，null的二进制表示全为0，自然前三位也是0，所以执行typeof时会返回"object"。

> 关键词：JavaScript数据类型的相关底层机制

</p>
</details>

---

### 4. instanceof 原理是什么，自己可以自定义一个么
<details><summary><b>答案</b></summary>
<p>

`instanceof`的语法：
```js
object instanceof constructor
// 等同于
constructor.prototype.isPrototypeOf(object)
```
- object： 要检测的对象
- constructor：某个构造函数

`instanceof`原理： 检测 `constructor.prototype`是否存在于参数 object的 原型链上。`instanceof` 查找的过程中会遍历`object `的原型链，直到找到 `constructor` 的 `prototype` ,如果查找失败，则会返回`false`，告诉我们，`object` 并非是 `constructor` 的实例。

对象的`Symbol.hasInstance`属性，指向一个内部方法。当其他对象使用`instanceof`运算符，判断是否为该对象的实例时，会调用这个方法。比如，`foo instanceof Foo`在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)。
```js
class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}
[1, 2, 3] instanceof new MyClass() // true
```

> 关键词：instanceof 用法，原型链，`Symbol.hasInstance`。详细分析请查看[《 typeof和instanceof原理》](https://github.com/funnycoderstar/blog/issues/108)

</p>
</details>

---



### 5. setTimeout和setInterval 区别是什么，怎么用 setTimeout实现 setInterval
<details><summary><b>答案</b></summary>
<p>

- setTimeout: 指定延期后调用函数，每次setTimeout计时到后就会去执行，然后执行一段时间后才继续setTimeout,中间就多了误差，（误差多少与代码的执行时间有关）。
- setInterval：以指定周期调用函数，而setInterval则是每次都精确的隔一段时间推入一个事件（但是，事件的执行时间不一定就不准确，还有可能是这个事件还没执行完毕，下一个事件就来了）.

```js
setTimeout(function fn(){
    console.log('我被调用了');
    setTimeout(fn, 100);
},100);
```
> 详细分析请看 [《setTimeout和requestAnimationFrame》](https://github.com/funnycoderstar/blog/issues/107)

</p>
</details>

---


### 6. 怎么理解 `setTimeout(()=> {}, 0)`
<details><summary><b>答案</b></summary>
<p>

执行该语句时，是立即把当前定时器代码推入事件队列，当定时器在事件列表中满足设置的时间值时将传入的函数加入任务队列，之后的执行就交给任务队列负责。但是如果此时任务队列不为空，则需等待，所以执行定时器内代码的时间可能会大于设置的时间。

HTML5标准规定了setTimeout()的第二个参数的最小值（最短间隔）不得低于4毫秒。 当指定的时间低于该时间时，浏览器会用最小允许的时间作为setTimeout的时间间隔，也就是说即使我们把setTimeout的延迟时间设置为0，实际上可能为 4毫秒后才事件推入任务队列。

> 详细分析请看 [《setTimeout和requestAnimationFrame》](https://github.com/funnycoderstar/blog/issues/107)

</p>
</details>

---


### 7. requestAnimationFrame是什么，有什么应用场景， requestIdleCallback是什么，有什么应用场景
<details><summary><b>答案</b></summary>
<p>

- `requestAnimationFrame`是浏览器用于定时循环操作的一个接口，类似于setTimeout，主要用途是按帧对网页进行重绘。
- `requestIdleCallback()`常用来切割长任务，利用空闲时间执行，避免主线程长时间阻塞。

> 详细分析请看 [《setTimeout和requestAnimationFrame》](https://github.com/funnycoderstar/blog/issues/107)
</p>
</details>

---

### 8. for...of 原理是什么?
<details><summary><b>答案</b></summary>
<p>

for...of 不只是用来遍历数组的，只要有`iterator` 接口的数据结构都可以用它来遍历。一个数据结构只要部署了`Symbol.iterator`属性，就被视为具有 `iterator` 接口。`iterator`的实现思想来源于 `单向链表`。

> 关键词：`iterator`, `Symbol.iterator`, 单向链表。详细分析请看 [《for...of原理解析》](https://github.com/funnycoderstar/blog/issues/109)
</p>
</details>

---

### 9. 自己实现一个迭代器?
<details><summary><b>答案</b></summary>
<p>

```js
function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        { 
            value: array[nextIndex++],
            done: false
        } 
        :
        {
            value: undefined,
            done: true
        };
    }
  };
}
const it = makeIterator(['a', 'b']);

it.next() 
// { value: "a", done: false }
it.next() 
// { value: "b", done: false }
it.next() 
// { value: undefined, done: true }
```
</p>
</details>

---


### 10. Gennrator哪些特性决定它可以解决异步?

<details><summary><b>答案</b></summary>
<p>

- 可以`暂停执行（yield）`和`恢复执行(next)`
- `函数体内外的数据交换`(`next`返回值的`value`，是`向外输出`数据，`next`方法的`参数`，是`向内输入`数据)和`错误处理机制`(Generator 函数内部还可以部署错误处理代码，捕获函数体外抛出的错误)

> 更多请查看 [Generator函数详解》](https://github.com/funnycoderstar/blog/issues/104)
</p>
</details>

---


## 算法题
### 1. 买卖股票的最佳时机I
给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。

注意你不能在买入股票前卖出股票。

示例 1:
```js
输入: [7,1,5,3,6,4]
输出: 5
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。
```
示例 2:
```js
输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```
答案： [买卖股票的最佳时机](https://github.com/funnycoderstar/leetcode/issues/57)

### 2. 买卖股票的最佳时机II
给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

示例 1:
```js
输入: [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
```
示例 2:
```js
输入: [1,2,3,4,5]
输出: 4
解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。
     因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
```
示例 3:
```js
输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```
答案： [《买卖股票的最佳时机》](https://github.com/funnycoderstar/leetcode/issues/57)

### 3. 合并两个有序链表
将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 
示例：
```js
输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
```
答案：[合并两个有序链表](https://github.com/funnycoderstar/leetcode/issues/1)
### 4. 最大子序和

给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
示例:
```js

输入: [-2,1,-3,4,-1,2,1,-5,4],
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
```
答案：[最大子序和](https://github.com/funnycoderstar/leetcode/issues/48)

### 5.扑克牌中的顺子

从扑克牌中随机抽5张牌，判断是不是一个顺子，即这5张牌是不是连续的。2～10为数字本身，A为1，J为11，Q为12，K为13，而大、小王为 0 ，可以看成任意数字。A 不能视为 14。

```js
示例 1:
输入: [1,2,3,4,5]
输出: True
 

示例 2:
输入: [0,0,1,2,5]
输出: True
```
限制：
1.数组长度为 5 
2.数组的数取值为 [0, 13] .

答案：[扑克牌中的顺子](https://github.com/funnycoderstar/leetcode/issues/58)

### 6.无重复字符的最长子串

给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:
```js
输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```
示例 2:
```js
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```
示例 3:
```js
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```
答案：[无重复字符的最长子串](https://github.com/funnycoderstar/leetcode/issues/32)
## 碎碎念

最新发起了一个100天前端进阶计划，致力于弄明白每个知识点背后的原理。这是第一周的总结，本来想直接粘贴一下原先的标题并附上原文链接。后来想还是找几道关于本周内容的一些面试题（大部分为原文中的例子），方便检测一下自己的掌握程度。一共20道，看看自己能得几分。算法题做多要在半个小时之内写出最优解，上面提供的答案并一定是最好的，如果有问题或者更好的解法欢迎大家留言指出。或者你最新碰到的类似的面试题，也可以提供给我进行补充。

其实很多知识点都可以各种各样的关系联系起来，比如



## 其他
最近发起了一个100天前端进阶计划，主要是深挖每个知识点背后的原理，欢迎关注 微信公众号「牧码的星星」，我们一起学习，打卡100天。

![牧码的星星](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1583655092168.png)



