// 一,编写可维护的代码: 可理解性,直观性,可适应性,可扩展性,可调试性

// 代码约定: 函数和方法,大段代码,复杂的算法,hack加注释
// 变量的函数命名:变量名为名词: car/person,函数名以动词开始:getName(),返回布尔类型的函数以is开头:isEnable();
// 变量类型透明:
// 1,初始化指定变量类型
var found = false;
var count = -1;
var name = '';
var person = null;
// 2,使用匈牙利标记法指定变量类型,'o'代表对象,'s'代表字符串,'i'代表整数,'f'代表浮点数,'b'代表布尔型
var bFound;//布尔值
var iCount;//代表整数
var sName;//代表字符串
var oPerson;//代表对象


// 二,松散耦合
// 1,解耦HTML/JavaScript
// 2,解耦CSS/JavaScript
// 3,解耦应用逻辑和/事件处理程序

function handleKeyPress(event){
    event = EventUtil.getEvent(event);
    if(event.keyCode == 13){
        var target = EventUtil.getTarget(event);
        var value = 5 *  parseInt(target.value);
        if(value > 10){
            document.getElementById('error-msg').style.display = 'block';
        }
    }
}

function validateValue(value){
    value = 5 * parseInt(value);
    if(value > 10){
        document.getElementById('error-msg').style.display = 'block';
    }
}
function handleKeyPress(event){
    event = EventUtil.getEvent(event);
    if(event.keyCode == 13){
        var target = EventUtil.getTarget(event);
        validateValue(target.value);
    }
}
// 任何事件处理程序都应该处理事件,然后将处理转交给应用逻辑


// 三,编程实践
// 1,尊重对象所有权
// 2,避免全局量
// 避免两个全局变量
var name = 'wangyaxing';
function sayName() {
    alert(name);
}

// 推荐一个全局变量
var MyApplication = {
     name: 'wangyaxing',
     sayName: function() {
         alert(this.name);
     }
}

// 使用命名空间
var Wrox = {};

// 为Professional JavaScript创建命名空间
Wrox.ProJS = {};

// 将书中用到的对象附加上去
Wrox.ProJS.EventUtil = {};
Wrox.ProJS.CookieUtil = {};

// Wrox是全局量,其他命名空间在此之上创建,本书所有代码放在Wrox.ProJS命名空间,其他作者也应该把自己代码添加到Wrox对象中
// 为Professional Ajax创建命名空间
Wrox.ProAjax = {};

// 附加书中用到的其他对象
Wrox.ProAjax.EventUtil = {};
Wrox.ProAjax.CookieUtil = {};

// 3,避免与null进行比较
function sortArray(values) {
    if(values != null){ //避免
        values.sort(comparator);
    }
}

function sortArray(values) {
    if(values instanceof Array){ //推荐
        values.sort(comparator);
    }
}

// 如果一个值为引用类型,使用instanceof操作符检查其构造函数
// 如果一个值为基本类型,使用typeof检查其类型
// 如果希望对象包含某个特定的方法名,则使用typeof操作符确保指定名字的方法存在与对象上

// 4,数据和逻辑分离:重复值,用户页面字符串,URLs,任意可能会改的值
var Countants = {
    name: 'wangayxing',
    url: 'text.php',
};
function validate(value){
    if(! value) {
        alert(Countants.name);
        location.href = Countants.url;
    }
}

// 三,性能
// 注意作用域
