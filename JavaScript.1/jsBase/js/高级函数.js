// 1,安全类型的检测函数
// var value = [];
// console.log(Object.prototype.toString.call(value));
// 判断是原生还是非原生JavaScript对象
var isNativeJSON = window.JSON && object.prototype.toString.call(JSON) === "[object jSON]";

// 2,防篡改对象
var person = { name: "wangyaxing" };
Object.preventExtensions(person);//调用后不能给person对象添加新属性和方法
Object.istExtensible()//可以确定对象是否可以拓展
// 密封对象,使用Object.seal(),不可拓展.而且已有成员的[[Configurable]]特性将被设置为false,意味着不能删除属性和方法,不能使用Object.defineProperty()把属性修改为访问器属性

Object.isSealed() //可以确定对象是否被密封了.Object.isExtensible()检测密封的对象也会返回false

Object.freeze() //冻结对象,冻结的对象既不可扩展,又是密封的,[[Writable]]特性会被设置为false,
Object.isFrozen() //