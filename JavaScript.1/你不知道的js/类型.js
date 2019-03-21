// var a = null;
// (! a && typeof a === 'object'); // true

// // 将类数组转化为真正的数组

// function foo () {
//     var arr = Array.prototype.slice.call(arguments);
//     arr.push("bam");
//     console.log(arr);
// }
// foo('bar', 'baz'); // ['bar', 'baz', 'bam'];

// // 用Array.from()也能实现这个功能
// ...
// var arr = Array.from(arguments);
// ...

// // js中的数字范围
// Number.MAX_SAFE_INTEGER Number.MIN_SAFE_INTEGER
// Number.MAX_VALUE Number.MIN_VALUE
// 最大的整数 2^53-1

// // 整数检测
// Number.isInteger()
// 检测是否是安全的整数
// Number.isSafeInteger()
// // 32位有符号整数
// 虽然最大整数能达到53位，但是有的运算(数位操作)只适用于32位有符号整数,Math.pow(-2,31)~Math.pow(2, 31);
// a | 0,可以将变量a转换为有效整数；
// 一些特殊值NaN和Infinity并不是32位安全范围的
// // 特殊值之NaN 是js中唯一一个不等于自身的值
// // NaN !== NaN  true 他与任何一个值都不相等
// // isNaN() 检测一个参数是否不是NaN,也不是一个数
// window.isNaN('foo') // true 'foo'既不是NaN,也不是数字
// window.isNaN(2/'foo') // true
// ES6 Number.isNaN('foo') //false
// // 特殊值之Infinity 无穷数
// 1/0 Infinity
// -1/0 -Infinity
// Infinity/Infinity  NaN

// // 特殊值之 -0
// -0除了可用作常量外，也可以是某些数学运算的返回值
// var a = 0 / -3 // -0
// var b = 0 * -3 // -0

// JSON.stringify(-0) // "0"
// JSON.parse('-0') //-0
// -0 == 0 // true
// -0 === 0 // true
// 区分 -0 和 0
// function isNegZero(n) {
//     n = Number(n);
//     return (n === 0) && (1 / n === Infinity);
// }


// // Object.is()判断两个值是否绝对相等
//  var a = 2 / 'foo';
//  var b = -3 * 0;
//  Object.is(a, NaN); // true
//  Object.is(b, -0); // true
//  Object.is(b, 0); // false
//  if(! Object.is) {
//      Object.is = function(v1, v2) {
//         //  判断是否是-0
//         if(v1 === 0 && v2 === 0) {
//             return 1 / v1 === 1 / v2;
//         }
//         // 判断是否是NaN
//         if(v1 !== v1) {
//             return v2 !== v2;
//         }
//         // 其他情况
//         return v1 === v2;
//      }
//  }

// //  值和引用
// function foo(wrapper) {
//     wrapper.a = 42;
// }
// var obj = {
//     a: 2
// };
// foo(obj);
// obj.a // 42

// function foo(x) {
//     x = x + 1;
//     x; // 2
// }
// var a = 2;
// var b = new Number(a) //
// foo(b);
// console.log(b); // 是2不是3
// 标量基本类型值是不可更改的，
// x = x +1,x中的标量基本值2从数字对象中拆分出来后，x就从引用变成了数字对象;

// 基本类型中定义了几个特殊的值
// null 类型只有一个值null,undefined也只有一个值undefined，所有变量在赋值前默认值都是undefined。volid运算符返回undefined

// 数字类型有几个特殊值，包括NaN，+Infinity,-Infinity和-0
// 简单标量基本类型值(字符串和数字等)通过值复制来赋值/传递，而复合值(对象等)通过引用复制来赋值、传递
// js中的引用和其他语言中的引用/指针不同,他们不能指向别的变量/引用,只能指向值
