// 1,Array.from 方法用于将两类对象转化为真正的数组: 1类似数组的对象和可遍历的对象,2,可遍历的对象
// const obj = {
//     '1': 'a',
//     '2': 'b',
//     length: 3
// }
// Array.from(obj);
// console.log(Array.from(obj));

// NodeList对象
// let ps = document.querySelectorAll('p');
// Array.from(ps).forEach(function (p){
//     console.log(p);
// })
// arguments对象
// function foo() {
//     var args = Array.from(arguments);
// }
console.log(Array.from('hello')); // // ['h', 'e', 'l', 'l', 'o']