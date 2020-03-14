## 前言

本周发起了一个100天前端进阶计划，每天一个知识点，搞明白背后的原理，这是第二周的总结，请注意查收。

以面试题的形式看自己本周掌握了多少。

## 1.下面代码输出什么
```js
class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor
    return this.newColor
  }

  constructor({ newColor = 'green' } = {}) {
    this.newColor = newColor
  }
}

const freddie = new Chameleon({ newColor: 'purple' })
freddie.colorChange('orange')
```

<details><summary><b>答案</b></summary>
<p>

### 答案：TypeError
解析：
colorChange 是一个静态方法。静态方法被设计为只能被创建它们的构造器使用（也就是 Chameleon），并且不能传递给实例。因为 freddie 是一个实例，静态方法不能被实例使用，因此抛出了 TypeError 错误。

> 详细分析请看 [详解ES6中的class](https://github.com/funnycoderstar/blog/issues/111)

</p>
</details>

---
## 2.下面代码输出什么
```js
function setName(obj) {
    obj.name = 'luckyStar';
    obj = new Object();
    obj.name = 'litterStar'
}
const person = new Object();
setName(person);
console.log(person.name);
```

<details><summary><b>答案</b></summary>
<p>

### 答案： luckyStar
解析：
在函数内部修改了参数的值，但是原始的引用仍然保持未变。
实际上，在函数内部重写 obj时，这个变量引用的就是一个局部对象了。而这个局部对象会在函数执行完毕之后立即销毁。

> 详细分析请看 [从JS底层理解var，const，let](https://github.com/funnycoderstar/blog/issues/114)

</p>
</details>

---
## 3. 下面代码输出什么
```js
var name = 'Tom';
(function() {
    if (typeof name == 'undefined') {
        var name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();
```

<details><summary><b>答案</b></summary>
<p>

### 答案： Goodbye Jack
解析：
立即执行函数的中的变量 name 的定义被提升到了顶部，并在初始化赋值之前是 `undefined`，所以` typeof name == 'undefined'`

> 详细分析请看 [从JS底层理解var,const,let](https://github.com/funnycoderstar/blog/issues/114)

</p>
</details>

---

## 4. async原理是什么

<details><summary><b>答案</b></summary>
<p>

#### 答案：
`async` 函数原理就是 `Generator`函数 和 自动执行器包装了一下。具体的来说：async就是一个generator 在 promise 的resolve状态下 执行next 并把值当做next的参数 封装起来的语法糖。


> 详细分析请看 [async原理解析](https://github.com/funnycoderstar/blog/issues/110)

</p>
</details>

---


### 5.实现一个`sleep`
每隔1秒输出 1， 2， 3， 4， 5

<details><summary><b>答案</b></summary>
<p>

#### 答案：

```js
function sleep(interval) {
    return new Promise(resolve => {
        setTimeout(resolve, interval);
    })
}

// 用法
async function one2FiveInAsync() {
    for (let i = 1; i <= 5; i++) {
        console.log(i);
        await sleep(1000);
    }
}
one2FiveInAsync();
```

</p>
</details>

---

### 6.实现一个红绿灯： 红灯2秒，黄灯1秒，绿灯3秒

<details><summary><b>答案</b></summary>
<p>
#### 答案：
  
```js
function sleep(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    })
}
async function changeColor(color, duration) {
    console.log('当前颜色', color);
    await sleep(duration);
}
async function main() {
    await changeColor('红色', 2000);
    await changeColor('黄色', 1000);
    await changeColor('绿色', 3000);
}
main();
```

> 详细分析请看 [async原理解析](https://github.com/funnycoderstar/blog/issues/110)

</p>
</details>

---


### 7.使用 `async` 实现` Promise.all()`的效果

<details><summary><b>答案</b></summary>
<p>

#### 答案：
```js
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();

let foo = await fooPromise;
let bar = await barPromise;
```

解析： 上面两种写法，getFoo 和 getBar 都是同时触发，这样就会缩短程序的执行时间。


> 详细分析请看 [async原理解析](https://github.com/funnycoderstar/blog/issues/110)

</p>
</details>

---

## 8.  class的原理是什么，什么是静态方法/属性，super是什么

<details><summary><b>答案</b></summary>
<p>

- class是一个语法糖，其底层还是通过 `构造函数` 去创建的。
- 类的所有方法都定义在类的prototype属性上面。
- 静态方法：在方法前加static，表示该方法不会被实例继承，而是直接通过类来调用。
- 静态属性：在属性前加static，指的是 Class 本身的属性，而不是定义在实例对象（this）上的属性。
- es5 的构造函数在调用父构造函数前可以访问 this, 但 es6 的构造函数在调用父构造函数(即 super)前不能访问 this。
- super
    - 作为函数调用，代表父类的构造函数
    - 作为对象调用，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

> 详细分析请看 [详解ES6中的class](https://github.com/funnycoderstar/blog/issues/111)

</p>
</details>

---

## 算法题
- [搜索二维矩阵II](https://github.com/funnycoderstar/leetcode/issues/47)
- [将有序数组转换成二叉树](https://github.com/funnycoderstar/leetcode/issues/7) 
- [路径总和](https://github.com/funnycoderstar/leetcode/issues/8)
- [两句话中的不常见单词](https://github.com/funnycoderstar/leetcode/issues/19)
- [有效的山脉数组](https://github.com/funnycoderstar/leetcode/issues/36)


## 其他
最近发起了一个100天前端进阶计划，今天是第十天，主要是深挖每个知识点背后的原理，欢迎关注 微信公众号「牧码的星星」，我们一起学习，打卡100天。

![牧码的星星](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1583655092168.png)



