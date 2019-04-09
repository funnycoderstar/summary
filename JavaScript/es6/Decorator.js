1,类的修饰
@testable
class MyTestableClass {
  // ...
}

function testable(target) {
  target.isTestable = true;
}

MyTestableClass.isTestable // true
@testable就是一个修饰器，他修饰MyTestableClass这个类的行为，为他加上静态属性isTestable

@decorator
class A {}
A = decorator(A) || A;
// 注意，修饰器可以改变类的行为，是在编译时发生的，而不是运行中
2，方法的修饰
class Person {
  @readonly
  name() { return `${this.first} ${this.last}` }
}
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
// 上面代码说明，修饰器（readonly）会修改属性的描述对象（descriptor），然后被修改的描述对象再用来定义属性。
// 修改属性描述对象的enumerable属性，使得该属性不可遍历。
// 下面的@log修饰器，可以起到输出日志的作用。
3,core-decorators.js
// core-decorators.js是一个第三方模块，提供了几个常见的修饰器，通过它可以更好地理解修饰器。
@autobind
// autobind修饰器使得方法中的this对象，绑定原始对象。
@readonly
// readonly修饰器使得属性或方法不可写。
@override
// override修饰器检查子类的方法，是否正确覆盖了父类的同名方法，如果不正确会报错。
@deprecate(别名@deprecate)
// deprecate或deprecated修饰器在控制台显示一条警告，表示该方法将废除。
@suppressWarnings
// suppressWarnings修饰器抑制decorated修饰器导致的console.warn()调用。但是，异步代码发出的调用除外。
