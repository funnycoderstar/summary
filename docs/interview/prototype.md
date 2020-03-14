## 目录
- 原型链相关
- prototype和__proto__的区别
- class的原理

## 下面分别是什么，及它们的关系
- `__proto__`
- `setPrototypeOf`
- `Object.getPrototypeOf()`: 返回指定对象的原型
- `Object.create`
- isPrototypeOf() : 方法用于测试一个对象是否存在于另一个对象的原型链上。
- contructor
- instanceof


## 调试
JavaScript规范并不是控制浏览器开发者工具对于特定值或结构的表示方式。浏览器和引擎可以自己选择合适的方式进行解析。因此，浏览器和工具的解析结果并不一定相同。
chrome浏览器中的输出
```js
function Foo() {};
var a1 = new Foo();
a1;
// Foo {}
```
含义为”{}“是一个空对象，由名为Foo的函数构造。
Chromene内部跟踪”构造函数方法名“方法是Chrome自身的一种扩展行为，并不包含在JavaScript规范中。
如果不是使用”构造函数“来生成对象，Chrome就无法跟踪对象内部的”构造函数方法名“,这样的对象输出是Object {}，意思是"Object() 构造出的对象"

## [Object.prototype.__proto__](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)
Object.prototype的`__proto_`_属性是一个访问器属性（一个getter函数和一个setter函数），暴露了通过它访问的对象的内部[[prototype]](一个对象或null)。
- 现在更推荐使用`Object.getPrototypeOf/Reflect.getPrototypeOf` 和`Object.setPrototypeOf/Reflect.setPrototypeOf`.
- 创建一个新的且可以继承 [[Prototype]] 的对象，推荐使用 `Object.create()`。
```js
let Circle = function () {};
let shape = {};
let circle = new Circle();
 
// 设置该对象的原型链引用
// 过时且不推荐使用的。这里只是举个例子，尽量不要在生产环境中这样做。
shape.__proto__ = circle;

// 判断该对象的原型链引用是否属于circle
console.log(shape.__proto__ === circle); // true
```
## __proto__ VS prototype
__proto__: 指向构造该对象的构造函数的原型
prototype: 
```js
const one = new Object();
// 实例对象one的隐式原型指向 构造函数Object的原型（Object.prototype）
console.log(one.__proto__ === Object.prototype); // true

function A() {};
const a = new A();
// 实例对象a的隐式原型指向 构造函数A的原型（A.prototype）
console.log(a.__proto__ === A.prototype); // true
```
## Object.setPrototypeOf()
[Object.setPrototypeOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)
设置一个指定的对象原型(即内部[[prototype]]属性)到另一个对象或null上
Object.setPrototypeOf(obj, prototype)
- obj：要设置其原型的对象。
- prototype： 该对象的新原型(一个对象 或 null)

Object.setPrototypeOf()是ECMAScript 6最新草案中的方法，相对于 Object.prototype.__proto__ ，它被认为是修改对象原型更合适的方法

Polyfill:
我们必须借助非标准的  
使用较旧的 Object.prototype.__proto__ 属性，我们可以很容易地定义Object.setPrototypeOf 如果它不可用：.
```js
// 仅适用于Chrome和FireFox，在IE中不工作：
Object.setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
  obj.__proto__ = proto;
  return obj; 
}
```

## [Object.create()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`。

```js
if (typeof Object.create !== "function") {
    Object.create = function (proto, propertiesObject) {
        if (typeof proto !== 'object' && typeof proto !== 'function') {
            throw new TypeError('Object prototype may only be an Object: ' + proto);
        } else if (proto === null) {
            throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
        }

        if (typeof propertiesObject != 'undefined') throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");

        function F() {}
        F.prototype = proto;

        return new F();
    };
}
```

## [isPrototypeOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf)
方法用于测试一个对象是否存在于另一个对象的原型链上。

`isPrototypeOf()` 与 `instanceof` 运算符不同。在表达式 `"object instanceof AFunction"`中，object 的原型链是针对 `AFunction.prototype` 进行检查的，而不是针对 AFunction 本身。

`prototypeObj.isPrototypeOf(object)`
- object: 在该对象的原型链上搜寻

如果你有段代码只在需要操作继承自一个特定的原型链的对象的情况下执行，同 instanceof 操作符一样 isPrototypeOf() 方法就会派上用场，例如，为了确保某些方法或属性将位于对象上。

例如，检查 baz 对象是否继承自 Foo.prototype：
```js

if (Foo.prototype.isPrototypeOf(baz)) {
  // do something safe
}
```
## construtor(“构造函数”))
对于 construtor的一个常见错误理解
```js
function Foo() {};
Foo.prototype.constructor === Foo; // true

var a = new Foo();
a.constructor === Foo; // true
```
Foo.prototype默认（在代码中第一行声明时）有一个公有并且不可枚举的属性 .constructor，这个属性引用的是对象关联的函数。此外，我们可以看到通过“构造函数”调用 new Foo() 创建的对象也有一个.constructor属性，指向"创建这个对象的函数"。

实际上 a 本身并没有.construtor属性。并且虽然a.constructor确实指向Foo函数，但是这个属性并不是代表 a 由 Foo "构造"。
实际上，.construtor引用同样被委托给了 Foo.prototype，而Foo.prototype.construtor 默认指向 Foo.

举例来说，Foo.prototype的.construtor属性只是Foo函数在声明时的默认属性。如果你创建了一个新对象并替换了函数默认的.prototype对象引用，那么新对象并不会自动获得.construtor属性。
```js
function Foo() {};
Foo.prototype = {};

var a = new Foo();
a.constructor === Foo; // false
a.constructor === Object; // true
```
a 并没有.construtor属性，所以它会委托 [[ptoyotype]]]链上的 Foo.prototype。但是这个对象也没有.construtor 属性（不过默认的Foo.prototype对象也有这个属性），所以它会继续委托，这次委托会委托链顶端的Objet.prototype。这个对象有.construtor属性，指向内部的Object()函数。

错误观点已被摧毁。
当然，你可以给Foo.prototype添加一个.constructor属性，不过这需要手动添加一个符合正常行为的不可枚举属性
```js
function Foo() {...}
Foo.prototype = {}; // 创建一个新的原型对象
Object.defineProperty(Foo.prototype, "constructor", {
    enumerable: false,
    writable: false,
    configuraable: true,
    value: Foo,
})
```
修复.construtor需要很多手动操作。

.constructor 并不是一个不可变属性。它是不可枚举的，但是它的值是可写的（可以被修改）。此外，你可以给任意[[prototype]] 链中的任意对象添加一个名为 construtor的属性或者对其修改，你可以任意对其复制。

结论：一些随意的对象属性引用，比如a.constructor，实际上是不被信任的，它们不一定会执行默认的函数引用。这是一个不可靠并且不安全的引用。通常来说要尽量避免使用这些引用

## 原型继承

有两种常见的错误用法
```js
// 和你想要的机制不一样
Bar.prototype == Foo.prototype;

// 基本满足你的需求，但是可能会产生一些副作用
Bar.prototype == new Foo();
```
Bar.prototype = Foo.prototype 并不会创建一个关联到Bar.prototype的新对象，它只是让Bar.prototype直接引用到Foo.prototype对象。因此当你执行类似 Bar.prototype.myLabel = ...的赋值语句会直接修改Foo.prototype对象本身。显然这不是你想要的结果，否则你根本不需要Bar对象，直接使用Foo就可以了。

Bar.prototype = new Foo() 的确会关联到 Bar.prototype的新对象。但是它使用了Foo(...)的“构造函数调用”，如果函数Foo有一些副作用（比如写日志，修改状态，注册到其他对象、给this添加数据属性等等）的话，就会影响到Bar()的“后代”，后果不堪设想。

因此。要创建一个合适的关联对象，我们必须使用Object.create(...)而不是使用具有副作用的Foo(...)，这样做唯一的缺点就是需要创建一个新对象，然后把旧对象抛弃掉，不能直接修改已有的默认对象。

如果能有一个标准并且可靠的方法来修改对象[[prototype]]关联就好了。在ES6之前，我们只能通过设置.__proto__属性来实现，但是这个方法并不是标准并且无法兼容所有浏览器。ES6添加了辅助函数`Object.setPrototypeOf()`，可以用标准并且可靠的方法来修改关系。

我们来对比两种把Bar.prototype关联到 Foo.prototype 的方法
```js
Bar.prototype === Object.create(Foo.prototype);

Object.setPrototypeOf(Bar.prototype, Foo.prototype);
```
如果忽略掉`Object.create(...)`方法带来的轻微性能损失（抛弃的对象需要进行垃圾回收），它实际上比ES6及其之后的方法更短并且可读性更高。不过无论如何，这是完全不同的语法。

## 检查“类”的关系

> 概念理解：


```js
function Foo() {};
Foo.prototype.blah = ...;
var a = new Foo(;
a instanceOf Foo; // true
```
instanceOf 操作符的左操作数是一个普通的对象，右操作数是一个函数。instanceOf 回答的问题是： 在 a 的整条 [[prototype]]链中是否有指向Foo.prototype的对象？

这个方法只能处理 对象(a)和函数（带.prototype引用的Foo）之前的关系。如果你想判断两个对象（比如a和b)之间是否通过[[prototype]]链关联，只用instanceOf 无法实现。


```js
function isRelated(o1, o2) {
    function F() {};
    F.prototype = o2;
    return o1 instanceOf F;
}
var a = {};
var b = Object.create(a);

isRelated(b, a); // true
```
isRelated(...) 内部我们声明了一个一次性的函数F，把它的.prototype重新赋值并指向对象o2，然后判断o1是否是F的一个“实例”。显而易见，o1实际上并没有继承F也不是由F构造，所以这种方法非常愚蠢并且容易造成误解。

下面是第二种判断[[prototype]]反射的方法，它更加简洁：
```js
Foo.prototype.isPrototypeOf(a); // true
```
isPrototypeOf(..)回答的问题是：在a的整条[[prototype]]]链中是否出现过Foo.prototype?

同样的问题，同样的答案，但是在第一种方法中并不需要间接引用函数（Foo）,它的 prototype属性会被自动访问。

我们只需要连个对象就能判断它们之前的关系
```js
// 非常简单： b是否出现在c的 [[prototype]]链中
b.isPrototypeOf(c);
```
这个方法并不需要使用函数（类），它直接使用b和c之间的对象引用来判断它们的关系。换句话说，语言内置的isPrototype(...)函数就是我们的isRelatedto(...)函数

我们也可以直接获取一个对象的[[prototype]]链。在ES5中，标准方法是
```js
Object.getPrototypeOf(a);
```
可以验证一下，这个对象引用是否跟我们想的一样
```js
Object.getPrototypeOf(a) === Foo.prototype; // true
```
绝大多数（不是所有）浏览器也支持一种非标准的方法来访问内部的 [[prototype]]属性
```js
a.__proto__ === Foo.prototype; // true
```
这个奇怪的.__proto__属性“神奇地”引用了内部的[[prototype]]对象。如果你想直接查找（甚至可以直接通过.__proto__.__proto__ ...来遍历）原型链的话，这个方法非常有用。

> 和我们之前说过的.construtor一样，__proto__实际上并不存在于你正在使用的对象(本例中是a)。实际上，它和其他的常用函数（.toString()、.isPrototypeOf(...)，等等 一样，存在于内置的Object.prototype中。（它们是不可枚举的，参见第2章）；

此外，`.__proto__`看起来很像一个属性，但是实际上它更像一个 getter/setter。
`.__proto__`的实现大致是这样的
```js
Object.defineProperty(Object.prototype, "__proto__", {
    get: function() {
        return Object.getPrototypeOf(this);
    },
    // ES6中的Object.setPrototypeOf
    set: function(o) {
        Object.setPrototypeOf(this, o);
        return o;
    }
})
```
因此，访问（获取值） a.__proto__时，实际上是调用了 a.__proto__()(调用getter函数)。虽然getter函数存在于Object.prototype对象中，但是 它的 this 指向对象 a，所以和object.getPrototypeOf(a)结果相同。

`.__proto__`是可设置属性，之前的代码中使用ES6的Object.getPrototypeOf(...)进行设置。然而，通常来说你不需要修改已有对象的[[prototype]]。


## 对象关联
[[prototype]] 机制就是存在对象中的一个内部链接，它会引用其他对象。通常来说，这个链接的作用是：如果在对象上没有找到需要的属性或者方法引用，引擎就会继续在[[prototype]]关联的对象上进行查找。同理，如果在后者中也没有扎到需要的引用就会继续查找它的[[prototype]]，以此类推。这一系列对象的链接被称为“原型链”。

### 创建关联

```js
var foo = {
    something: function() {
        console.log('Hello World');
    }
}
var bar = Object.create(foo);
bar.something(); // Hello World
```
Object.create(...)会创建一个新对象(bar)并把它关联到我们指定的对象(foo)，这样我们就可以充分发挥[[prototype]]]机制的（委托）并且避免不必要的麻烦（比如使用 new 的构造函数调用会生成.prototype和.constructor引用）。

Object.create(null)会创建一个拥有空（或者说null）[[prototype]]链接的对象，这个对象无法进行委托。由于这个对象没有原型链，所以instanceOf 操作符无法进行判断，因此总是会返回false。这些特殊的空[[prototype]]对象通常被称作“字典”，它们完全不会受到原型链的干扰，因此非常适合用来存储数据。

Object.create()的polyfill代码
```js
if(!Object.create) {
    Object.create = function(o) {
        function F() {};
        F.prototype = o;
        return new F();
    }
}
```
这段polyfill代码使用了一个一次性函数F，我们通过改写它的.prototype属性使其指向想要关联的对象，然后再使用 new F() 来构造一个新对象进行关联。

##  原型链中prototype和__proto__分别指什么
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

## class实现原理： class是一个语法糖，很多都可以用es5的语法实现
class需要注意的问题
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