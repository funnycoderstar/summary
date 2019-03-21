// 内置对象
String,Number,Boolean,Object,Function,Array,Date,RegExp,Error

// es6的可计算属性名
var prefix = 'foo';
var myObject = {
    [prefix + 'bar']: 'hello',
    [prefix + 'baz']: 'world',
};
myObject['foobar'];
myObject['foobaz'];