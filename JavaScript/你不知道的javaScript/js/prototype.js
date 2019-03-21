function Foo() {

}
Foo.prototype; //{}Foo的原型,通过Foo.prototype的属性引用来访问它

function Foo() {

}
var a = new Foo();
Object.getPrototypeOf( a ) === Foo.prototype;

// 模仿类的行为
function Foo(name) {
    this.name = name;
}
Foo.prototype.myName = function () {
    return this.name;
};
var a = new Foo('a');
var b = new Foo('b');
a.myName();
b.myName();

// 1,isPrototypeOf 方法允许你检查一个对象是否存在于另一个对象的原型链上。
prototypeObj.isPrototypeOf(object)
// object
// 在该对象的原型链上搜寻
// 返回值
// Boolean，表示调用对象是否在另一个对象的原型链上。

//2, Object.create() 方法使用指定的原型对象和其属性创建了一个新的对象。

// 创建关联
var foo = {
    something: function() {
        console.log('Tell me something good..');
    }ø
}
var bar = Object.create(foo);
bar.something; //Tell me something good..

// 3,Object.getPrototypeOf() 方法返回指定对象的原型（即, 内部[[Prototype]]属性的值）

// 4,Object.setPrototypeOf() 方法设置一个指定的对象的原型 ( 例如,内置的 [[Prototype]]属性）到另一个对象或  null
Object.setPrototypeOf(obj, prototype)

// 5,所有对象都会从它的原型上继承一个 constructor 属性：

var o = new Object // 或者 o = {}
o.constructor == Object
var a = new Array  // 或者 a = []
a.constructor == Array
var n = new Number(3)
n.constructor == Number

// 小结
// 1,访问对象上不存在的一个属性,[[get]]操作就会查找对象内部[[prototype]]关联的对象;
// 2,所有普通对象都有内置的Object.prototype,指向原型链的顶端,在原型链上找不到指定的属性就会停止,
// toString() , valueOf()和其他一些通用的功能都会存在于Object.prototype对象上
// 3,关联两个对象最常见的方法是使用new关键词进行函数调用
// 4,使用new调用函数时会把新对象的.prototype属性关联到'其他对象'
// 带new的函数调用通常被称为'构造函数调用
