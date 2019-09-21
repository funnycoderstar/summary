// var x = 1;
// function foo() {
//     x++;
//     bar();
//     console.log(`x:${x}`);
// }
// function bar() {
//     x++;
// }
// foo(); // x:3
// http://www.cnblogs.com/diligenceday/p/5488037.html
// generator函数和普通的函数区别有两个1,funciton和函数名之间有*,2,函数体内部使用了yield表达式
function* func() {
    yield 1;
    yield 2;
}
// 如果运行的话,返回一个Iterator实例,然后再执行Iterator实例中的next()方法,然后这个函数才开始真正运行,并把yield后面的值包装成固定对象并返回,直到运行到函数结尾,最后再返回undefined
// function *func() {
//     yield 1;
//     yield 2;
// }
// var it = func();
// console.log(it);
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// {}
// { value: 1, done: false }
// { value: 2, done: false }
// { value: undefined, done: true }
// yield generator函数返回的Iterator运行的过程中,如果遇到yield,就会把yield后面的值返回,此时函数就相当于停止了,下次函数再执行next(),函数又会从上次停止的地方继续执行
// 如果return 和yield一起使用,return的值也会作为最后的返回值,如果return语句后还有yield,这些yield不生效
// function *bar() {
//     yield 0;
//     yield 1;
//     return 2;
//     yield 3;
// }
// var it = bar();
// console.log(it);
// console.log(it.next());
// console.log(it.next());
// console.log(it.next())
// console.log(it.next());
// {}
// { value: 0, done: false }
// { value: 1, done: false }
// { value: 2, done: true }
// { value: undefined, done: true }

// 不能在非generator里使用yield
// var arr = [1, [[2, 3], 4], [5, 6]];
// var flat = function*(a) {
//     a.forEach((i) => {
//         if(typeof i !== 'number') {
//             yield* flat(item);
//         } else {
//             yield item; // Unexpected identifier
//         }
//     })
// }
// for(var f of flat(arr)) {
//     console.log(f);
// }
// callback是普通函数,所以编译的时候直接抛出错误,我们需要改成generator的函数体中
// const arr = [1, [[2, 3], 4], [5, 6]];
// const flat = function*(a) {
//     const length = a.length;
//     for(let i = 0; i < length; i++) {
//         if(typeof a[i] !== 'number') {
//             yield* flat(a[i]);
//         } else {
//             yield a[i];
//         }
//     }
// }
// for(var f of flat(arr)) {
//     console.log(f);
// }
// 1, 2, 3, 4, 5, 6
// 我们可以把数组的forEach改成generator函数
// var arr = [1, [[2, 3], 4], [5, 6]];
// Array.prototype.forEach = function* (callback) {
//     for(var i=0; i<this.length; i++) {
//         yield* callback(this[i],i ,this[i]);
//     }
// }
// var flat = function* (a) {
//     yield* a.forEach(function* (item) {
//         if (typeof item !== 'number') {
//             yield* flat(item);
//         } else {
//             yield item;
//         }
//     })
// };

// for (var f of flat(arr)){
//     console.log(f);
// }
// 1, 2, 3, 4, 5, 6

// Iterator的return的值不会被for...of循环到,也不会被拓展符遍历到,一下的return 2和yield完全不生效了
// function* gen() {
//     yield 0;
//     yield 1;
//     return 2;
//     yield 3;
// };
// let g = gen();
// console.log([...g]); //输出：[ 0, 1 ]
// for(let foo of g) {
//     console.log( foo ); //输出 0, 1
// }

// yield*允许你在generator函数里再套一个generator函数;你在generator里调用另一个generator需要使用: yield*函数()这种语法

// function* foo() {
//     yield 0;
//     yield 1;
// }
// function* bar() {
//     yield 'x';
//     yield* foo();
//     yield 'y';
// }
// for (let v of bar()){
//     console.log(v);
// }
// x 0 1 y

// next()
// generator函数返回的iterator执行next()方法后,返回值的结构为
// {
//     value: 'value', // value为返回的值
//     done: false,    // done是一个布尔值,如果Iterator为遍历完毕,会返回false,否则返回undefined
// }
// 我们可以模拟一个generator生成器

// function gen(arr) {
//     let arrIndex = 0;
//     return {
//         next: function () {
//             return arrIndex < arr.length ?
//                 {
//                     value: arr[arrIndex++],
//                     done: false
//                 }
//                 :
//                 {
//                     value: undefined,
//                     done: true
//                 }
//         }
//     }
// }
// var it = gen(["arr0", "arr1", "arr2", "arr3"]);
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

// { value: 'arr0', done: false }
// { value: 'arr1', done: false }
// { value: 'arr2', done: false }
// { value: 'arr3', done: false }
// { value: undefined, done: true }

// 同样,我们可以模拟一个对象的Iterator,因为对象本身是你没有Iterator的,我们为对象添加[Symbol.iterator]方法
// const itObj = {
//     0: "00",
//     1: "11",
//     2: "22",
//     3: "33",
//     length: 4,
//     [Symbol.iterator]() {
//         const that = this;
//         let arrIndex = 0;
//         return {
//             next: function () {
//                 return arrIndex < that.length ?
//                     {
//                         value: that[arrIndex++],
//                         done: false
//                     }
//                     :
//                     {
//                         value: undefined,
//                         done: true
//                     }
//             }
//         }
//     }
// }
// console.log([...itObj]);
// [ '00', '11', '22', '33' ]

// next() 方法的参数,
// 如果给next方法传参数,那么这个参数将会作为上一次yield语句的返回值,这个在异步处理中是非常重要的,因为在异步执行过程中,有时候需要上一步异步执行的结果,作为下一个异步的返回值

function* foo(x) {
    const y = 2 * (yield(x + 1));
    const z = yield(y / 3);
    return (x + y + z);
}
var a = foo(5);
console.log(a.next());
console.log(a.next());
console.log(a.next());
// { value: 6, done: false }
// { value: NaN, done: false }
// { value: NaN, done: true }

var b = foo(5);
console.log(b.next());
console.log(b.next(12));
console.log(b.next(13));
// { value: 6, done: false }
// { value: 8, done: false }
// { value: 42, done: true }

简单梳理一下上面代码的执行
第一次调用a.next();返回x+1的值是6;
第二次调用next的时候没带参数,导致y的值等于2*undefined(NaN),除以3以后还是NaN,因此返回对象的value属性也NaN
第三次运行next的时候不带参数,所以z等于undefined,返回value属性等于 5 + NaN + undefined,即NaN

如果向next方法提供参数,返回结果就完全不一样了
第一次调用a.next();返回x+1的值是6;
第二次调用next,将上一次yield表达式的值设为12,因此y等于24,返回y/3等于8,
第三次调用next方法,将上一次yield表达式的值设为13,因此z等于13,这时x等于5,y等于24,所以return语句的值等于42

注意: 由于next方法的参数表示上一个yield表达式的返回值,所以在第一次使用next方法时,传递参数是无效的,V8引擎直接忽略第一次使用next方法时的参数,只有从第二次使用next方法开始,参数才是有效的
从语义上讲,第一个next方法用来启动宾利器对象,所以不用带参数
