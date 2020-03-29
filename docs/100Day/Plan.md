## 计划
- require和import的区别
- setTimeout 和 requestAnimationFrame
- typeof和instanceof实现原理
- for of 的原理解析
- async的原理
- class的原理
- var const let

- css中的一些单位 em rem，vw，calc

- promise
- vue和react谈谈区别和选型考虑
- 事件循环
- 原型链
- 深拷贝浅拷贝
https://juejin.im/post/59ac1c4ef265da248e75892b
- 节流和防抖
    - 节流和防抖
    - loadsh源码分析
- pwa，web-worker
- js数据类型
- js数据类型转换
    - 
- this,bind，apply 和 call
    - 原型链，Function的实例方法
    - this
    - 性能
    - 
https://juejin.im/post/59bfe84351882531b730bac2
- 函数科里化
    - 闭包
    - 

- docker
- 反向代理

## http系列


- 面试题
```js
function Foo() {
    getName = function() {console.log(1)}
    return this;
}
Foo.getName = function() {console.log(2)};
Foo.prototype.getName = function() { console.log(3)};
var getName = function() { console.log(4) };
function getName() { console.log(5) };

Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
```