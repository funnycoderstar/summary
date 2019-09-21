## 函数柯里化

### [bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

#### bind函数的调用
```js
function foo() {
    this.b = 100;
    return this.a;
}
var func = foo.bind({a: 1});
func(); // 1
new func(); // foo { b: 100 }
```
#### bind函数的实现

![bind](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1554649999638.png?width=1248&height=651&imageView2/3/)


bind函数其实是实现了this的指定和参数的传递
```js

if(!Function.prototype.bind) {
    // oThis就是foo.bind({a: 1})中传入的对象{a: 1}
    Function.prototype.bind = function(oThis) {
        // this为当前调用bind的对象， 需要判断一下它是否为函数
        if(typeof this !== 'function') {
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }
        /**
         * 1.函数自带的arguments属性并不是一个数组，而是一个类数组，不具备slice这些方法，所以用call方法给slice指定this为arguments,让arguments也可以使用slice方法
         * 2.后面传入1，是slice(start, end)的一个参数start, 表示从arguments的下标为1，即第二个参数开始切割，因为bind的第一个参数为this的指向
         * 3.arguments参数只有在函数调用执行的时候才存在，也就是当var func = foo.bind({a:1});的时候，调用了bind，此时aArgs是一个空数组。如果是var func = foo.bind({a:1}, 2)，那么aArgs = [2]
        */

        var args = Array.prototype.slice.call(arguments, 1);
        var fToBind = this;
       
        var fBound = function() {
            /**
             * 1.这是的this指的是调用 func()时的执行环境；直接调用 func()的时候，this执行的是全局对象，那么结果是oThis(即{a: 1});这样就可以让这个fToBind的this执行传进来的对象oThis
             * 2.通过new func()来调用，this会指向一个空对象，这个空对象的原型就会指向构造器的prototype的属性，也就是fBound(即func())的prototype属性，此时this instanceof fBound === true，那么返回的this就是当*  前正常的this，相当于忽略掉bind的this的影响
            */
            return fToBind.apply(this instanceof fBound 
                                     ? this 
                                     : oThis, 
                                    /**
                                     *  bind()同时也会传参数， 这里的arguments是调用此函数的arguments,也就是func()的执行环境，和上面的arguments不一样
                                     *  在此例中，此时的arguments是空数组，因为没有给func()传参数
                                     *  此时concat的意思是把bind()中传入的参数和func()中传入的参数连起来，来实现上面提到的bind的柯里性
                                     */
                                     aArgs.concat(Array.prototype.slice.call(arguments)));
        }
        /**
         * 创建一个空对象fNOP，将fNOP的原型指向当前调用bind函数的对象(foo)的原型，最后将fBound的原型指向新的FNOP实例
         * 这个步骤完成了给fBound(func)拷贝了一个FNOP的protoType即this(foo)的prototype。相当于fBound.prototype = Object.create(this.prototype)
        */
        var fNOP s= function() {};
        if(this.prototype) {
            fNOP.prototype = this.prototype;
        }
        fBound.prototype = new fNOP();

        return fBound;
    }
}
```
什么要给func/fBound拷贝一个FNOP的prototype即this/foo的prototype？没有实现这个会怎样？

实际中的new func()其实相当于创建了func()一个新实例，使用的构造函数是func，它只为新对象定义了【默认的】属性和方法。也就是Object.create(this.prototype)的作用，如果不把foo的prototype拷贝个func，那么这里的new func()就没法得到foo默认的属性。 

### map
#### 实现一个map
```js
if(!Array.prototype.map) {
    Array.prototype.map = function(callback, context) {
        let temp = [];
        if(typeof callback == 'function') {
            let i = 0;
            let len = this.length;
            for(; i < len; i++) {
                // 将每一项的运算操作丢进fn里，利用call方法指定callback的this指向与具体参数
                temp.push(callback.call(context, this[i], i, this))
            }
        } else {
            throw new TypeError('TypeError: '+ callback +' is not a function.')
        }
        return temp;
    }
}
```
### 什么是函数柯里化
只传递给函数一部分参数来调用它, 让它返回一个函数去处理剩下的参数
```js
var add = function(x) {
  return function(y) {
    return x + y;
  };
};

var increment = add(1);
var addTen = add(10);

increment(2); // 3

addTen(2);// 12
```
### 柯里化有什么好处
1.参数复用
2.提前返回
3.延迟执行

### 
```js
实现一个add方法，使计算结果能够满足如下预期：
add(1)(2)(3) = 6
add(1, 2, 3)(4) = 10
add(1)(2)(3)(4)(5) = 15
```
先实现一个简单的
```js
function add(x) {
    return function(y) {
        return function(z) {
            return x + y + z;
        }
       
    }
}
const foo = add(10)(2)(3);
console.log(foo);
```
上面实现的函数参数的使用被限制得很死, 我们需要通用的封装

```js
function add () {
    var args = [].slice.call(arguments);
    var fn = function () {
        return add.apply(null, [].slice.call(arguments));
    };
    fn.toString = function() {
        return args.reduce((a, b) => a + b);
    };
    
    return fn;
}
```

## 参考
- [Function.prototype.bind()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
- [手写bind()函数，理解MDN上的标准Polyfill](https://blog.csdn.net/u010552788/article/details/50850453)
- [js中自己实现bind函数的方式](https://blog.csdn.net/lovefengruoqing/article/details/80186401)