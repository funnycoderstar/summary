# HTTP2.0比http1.X有哪些改进
- 多路复用
- header压缩
- 服务端推送

## 多路复用

1. 什么是持久链接（keep-alive）
首先将一些什么是持久链接（keep-alive）是使用同一个TCP连接来发送和接受多个HTTP请求/应答，而不是为每一个新的请求/应答打开新的链接的方法。

我们知道HTTP协议采用“请求-应答”模式, 当使用非KeepAlive模式时，每个请求/应答客户和服务器都要新建一个连接，完成之后立即断开(HTTP协议为无连接的协议)；当使用Keep-Alive（又称持久连接）时， Keep-Alive功能使客户端到服务器的连接持续有效，当出现对服务器的后续请求时，Keep-Alive功能避免了建立或者重新

2. keep-alive和传统的区别

![img](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1559057504279.png)

keep-alive的连接不必在每次请求都开启一个新的连接

3. keep-alive如何配置

Nginx服务器：
```js
keepalive_timeout //服务器接收在10s以内的所有connection复用超过10则关闭建立一个新的connection 0代表关闭keepalive
```

4. 多路复用是什么
![img](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1559057518421.png)
1) HTTP2请求的TCP的connection一旦建立，后续请求以stream的方式发送。
2）每个stream的基本组成单位是frame （二进制分帧），每种frame又分为很多类型例如HEADERS Frame（头部帧），DATA Frame（内容帧）等等
3) 请求头 HEADERS Frame组成了request，返回头HEADERS Frame和DATA  Frame组成了response，request和response组成了一个stream。

5. 多路复用和keep alive区别
![img](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1559269633983.png)

1）线头阻塞（Head-of-Line Blocking），HTTP1.X虽然可以采用Keep alive来解决复用TCP的问题，但是还是无法解决请求阻塞；
2）所谓请求阻塞意思就是一条 TCP 的connection在同一时间只允许一个请求经过，这样假如后续请求想要复用这个链接就必须等到前一个完成才行，正如上图左边表示的。
3）之所以有这个问题就是因为HTTP1.x需要每条请求都是可以识别，按顺序发送，否则serve就无法判断该响应哪个具体的请求。
4）HTTP2采用多路复用是指，在同一个域名下，开启一个TCP的connection，每个请求以stream的方式传输，每个stream有唯一的标识，connection一旦建立，后续的请求都可以复用这个connection并且可以同时发送，server端可以根据stream的唯一标识来响应对应的请求。

6. 多路复用就不会关闭了么
关闭的时机有两个
- 1. 用户离开这个页面
- 2. server主动关闭connection
但是关闭总归是标准，不同的服务器实现时有了自己的约定，就跟keep alive一样，每种服务器都有对多路复用的这个connection有关的配置

## 头部压缩
1. 为什么要压缩
当前平均每个页面都会产生上百个请求。越来越多的请求导致在头部的流量越来越多。尤其是每次都要传输 UserAgent, Cookie这类不会频繁变动的内容，完全是一种浪费;

2. 压缩前后对比
第二次的请求头部之所以非常小，是因为大部分键值对只占用了一个字节。尤其是 UserAgent、Cookie 这样的头部，首次请求中需要占用很多字节，后续请求中都只需要一个字节。

3. 技术原理
头部压缩需要在支持http2的浏览器和服务器之间：
- 维护一份相同的静态字典，包含常见的头部名称，以及特别常见的头部名称与值得组合  
- 维护一份相同的动态，可以动态地添加内容
- 支持基于静态哈夫曼码表的哈夫曼编码
实现细节：
1. 整个头部键值对都在字典中
2. 头部名称在字典中，更新动态字典
3. 头部名称不在字典中，更新动态字典
4. 头部名称在字典中，不允许更新动态字典
5. 头部名称不在字典中，不允许更新动态字典

在进行 HTTP/2 网站性能优化时很重要一点是「使用尽可能少的连接数」，本文提到的头部压缩是其中一个很重要的原因：同一个连接上产生的请求和响应越多，动态字典积累得越全，头部压缩效果也就越好。所以，针对 HTTP/2 网站，最佳实践是不要合并资源，不要散列域名。
默认情况下，浏览器会针对这些情况使用同一个连接：

同一域名下的资源；
不同域名下的资源，但是满足两个条件：1）解析到同一个 IP；2）使用同一个证书；
上面第一点容易理解，第二点则很容易被忽略。实际上 Google 已经这么做了，Google 一系列网站都共用了同一个证书，可以这样验证

## 服务端推送
"推送"是HTTP/2 添加的一种新的交互模式，允许服务端"推送"
服务端推送是HTTP2协议里面，唯一一个需要开发者自己配置的功能。其他功能都是服务器和浏览器自动实现，不需要开发者关心。


# 以前我们做的性能优化不适用于HTTP2了
- js文件压缩
- 

# 如何升级为http2

# 参考

- [HTTP2.0关于多路复用的研究](https://www.nihaoshijie.com.cn/index.php/archives/698/)
- [HTTP/2 头部压缩技术介绍](https://imququ.com/post/header-compression-in-http2.html)
- [HTTP/2 服务器推送（Server Push）教程](http://www.ruanyifeng.com/blog/2018/03/http2_server_push.html)
- [HTTP/2 资料汇总](https://imququ.com/post/http2-resource.html)
- [HTTP/2.0 相比1.0有哪些重大改进？](https://www.zhihu.com/question/34074946)
- [HTTP/2 简介](https://developers.google.com/web/fundamentals/performance/http2/)