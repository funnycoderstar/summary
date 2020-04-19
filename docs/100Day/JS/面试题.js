
// Promise接受一个函数作为参数，函数里有两个参数，分别为resolve, reject,两个函数由JS引擎提供
const promises = new Promise((resolve, reject) => {
    // 返回数据 resolve(value)
    // 返回错误 reject(err)
 
 })
 
 // Promise.then 接收两个函数作为参数
 Promise.then((value) => {
 
 }, (error) => {
 
 })
 
 
 Promise.prototype.all = function(promises) {
    let len = promises.length;
    let count = 0;
    let result = [];
    return new Promise((resolve, reject) => {
       for(let i = 0; i < len; i++) {
          Promise.resolve(promises[i]).then((res)=> {
             count++;
             result[i] = res;
             if(i === len) {
               return resolve(result);
             }
          }, (err) => {
             return reject(err)
          })
       }
    })
 }
 Promise.prototype.race = function(promises) {
    let len = promises.length;
    return new Promise((resolve, reject) => {
       for(let i = 0; i < len; i++) {
          Promise.resolve(promises[i]).then((res)=> {
               return resolve(res);
          }, (err) => {
             return reject(err)
          })
       }
    })
 }
 
 function spawn(genF) {
    return new Promise(function(resolve, reject) {
       const gen = genF();
       function step(nextF) {
          let next;
          try {
             next = nextF();
          } catch(e) {
             return reject(e)
          }
          if(next.done) {
             return resolve(next.value);
          }
          Promise.resolve(next.value).then(function(v) {
             step(function() { return gen.next(v)})
          }, function (error) {
             step(function() { return gen.throw(e)})
          })
       }
       step(function() { return gen.next(undefined)})
    })
 }
 
 function makeIterator(array) {
    let nextIndex = 0;
    return {
       next: function() {
          return nextIndex < array.length ?  {
             value: array[nextIndex++];
             done:false,
          }
          : {
             value: undefined,
             done: true,
          }
 
       },
 
    }
 }
 
 
 const curry = (fn, ...args) => {
    args.length >= fn.length 
    ? fn(...args)
    : (..._args) => curry(fn, ...args, ..._args);
 
 }
 
 function _new(constructor, ...arg) {
    const obj = {};
    obj.__proto__ = constructor.prototype;
    const result = constructor.apply(obj, arg);
    return typeof result === 'object' ? result : obj;
    
 }
 Function.prototype.myCall = function(thisArg = window) {
    thisArg.fn = this;
    const args = [...arguments].slice(1);
    const result = thisArg.fn(...args);
    delete thisArg.fn;
    return result;
 }
 
 Function.prototype.myApply = function(thisArg = window) {
    thisArg.fn = this;
    let result;
    if(arguments[1]) {
       result = thisArg.fn(...arguments[1]);
    } else {
       result = thisArg.fn();
    }
    delete thisArg.fn;
    return result;
 }
 
 Function.prototype.myBind = function(thisArg = window) {
   const fn = this;
   const args = [...arguments].slice(1);
   return function () {
      const newArgs = [...arguments];
      return fn.apply(thisArg, args.concat(newArgs))
   }
 }
 
 // 1
 float: left;
 
 width: auto;
 
 
 // 2
 float: left;
 
 width: 100%;
 padding-left: left;
 
 
 // 3
 leftfa
 float: left;
 width: 100%;
 
 left
 margin-right: right
 
 
 float: left;
 marin-left: -right
 
 
 
 
 // 1
 
 postion: absolute
 left: 0
 
 margin-left: left;
 margin-right: right;
 
 
 postion: absolute
 right: 0
 
 
 // 1
 
 float: left;
 
 margin-left: left;
 margin-right: right;
 
 float: right;s