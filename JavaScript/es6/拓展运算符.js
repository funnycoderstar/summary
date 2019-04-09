// 1, ... 是拓展运算符,将一个数组转为用逗号分隔的参数序列。
console.log(...[1, 2, 3]); // 1 2 3
console.log(1, ...[2, 3, 4], 5); // 1 2 3 4 5
// console.log(...document.querySelectorAll('div')); // [<div>, <div>, <div>]

// 该运算符主要用于函数调用
function push(array, ...items) {
    array.push(...items);
}

function add(x, y) {
    return x + y;
}
const numbers = [4, 38];
console.log(add(...numbers));
// 于正常的函数参数结合使用
function f(v, w, x, y, z) {

}
const args = [0, 1];
f(-1, ...args, 2, ...[3]);

// 替代数组的apply
// es5
Math.max.apply(null, [14, 3, 77]);
// es6的写法
Math.max(...[14, 7, 3]);
// 等同于
Math.max(14, 7, 3);

// 将一个数组添加到另一个数组的尾部
// ES5的写法
const arr1 = [0, 1, 2];
const arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);
// ES6
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);
// push方法的参数不能是数组，所以只好通过apply方法变通使用push方法。有了扩展运算符，就可以直接将数组传入push方法。
// ES5
new (Date.bind.apply(Date, [null, 2015, 1, 1]))
// ES6
new Date(...[2015, 1, 1]);

// 拓展运算符的应用
// 1,合并数组
// ES5
[1, 2].concat(more)
// ES6
[1, 2, ...more]

// 2, 与解构赋值结合,可以生成数组
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]
const [first, ...rest] = [];
first // undefined
rest  // []

const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []
// 果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。

// 3,函数的返回值,正常的js只能返回一个值,但是用拓展运算符,可以返回数组或对象
const dateFields = readDateFields(database);
const d = new Date(...dateFields);
// 从数据库中取出一行数据,直接将其传入构造函数Date

// 4,字符串 可以将字符串转成真正的数组
[...'hello']
// [ "h", "e", "l", "l", "o" ]
// 那就是能够正确识别32位的Unicode字符。

function length(str) {
  return [...str].length;
}

length('x\uD83D\uDE80y') // 3
// 5 实现了Iterator接口的对象
// 任何Iterator接口的对象，都可以用扩展运算符转为真正的数组。
const nodeList = document.querySelectorAll('div');
const array = [...nodeList];
// querySelectorAll方法返回的是一个nodeList对象。它不是数组，而是一个类似数组的对象,但是用拓展运算符可以将其转为真正的数组

// 对于那些没有部署Iterator接口的类似数组的对象，扩展运算符就无法将其转为真正的数组。
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};

// TypeError: Cannot spread non-iterable object.
let arr = [...arrayLike];
// 可以使用Array.from方法将其转为真正的数组

// 6,Map和Set结构，Generator函数
// 扩展运算符内部调用的是数据结构的Iterator接口
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr = [...map.keys()]; // [1, 2, 3]

// Generator函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。
const go = function*(){
  yield 1;
  yield 2;
  yield 3;
};

[...go()] // [1, 2, 3]
// 对没有使用Iterator接口的使用拓展运算符,就会报错
