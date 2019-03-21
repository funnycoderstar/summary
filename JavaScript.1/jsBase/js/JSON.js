// Json是一个轻量级的数据格式;
// 可以表示字符串,数组,布尔值,null,但是不支持undefined;

// obj
// var person = {
//     name: "yaxing",
//     age: 20
// };
// // Json
// {
//     "name": "yaxing",
//     "age": 29
// }
// 区别1,没有声明变量
// 2,没有末尾的分号,
// 3,Json中对象的属性必须加双引号

// ECMAScirpt 5定义了全局对象JSON
// JSON对象有两个方法:stringify()和parse(),
// JSON.stringify()将一个javaScript对象序列化为一个JSON字符串
// 第一个参数是过滤器,可以是数组,也可以是函数,第二个参数是一个选项,便是是否在JSON字符串中保留缩进
// 可以在对象上调用toJSON()方法,返回其自身的JSON数据格式
// var book = {
//     "title": 'javaScript',
//     "year": 2011,
//     toJSON: function() {
//             return this.title;
//     },
// };
// var jsonText = JSON.stringify(book);
// console.log(jsonText);
// JSON.parse()将一个JSON字符串解析为JavaScript对象

var book = {
    "title": 'javaScript',
    "year": 2011,
    releaseDate: new Date(2011, 11, 1),
};
var jsonText = JSON.stringify(book);
var bookCopy = JSON.parse(jsonText, function(key, value){
    if(key === 'releaseDate'){
        return new Date(value);
    }else{
        return value;
    }
});
console.log(bookCopy);