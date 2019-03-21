> 常见的截取字符串的方法

```js
//截取url参数
getUrlParam = function(name) { //获取url参数
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

```