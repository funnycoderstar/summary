nginx的作用
1.代理
2.web静态服务器

## 代理(proxy)

允许一个网络终端(一般为客户端),通过这个服务于另一个网络终端(一般为服务器)进行非直接的连接;提供代理服务的电脑系统或其他类型的网络终端成为代理服务器;

完整的代理请求: 客户端与代理服务器创建连接,根据代理服务器所使用的代理协议,请求目标服务器创建连接,或者获取目标服务器的指定资源(代理服务器可能对目标服务器的资源下载至本地缓存,如果客户端所要获取的资源在代理服务器的缓存之中,则代理服务器不会向目标服务器发送请求,而是直接返回了缓存了的资源)
### http代理

www连接请求就是采用http协议,在浏览网页,下载数据时就是用http代理,通常绑定在代理服务器的80, 3128,8080等端口

[正向代理与反向代理](https://www.cnblogs.com/Anker/p/6056540.html)
### 正向代理
像翻墙软件,vpn这种只主动发起的请求
### 反向代理
用户发出的请求先访问nginx,nginx对每个请求再进行分发

## 服务器的概念

服务器的概念类比服务员,服务员是给人提供服务的,服务器是给网站提供数据的

## hosts的作用
hosts作用: 给IP起别名

mac下hosts的目录所在位置: /etc/hosts
window下hosts的目录所在位置: /system/drivers/hosts



利用nginx反向代理解决跨域问题

1.koa简单起一个服务

```js
const Koa = require('koa');
const app = new Koa();


const main = ctx => {
    ctx.response.body = 'Hello World';
};
  
app.use(main);
app.listen(3100);
```
在命令行执行 node index.js,在浏览器中打开 http://localhost:3100/, 页面显示 Hello World;

我不想用localhost去访问,感觉有点不正经,想使用http://server.com:3100/ 来访问, 利用 SwitchHosts 给localhost起个别名

```js
127.0.0.1	localhost
127.0.0.1	server.com
```
此时打开 http://server.com:3100/ ,页面显示 Hello World

2.在页面中去请求这个服务的接口返回数据;
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="main"></div>
    <script>
        fetch('http://server.com:3100').then((res) => {
            res.text()
            .then(
                res => {
                    document.getElementById('main').innerHTML = res;
                }
            );
        })
    </script>
</body>
</html>
```
在浏览器中打开页面 file:///Users/wangyaxing/github/try-koa/index.html ,此时浏览器的控制台报错 有跨域问题,我们都知道: 协议,域名,端口号只要有一样不同就会有跨域问题;现在我们使用的协议是file协议,而我们访问的接口地址是http协议,所以存在跨域问题;
file协议很不正经,利用 SwitchHosts 给localhost起另一个别名
```js
127.0.0.1	localhost
127.0.0.1	server.com // 作为服务端域名
127.0.0.1	client.com // 作为客户端域名
```
在nginx中配置

```js
{
    server {
        listen 80;
        server_name client.com;
        root /Users/wangyaxing/github/try-koa; // 转到跟目录
    }
}

```
每次修改完nginx,需要在命令行重启nginx, `sudo nginx -s reload`;

> nginx常用命令
```js
sudo nginx //启动Nginx

sudo nginx -s reload //重启nginx

sudo nginx -s quit //退出nginx
```

此时 打开 http://client.com 页面,浏览器控制台报跨域的错误(服务器域名: server.com; 客户端域名: client.com)

当然我们可以在后端配置cors

```js
const Koa = require('koa');
const app = new Koa();


const main = ctx => {
    ctx.response.body = 'Hello World';
    ctx.set('Access-Control-Allow-Origin', '*');
};
  
app.use(main);
app.listen(3100);
```
再次访问 http://client.com, 页面显示出 'hellp world';

下面来配置nginx解决跨域问题
```js
{
    server {
        listen 80; // 默认监听80端口
        server_name server.com;

        location / {
            proxy_pass http://server.com:3100/;
            add_header Access-Control-Allow-Origin *;
        }
    }
    server {
        listen 80;
        server_name client.com;
        root /Users/wangyaxing/github/try-koa;

    }
}
```
修改html文件接口请求部分
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="main"></div>
    <script>
        fetch('http://server.com').then((res) => {
            res.text()
            .then(
                res => {
                    document.getElementById('main').innerHTML = res;
                }
            );
        })
    </script>
</body>
</html>
```
因为nginx默认监听80端口,通过80端口转发到server.com的3100端口,解决了跨域问题

全程要理解hosts是给IP起了一个别名







