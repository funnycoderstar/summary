# 题目
1.实现 (5).add(3).minus(2) 功能

2.下面代码中 a 在什么情况下会打印 1？
```js
    var a = ?;
    if(a == 1 && a == 2 && a == 3){
        conso.log(1);
    }
```

3.简单改造下面的代码，使之分别打印 10 和 20。
```js
    var b = 10;
    (function b(){
        b = 20;
        console.log(b); 
    })();
```


## 1.实现 (5).add(3).minus(2) 功能
```js
Number.prototype.add = function(n) {
  return this.valueOf() + n;
};
Number.prototype.minus = function(n) {
  return this.valueOf() - n;
};
```
---
## 2.下面代码中 a 在什么情况下会打印 1？

```js
var a = ?;
if(a == 1 && a == 2 && a == 3){
    conso.log(1);
}
```
这道题考察的应该是类型的隐式转换, 考引用类型在比较运算符时候,隐式转换会调用本类型的`toString`或`valueOf`

> 利用toString
```js
let a = {
    i: 1,
    toString() {
        return a.i++
    }
}

if (a == 1 && a == 2 && a == 3) {
    console.log('1');
}
```

> 利用valueOf
```js
let a = {
    i: 1,
    valueOf() {
        return a.i++
    }
}

if (a == 1 && a == 2 && a == 3) {
    console.log('1');
}
```
如果原始类型的值和对象比较, 对象会转为原始类型的值,再进行比较
对象转换成原始类型的值, 算法是先调用valueOf 方法, 如果返回的还是对象,再接着调用toString方法, 我们每次比较的时候就会执行方法返回 `a`的`i`属性同时也改变i的值, 所以上面`if`执行完以后`a`的`i`属性已经变为`4`了. **这里也表现出了 == 比较是有可能会对变量带来副作用的**

> 使用数组
```js
var a = [1, 2, 3];
a.join = a.shift;
if (a == 1 && a == 2 && a == 3) {
    console.log('1');
}
```
关于array的原型链上的`toString`方法
对于数组对象, toString方法返回一个字符串,该字符串由数组中的每个元素的toString返回值经过调用join方法连接(由逗号隔开)组成
可以看到数组 toString 方法本身调用join方法, 这里把自己join方法写成shfit, 每次返回第一个元素,而且原数组删除第一个值, 正好可以使判断成立. **这里也表现出了 == 比较是有可能会对变量带来副作用的**

>  ES6的Symbol特性
```js
let a = { 
    [Symbol.toPrimitive]: 
    (
        (i) => () => ++i
    )(0)
 };
if (a == 1 && a == 2 && a == 3) {
    console.log('1');
}
```
ES6引入了一种新的原始类型数据 `Symbol`, 表示独立无二的值, 我们之前在定义类的私有属性的时候习惯用_xxx, 这种命名方式避免别人定义相同的属性名覆盖原来的属性,有了Symbol之后我们完全可以用Symbol值来代替这种方法, 而不担心被覆盖;

除了定义自己使用的`Symbol`值以外, ES6还提供了 11 个内置的 `Symbol`值,指向语言内部使用的方法; `Symbol.toPrimitive`就是其中一个它指向一个方法，表示该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。这里就是改变这个属性，把它的值改为一个 `闭包` 返回的函数。

---

### 参考
[从 (a==1&&a==2&&a==3) 成立中看javascript的隐式类型转换](https://yq.aliyun.com/articles/399499)


## 3.简单改造下面的代码，使之分别打印 10 和 20。
```js
    var b = 10;
    (function b(){
        b = 20;
        console.log(b); 
    })();
```

> 打印10
```js
var b = 10;
(function b(b){
    window.b = 20;
    console.log(b); 
})(b);
```
b作为参数被传进函数里了, 即使函数内部使用`window.b = 20`;改变了全局的b已经对它没有影响了, 所以会打印原先的10
```js
var b = 10;
(function b(b) {
    b.b = 20;
    console.log(b)
})(b)
```


> 打印20
```js
var b = 10;
(function b(b){
    b = 20; // 函数里的b并不是全局的b, 修改也不会影响到全局的b
    console.log(b); 
})(b);
```

或
```js
var b = 10;
(function b() {
    var b = 20; // 在立即执行函数表达式里，对b进行var声明，是重新声明了一个变量
    console.log(b)
})()
```

基本数据类型的传递只是传递数值，比如此处不管你修改的是函数外的b还是函数内的b都不会对对方造成影响。对象的传递才是按引用传递，一个变了全部都要变，可以了解一下js里关于基本数据类型和引用数据类型内存空间的存储方式。
