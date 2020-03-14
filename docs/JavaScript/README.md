# JavaScript数据类型
## '1'.toString()为什么可以调用？
参考:《JavaScript高级程序设计(第三版)》第五章 5.6《基本包装类型》
## 0.1+0.2为什么不等于0.3？
0.1和0.2在转换成二进制后会无限循环，由于标准位数的限制后面多余的位数会被截掉，此时就已经出现精度的损失，相加后因浮点数小数位的限制而截断的二进制数字在转换为十进制就会变成0.30000000000000004。
参考：《你不知道的JavaScript中卷》2.3.2 《较小的数值》
## BigInt
[BigInt](http://es6.ruanyifeng.com/#docs/number#BigInt-%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B)

# JavaScript数据检测
## 使用Symbol.hasInstance自定义 instanceof 行为
[Symbol.hasInstance](http://es6.ruanyifeng.com/#docs/symbol#Symbol-hasInstance)
## Object.is() 和 === 的区别
Object在严格等于的基础上修复了一些特殊情况下的失误，具体来说就是+0和-0, NaN和NaN。
```js
function is(x, y) {
    // 运行 1/x === 1/x 的时候x和y都为0， 但 1/+0 = +Infinity, 1/-0 = -Infinity是不一样的。
    if(x === y) {
        return x !== 0 || y !== 0 || 1/x === 1/y;
    } else {
        //NaN===NaN是false,这是不对的，我们在这里做一个拦截，x !== x，那么一定是 NaN, y 同理
        //两个都是NaN的时候返回true
        return x !== x && y !== y;
    }
}

console.log(is(+0, -0));
console.log(is(NaN, NaN));
```
# JavaScript数据转换
参考：《你不知道的JavaScript中卷》 第四章 2.3.2 《强制数据类型转换》
## [] == ![]结果是什么，为什么
== 中，左右两边都要转成数字然后进行比较.
[]转换为数字0
![]首先是转换成布尔值，由于[]作为一个引用类型转换为true
因此![]为false,进而再转换成数字，变为0
0 == 0 结果为true
## JS中类型转换有哪几种
- 转换成数字
- 转换成布尔值
- 转换成字符串

## 对象转原始类型是根据什么流程运行的
对象转原始类型，会调用内置的[ToPrimitive]函数，对于该函数而言，其逻辑如下:

1. 如果Symbol.toPrimitive()方法，优先调用再返回
2. 调用valueOf(),如果转换为原始类型，则返回
3. 调用toString()，如果转换为原始类型，则返回
4. 如果都没有返回原始类型，会报错
```js
var obj = {
  value: 3,
  valueOf() {
    return 4;
  },
  toString() {
    return '5'
  },
  [Symbol.toPrimitive]() {
    return 6
  }
}
console.log(obj + 1); // 输出7
```
如何让if(a == 1 && a == 2)条件成立？
其实就是这个问题的应用。
```js
var a = {
    value: 0,
    valueOf: function () {
        this.value++;
        return this.value;
    }
}
```
## 谈谈你对执行环境和作用域的理解
参考 《JavaScript高级程序设计(第三版)》第七章 7.2 《闭包》
## 谈谈你对闭包的理解
参考:《JavaScript高级程序设计(第三版)》第四章 4.2《执行环境及作用域》
## 谈谈你对原型链的理解
参考《JavaScript高级程序设计(第三版)》第六章 《面向对象的程序设计》 6.3.1 《原型链》


## 数据是如何存储的
基本数据类型用栈存储，引用数据类型用堆存储，闭包变量是存储在堆内存中的
为什么栈不能存储引数据类型呢？
## V8引擎如何进行垃圾内存的回收

## 描述一下V8执行一段JS代码的过程
## 如何理解EventLoop - 宏任务和微任务篇
## 如何理解EventLoop - 浏览器篇
## 如何理解EventLoop——nodejs篇
## nodejs中的异步、非阻塞I/O是如何实现的？
## JS异步编程有哪些方案？为什么会出现这些方案？
## 能不能简单实现一下 node 中回调函数的机制？

## 说明flex的使用场景，以及flex1做了什么
[]()
[Flex 布局教程：实例篇](https://www.ruanyifeng.com/blog/2015/07/flex-examples.html)
[Flexbox 布局的最简单表单](http://www.ruanyifeng.com/blog/2018/10/flexbox-form.html)
