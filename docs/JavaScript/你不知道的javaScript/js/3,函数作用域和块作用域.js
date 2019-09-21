//具名和匿名
setTimeout(function(){
    console.log('i waited 1 second');
},1000);

// 立即执行函数 ((function(){...})); (function(){...})();
var a = 2;
(function foo(){
    var a = 3;
    console.log(a);
})();
console.log(a);

// 进阶
var a = 2;
(function foo(global){
    var a = 3;
    console.log(a);
    console.log(global.a);
})(window);


// 倒置代码的运行顺序
var a = 2;
(function IIFE(def){
    def(window);
})(function def(global){
    var a = 3;
    console.log(a);
    console.log(global.a);
});

// 块作用域 let 为其声明的变量隐式地劫持了所在的块作用域
for (let i = 0;i < 10;i++){
    console.log(i);
}
console.log(i);//undefined

// 小结:函数是javaScript 中最常见的作用域单元,本质上,声明在一个函数内部的变量和函数会在所处的作用域中'隐藏'起来
// 函数不是唯一的作用域单元;块作用域指的是变量和函数变量和函数不仅可以属于所处的作用域,也可以属于某个代码块