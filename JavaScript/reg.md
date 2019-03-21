> 常见的正则表达式 主要用来判断input输入时的校验

```js
//校验手机号
function checkTel(value) {
    var isMob = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[0123456789][0-9]{8}|18[0123456789][0-9]{8}|17[0123456789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
    if (isMob.test(value)) {
        return true;
    } else {
        return false;
    }
}

//校验身份证号
function checkID(value) {
    var isID = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    if (isID.test(value)) {
        return true;
    } else {
        return false;
    }
}
// 校验用户密码 以字母开头，长度在6~18之间，只能包含字符、数字和下划线。
function checkPassword(value) {
    var isPassword = /^[a-zA-Z]\w{5,17}$/;
    if (isPassword.test(value)) {
        return true;
    } else {
        return false;
    }
}

// 利用正则表达式限制网页表单里的文本框输入内容
用正则表达式限制只能输入中文：onkeyup="value="/blog/value.replace(/["^u4E00-u9FA5]/g,'') " onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^u4E00-u9FA5]/g,''))"
用正则表达式限制只能输入全角字符： onkeyup="value="/blog/value.replace(/["^uFF00-uFFFF]/g,'') " onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^uFF00-uFFFF]/g,''))"
用正则表达式限制只能输入数字：onkeyup="value="/blog/value.replace(/["^d]/g,'') "onbeforepaste= "clipboardData.setData('text',clipboardData.getData('text').replace(/[^d]/g,''))"
用正则表达式限制只能输入数字和英文：onkeyup="value="/blog/value.replace(/[W]/g,"'') "onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^d]/g,''

```