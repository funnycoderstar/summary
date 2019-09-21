[nginx反向代理-解决跨域问题](https://www.cnblogs.com/renjing/p/6394725.html)
[nginx到底是干啥的](https://segmentfault.com/q/1010000010360640)
[使用webpack配置vue项目代理 （超简单）](https://www.cnblogs.com/DY9412/p/7873847.html)

跨域是浏览器的限制;

网站A: http://localhost:8081
网站B: http://localhost:8082

网站A的页面去访问网站B的信息
```js
<h2>Index</h2>
<div id="show"></div>
<script type="text/javascript">
$(function () {
    $.get("http://localhost:82/api/values", {}, function (result) {
        $("#show").html(result);
    })
})
```
浏览器会报跨域的问题

[nginx快速搭建](http://www.cnblogs.com/renjing/p/6126284.html)
nginx.conf

```js
server {
        listen       80; #监听80端口，可以改成其他端口
        server_name  localhost; # 当前服务的域名

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            proxy_pass http://localhost:81;
            proxy_redirect default;
        }

		location /apis { #添加访问目录为/apis的代理配置
			rewrite  ^/apis/(.*)$ /$1 break;
			proxy_pass   http://localhost:82;
       }
#以下配置省略
```
配置详解
1.nginx监听localhost的80端口,网站A和网站B的访问都是经过localhost的80端口进行访问;
2.我们特殊配置了一个`/apis`的目录访问,并且对url执行了重写,最后使以`/apis`开头的地址都转到`http://localhost:82`进行处理.
3.rewrite ^/apis/(.*)$ /$1 break; 
代表重写拦截进来的请求,并且只能对域名后面以`/apis`开头的起作用,

## 访问地址修改
既然配置了nginx,那么所有的访问都要走nginx,而不是走网站原本的地址(A网站localhost:81,B网站localhost:82);所以要修改A网站中的ajax访问地址,吧访问地址由`http://localhost:82/api/values`改成`/apis/api/values`。如下代码：
