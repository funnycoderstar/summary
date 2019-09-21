// 词法作用域
// function foo(a) {
//     var b = a * 2;
//     function bar(c) {
//         console.log(a,b,c);
//     }
//     bar(b * 3);
// }
// foo(2);

// 欺骗词法作用域
// function foo(str, a) {
//     eval(str); //欺骗
//     console.log(a,b);
// }
// var b = 2;
// foo("var b = 3;", 1);

// var obj = {
//     a: 1,
//     b: 2,
//     c: 3,
// };
// // 单调乏味的重复'obj'
// obj.a = 2;
// obj.b = 3;
// obj.c = 4;
// // 简单的快捷方式
// with(obj){
//     a = 3;
//     b = 4;
//     c = 5;
// }

function foo(obj) {
    with(obj) {
        a = 2;
    }
}
var o1 = {
    a: 3,
};
var o2 = {
    b: 3,
};

foo(o1);
console.log(o1.a);
foo(o2);
console.log(o2.a);
console.log(a);//a被泄露到全局作用域上了

// eval(..)函数如果接受了一个含有一个或多个声明的的代码,就会修改其所处的语法作用域
// with声明实际上是根据你传递给它的对象凭空创建了一个全新的词法作用域

// 这两个机制的副作用是引擎无法再编译时对作用域查找进行优化,因为引擎只能谨慎地认为这样的优化是无效的,使用这其中任何一个机制都将导致代码运行变慢,不要适应他们;