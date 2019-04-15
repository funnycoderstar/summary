# 说一说cookie

设置cookie => cookie被自动添加到request header中 => 服务端接收到cookie

## cookie怎么工作的
当网页要发送http请求时, 浏览器会先检查是否有相应的cookie, 有则自动添加request header字段中.这些事浏览器自动帮我们做的, 而且每一次http请求浏览器都会自动帮我们做;
每个域名下的cookie的大小最大为4kb, 每个域的cookie数量最多为20个
### cookie的格式

## 如何设置cookie

cookie既可以由服务端设置, 也可以由客户端来设置

### 服务端设置cookie

不管你是请求一个资源文件(如html/js/css/图片), 还是发送一个ajax请求, 服务端都会返回response.而response header中有一项叫set-cookie, 是服务端专门用来设置cookie的;
- 一个set-cookie只能设置一个cookie, 当你想设置多个, 需要添加同样多的`set-cookie`
- 服务端可以设置cookie的所有选项: expires, domain, path, secure, HttpOnly

### 客户端设置cookie
```js
document.cookie = "name=xiaoming; age=12 "
```
- 客户端可以设置cookie的一下选项: expires, domain, path, secure(只有在https协议的网页中, 客户端设置secure类型cookie才能生效), 但无法设置httpOnly选项

## cookie的属性

### domain表示cookie所在的域
a.com默认的domain是a.com, test.a.com和test1.a.com访问都会有跨域问题, 如果想一个cookie所有以"a.com"结尾的域名中都可以访问, 则需要设置domain为".a.com";

domain可以访问该Cookie的域名。如果设置为“.baidu.com”，则所有以“baidu.com”结尾的域名都可以访问该Cookie；第一个字符必须为“.”
### path表示cookie的使用路径



### isHttpOnly


## cookie和session的区别

cookie保存在客户端, session保存在服务端
常用的是sessionId存在cookie中

## JWT


