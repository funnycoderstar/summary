## 1.实现浅拷贝深拷贝
首先深复制和浅复制只针对像 Object, Array 这样的复杂对象的。简单来说，浅复制只复制一层对象的属性，而深复制则递归复制了所有层级。千万不要把赋值操作当做是浅拷贝

浅拷贝: 将B对象拷贝到A对象中,但不包括B里面的子对象
深拷贝: 将B对象拷贝到A对象中,但不包含B里面的子对象

### 栈和堆的区别
堆和栈都是内存中划分出来的可以存储的区域
堆:动态分配的内存, 大小不定也不会自动释放
栈:自动分配内存空间,它由系统自动释放

### 基本数据类型和引用数据类型
基本数据类型存在栈中, 值不可变, 比较是值的比较

引用类型存在堆中,变量实际上是一个存放在栈内存的指针,这个指针指向堆内存的地址值可变;
引用类型的比较是引用的比较,对引用类型进行操作的时候, 都是操作起对象的引用(保存在栈内存中的指针),所以比较两个引用类型,看其的引用是否指向同一个对象

```js
const a = [1, 2, 3];
const b = [1, 2 ,3];
console.log(a === b ); // false
```
虽然变量 a 和变量 b 都是表示一个内容为 1，2，3 的数组，但是其在内存中的位置不一样，也就是说变量 a 和变量 b 指向的不是同一个对象，所以他们是不相等的。

### 传值与传址
基本类型操作的时候,基本数据类型的赋值(=)是在内存中新开辟一段栈内存, 然后再将值赋值到新的栈中;所以基本类型赋值的两个变量是两个相互独立互相不影响的变量

### 值赋值, 浅拷贝, 深拷贝
```js
const a = [1, 2, 3];
const b = [1, 2 ,3];
var obj1 = {
    name: 'obj1',
    age: '12',
    a: [1, [3, 4], 8, 9]
};
var obj2 = obj1;

var obj3 = shallowCopy(obj1);
function shallowCopy(source) {
    var dist = {};
    for(let prop in source) {
        if(source.hasOwnProperty(prop)) {
            dist[prop] = source[prop];
        }
    }
    return dist;
}

obj2.name = 'obj2';
obj3.age = '50';

obj2.a[2] = ['111', '2222'];
obj2.a[3] = ['aaa', 'bbb'];

console.log(obj1);
const a = [1, 2, 3];
const b = [1, 2 ,3];
var obj1 = {
    name: 'obj1',
    age: '12',
    a: [1, [3, 4], 8, 9]
};
var obj2 = obj1;

var obj3 = shallowCopy(obj1);
function shallowCopy(source) {
    var dist = {};
    for(let prop in source) {
        if(source.hasOwnProperty(prop)) {
            dist[prop] = source[prop];
        }
    }
    return dist;
}

obj2.name = 'obj2';
obj3.age = '50';

obj2.a[2] = ['111', '2222'];
obj2.a[3] = ['aaa', 'bbb'];

console.log(obj1);
// { 
//     name: 'obj2',
//     age: '12',
//     a: [ 1, [ 3, 4 ], [ '111', '2222' ], [ 'aaa', 'bbb' ] ]
// }
console.log(obj2);
// { 
//     name: 'obj2',
//     age: '12',
//     a: [ 1, [ 3, 4 ], [ '111', '2222' ], [ 'aaa', 'bbb' ] ] 
// }
console.log(obj3);
// { 
//     name: 'obj1',
//     age: '50',
//     a: [ 1, [ 3, 4 ], [ '111', '2222' ], [ 'aaa', 'bbb' ] ] 
// }

```
obj1: 原始数据
obj2: 赋值操作得到
obj3: 浅拷贝得到

![image](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1555570283306.png?width=1304&height=418&imageView2/3/)
深拷贝是对对象以及对象的所有子对象进行拷贝;

## 实现深拷贝和浅拷贝

实现浅拷贝
```js
function shallowCopy(source) {
    if (!source || typeof source !== 'object') {
        throw new Error('error arguments');
    }
    var targetObj = source.constructor === Array ? [] : {};
    for (var keys in source) {
        if (source.hasOwnProperty(keys)) {
            targetObj[keys] = source[keys];
        }
    }
    return targetObj;
}
var obj = {
    a: 1,
    arr: [2, 3];
}
var shallowObj = shallowCopy(obj);
shallowObj.arr[1] = 5;
obj.arr[1]   // = 5
```
因为浅拷贝只会将对象的各个属性进行依次复制, 并不会进行递归复制,而js存储对象都是存地址的;所以浅复制会导致 obj.arr和 shallowObj.arr 指向同一块内存地址


### 实现深拷贝
而深拷贝规则不同,它不仅将原对象的各个属性逐个复制出去,而深复制则不同，它不仅将原对象的各个属性逐个复制出去，而且将原对象各个属性所包含的对象也依次采用深复制的方法递归复制到新对象上。这就不会存在上面 obj 和 shallowObj 的 arr 属性指向同一个对象的问题。

实现深拷贝: 
- 1. 递归
- 2. JSON.parse()和JSON.stringify(), 利用JSON对象的parse和stringify, JSON对象中的stringify可以把一个js对象序列化为一个JSON字符串, parse可以把JSON字符串反序列化为一个js对象,通过这两个方法, 也可以实现对象的深复制

```js
function deepCopy(source) {
    if (!source || typeof source !== 'object') {
        throw new Error('error arguments', 'shallowClone');
    }
    let targetObj = source.constructor === Array ? []: {};
    for(let keys in source) {
        if(source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = source[keys].constructor === Array ? [] : {};
            targetObj[keys] = deepCopy(source[keys]);
        } else {
            targetObj[keys] = source[keys];
        }
    }
    return targetObj;
}

var obj = {
    a: 1,
    arr: [2, 3],
}
var deepObj = deepCopy(obj);

deepObj.arr[1] = 5;
obj.arr[1]; // 3

```

### 浅拷贝: Object.assign
1.Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
```js
const target = { a: 1 };

const source1 = { b: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```
Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
```js
const obj1 = {a: {b: 1}};
const obj2 = Object.assign({}, obj1);

obj1.a.b = 2;
obj2.a.b // 2
```
上面代码中,源对象的obj1的a属性的值是一个对象,object.assign拷贝得到的是这个对象的引用.这个对象的任何变化,都会反映到目标对象上
2. 解构赋值也是浅拷贝
```js
let obj = { a: { b: 1 } };
let { a } = obj;
obj.a.b = 3;
console.log(a.b) // 3
```
扩展运算符的解构赋值也是浅拷贝
```js
let obj = { a: { b: 1 } };
let { ...x } = obj;
console.log(x);
obj.a.b = 3;
console.log(x.a.b) // 3
```

### 深拷贝: JSON.parse()和JSON.stringify() 问题: 对象里的函数无法被拷贝,原型链里的属性无法被拷贝
最简单的深拷贝:
```js
b = JSON.parse( JSON.stringify(a) )
```
有一下问题:
1.循环引用会报错
```js
const x = {};
const y = {x};
x.y = y;

console.log(JSON.parse(JSON.stringify(x)));
// TypeError: Converting circular structure to JSON
```

2.某些属性无法拷贝

```js
const obj = {
    a: '1',
    arr: [1, 2 ,3],
    obj1: {
        o: 1,
    },
    b: undefined,
    c:  Symbol(),
    date: new Date(),
    reg: /a/ig,
    set: new Set([1, 2, 3]),
    foo: () => {
        console.log('foo');
    }
}
console.log(JSON.parse(JSON.stringify(obj)));
// { a: '1',
//   arr: [ 1, 2, 3 ],
//   obj1: { o: 1 },
//   date: '2019-04-18T08:11:32.866Z',
//   reg: {},
//   set: {} 
// }

```
2.1 如果被拷贝的对象中有`function`，`Symbol` 和 `undefined`, 则拷贝之后的对象就会丢失
2.2 如果被拷贝的对象中有`正则表达式`, `Set`，则拷贝之后的对象正则表达式会变成空对象
2.3. 然而date对象成了字符串

为什么有些属性无法被拷贝呢, 主要是JSON.stringify()的问题, 那么问题就变成了为什么有些属性无法被`stringify`呢?
因为 JSON 是一个通用的文本格式，和语言无关。设想如果将函数定义也 stringify 的话，如何判断是哪种语言，并且通过合适的方式将其呈现出来将会变得特别复杂。特别是和语言相关的一些特性，比如 JavaScript 中的 Symbol。


## 参考
- [js 深拷贝 vs 浅拷贝](https://juejin.im/post/59ac1c4ef265da248e75892b#comment)
- [javascript中的深拷贝和浅拷贝？](https://www.zhihu.com/question/23031215)
- [深入剖析 JavaScript 的深复制](https://jerryzou.com/posts/dive-into-deep-clone-in-javascript/)
- [你所不知道的JSON.stringify](https://blog.fundebug.com/2017/08/17/what-you-didnt-know%20about-json-stringify/)
- [JavaScript深拷贝的一些坑](https://juejin.im/post/5b235b726fb9a00e8a3e4e88)



## 2.广度优先遍历和深度优先遍历
[二叉树的深度优先遍历（DFS）与广度优先遍历（BFS）](https://blog.csdn.net/mingwanganyu/article/details/72033122)

## 3.函数科里化
```js
// add(1)(2)(3) = 6
// add(1, 2, 3)(4) = 10
// add(1)(2)(3)(4)(5) = 15

function add () {
    var args = [].slice.call(arguments);
    var fn = function () {
        return add.apply(null, [].slice.call(arguments));
    };
    fn.toString = function() {
        return args.reduce((a, b) => a + b);
    };
    
    return fn;
}
console.log(add(1, 2, 3)(4));

function curry(fn, args = []) {
    return function(){
        let rest = [...args, ...arguments];
        if (rest.length < fn.length) {
            return curry.call(this,fn,rest);
        }else{
            return fn.apply(this,rest);
        }
    }
}
//test
function sum(a,b,c) {
    return a+b+c;
}
let sumFn = curry(sum);
console.log(sumFn(1)(2)(3)); //6
console.log(sumFn(1)(2, 3)); //6
```

## 4.能否模拟实现JS的new操作符
```js
function Dog(name) {
    this.name = name
    this.say = function () {
        console.log('name = ' + this.name)
    }
}
function Cat(name) {
    this.name = name
    this.say = function () {
        console.log('name = ' + this.name)
    }
}
function _new(fn, ...arg) {
    const obj = {};
    obj.proto = fn.prototype;
    fn.apply(obj, arg)
    return Object.prototype.toString.call(obj) == '[object Object]' ? obj : {}
}
var dog = _new(Dog, 'xxx')
dog.say() //'name = xxx'
console.log(dog instanceof Dog) //true
var cat = _new(Cat, 'carname');
cat.say() //'name = carname'
console.log(cat instanceof Cat) //true
```
[](https://juejin.im/post/5bde7c926fb9a049f66b8b52)


