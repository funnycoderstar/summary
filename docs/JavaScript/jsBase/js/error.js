// 错误处理
try{
    // 可能会导致错误的代码
}catch(error){
    // 错误发生时要进行的处理
    // 错误对象message属性是唯一一个保证所有浏览器都支持的属性
}

// finally

// 处理错误的策略
// 一:类型转换错误
// 1,使用===和== ==在执行比较之前会先转换不同类型的值
function concat(str1, str2, str3) {
    var result = str1 + str2;
    if (typeof str3 === 'string') {
        retult += str3;
    }
    return result;
}

// 二: 数据类型错误
// 任何非字符串值都会导致错误
function getQueryString(url) {
    var pos = url.indexOf('?');
    if (pos > -1) {
        return url.substring(pos + 1);
    }
    return '';
}
function getQueryString(url) {
    if (typeof url === 'string') {
        var pos = url.indexOf('?');
        if (pos > -1) {
            return url.substring(pos + 1);
        }
    }
    return '';
}

// 在流程控制语句中使用非布尔值都会导致错误
// 任何非数组值都会导致错误
function reverseSort (values) {
    if(values) { //任何会转换为true的非数组值都会导致错误
        values.sort();
        values.reverse();
    }
}
// 
function reverseSort (values) {
    if(values != null) { //与null比较只能确保相应的值不是null和undefined,也不推荐将某个值与undefined作比较
        values.sort();
        values.reverse();
    }
}

function reverseSort (values) {
    if(values instanceof Array) { //问题解决了
        values.sort();
        values.reverse();
    }
}
// 基本类型使用typeof 来检测,而对象的值则应该使用instanceof来检测

// 三,通信错误
// 1,格式不正确的URL或发送的数据有关,常见问题是在将数据发送给服务器之前,没使用encodeURIComponent()对数据进行编码

function addQueryStringArg(url, name, value) {
    if(url.indexOf('?') === -1) {
        url += '?';
    }else{
        url += '&';
    }
    url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
    return url;
}
var url = 'http://www.somedomain.com';
var newUrl = addQueryStringArg(url, 'redir', 'http://www.someotherdomain.com?a=b&c=d');
alert(newUrl);

// 非致命错误与致命错误

// 大多数ajax通信都是由JavaScript库提供的包装函数来处理的,如何代码库本身有问题,
for (var i = 0; i < mods.length; i++) {
    try {
        mods[i].init();
    } catch (ex) {
        // 在这里处理错误
        logError('nonfatal', 'Module init failed:' +ex.message);
    }
}

// 把错误记录到服务器
// 要建立一种JavaScript错误记录系统,首先需要在服务器上创建一个页面(或者服务器入口点),用于处理错误数据,这个页面的作用就是从查询字符串中取得数据,然后再将数据写入错误日志中,
function logError (sev, msg) {
    var img = new Image();
    img.src = 'log.php?sev=' +encodeURIComponent(sev) + 'msg=' + encodeURIComponent(msg);
}

// 调试方式
alert();
console.log(message)// 将一般消息记录到控制台
console.error(message) //将错误消息记录到控制台
console.info(message) //将信息性消息记录到控制台
console.warn(message) //将警告消息记录到控制台

// Opero 10.5 之前的版本用 opera.postError()方法来访问,
// LiveConnect 在JavaScript中运行Java代码
function log(message) {
    if(typeof console === 'object') {
        console.log(message);
    }else if(typeof opera === 'object') {
        opera.postError(message);
    }else if(typeof java === 'object' && typeof java.lang === 'object'){
        java.lang.System.out.printIn(message);
    }
}

// 抛出错误
function divide(num1, num2) {
    if(typeof num1 !== 'number' || typeof num2 !== 'number') {
        throw new Error ('divide(): Both arguments must be numbers')
    }
}
// 对于大型应用程序来说,自定义的错误通常使用assert()函数抛出,接受两个参数,一个是求值结果应该为true的条件,另一个是条件为false时要抛出的错误
function assert (condition, message) {
    if(! condition) [
        throw new Error(message);
    ]
}
function divide(num1, num2) {
    assert(typeof num1 !== 'number' || typeof num2 !== 'number','divide(): Both arguments must be numbers');
       return num1 / num2;
    }
}