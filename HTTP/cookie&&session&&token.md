# cookie，session, token

## 发展史
1. 很久很久之前， Web基本都是文档的浏览而已。既然是浏览， 作为服务器， 不需要记录在某一段时间里都浏览了什么文档， 每次请求都是一个新的HTTP协议，就是请求加响应。不用记录谁刚刚发了HTTP请求， 每次请求都是全新的
2. 随着交互式Web应用的兴起， 像在线购物网站，需要登录的网站等，马上面临一个问题
## 服务器验证方式(session)
### 一般流程
- 1.用户向服务器发送用户名和密码
- 2.服务器验证通过后,在当前对话(session)里面保存相关数据,比如用户角色, 登陆时间等;
- 3.服务器向用户返回一个`session_id`, 写入用户的`cookie`
- 4.用户随后的每一次请求, 都会通过`cookie`, 将`session_id`传回服务器
- 5.服务端收到 `session_id`, 找到前期保存的数据, 由此得知用户的身份 

### 存在的问题
扩展性不好
单机当然没问题， 如果是服务器集群， 或者是跨域的服务导向架构， 这就要求session数据共享


## 基于Token的验证

### 过程
1. 用户通过用户名和密码发送请求
2. 程序验证
3. 程序返回一个签名的token给客户端
4. 客户端储存token, 并且每次用每次发送请求
5. 服务端验证Token并返回数据

## Cookie和Session的区别
1. 作用范围不同： cookie数据存放在客户的浏览器上，session数据放在服务器上
2. 隐私策略不同：cookie不是很安全， 别人可以分析存放在本地的cookie并进行cookie欺骗，考虑到安全应当使用session
3. session会在一定时间内保存在服务器上。当访问增多，就会比较占用你服务器的性能，考虑到减轻服务器性能方面，应当使用cookie
4. 存储大小不同： 单个cookie保存的数据不能超过4k, 很多浏览器都限制一个站点最多保存20个cookie

> 一般建议： 将登陆信息等重要信息存放为session, 其他信息如果需要保留，可以放在cookie中

## Token和Session的区别

Session是一种HTTP储存机制， 为无状态的HTTP提供持久机制
Token就是令牌， 比如你授权(登录)一个程序时，它就是个依据，判断你是否已经授权该软件；
## 参考
- [彻底理解cookie，session，token](https://www.cnblogs.com/moyand/p/9047978.html)
- [JSON Web Token 入门教程](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)
- [Cookie、Session、Token那点事儿（原创）](https://www.jianshu.com/p/bd1be47a16c1)