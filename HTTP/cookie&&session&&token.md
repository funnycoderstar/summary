# cookie，session, token

## 前言
1. 无状态的HTTP协议
很久很久之前， Web基本都是文档的浏览而已。既然是浏览， 作为服务器， 不需要记录在某一段时间里都浏览了什么文档， 每次请求都是一个新的HTTP协议，就是请求加响应。不用记录谁刚刚发了HTTP请求， 每次请求都是全新的
2. 如何管理会话
随着交互式Web应用的兴起， 像在线购物网站，需要登录的网站等，马上面临一个问题，就是要管理回话，记住那些人登录过系统，哪些人往自己的购物车中放商品，也就是说我必须把每个人区分开。这就是一个不小的挑战。

本文主要讲解cookie，session, token 这三种是如何管理会话的，以及它们的区别， 使用场景及优缺点；


## cookie
cookie是一个非常具体的东西，指的就是浏览器里面能永久存储的一种数据，仅仅是浏览器实现的一种数据存储的方式。

cookie由服务器生成，发送给浏览器，浏览器把cookie以KV形式存储到某个目录下的文本文件中，下一次请求同一网站时会把该cookie发送给服务器。由于cookie是存在客户端上的，所以浏览器加入了一些限制确保cookie不会被恶意使用，同时不会占据太多磁盘空间。所以每个域的cookie数量是有限制的。

### 如何设置
**客户端设置**

```js
document.cookie = "name=xiaoming; age=12 "
```
- 客户端可以设置cookie的一下选项: expires, domain, path, secure(只有在https协议的网页中, 客户端设置secure类型cookie才能生效), 但无法设置httpOnly选项
设置cookie => cookie被自动添加到request header中 => 服务端接收到cookie

**服务端设置**

不管你是请求一个资源文件(如html/js/css/图片), 还是发送一个ajax请求, 服务端都会返回response.而response header中有一项叫`set-cookie`, 是服务端专门用来设置cookie的;
- 一个set-cookie只能设置一个cookie, 当你想设置多个, 需要添加同样多的`set-cookie`
- 服务端可以设置cookie的所有选项: expires, domain, path, secure, HttpOnly

### 适用场景


## session
### 过程(服务端session + 客户端 sessionId)

![session](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1560178136108.png)

- 1.用户向服务器发送用户名和密码
- 2.服务器验证通过后,在当前对话(session)里面保存相关数据,比如用户角色, 登陆时间等;
- 3.服务器向用户返回一个`session_id`, 写入用户的`cookie`
- 4.用户随后的每一次请求, 都会通过`cookie`, 将`session_id`传回服务器
- 5.服务端收到 `session_id`, 找到前期保存的数据, 由此得知用户的身份 


### 存在的问题
**扩展性不好**
单机当然没问题， 如果是服务器集群， 或者是跨域的服务导向架构， 这就要求session数据共享，每台服务器都能够读取session。

举例来说， A网站和B网站是同一家公司的关联服务。现在要求，用户只要在其中一个网站登录，再访问另一个网站就会自动登录，请问怎么实现？
1. Nginx ip_hash 策略，服务端使用 Nginx 代理，每个请求按访问 IP 的 hash 分配，这样来自同一 IP 固定访问一个后台服务器，避免了在服务器 A 创建 Session，第二次分发到服务器 B 的现象。
2. Session复制：任何一个服务器上的 Session 发生改变（增删改），该节点会把这个 Session 的所有内容序列化，然后广播给所有其它节点。
![SessionCopy](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1560181765532.png)
3. 共享Session：将Session Id 集中存储到一个地方，所有的机器都来访问这个地方的数据。这种方案的优点是架构清晰，缺点是工程量比较大。另外，持久层万一挂了，就会单点失败；
![session共享](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1560178827404.png)

另一种方案是服务器索性不保存session数据了，所有数据就保存在客户端，每次请求都发回服务器。这种方案就是接下来要介绍的基于Token的验证;

## Token

### 过程
![Token](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1560180189272.png)

1. 用户通过用户名和密码发送请求
2. 程序验证
3. 程序返回一个签名的token给客户端
4. 客户端储存token, 并且每次用每次发送请求
5. 服务端验证Token并返回数据

这个方式的技术其实很早就已经有很多实现了，而且还有现成的标准可用，这个标准就是JWT;

### JWT(JSON Web Token)
![JWT](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1560181058048.png)


### 适用场景
1.一次性验证
比如用户注册后需要发一封邮件让其激活账户，通常邮件中需要有一个链接，这个链接需要具备以下的特性：能够标识用户，该链接具有时效性（通常只允许几小时之内激活），不能被篡改以激活其他可能的账户…这种场景就和 jwt 的特性非常贴近，jwt 的 payload 中固定的参数：iss 签发者和 exp 过期时间正是为其做准备的。

2.restful api的无状态认证
使用 jwt 来做 restful api 的身份认证也是值得推崇的一种使用方案。客户端和服务端共享 secret；过期时间由服务端校验，客户端定时刷新；签名信息不可被修改…spring security oauth jwt 提供了一套完整的 jwt 认证体系，以笔者的经验来看：使用 oauth2 或 jwt 来做 restful api 的认证都没有大问题，oauth2 功能更多，支持的场景更丰富，后者实现简单。

3.使用 jwt 做单点登录+会话管理(不推荐)

## 区别
### Cookie和Session的区别
1. 作用范围不同： cookie数据存放在客户的浏览器上，session数据放在服务器上
2. 隐私策略不同：cookie不是很安全， 别人可以分析存放在本地的cookie并进行cookie欺骗，考虑到安全应当使用session
3. session会在一定时间内保存在服务器上。当访问增多，就会比较占用你服务器的性能，考虑到减轻服务器性能方面，应当使用cookie
4. 存储大小不同： 单个cookie保存的数据不能超过4k, 很多浏览器都限制一个站点最多保存20个cookie

> 一般建议： 将登陆信息等重要信息存放为session, 其他信息如果需要保留，可以放在cookie中


### Token和Session的区别

Session是一种HTTP储存机制， 为无状态的HTTP提供持久机制;
Token就是令牌， 比如你授权(登录)一个程序时，它就是个依据，判断你是否已经授权该软件；


## 参考
- [jwt](https://jwt.io/)
- [彻底理解cookie，session，token](https://www.cnblogs.com/moyand/p/9047978.html)
- [JSON Web Token 入门教程](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)
- [Cookie、Session、Token那点事儿（原创）](https://www.jianshu.com/p/bd1be47a16c1)
- [3种web会话管理的方式](https://www.cnblogs.com/lyzg/p/6067766.html)
- [你真的了解 Cookie 和 Session 吗](https://juejin.im/post/5cd9037ee51d456e5c5babca)