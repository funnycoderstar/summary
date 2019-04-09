[参考](https://juejin.im/post/597724c26fb9a06bb75260e8)

// 1,promise的立即执行性
// var p = new Promise(function(resolve, reject){
//   console.log("create a promise");
//   resolve("success");
// });

// console.log("after new Promise");

// p.then(function(value){
//   console.log(value);
// });
// create a promise
// after new Promise
// success
// 2，promise三种状态
// var p1 = new Promise(function (resolve, reject) {
//     resolve(1);
// });
// var p2 = new Promise(function (resolve, reject) {
//     setTimeout(function () {
//         resolve(2);
//     }, 500);
// });
// var p3 = new Promise(function (resolve, reject) {
//     setTimeout(function () {
//         reject(3);
//     }, 500);
// });

// console.log(p1);
// console.log(p2);
// console.log(p3);
// setTimeout(function () {
//     console.log(p2);
// }, 1000);
// setTimeout(function () {
//     console.log(p3);
// }, 1000);

// p1.then(function (value) {
//     console.log(value);
// });
// p2.then(function (value) {
//     console.log(value);
// });
// p3.catch(function (err) {
//     console.log(err);
// });
// Promise { 1 }
// Promise { <pending> }
// Promise { <pending> }
// 1
// 2
// 3
// Promise { 2 }
// Promise { <rejected> 3 }
// var p1 = Promise.resolve( 1 );
// var p2 = Promise.resolve( p1 );
// var p3 = new Promise(function(resolve, reject){
//   resolve(1);
// });
// var p4 = new Promise(function(resolve, reject){
//   resolve(p1);
// });

// console.log(p1 === p2); 
// console.log(p1 === p3);
// console.log(p1 === p4);
// console.log(p3 === p4);

// p4.then(function(value){
//   console.log('p4=' + value);
// });

// p2.then(function(value){
//   console.log('p2=' + value);
// })

// p1.then(function(value){
//   console.log('p1=' + value);
// })
// true
// false
// false
// false
// p4=1
// p2=1
// p1=1
