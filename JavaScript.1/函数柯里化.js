// 函数允许您通过函数的.length属性来访问他们的参数数量;函数的.length属性
// function howMany(a, b, c) {
//     console.log(howMany.length);
// }
// howMany(1, 2); // 3
// howMany(1,2,3,4);// 3

// function showArgs() {
//     var args = [].slice.call(arguments);
// }
// // [].slice.call(arguments)是Array.prototype.slice.call(arguments)的简写形式

// function howMany(...args) {
//     console.log(`args:${args},length:${args.length}`);
// }

// 函数柯里化
// 是把一个接受N个参数的函数转换成接受一个单一参数(最初函数的第一个参数)的函数,并且但会接受余下的参数并且返回结果的新函数
// 每个函数都接受1个参数
// function add(a, b, c) {
//     return a + b + c;
// }
// function curriedAdd(a) {
//     return function(b) {
//         return function(c) {
//             return a + b + c; 
//         }
//     }
// }
// 它的工作方式是通过为每个可能的参数嵌套函数，使用由嵌套函数创建的自然闭包来保留对每个连续参数的访问
// function foo(a, b, c) {
//     return a + b + c;
// }
// var curriedFoo = curry(foo);
// curriedFoo(1, 2, 3); // 6
// curriedFoo(1)(2, 3); // 6
// curriedFoo(1)(2)(3); // 6
// curriedFoo(1, 2)(3); // 6

// function curry(fn) {
//     return function curried() {             // 我们的 curry 函数返回一个新的函数，在这个例子中是一个名为 curried() 的命名函数表达式。
//         var args = [].slice.call(arguments);// 每次此函数被调用时，我们在 args 中存储传递给它的参数；
//         return args.length >= fn.length ?   // 如果参数的数量大于等于原始函数的数量，那么
//             fn.apply(null, args) :              // 返回使用所有参数调用的原始函数
//             function () {                        // 否则，返回一个接受更多参数的函数，当被调用时，将使用之前传递的原始参数与传递给新返回的函数的参数结合在一起，再次调用我们的 curried 函数。
//                 var rest = [].slice.call(arguments);
//                 return curried.apply(null, args.concat(rest));
//             }
//     }
// }
// var border = {
//     style: 'border',
//     generate: function (length, measure, type, color) {
//         return [this.style + ':', length + measure, type, color].join(' ') + ';';
//     }
// };
// border.curriedGenerate = curry(border.generate);
// console.log(border.curriedGenerate(2)('px')('solid')('#369'));
// undefined: 2px solid #369;

// 使用我们的 curry() 函数作为一个方法修饰器似乎破坏了该方法所期望的对象上下文。
// function curry(fn) {
//     return function curried() {             // 我们的 curry 函数返回一个新的函数，在这个例子中是一个名为 curried() 的命名函数表达式。
//         var args = [].slice.call(arguments);// 每次此函数被调用时，我们在 args 中存储传递给它的参数；
//         var context = this;
//         return args.length >= fn.length ?   // 如果参数的数量大于等于原始函数的数量，那么
//             fn.apply(context, args) :              // 返回使用所有参数调用的原始函数
//             function () {                        // 否则，返回一个接受更多参数的函数，当被调用时，将使用之前传递的原始参数与传递给新返回的函数的参数结合在一起，再次调用我们的 curried 函数。
//                 var rest = [].slice.call(arguments);
//                 return curried.apply(context, args.concat(rest));
//             }
//     }
// }

// border.curriedGenerate(2)('px')('solid')('#369')  
// => "border: 2px solid #369;"
// 我们目前的解决方案可以正常工作，并在调用时正确地保留了上下文，但是 curried 函数只能接受原始函数声明时的参数数量 – 不多不少。
// 使用可变参数函数，我们需要一种方法来告诉我们的 curry() 功能，当它有足够的参数来对它正在 Currying(柯里化) 的原始函数求值。
// function max(/* variable arguments */) {
//     var args = [].slice.call(arguments);
//     return Math.max.apply(Math, args);
// }
// function range(start, end, step) {
//     var stop = Math.max(start, end),
//         start = Math.min(start, end),
//         set = [];
//     // step is optional
//     step = typeof step !== 'undefined' ? step : 1;
//     for (var i = start; i <=stop; i += step) {
//         set.push(i);
//     }
//     return set;
// }
function curry(fn, n) {
    var arity = n || fn.length;
    return function curried() {
        var args = [].slice.call(arguments);
        var context = this;
        return args.length >= arity ?
            fn.apply(context, args) :
            function () {
                var rest = [].slice.call(arguments);
                return curried.apply(context, args.concat(rest));
            }
    }
}
// try {
//     console.log(curry(range, 2)(1)(10));
// } catch(err) {
//     console.log(err);
// }
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
// try {
//     console.log(curry(range, 2)(1)(10, 2));
// } catch(err) {
//     console.log(err);
// }
// [ 1, 3, 5, 7, 9 ]
// try{
//     console.log(curry(range, 2)(1)(10)(2));
// }catch(err) {
//     console.log(err);
// }
// curry(...)(...)(...) is not a function
// 因为一旦它看到最小数量的参数，在这种情况下，它将返回 curried 函数的求值结果。
// // curry(range, 2)(1)(10);
// curry(range, 2)(1)(10, 2);
// curry(range, 2)(1)(10)(2);

// 偏函数应用

function add3(a, b, c) {
    console.log(a + b + c);
    return a + b + c;
}
// add3(2, 4, 8); // 14
// var add6 = add3.bind(this, 2, 4);
// add6(8); // 14
var add8 = curry(add3)(2)(4);
add8(8); // 14

// es6中curry和apply的实现
// curry()在es6中的实现
function curry(fn) {
    return function curried(...args) {
        return args.length >= fn.length ?
        fn.call(this, ...args) :
        (...rest) => {
            return curried.call(this, ...args, ...rest);
        }
    }
}
// apply() 在es6中的实现
function apply(fn, ...args) {
    return (..._args) => {
        return fn(...args, ..._args);
    }
}