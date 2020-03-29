
三行代码实现 add(1)(2)(3)
## 前言
本文主要从 3W (what, how, why) 角度出发通俗易懂的解释一下 什么是函数柯里化，以及怎么用三行代码来实现 `add(1)(2)(3)` 这个很常见的面试题。

## 什么是函数柯里化（curry）
函数柯里化（curry）是函数式编程里面的概念。curry的概念很简单：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。

简单点来说就是：每次调用函数时，它只接受一部分参数，并返回一个函数，直到传递所有参数为止。

举个🌰
将下面接受两个参数的函数改为接受一个参数的函数。

```js
const add = (x, y) => x + y;
add(1, 2);
```
改成每次只接受一个参数的函数

```js
const add = x => y => x + y;
add(1)(2);
```

> 柯里化，不可变数据类型，纯函数等都是函数式编程中的概念。在React中这些概念很常见，因为React中很多涉及到函数式编程的概念。想要具体了解什么是函数式编程，可以查看 [JS函数式编程指南](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)

## add(1)(2)(3)

我们可以自己先尝试写一个add(1)(2)(3)

```js
const add = x => y => z => x + y + z;
console.log(add(1)(2)(3));
```
看起来并不是那么难，但是如果面试官的要求是实现一个add 函数，同时支持下面这几种的用法呢
```js
add(1, 2, 3);
add(1, 2)(3);
add(1)(2, 3);
```
如果还是按照上面的这种思路，我们是不是要写很多种呢...

我们当然可以自己实现一个工具函数专门来生成 柯里化 函数。

主要思路是什么呢，要判断当前传入函数的参数个数 (args.length) 是否大于等于原函数所需参数个数 (fn.length) ，如果是，则执行当前函数；如果是小于，则返回一个函数。

```js
const curry = (fn, ...args) => 
    // 函数的参数个数可以直接通过函数数的.length属性来访问
    args.length >= fn.length // 这个判断很关键！！！
    // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
    ? fn(...args)
    /**
     * 传入的参数小于原始函数fn的参数个数时
     * 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数） 的函数
    */
    : (..._args) => curry(fn, ...args, ..._args);

function add1(x, y, z) {
    return x + y + z;
}
const add = curry(add1);
console.log(add(1, 2, 3));
console.log(add(1)(2)(3));
console.log(add(1, 2)(3));
console.log(add(1)(2, 3));
```

## Ramda

[Ramda](https://github.com/ramda/ramda) 中的函数所有都支持柯里化。也就是说，所有的多参数函数，默认都可以使用单参数函数。

还是举上面的例子
```js
const addThreeNumbers = (x, y, z) => x + y + z;
const curriedAddaddThreeNumbers = R.curry(addThreeNumbers);
const f = curriedAddaddThreeNumbers(1, 2);
console.log(f(3));
```

大名鼎鼎的 [lodash](https://github.com/lodash/lodash) 中也提供了 柯里化 函数 ，那么它和`Ramda`有什么区别呢

`lodash`是一个很强大的工具函数库，比如 节流，防抖，深拷贝等等，只要引入 lodash ，我们就可以直接使用。
`Ramda` 是一个函数式编程风格的函数库。

## 柯里化有什么作用
主要有3个作用： **参数复用**、**提前返回**和 **延迟执行**

我们来简单的解释一下:
参数复用：拿上面 `f`这个函数举例，只要传入一个参数 `z`，执行，计算结果就是 `1 + 2 + z` 的结果，1 和 2 这两个参数就直接可以复用了。

提前返回 和 延迟执行 也很好理解，因为每次调用函数时，它只接受一部分参数，并返回一个函数（提前返回），直到(延迟执行)传递所有参数为止。

## 参考
- [Ramda](https://github.com/ramda/ramda)
- [JS中的柯里化(currying)](https://www.zhangxinxu.com/wordpress/2013/02/js-currying/)
- [React世界的函数式编程(Functional Programming)](https://zhuanlan.zhihu.com/p/26174525)