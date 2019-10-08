- [react](https://reactjs.org/)
- [UmiJS](https://umijs.org/zh/): 可插拔的企业级react应用框架
- [Nextjs](https://nextjs.frontendx.cn/): 轻量级React服务端渲染应用框架
- [dva](https://github.com/dvajs/dva): 基于 redux, redux-saga and react-router轻量级的框架

hooks
React 怎么知道 useState 对应的是哪个组件，因为我们并没有传递 this 给 React。
- [React 是如何把对 Hook 的调用和组件联系起来的？](https://zh-hans.reactjs.org/docs/hooks-faq.html#under-the-hood)

- [我应该使用单个还是多个 state 变量？](https://zh-hans.reactjs.org/docs/hooks-faq.html#should-i-use-one-or-many-state-variables)
现在使用 useState, 是直接替换原来的state, 而 class的this.setState 会把更新后的字段合并入对象中。

- [Hook 规则](https://zh-hans.reactjs.org/docs/hooks-rules.html)

useEffect 做了什么
为什么在组件内部调用 useEffect， 可以访问 组件内部的State，而不需要其他特殊的API
useEffect会在每次渲染后都执行吗： 是的。第一次渲染之后和每次更新之后都会执行。

为什么要在 effect中返回一个函数？ 这是effect 可选的清除机制。每个 effect 都可以返回一个清除函数。如此可以将添加和移除订阅的逻辑放在一起。它们都属于 effect 的一部分。

effect 何时清除 effect?
React组件卸载的时候执行清除操作。正如之前学到的， effect 在每次渲染的时候都会执行，这就是为什么 React会在执行当前effect之前对上一个 effect 进行清除。

通过跳过Effect进行性能优化？
在某些情况下，每次渲染后都执行清理或者执行 effect 可能会导致性能问题。
如果某些特定值在两次渲染之间没有发生变化，你可以通知 React 跳过对 effect的调用，只要传递数组作为 useEffect的第二个可选参数即可。
```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```
上面示例中我们传入 `[count]` 第二个参数。这个参数的作用是什么呢？ 如果count的值是5，而且我们组件重新渲染的时候 count还是等于5， React将对前一次渲染的 [5] 和后一次渲染的 [5]进行比较。因为数组中所有的元素都是相等的( 5 === 5),React就会跳过这个effect, 这就实现了性能的有优化。

注意：如果你要使用此优化方法，请确保数组中包含了所有外部作用域中会随时间变化并且在 effect 中使用的变量， 否则你的代码会引用到先前渲染中的旧变量。
如果想执行只运行一次的effect(仅在组件挂载或者卸载执行时)。可以传递一个空数组作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。
如果你传入了一个空数组，effect内部的props和state 就会一直拥有其初始值。
[eslint-plugin-react-hooks]()，[exhaustive-deps]()， 规则会在添加错误依赖时发出警告并给出修复建议。


# Hook是怎么工作的。
## 两次渲染间， React如何知道哪个 useState调用对应与哪个state变量?
靠的是**Hook调用的顺序**。只要Hook的调用顺序在多次渲染之间保持一致， React就能正确地将 state 和对应的Hook进行关联；
**这就是为什么 Hook需要在我们组件的最顶层调用**。如果我们想要有条件地执行一个 effect，可以将判断放到 Hook 的内部：

## React又是如何匹配前后两次渲染中的每一个 effect的

## 子定义 Hook
自定义 Hook,可以将组件逻辑提取到可重用的函数中。
- 自定义 Hook必须以 "use"开头么，
  必须如此。这个约定非常重要
- 在两个组件中使用相同的 Hook 会共享 state 吗？
不会。自定义 Hook 是一种重用状态逻辑的机制(例如设置为订阅并存储当前值)，所以每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的。
- 自定义 Hook 如何获取独立的 state？
每次调用 Hook，它都会获取独立的 state。

# React内置的Hook API
- 基础 Hook
  - useState
  - useEffect
  - useContext

- 额外的Hook
  - useReducer
  - useCallback
  - useMemo
  - useRef
  - useImperativeHandle
  - useLayoutEffect
  - useDebugValue

# TS
## interface ！！！
### 任意属性
### 只读属性

## 数组的类型
- 类型 + 方括号表示法 ： number[]， 最简单的表示方法
- 数组泛型， `Array<elemType>`： Array<number>
- 接口表示数组， 较复杂，一般不用，常用来表示类数组;
```js
interface NumberArray {
  [index: number]: number; // 只要索引的类型是数字时，那么值的类型必须是数字。
}
let arr: NumberArray = [1, 3, 4];
```
- 类数组，类数组不是数组类型，比如 `arguments`
```js
function sum() {
  let args: number[] = arguments;
}
// Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.
```
arguments是一个类数组，应该使用接口定义
```js
function sum() {
  let args: {
    [index: number]: number;
    length: number;
    callee: Function

  } = arguments;
}
```
我们除了约束当前索引的类型是数字时，值的类型必须是数字之前，也约束了它还有的length和callee属性。
常用的类数组都有自己的接口定义， 如 `IArguments`, `NodeList`, `HTMLCollection`等
```js
function sum() {
  let args: IArguments = arguments;
}
```
IArguments是Typescript中定义好的类型, 它实际上就是：
```js
interface IArguments {
  [index: number]: any;
  length: number;
  callee: Function
}
```
- any 在数组中的应用, 用 any 表示数组中允许出现任意类型：
```js
let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
```
## 函数的类型
### 函数声明
#### 函数表达式
```js
let mySum = function (x: number, y: number): number {
    return x + y;
};
```
上面这些是可以通过编译的。不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 `mySum`,是可以通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 mySum 添加类型，则应该是这样；
```js
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
```

> 不要混淆 typescript 中的 `=>` 和es6中的 `=>`
在typescript的类型定义中， `=> `用来表示函数的定义，左边是输入类型， 需要用括号括起来， 右边是输出类型。
在es6 中， `=>`叫做箭头函数。

## 类型断言
用来手动指定一个值的类型。
语法
- <类型> 值
```js
function getLength(something: string | number): number {
    if ((<string>something).length) {
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}
```
- 值 as 类型

## 类型别名
用来给一个类型起一个新的名字

```js
type NameResolver = () => string;
type EventNames = 'click' | 'scroll' | 'mousemove';
```
类型别名常用于联合类型

## 字符串字面量类型
用来约束取值只能是某几个字符串中的一个。
```js
type A = string | number;
```
注意，类型别名与字符串字面量类型都是使用 `type` 进行定义。

## 元组 ！！！！
数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。
```js
let tom: [string, number] = ['Tom', 25];
```

## 枚举
枚举（Enum） 类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝。
### 常数项和计算所得项
### 常数枚举
使用 `const enum` 定义的枚举类型；
常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。
### 外部枚举
使用`declare enum`定义的枚举类型；
declare 定义的类型只会用于编译时的检查，编译结果中会被删除。
外部枚举与声明语句一样，常出现在声明文件中。
同时使用 declare 和 const 也是可以的：

## 类 ！！！

修饰符（Modifiters）：修饰符是一些关键字，用于限定成员或类型的性质。比如`public`表示公有属性和方法
抽象类（Abstract Class）：抽象类是供 其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现。
接口（Interfaces）：

### TypeScript中类的用法
TypeScript 可以使用三种访问修饰符，分别是`public`,`private`和`protected`;
- `public`修饰的属性和方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是`public`的
- `private`修饰的属性和方法是私有的，不能在声明它的类的外部访问
- `protected`修饰的属性和方法是受保护的，它和`private`类似，区别是它在子类中也是允许被访问的。

#### readonly
只读属性关键字，只允许出现在属性声明和索引签名中。?
```js
class Animal {
    readonly name;
    public constructor(name) {
        this.name = name;
    }
}

let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';

// index.ts(10,3): TS2540: Cannot assign to 'name' because it is a read-only property.
```
#### 抽象类
`abstract`用于定义抽象类和其中的抽象方法。
什么是抽象类？
抽象类是不允许被实例化的
```js
abstract class Animal {
    public name;
    public constructor(name) {
        this.name = name;
    }
    public abstract sayHi();
}

let a = new Animal('Jack');

// index.ts(9,11): error TS2511: Cannot create an instance of the abstract class 'Animal'.
```
其次，抽象类中的抽象方法必须被子类实现。
```js
abstract class Animal {
    public name;
    public constructor(name) {
        this.name = name;
    }
    public abstract sayHi();
}

class Cat extends Animal {
    public eat() {
        console.log(`${this.name} is eating.`);
    }
}

let cat = new Cat('Tom');

// index.ts(9,7): error TS2515: Non-abstract class 'Cat' does not implement inherited abstract member 'sayHi' from class 'Animal'.
```
上面的例子中，我们定义了一个类 `Cat`继承了抽象类`Animal`,但是没有实现抽象方法`sayHi`,所以编译报错了;
下面是一个正确使用抽象类的例子：
```js
abstract class Animal {
    public name;
    public constructor(name) {
        this.name = name;
    }
    public abstract sayHi();
}

class Cat extends Animal {
    public sayHi() {
        console.log(`Meow, My name is ${this.name}`);
    }
}

let cat = new Cat('Tom');
```
上面的例子中，我们实现了抽象方法 sayHi，编译通过了。
### 类的类型
与接口类似
```js
class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    sayHi(): string {
        return `My name is ${this.name}`
    }
}

const a: Animal = new Animal('Jack');
console.log(a.sayHi());
```
## 类与接口
之前学习过， 接口（interfaces）可以用于对（对象的形状进行描述）。
这一章中主要介绍接口的另一个用途，对类的一部分行为进行抽象。

### 类实现接口
### 接口继承接口
### 接口继承类
### 混合类型

## 泛型 ！！！
泛型是指在定义函数，接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特征。
### 简单的例子
数组中的每一项都应该是输入的`value`的类型。
```js
function createArray<T>(length: number, value: T): Array<T> {
    const result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArray<string>(3, 'x');
```
我们在函数名后添加了<T>，其中`T`用来指代任意输入的类型，在后面的输入 `value: T`和输出`Array<T>`中即可使用了。
### 多个类型参数
定义泛型的时候，可以一次定义多个类型参数;
```js
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}
swap([7, 'seven']);
```
上例中，我们定义了一个 swap 函数，用来交换输出的元组。

### 泛型约束
在函数内部使用泛型变量的时候，如果事先不知道它是哪种类型，所以不能随意的操作他的属性和方法
```js
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length);
  return arg;
}
// index.ts(2,19): error TS2339: Property 'length' does not exist on type 'T'.
```
泛型T不一定包含属性length,所以编译的时候报错了。
这时，我们要对泛型进行约束，只允许这个函数传入哪些包含 length 属性的变量。这就是泛型约束。
```js
interface Lengthwise {
  length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```
上例中，我们使用extends约束了泛型`T`必须符合 `Lengthwise`的形状，也就是必须包含`length`属性。
此时如果调用 loggingIdentity 的时候，传入的 arg 不包含 length，那么在编译阶段就会报错了：

多个类型参数之前也可以相互约束
```js
function copyFields<T extends U, U>(target: T, source: U): T {
    for (const id in source) {
        target[id] = (<T>source)[id];
    }
    return target;
}
const x = { a: 1, b: 2, c: 3, d: 4 };
copyFields(x, { b: 10, d: 20 })
```
上例中，我们使用了两个类型参数，其中要求T继承U， 这样就保证了U上不会出现T中不存在的字段。

### 泛型接口
之前学习过，可以用接口定义一个函数需要符合的形状
```js
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
```
当然也可以使用含有泛型的接口来定义函数的形状
```js
interface CreateArrayFunc {
    <T>(length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```
仅一步，我们可以把泛型参数提前到接口名上：
```js
interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc<any>;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```
注意，此时在使用泛型的时候，需要定义泛型的类型；

### 泛型类
泛型接口类似，泛型也可以用于类的类型定义中。
```js
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```
### 泛型参数的默认值
```js
function createArray<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
```
## 声明合并

如果定义了两个相同名字的函数，接口或类，那么它们会合并成一个类型。
### 函数的合并
我们可以使用重载定义多个函数的类型；
```js
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```
### 接口的合并
接口中的属性在合并时会简单的合并到一个接口中
```js
interface Alarm {
  price: number;
}
interface Alarm {
  weight: number;
}
```
相当于
```js
interface Alarm {
  price: number;
  weight: number;
}
```
注意：合并的属性类型必须是唯一的:
```js
interface Alarm {
    price: number;
}
interface Alarm {
    price: number;  // 虽然重复了，但是类型都是 `number`，所以不会报错
    weight: number;
}
```
```js
interface Alarm {
    price: number;
}
interface Alarm {
    price: string;  // 类型不一致，会报错
    weight: number;
}

// index.ts(5,3): error TS2403: Subsequent variable declarations must have the same type.  Variable 'price' must be of type 'number', but here has type 'string'.
```

接口中方法的合并，与函数的合并一样
```js
interface Alarm {
    price: number;
    alert(s: string): string;
}
interface Alarm {
    weight: number;
    alert(s: string, n: number): string;
}
```
相当于
```js
interface Alarm {
    price: number;
    weight: number;
    alert(s: string): string;
    alert(s: string, n: number): string;
}
```
### 类的合并
和接口的和并规则一致。

## tsconfig.json
目录中存在 `tsconfig.json`文件，表明该目录是 TypeScript项目的根目录。 tsconfig.json文件指定了根文件和编译项目所需的编译器选项。

[声明文件](https://microsoft.github.io/TypeSearch/)

# class 中的super作用
```js
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```
子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错，这是因为子类自己的 this对象，必须先通过父类的构建函数完成塑造。得到与父类相同的实例属性和方法，然后再对其进行加工。加上子类自己的实例属性和方法。如果不能调用 super 方法，子类就得不到this 对象。
```js
class Point { /* ... */ }

class ColorPoint extends Point {
  constructor() {
  }
}

let cp = new ColorPoint(); // ReferenceError
```
上面的代码中 ColorPoint 继承了 父类 Point ,但是它的构造函数没有调用 super 方法，导致新建实例时报错。


ES5的继承，实质是先创造子类的实例对象 this， 然后再将父类的方法添加到 this 上面，ES6的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用 super方法），然后再用子类的构造函数修改 this。
# class 中的 static
## 静态方法
类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是通过类来调用，这就称为”静态方法“。
## 静态属性
静态属性指的是Class本身非属性，即`Class.propName`,而不是定义在实例对象(this)上的属性
```js
// 老写法
class Foo {
  // ...
}
Foo.prop = 1;

// 新写法
class Foo {
  static prop = 1;
}
```

[prettier是什么](https://zhuanlan.zhihu.com/p/34287543)
[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier): 
关闭所有不必要的或可能与Prettier冲突的规则。
prettier 在一些规则上和 eslint 冲突，可以使用eslint-config-prettier 关闭冲突的所有的规则。
[Eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier#options)ESLint插件，将Prettier作为ESLint规则运行，并将差异报告为单个ESLint问题。
