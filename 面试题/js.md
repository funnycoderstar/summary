## JS
1. ES6的Set内部实现
set内部通过使用 Object.js()来判断两个数据项是否相等，唯一不同的是+0和-0在Set中被判断是相等的。

2. 跨域
- [不要再问我跨域的问题了](https://segmentfault.com/a/1190000015597029)
- [前端常见跨域解决方案（全）](https://segmentfault.com/a/1190000011145364)
3. 事件循环机制，node和浏览器的事件循环机制区别, node中事件队列模型, 事件循环, 如何解决同步调用代码耗时太高的问题, setTimeout(function(){},0)和process.nextTick()的区别
4. typescript有什么好处

5. JWT优缺点, JWT细节，适用场景

6. JS数据类型
一共有7中数据类型，分为基本数据类型(undefined, null, 不是new出来的 number, boolean, string, Symbol)，引用类型（function, object, array）

基本数据类型按值存储在栈中的（undefined, null, 不是new出来的 number, boolean, string)，每种类型数据占用的内存空间大小是确定的，由系统自动分配和释放，好处就是，内存更容易回收，和堆相比，更加更衣管理内存。
引用类型存在在堆内存中，其实引用类型的指针是存在栈内存中，当我们想要访问引用类型的值时，先需要从栈中获取对象的地址指针，然后在通过地址指针找到堆中锁存储的数据。
![img](https://www.zhoulujun.cn/uploadfile/images/2019/0509/20190509203410820165528.png)

- [再谈js对象数据结构底层实现原理-object array map set](https://my.oschina.net/zhoulujun/blog/3050884)

7. 选择器优先级
8. 前端性能优化手段, 各方面谈谈性能优化, 谈谈性能优化(高频)
## requestAnimationFrame VS setTimeout/setInterval

requestAnimationFrame的优点如下: https://zhuanlan.zhihu.com/p/55129100
1. requestAnimationFrame不需要设置时间,采用系统时间间隔,能达到最佳的效果
2. 会把每一帧中的所有DOM操作集中起来,在一次重绘或回流中完成


## 前端性能优化
1. 合并请求
合并请求主要目的是减少浏览器发起的请求数， 从而减少在发起请求过程中花费的时间；
具体手段有： 合并JS, 合并CSS以及合并小图片（使用雪碧图）等方式来优化
2. 域名拆分
浏览器的并发请求数目限制是针对同一域名， 为什么这么做呢
3. 开启gzip, CDN
5. Minify
将JS和CSS等文本进行最小化处理
6. 按需加载资源
7. 启用 HTTP/2
8. 缓存
[https://www.zhihu.com/question/20474326](浏览器允许的并发请求资源数是什么意思？)
[常见的前端性能优化手段都有哪些？都有多大收益？](https://www.zhihu.com/question/40505685/answer/86898655)


9. 谈谈XSS防御，以及Content-Security-Policy细节
10. ES6特性

11. 闭包和this一起谈谈
12. postcss配置
13. Promise内部实现原理, 手写Promise实现, Promise实现原理, 一句话概述什么是 promise; promise解决了什么问题;在没有 promise 之前，怎么解决异步回调; 自己实现一个promise
14. serviceworker如何保证离线缓存资源更新, service work
15. virtual dom有哪些好处

16. 发布订阅模式和观察者模式的异同
17. 图片懒加载实现
18. 事件模型，阻止冒泡
19. CI/CD流程, CI/CD整体流程
20. canvas优化绘制性能

21. symbol应用
22. 深拷贝 和浅拷贝的区别, 怎么实现一个浅拷贝, 怎么实现一个深拷贝
23. 贝塞尔曲线
24. 正则的捕获组概念
25. 图片上传是怎么做的？能不能同时上传？

26. 操作系统里面进程和线程的区别
27. 前端安全：XSS（跨站脚本攻击），CSRF跨站请求伪造）
28. js原型链
29. 闭包
30. v8引擎区别浏览器做的优化

31. 编译型和解释型语言的区别
32. 跟缓存相关的配置
33. node 的一些特点
32. node对于字节流的控制
33. 如何处理js的错误:eslint。
34. node垃圾回收
35. js内存溢出

36. if([]){} 是true，但是[]==false,因为任何类型跟bool比较都会先转化为数值型。[]是object if的时候不是false
37. this的作用域，()=>{} 箭头函数
38. setImmediate 
39. require和import的区别： require是CommonJS模块， import是Es6模块，CommonJS是运行时加载， es6模块是编译时加载
40. 箭头函数的好处

41. 判断数组
```js
const a = [1, 2];
console.log('使用Array.isArray', Array.isArray(a));
console.log('使用 instanceof ', a instanceof Array);
console.log('使用constructor', a.constructor == Array);
console.log('使用 Object.prototype.toString.call', Object.prototype.toString.call(a) === "[object Array]");
```
42. typeof和instanceof的区别
typeof判断基本数据类型.
typeof 原理， 不同的对象在底层都表示为二进制，在Javascript中二进制前（低）三位存储其类型信息。
- 000: 对象
- 010: 浮点数
- 100：字符串
- 110： 布尔
- 1： 整数

typeof null 为"object", 原因是因为 不同的对象在底层都表示为二进制，在Javascript中二进制前（低）三位都为0的话会被判断为Object类型，null的二进制表示全为0，自然前三位也是0，所以执行typeof时会返回"object"。
一个不恰当的例子，假设所有的Javascript对象都是16位的，也就是有16个0或1组成的序列，猜想如下：
```js
Array: 1000100010001000
null:  0000000000000000

typeof [] →"object"
typeof null→"object"
```
因为Array和null的前三位都是000。为什么Array的前三位不是100?因为二进制中的“前”一般代表低位， 比如二进制00000011对应十进制数是3，它的前三位是011。

instanceof,通俗一些讲，用来比较一个对象是否为某一个构造函数的实例。注意，instanceof运算符只能用于对象，不适用原始类型的值。

判断某个`实例`是否属于`某种类型`
```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
var auto = new Car('Honda', 'Accord', 1998);

console.log(auto instanceof Car);

```
也可以判断一个实例是否是其父类型或者祖先类型的实例。
```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
var auto = new Car('Honda', 'Accord', 1998);

console.log(auto instanceof Car);
// expected output: true

console.log(auto instanceof Object);
// expected output: true
```

语法：
```js
object instanceof constructor

// 等同于
constructor.prototype.isPrototypeOf(object)
```
- object： 要检测的对象
- constructor：某个构造函数

```js
function instanceof(L, R) { //L是表达式左边，R是表达式右边
    var O = R.prototype;
    L = L.__proto__;
    while(true) {
        if (L === null)
            return false;
        if (L === O)
            return true;
        L = L.__proto__;
    }
}
```
instanceof原理： 检测 `constructor.prototype`是否存在于参数 object的原型链上。instanceof 查找的过程中会遍历 object 的原型链，直到找到 constructor的 prototype , 如果查找失败，则会返回false，告诉我们，object 并非是 constructor 的实例

```js
function Foo() {};

console.log(Object instanceof Object); // true
console.log(Function instanceof Function); // true
console.log(Function instanceof Object); // true

console.log(Foo instanceof Foo); // false
console.log(Foo instanceof Object); // true
console.log(Foo instanceof Function); // true
```

js原型继承机制：
### 构造函数的缺点
```js
function DOG(name){
　　this.name = name;
　　this.species = '犬科';
}
var dogA = new DOG('大毛');
var dogB = new DOG('二毛');
```
这两个对象的species属性是独立的，修改其中一个，不会影响到另一个。
```js
dogA.species = '猫科';

alert(dogB.species); // 显示"犬科"，不受dogA的影响
```

每一个实例对象，都有自己的属性和方法的副本。这不仅无法做到数据共享，也是极大的资源浪费。
这个问题的解决方法，就是JavaScript的原型对象（prototype）;
### prototype属性的作用
JavaScript继承机制的设计思想就是，原型对象的所有属性和方法，都能被实例对象共享。也就是说，如果属性和方法定义在原型上，那么所有的实例对象就能共享，不仅节省了内存，还体现了实例对象之间的联系。

> 如果你觉得这个不好理解，可以想一下，我们定义的任何对象，都可以使用 toString, valueOf()函数，这就是因为 tostring()和valueOf是定义在 object原型上的方法`Object.prototype.toString()` 和 `Object.prototype.valueOf()`；

### 原型链
javascript规定：所有的对象都有自己的原型对象（prototype），一方面，任何一个对象，都可以充当其他对象的原型；另一方面，所有原型对象也是对象，所有它有自己的原型。因此，就会形成一个“原型链”（protype chain）：对象到原型，再到原型的原型......

如果一层层地上溯，所有对象的原型最终都可以上溯上 `Object.prototype`,即 `Object构造函数的 prototype`属性，也就是说，所有对象都继承了`Object.prototype`的属性。这就是所有对象都有 valueOf 和toString方法的原因，因为是从 Object.prototype继承的。

那么 Object.prototype对象有没有它的原型呢?回答是 Object.prototype的原型是 null。null没有任何属性和方法，也没有自己的原型。因此，原型链的尽头就是null。

```js
Object.getPrototypeOf(Object.prototype)
// null
```
Object.prototype对象的原型为null,由于null没有任何属性，所以原型链到此为止。

读取对象的某个属性时，JavaScript引擎先寻找对象本身的属性，如果找不到，就到它的原型去找，如果还是找不到，就到原型的原型去找。如果直到最顶层的 `Object.prototype`还是找不到，则返回undefined。如果对象自身和它的原型，都定义了一个同名属性，那么优先读取对象自身的属性，这叫做“覆盖”。

注意，一级级向上，在整个原型链上寻找某个属性，对性能是有影响的。所寻找的属性在越上层的原型对象，对性能的影响越大。如果寻找某个不存在的属性，将会遍历整个原型链。

举例来说，如果让构造函数的 prototype 属性指向一个数组，就意味着实例对象可以调用数组方法。
```js
var MyArray = function () {};

MyArray.prototype = new Array();
MyArray.prototype.constructor = MyArray;

var mine = new MyArray();
mine.push(1, 2, 3);
mine.length // 3
mine instanceof Array // true
```
上面代码中，mine是构造函数MyArray的实例对象，由于MyArray.prototype指向一个数组实例，使得mine可以调用数组方法（这些方法定义在数组实例的prototype对象上面）。最后那行instanceof表达式，用来比较一个对象是否为某个构造函数的实例，结果就是证明mine为Array的实例，instanceof运算符的详细解释详见后文。

### construstor属性
**prototype对象上有一个 construstor 属性，默认指向 prototype对象所在的构造函数**
```js
function P() {};
console.log(P.prototype.constructor === P); // true
```
由于construstor属性定义在 prototype 对象上面，意味着可以被所有实例对象继承。

```js
function P() {};
var p = new P();

console.log(p.constructor === P); // true
console.log(p.constructor === P.prototype.constructor); // true
console.log(p.hasOwnProperty('constructor')); // false

```
上面代码中`p`是构造函数`P`的实例对象，但是`p`自身没有`constructor`属性，该属性其实是读取原型链上的 `P.prototype.constructor`属性

`constructor`属性的作用是，可以得知某个实例对象，到底是哪个构造函数产生的。
```js
function Person(name) {
  this.name = name;
}

Person.prototype.constructor === Person // true

Person.prototype = {
  method: function () {}
};

Person.prototype.constructor === Person // false
Person.prototype.constructor === Object // true
```
上面对象中，构造函数 Person 的原型对象改掉了，但是没有修改 constructor 属性，导致这个属性不再指向 Person。由于 Person的新原型是一个普通对象，而普通对象的constructor属性指向 Object 构造函数，导致 `Person.prototype.constructor`变成了`Object`。


- [浅谈 instanceof 和 typeof 的实现原理](https://juejin.im/post/5b0b9b9051882515773ae714)
- [prototype 对象](https://javascript.ruanyifeng.com/oop/prototype.html)

43. new和instanceof的内部机制
44. for...in迭代和for...of有什么区别？
- `for in` 更适合遍历对象, 不要使用 `for in`遍历数组，`for in `遍历的是数组的索引（即键名）。
- `for of `适合遍历数组, 遍历的是数组元素名。

> 如果老是记不住怎么办，可以了解一下 [in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in) 运算符
如果指定的属性在指定的对象或其原型链中，则`in`运算符返回`true`。
```js
var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
0 in trees        // 返回true
"toString" in {}; // 如果一个属性是从原型链上继承来的，in 运算符也会返回 true。
```
## for in 遍历对象
for in 可以遍历到原型上的方法
```js
Object.prototype.methods = function () {
    console.log(this);
};
var myObject = {
    a: 1,
    b: 2,
    c: 3,
};
// 使用for in 遍历对象的键名
 for (var key in myObject) {
   console.log(key);
 }
//  a
//  b
//  c
//  methods
```
如果不想遍历原型方法和属性的话.可以用hasOwnPropery方法可以判断某属性是否是该对象的实例属性
```js
 for (var key in myObject) {
     if(myObject.hasOwnProperty(key)){
       console.log(key);
     }
 }
//  a
//  b
//  c
```
同样可以通过ES5的Object.keys(myObject)获取对象的实例属性组成的数组，不包括原型方法和属性。
```js
console.log(Object.keys(myObject));  [ 'a', 'b', 'c' ]
Object.keys(myObject).forEach(function(key, index){
    console.log(key, myObject[key]);
})
//  a 1
//  b 2
//  c 3
```
如果用 for in 来遍历数组，我们来看看会输出什么

```js

Array.prototype.methods = function () {
    console.log(this);
}
Array.prototype.test = 'name';

var myArray = [1, 200, 3, 400, 100];
myArray.test1 ='数组';

for (let key in myArray) {
    console.log(key);
}
// 0
// 1
// 2
// 3
// 4
// test1
// methods
// test
```
可以看出 for in 应用于数组返回的是数组的`下标`和数组的`属性`和`原型上的方法名和属性名`,而 for in应用与对象的遍历 返回的 是对象的 `属性名` 和`原型中的方法名和属性名`；
for in 遍历数组，但是会存在以下问题：
- index 索引为字符串型数字，不能直接进行几何运算
- 遍历顺序有可能不是按照实际数组的内部顺序
- 使用for in会遍历数组所有的可枚举属性，包括原型。例如上例的原型方法method和test属性

## for of 用来遍历数组的值

```js
Array.prototype.methods = function () {
    console.log(this);
}
Array.prototype.test = 'name';
var myArray = [1, 200, 3, 400, 100];
myArray.test1 ='数组';
for (let key of myArray) {
    console.log(key);
}
//输出结果
// 1,200,3,400,100
```

## for of 的原理解析

### Iterator(遍历器)
首先肯定是要说一下  Iterator(遍历器)。
Iterator 的作用有三个：
一是为各种数据结构，提供一个统一的、简便的访问接口；
二是使得数据结构的成员能够按某种次序排列；
三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。

默认 Iterator 接口：
部署在 Symbol.iterator 属性，或者说，一个数据结构只要具有 Symbol.iterator 属性，就认为是"可遍历的"。

Symbol.iterator 属性本身是个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。属性名为 Symbol.iterator,它是一个表达式，返回Symbol对象的iterator属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内;

ES6的有些数据结构原生具备 Iterator接口（比如数组），即不用任何处理，就可以被 `for of`循环遍历。原因在于，**这些数据结构原生部署了Symbol.iterator属性**。另外一些数据结构没有（比如对象）。凡是部署了 Symbol.iterator属性 的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。

### for of 循环
ES6引入 for of 循环，作为遍历所有数据结构的统一方法。

> 所以之前的理解存在一个误区，认为 for of 就是用来遍历数组的，for of 不只是用来遍历数组的，一个数据结构只要部署了 Symbol.iterator 属性，就被视为具有 iterator 接口，就可以用 `for of ` 循环遍历它的成员。也就是说， for...of 循环内部调用的是数据结构的 Symbol.iterator方法。

for...of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。

javaScript 原有的for...in循环，只能获得对象的键名，不能直接获取键值。ES6 提供for...of循环，允许遍历获得键值。


45. 原型链中prototype和__proto__分别指什么
![prototype & __proto__](https://pic1.zhimg.com/80/e83bca5f1d1e6bf359d1f75727968c11_hd.jpg)
需要注意一下几点：
1.在JS里，万物皆对象。方法（Function）是对象，方法的原型（Function.prototype）是对象。因此，它们都会具有对象共有的特点。
即：对象具有属性 __proto__ , 可称为 隐式原型，**一个对象的隐式原型指向构造该对象的构造函数的原型**，这也保证了实例能够访问

```js
const one = new Object();
// 实例对象one的隐式原型指向 构造函数Object的原型（Object.prototype）
console.log(one.__proto__ === Object.prototype); // true

function A() {};
const a = new A();
// 实例对象a的隐式原型指向 构造函数A的原型（A.prototype）
console.log(a.__proto__ === A.prototype); // true
```
2. 方法（Function）
方法这个特殊的对象，除了和其他对象一样有上述 __proto__ 属性之外，还有自己特有的属性-原型属性（prototype）,这个属性是一个指针，指向一个对象，这个对象的用途就是包含所有实例共享的属性和方法（我们把这个对象叫做原型对象）。原型对象也有一个属性，叫做 constructor，这个属性包含了一个指针，指回原构造函数。

- [Javascript继承机制的设计思想](http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html)
- [js中__proto__和prototype的区别和关系？](https://www.zhihu.com/question/34183746)

46. class实现原理： class是一个语法糖，很多都可以用es5的语法实现

```js
// ES5实现
function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype.toString = function() {
    return '(' + this.x + ', ' + this.y + ')';
};

// 使用ES6的实现
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}
```

与 ES5 一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。
与 ES5 一样，类的所有实例共享一个原型对象
```js
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__ === p2.__proto__
```
p1和p2都是 Point 的实例，他们的原型都是 Point.prototype, 所以 __proto__属性是相等的.
这意味着，可以通过__proto__属性为“类”添加方法；

__proto__ 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多现在浏览器的JS引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产品依赖。生产环境中，我们可以使用 Object.getPrototypeOf 方法来获取实例对象的原型，然后再来为原型添加方法/属性。
```js
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__.printName = function () { return 'Oops' };

p1.printName() // "Oops"
p2.printName() // "Oops"

var p3 = new Point(4,2);
p3.printName() // "Oops"
```
上面代码在p1的原型上添加了一个 `printName` 方法， 由于 `p1`的原型就是`p2`的原型，因此`p2`也可以调用这个方法。而且，此后新建的实例p3也可以调用这个方法。这意味着，使用实例的 __proto__ 属性改写原型，必须相当谨慎，不推荐使用，这会改变“类”的原始定义，影响到所有实例。


47. async和await实现原理: 基于generator实现的，generator又是基于promise实现的
## 含义
async函数是 generator函数的语法糖；
```js
const fs = require('fs');

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

```
上面代码的函数 gen 可以写成 async 函数，就是下面这样

```js
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```
一比较就会发现， async函数就是将Generator函数的星号 (*)替换成 async, 将yield替换成 await, 仅此而已。

syn函数对Generator函数的改进，体现在一下四点。
1. 内置执行器
函数调用之后，会自动执行，Generator函数的执行必须靠执行器
2. 更好的语义
async和await,比起(*)和yield,语义更加清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果
3. 更广的适用性
co模块约定， yield命令后面只能是Thunk函数或者Promise对象，而async函数的await命令后面，可以是Promise对象和原始类型的值（数值，字符串，布尔值，但这时会自动转成立即resolved的Promise对象
4. 返回值是Promise
async函数的返回值是Promise对象，这比Generator函数的返回值Iterator对象方便多了，你可以用then方法指定下一步操作；


## async函数的实现原理
就是将 Generator函数和自动执行器，包装在一个函数里。
```js
async function fn(args) {
    // ...
}

function fn(args) {
    return spawn(function* () {
        // ...
    })
}
```
所有的 async 函数都可以写成上面的第二种形式，其中 spawn 函数就是自动执行器。
```js

```

## 实现一个 sleep 
每隔1秒输出 1， 2， 3， 4， 5
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
## 需要注意的点
### 多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
```js
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();

let foo = await fooPromise;
let foo = await barPromise;
```
上面两种写法，getFoo 和getBar都是同时触发的，这样就会缩短程序的执行时间。

### 
48. 说一下你对generator的了解？
## 概念
**异步编程解决方案**
返回一个遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

调用generator函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后每次调用遍历器对象的 next 方法，就会返回一个有着 value 和 done 两个属性的对象。value属性表示当前的内部状态的值。是yield表达式后面的那个值； done是一个布尔值，表示是否遍历结束。

## yiled表达式

generator返回的遍历器对象，只有调用 next 函数才会遍历下一个内部状态。提供了一种可以暂停执行的函数，yield表达式就是暂停标识。
遍历器对象 next的处理逻辑如下：
1. 遇到 yiled 表达式，就暂停执行后面的操作，并将紧跟 yield 后面表达式的值，作为返回的对象 value的属性值。
2. 下一次调用 next 方法就继续往下执行，直到遇到下一个 yield
3. 如果没有再遇到新的 yield 表达式，就一直运行到函数结束，直到return语句为止，并将 return 语句后面的表达式值，作为返回的对象的value属性值。
4. 如果该函数没有 return 语句，则返回的对象value 属性值为 undefined

## next方法的参数
**yield 表达式本身没有返回值，或者说总是返回undefined. next 方法可以带一个参数，该参数就会被当做上一个yield表达式的返回值**
```js
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```


## for of 循环

`for...of `可以自动遍历 Generator 函数运行时生成的 Iterator对象，且此时不再需要调用 `next`方法

```js
unction* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5
```
上面代码使用 for...of 循环，依次显示5个 yield 表达式的值。这里需要注意，一旦 next 方法返回对象的done属性为 true， for...of 循环就会终止，且不包含该返回对象，所以上面代码的 return 语句返回的6，不包含在 `for...of`循环之中。

下面是一个利用 Generator 函数和for...of循环，实现斐波那契数列的例子。
```js
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

for (let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n);
}
```


除了for of 循环以外，拓展运算符（...）、解构赋值和 `Array.from`方法内部调用的，都是遍历器接口。这意味着，它们都可以将 Generator 函数返回的 iterator对象 作为参数。

## Generator 函数的异步应用
传统方法（ES6之前）
- 回调函数
- 事件监听
- 发布/订阅
- Promise对象

```js
fs.readFile('/etc/passwd', 'utf-8', function (err, data) {
  if (err) throw err;
  console.log(data);
});
```

个有趣的问题是，为什么 Node 约定，回调函数的第一个参数，必须是错误对象err（如果没有错误，该参数就是null）？

原因是执行分成两段，第一段执行完以后，任务所在的上下文环境就已经结束了。在这以后抛出的错误，原来的上下文环境已经无法捕捉，只能当作参数，传入第二段。


### 协程的 Generator 函数 实现
交出函数的执行权（即暂定执行）；
Generator 函数可以**暂停执行**和**恢复执行**，这是它能封装异步任务的根本原因，除此之外，它还有两个特性。使它可以作为异步编程的完美解决方法：**函数体内外的数据交换**和**错误处理机制**。

#### 函数体内外的数据交换
next返回值得value属性，是Generator 函数向外输出数据；next方法还可以接受参数，想Generator 函数体内输入数据。
```js
function* gen(x){
  var y = yield x + 2;
  return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next(2) // { value: 2, done: true }
```

#### 错误处理机制
Generator 函数内部还可以部署错误处理代码，捕获函数体外抛出的错误。
```js
function* gen(x){
  try {
    var y = yield x + 2;
  } catch (e){
    console.log(e);
  }
  return y;
}

var g = gen(1);
g.next();
g.throw('出错了');
// 出错了
```
上面代码的最后一行，Generator 函数体外，使用指针对象的throw方法抛出的错误，可以被函数体内的try...catch代码块捕获。这意味着，出错的代码与处理错误的代码，实现了时间和空间上的分离，这对于异步编程无疑是很重要的。


### thunk函数
thunk函数是自动执行 Generator函数的一种方法

### CO模块

co模块的原理

为什么 co可以自动执行 Generator 函数？

Generator就是一个异步操作的容器。它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。

两个方法可以做到这一点。
1. 回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交出执行权。
2. Promise对象。将异步操作包装成Promise对象，用then方法交回执行权.

co模块其实就是将两种自动执行器（Thunk函数和Promise对象），包装成一个模块。使用co模块的条件是, Generator 函数的yield命令后面，只能是Thunk函数或Promise对象，如果数组或对象的成员，全部都是 promise对象，也可以使用co.

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

49. 说一下macrotask 和 microtask？
50. fetch api

51. 知道什么是事件委托吗？
52. 如何让网页离线后还能访问
53. 强缓存和协商缓存
54. script 标签的属性有哪些, script 标签的 defer 和 async 标签的作用与区别, script intergrity的作用
55. 页面加载白屏的原因有哪些，以及如何监控白屏时间，如何优化

56. 数组去重的几种方法
57. 浏览器缓存原理
