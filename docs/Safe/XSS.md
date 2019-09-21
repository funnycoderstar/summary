## XSS
什么是XSS ？
分类？
XSS攻击原理？
如何防御？


## XSS进阶
举例说明什么是 XSS Payload
cookie劫持， 但是在Set-Cookie时植入HttpOnly标识会失效
构造GET/POST请求
1.创建并使用带有src的标签来发起一个GET请求
2.模拟POST请求（1. 创建一个form表单, 自动提交； 2.使用XMLHttpRequest发送一个POST请求）
XSS payload读取QQ邮箱的列表

## XSS防御
HTTPOnly
输入检查
输出检查

XSS本质的原因： “HTML注入”， 用户的数据被当成HTML代码一部分来执行，混淆了原本的语义， 产生新的语义
## 小结