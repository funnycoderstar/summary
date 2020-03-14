## 计划
- require和import的区别
- setTimeout 和 requestAnimationFrame
- typeof和instanceof实现原理
- for of 的原理解析
- async的原理
- class的原理
- var const let


- Promise
- vue和react谈谈区别和选型考虑
- 事件循环
- 原型链
- 深拷贝浅拷贝
- 节流和防抖
- this
- pwa, web-worker

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