// 1,属性的简洁表示法
const birth = '2017/01/01';
const Person = {
    name: '张三',
    birth, // 等同于birth: birth
    hello() {
        console.log('我的名字是', this.name);
    },
    // hello: function(){},
}
// 用于函数的返回值
function getPoint() {
    const x = 1;
    const y = 10;
    return [x, y];
}
gePoint();// {x: 1, y: 10};

// CommonJS模块输出变量
const ms = {};
function getItem (key) {
    return key in ms ? ms[key] :null;
}
function setItem (key, value) {
    ms[key] = value;
}
function clear () {
    ms = {};
}
module.exports = { getItem, setItem, clear };
// 等同于
module.exports = {
    getItem: getItem,
    setItem: setItem,
    clear: clear,
};
// 简洁写法的属性名总是字符串,class是字符串
const obj = {
    class() {
        //
    }
}
const obj = {
    'class': function() {

    }
}
// 如果某个方法的值是一个Generator函数,前面需要加上*号
const obj = {
    * m() {
        yield 'hello world';
    }
}

// 2,属性名表达式
obj.foo = true;
obj['a' + 'bc'] = 123;

const obj = {
    foo: true,
    abc: 123,
};

// 用表达式作为对象的属性名,即把表达式放在方括号内
let proKey = 'foo';
let obj = {
    [proKey]: true,
    ['a' + 'bc']: 123,
};
// 表达式还可以用于定义方法名
let obj = {
    ['h' + 'ello']() {
        return 'hi';
    }
}
obj.hello();

3,Object.is() // 判断两个值是否严格相等
不同之处只有两个：一是+0不等于-0，二是NaN等于自身。

+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true

Object.defineProperty(Object, 'is', {
    value: function (x, y) {
        if(x === y) {
            // 针对+0 不等于 -0的情况
            return x !== 0 || 1 / x === 1 / y;
        }
        // 针对NaN的情况
        return x !== x && y !== y;
    },
    configurable: true,
    enumerable: false,
    writable: true
})

4,Object.assign() // 用于对象的合并，将源对象(source)的所有可枚举属性，复制到目标对象(target)

var target = { a: 1 };

var source1 = { b: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}

Object.assign(),方法的第一个参数是目标对象，后面的参数都是源对象


Object.assign方法实行的是浅拷贝，而不是深拷贝，如果源对象的某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用
Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性(不拷贝继承属性)，也不拷贝不可枚举的属性(enumerable: false);
Object.assign({b: 'c'},
    Object.defineProperty({}, 'invisible', {
        enumerable: false,
        value: 'hello'
    })
 )
 // { b: 'c'};
//  上面代码中,Object.assign要拷贝的对象只有一个不可枚举属性Invisible,这个属性并没有被拷贝进去
常见用途
Object.assign
1，为对象添加属性
class Point {
    constructor(x, y) {
        Object.assign(this, {x, y});
    }
}
2,为对象添加方法
Object.assign(SomeClass.prototype, {
    someMethod(arg1, arg2) {
        ...
    },
    anotherMethod() {
        ...
    }
});
等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {
    ...
};
SomeClass.prototype.anotherMethod = function() {

}
3，克隆对象
function clone(origin) {
    return Object.assign({}, origin);
}
4，合并多个对象
// 将多个对象合并到某个对象
const merge = (target, ...sources) => Object.assign(targin, ...sources);
// 合并后返回一个新对象
const merge = (...sources) => Object.assign({}, ...sources);
5，为属性指定默认值
const DEFAULTS = {
    logLevel: 0,
    outputFormat: 'html'
};
function processContent (options) {
    options = Object.assign({}, DEFAULTS，options);
}

6,属性的可枚举性
对象的每个属性都有一个描述对象(Descriptor),用来控制改属性的行为
Object.getOwnPropertyDescriptor可以获取该属性的描述对象
Object.getOwnPropertyDescriptors返回指定对象所有自身属性(非继承属性)的描述对象
const obj = {
  foo: 123,
  get bar() { return 'abc' }
};

Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }
某些操作会忽略enumerable为false的属性
es5的三个操作会忽略
for ... in 循环 // 会遍历继承的属性
Object.keys()
JSON.stringify()
es6新增的Object.assign(),会忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性

// 7,属性的遍历 es6中提供了5种方法
for ... in // 
Object.keys(obj) //返回一个数组
Object.getOwnPropertyNames(obj) //返回一个数组，包含对象自身的所有属性
Object.getOwnPropertySymbols(obj) //返回一个数组，包含对象自身的所有Symbol属性
Reflect.ownKeys(obj) //返回一个数组，包含对象自身的所有属性，不管属性名是Symbol或字符串，也不管是否可枚举

// 8 
 _proto_属性，
 Object.defineProperty(Object.prototype, '_proto_', {
     get() {
         let _thisObj = Object(this);
         return Object.getPrototypeOf(_thisObj);
     },
     set(proto) {
         if (this === unddefined || this === null) {
             throw new TypeError();
         }
         if(!isObject(this)) {
             return undefined;
         }
         if(!isObject(proto)) {
             return undefined;
         }
         let status = Reflect.setPrototypeOf(this, proto);
         if(!status) {
             throw new TyepError();
         }
     },
 });
 function isObject(value) {
     return Object(value) === value;
 }
 Object.setProtoTypeOf(), // 用来设置一个对象的prototype属性,返回参数对象本身，是es6正式推荐的设置原型对象的方法
 Object.getPrototypeOf(), //
 Object.create(); 
9,Object.keys() //返回一个数组，成员是参数对象自身的(不含继承的)所有课遍历(enumerable)属性的键名
es7引入了跟Object.keys配套的Object.values和Object.entries,作为遍历一个对象的补充手段,供for ... of循环使用

let {keys, values, entries} = Object;
let obj = { a: 1, b: 2, c: 3};
for(let key of keys(obj)) {
    console.log(key); // ’a‘, 'b'. 'c'
}
for(let values of values(obj)) {
    console.log(values); // 1, 2, 3
}
for(let [key, value] of entries(obj)) {
    console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3];
}

10，对象的拓展运算符
(1) 解构赋值 从一个对象取值，将所有可比遍历的、但尚未被读取的属性，分配到指定的对象上面
注意：
1，等号右边是一个对象，如果是null或undefined,就会报错
2，解构赋值必须是最后一个参数
3，解构赋值的拷贝是浅拷贝
(2) 拓展运算符用于取出参数对象的所有可遍历属性，拷贝到当前对象中

let z = { a: 3, b: 4};
let n = { ...z };
n //{ a: 3, b: 4};
等同于使用Object.assign方法
let aClone = { ...a};
let aClone = Object.assign({}, a);

12， null传导运算符 ?.
// 如果 a 是 null 或 undefined, 返回 undefined
// 否则返回 a.b.c().d
a?.b.c().d

// 如果 a 是 null 或 undefined，下面的语句不产生任何效果
// 否则执行 a.b = 42
a?.b = 42

// 如果 a 是 null 或 undefined，下面的语句不产生任何效果
delete a?.b