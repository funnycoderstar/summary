# cookie，session, token

## 发展史
1. 

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
1. 

## Cookie和Session的区别
1. cookie数据存放在客户的浏览器上，session数据放在服务器上
2. cookie不是很安全， 别人可以分析存放在本地的cookie并进行cookie欺骗，考虑到安全应当使用session
3. session会在一定时间内保存在服务器上。当访问增多，就会比较占用你服务器的性能，考虑到减轻服务器性能方面，应当使用cookie
4. 单个cookie保存的数据不能超过4k, 很多浏览器都限制一个站点最多保存20个cookie

> 一般建议： 将登陆信息等重要信息存放为session, 其他信息如果需要保留，可以放在cookie中


## 参考
- [彻底理解cookie，session，token](https://www.cnblogs.com/moyand/p/9047978.html)
- [JSON Web Token 入门教程](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)