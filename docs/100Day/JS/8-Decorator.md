## 前言
JavaScript装饰器(Decorator)的语法现在处于 Stage 2 阶段，具体的可以查看 [proposal-decorators](https://github.com/tc39/proposal-decorators)。

文章下面的内容是根据以前的提案同时参考了一些文章，已经有点过时了。

最近会好好看一下官方的一些规范，对内容做出修改。感谢 `@justjavac `大大指出这个致命的错误说法，之后在学习的时候也会注意不能总是看现在的一些文章，技术文章是有时效性的，是要多看官方的一些文档和规范。

## 目录
- 装饰器
- 类的装饰
- 方法的装饰
- 为什么装饰器不能用于函数
- core-decorators.js

## 装饰器
装饰器(Decorator)目前，是一种与类相关的语法，用来注释或修改类和类的方法。

装饰器是一种函数，写成 `@ + 函数名`。它可以放在类和类方法的定义前面
```js
@frozen class Person {
  @readonly
  age() {}

  @log
  sayName() {}
}
```
上面一共用了三个装饰器，一个用在类本身，另外两个用在类方法。

> 装饰器(Decorator) 也并不是一个新的概念，其他语言比如 Java，Python等已经很早就有了，装饰器(Decorator)借鉴了其他语言的写法，不过依赖于ES5的`Object.defineProperty` 方法 。


## 类的装饰
```js
@name
class A {
  // ...
}

function name(target) {
  target.name = 'A';
}

A.name // A

```
@name就是一个装饰器，它修改了A这个类的行为，为它加上了静态属性name。name函数的参数target是A类本身。

```js
@decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A;
```
也就是说，装饰器是一个对类进行处理的函数。装饰器函数的第一个参数，就是所要装饰的目标类。

如果想实现添加多个参数的功能，可以在装饰器外面再封装一层函数。
```js
function name(name) {
    return function(target) {
      target.name = name;
    }
  }

@name('A')
class A {}
A.name // A

@name('B')
class B {}
B.name // B
```
上面例子是给类添加一个静态属性（静态属性是加上类上面的，在实例上不能访问）。

如果想添加实例属性，可以通过目标类的 Prototype对象操作。

```js
export function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list)
  }
}

// app.js
import { mixins } from './mixins'

const log = {
  log() { console.log('这是一条日志输出') }
};

@mixins(log)
class A {}

let a = new A();
a.log() // '这是一条日志输出'
```

实际开发中，React 与 Redux 库结合使用时，常常需要写成下面这样。
```js
class MyReactComponent extends React.Component {};

export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent);
```

有了装饰器，就可以改写上面的代码。
```js
@connect(mapStateToProps, mapDispatchToProps)
export default class MyReactComponent extends React.Component {};
```

> 由于装饰器现在还处于草案阶段，所以 react-redux 官方不支持或不建议将connect用作装饰器[issues](https://github.com/reduxjs/react-redux/issues/1469)

## 方法的装饰

```js
class Person {
  // 用来装饰”类“的 name 方法
  @readonly
  name() { return `${this.name}` }
}
```
装饰器函数readonly一共可以接受三个参数。

```js
function readonly(target, name, descriptor){
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
}

readonly(Person.prototype, 'name', descriptor);
// 类似于
Object.defineProperty(Person.prototype, 'name', descriptor);
```
- 装饰器第一个参数是类的原型对象，上例是Person.prototype，装饰器的本意是要“装饰”类的实例，但是这个时候实例还没生成，所以只能去装饰原型（这不同于类的装饰，那种情况时target参数指的是类本身）
- 第二个参数是所要装饰的属性名
- 第三个参数是该属性的描述对象

装饰器还有注释的作用，比如上面我们可以一眼看出上面 name的方法是只读的。
除了注释，装饰器还能用来类型检查。所以，对于类来说，这项功能相当有用。从长期来看，它将是 JavaScript 代码静态分析的重要工具。在TypeScript里已做为一项实验性特性予以支持。


## 为什么装饰器不能用于函数
装饰器只能用于类和类的方法，不能用于函数，因为存在函数提升。
```js
var counter = 0;

var add = function () {
  counter++;
};

@add
function foo() {}
```
上面的代码，意图是执行后counter等于 1，但是实际上结果是counter等于 0。因为函数提升，使得实际执行的代码是下面这样。

```js
@add
function foo() {
}

var counter;
var add;

counter = 0;

add = function () {
  counter++;
};
```

总之，由于存在函数提升，使得装饰器不能用于函数。类是不会提升的，所以就没有这方面的问题。

## core-decorators.js
[core-decorators.js](https://github.com/jayphelps/core-decorators)是一个第三方模块，提供了几个常见的装饰器。
- @autobind：使得方法中的this对象，绑定原始对象
- @readonly：使得属性或方法不可写。
- @override：检查子类的方法，是否正确覆盖了父类的同名方法，如果不正确会报错。
- @deprecate (别名@deprecated)：在控制台显示一条警告，表示该方法将废除。

## 应用
有一个方法，很多类都需要，比如只读，打印日志，防抖，节流等等，这时就可以把这些公共的方法用装饰器的形式添加到类上面。这种写法比单独地在每个类里单独调用这些公共方法看上去会清楚很多（装饰器有注释的作用，清晰明了）。

但是实际实现的时候要注意如果一个类本身或类方法，有多个装饰器的时候，要注意他们的调用顺序。

已经有很多第三方库提供了很多常见的装饰器，具体的可以直接去github上搜索，如果需要的不是很多的话，可以自己实现。

> 目前，[Babel转码器](https://babeljs.io/repl/)已经支持Decorator，只要勾选Experimental，就能支持Decorator的在线转码。项目中通过配置[@babel/plugin-proposal-decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators)插件就可以使用装饰器了。

## 参考
- [JS 装饰器（Decorator）场景实战](https://zhuanlan.zhihu.com/p/30487077)
- [ECMAScript 6 入门-装饰器](https://es6.ruanyifeng.com/#docs/decorator)
- [TypeScript中的Decorator](http://www.typescriptlang.org/docs/handbook/decorators.html)
- [@babel/plugin-proposal-decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators)
- [proposal-decorators](https://github.com/tc39/proposal-decorators)





 
