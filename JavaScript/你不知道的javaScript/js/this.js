function foo() {
    console.log(this.a);
}
var a = 2;
var o = { a: 3, foo: foo};
var p = { a: 4};

o.foo(); //3
(p.foo = o,foo)();//2
// p.foo = o,foo 的返回值是目标函数的引用,调用位置是foo(),会使用默认绑定
// 使用默认绑定,如果函数处于严格模式,this会被绑定到undefined 否则this会被绑定到全局对象

// 软绑定
if( ! Function.prototype.sortBind) {
    Function.prototype.sortBind = function(obj) {
        var fn = this;
        var curried = [].slice.call( arguments, 1);
        var bound = function () {
            return fn.apply(
                (! this || this === (window || global)) ? obj: this;
                curried.concat.apply( curried, arguments);
            )
        };
        bound.prototype = Object.create( fn.prototype );
        return bound;
    }
}


function foo() {
    console.log('name:' + this.name);
}

var obj = { name: 'obj'};
var obj2 = { name: 'obj2'};
var obj3 = { name: 'obj3'};

var fooOBJ = foo.sortBind( obj );
fooOBJ();
obj2.foo = foo.sortBind(obj);
obj2.foo();

fooOBJ.call(obj3);
setTimeout( obj2.foo, 10);

// 判断一个运行中函数的this绑定,需要找到这个函数的直接调用位置,找到后就应用下面四条规则来判断this的绑定
1,由new调用,绑定到新创建的对象
2,由call 或 apply (或bind)调用 绑定到指定的对象
3,由上下文对象调用绑定到那个上下文对象
4,默认:在严格模式下绑定到undefined,否则绑定到全局对象
// 箭头函数不使用四条标准的绑定规则,而是根据当前的词法作用域来决定this,箭头函数会继承外层函数调用的this绑定