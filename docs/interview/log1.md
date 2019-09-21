# 以下代码会输出什么
1.
```js
const a = ['1', '2', '3'].map(parseInt);
console.log(a);
```

2.
```js
function fn() {
    return 20;
}
console.log(fn + 10); // 输出结果是多少？

fn.toString = function() {
    return 10;
}
console.log(fn + 10); // 输出结果是多少？

fn.valueOf = function() {
    return 5;
}
console.log(fn + 10); // 输出结果是多少?
```

3.
```js
var a = 10;
(function () {
    console.log(a)
    a = 5;
    console.log(window.a);
    var a = 20;
    console.log(a);
})()
```

4.
```js
var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj);
```

5.
```js
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

console.log(a.x)
console.log(b.x)
```

## 1. map
map方法中的callback函数只需要接受一个参数, 就是正在被遍历的数组元素本身, 但这并不是意味着map只给callback传了一个参数;
```js
const a = ['1', '2', '3'].map(parseInt);
console.log(a); // [ 1, NaN, NaN ]
```
通常情况下, parseInt函数只需要传递一个参数, 但实际上, parseInt可以有两个参数,第二个参数是进制数;
map方法在调用callback函数时, 会给它传递三个参数: 当时正在遍历的元素, 元素索引,原数组本身;
第三个参数parseInt会忽视, 但第二个参数不会,parseInt把传过来的索引值当成进制数来使用.从而返回了NaN.

```js
function returnInt(element) {
  return parseInt(element, 10);
}

['1', '2', '3'].map(returnInt); // [1, 2, 3]
// 意料之中的结果

// 也可以使用简单的箭头函数，结果同上
['1', '2', '3'].map( str => parseInt(str) );

// 一个更简单的方式:
['1', '2', '3'].map(Number); // [1, 2, 3]
```

## 2. 类型的隐式转换
```js
function fn() {
    return 20;
}

console.log(fn + 10); // 输出结果是多少？


fn.toString = function() {
    return 10;
}

console.log(fn + 10); // 输出结果是多少？


fn.valueOf = function() {
    return 5;
}
console.log(fn + 10); // 输出结果是多少?
```
结果依次为
```js
function fn() {
    return 20;
}10

20

15

```
当使用console.log, 或者进行运算时, 隐式转换就会发生,函数的隐式转换会默认调用toString方法, 它会将函数定义的内容座位字符串返回

## 3. 变量声明提升

```js
var a = 10;
(function () {
    console.log(a)
    a = 5;
    console.log(window.a);
    var a = 20;
    console.log(a);
})()

// undefined -> 10 -> 20
```
立即执行函数中 var a = 20; 语句定义了一个局部变量 a,由于js的变量声明提升机制, 局部变量a的声明会被提升至立即执行函数体最上方,且由于这样的提升并不包含赋值,因此第一条语句会打印undefined,最后一条语句会打印20
由于变量声明提升,a = 5; 这条语句执行时,局部的变量a已经声明,因此它产生的效果是对局部的变量a赋值,此时window.a依旧是最开始赋值的10


## 4.
```js
var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj);
```
### 类数组
```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

```

### push方法: [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
push方法的根据length属性来决定从哪里开始插入给定的值;如果length不能被转成一个数值,则插入的元素索引为0,包括length不存在时.当length不存在时,将会创建它;
push这个方法如果对象有length属性, length属性加1并且返回


题目分析:
此时obj定义length为2,所以从数组的第二项开始插入, 也就是数组的第三项(下标为2的那一项), 因为数组是从0开始的, 这时已经定义了下标为2和3, 所以push(1)的参数1会替换下标为2的的值, 即`'2': 1`, obj.length++, 同理第二次push方法, push(2)的参数2会替换下标为3的值, 即`'3': 2`, obj.length++;

结果为
```js
Object(4) [empty × 2, 1, 2, splice: ƒ, push: ƒ]---->
[
  2: 1,
  3: 2,
  length: 4,
  push: ƒ push(),
  splice: ƒ splice()
]
```
因为只定义了下标为2和3两项, 没有定义0和1,所以前面会是empty;

1.这个对象如果有push和splice会输出会转换为数组, 下图为去掉splice和包含splice打印的值
![](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1555380463559.png?width=810&height=984&imageView2/3/)

## 5.

```js
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

console.log(a.x)
console.log(b.x)

```
输出 undefined, {n: 2}

1.优先级, `.`的优先级高于 `=`, 所以先执行a.x, 堆内存中的{n: 1}就会变成 {n: 1, x: undefined}, 改变之后b.x也变化了,因为指向的是同一个对象

2.赋值操作是从右到左,所以先执行 a = {n:2}, a的引用就改变了, 然后这个返回值又赋值给了a.x,需要注意的是这时候, a.x是第一步中的{n: 1, x: undefined}那个对象,其实是b.x, 相当于b.x = {n:2}






