// 1,新的原始数据类型Symbol,表示独一无二的值
// Symbol值通过symbol函数生成,对象的属性名可以有两种类型,原来就有的字符串,另一种是新增的Symbol类型
// 凡是属性名属于Symbol类型,都是独一无二的,可以保证不会与其他属性名产生冲突
let s = Symbol();
typeof s;
// Symbol函数前不能使用new,因为生成的Symbol是一个原始类型的值,不是对象

var s1 = Symbol('foo');
var s2 = Symbol('bar');
// 加参数表示Symbol值的描述

const obj = {
    toString() {
        return 'abc';
    }
}
const sym = Symbol(obj);
// 如果Symbol的参数是一个对象,就会调用该对象的toString方法,转为字符串

// Symbol值不能与其他类型的值进行运算
// 可以显式转为字符串,也可以转为布尔值,但是不能转为数值

var sym = Symbol('My symbol');
String(sym);
sym.toString();

var sym = Symbol();
Boolean(sym); // true
!sym // false

// 2,作为属性名的Symbol
// 不能用点操作符
// 定义一组常量,就是任何值都不可能有相同的值

// 3,消除魔术字符串


