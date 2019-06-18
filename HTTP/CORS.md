# CORS原理及@koa/cors源码解析

# 目录
- 跨域
- 简单请求和复杂请求
- 服务端如何设置CORS
- @koa/cors是怎么实现的

# 跨域
## 为什么会有跨域问题？
这是浏览器的同源策略所造成的，同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。
> 一定要注意跨域是浏览器的限制，其实你用抓包工具抓取接口数据，是可以看到接口已经把数据返回回来了，只是浏览器的限制，你获取不到数据。用postman请求接口能够请求到数据。这些再次印证了跨域是浏览器的限制。

## 如何解决跨域?
- jsonp: 带有src属性的标签都可以用来， 但是只能处理GET请求
- document.domain + iframe跨域
- location.hash + iframe
- window.name + iframe
- postMessage跨域
- Nginx配置反向代理
- CORS（跨域资源共享）：支持所有类型的HTTP请求
相信大家对于以上的解决方法都很熟悉，这里不再对每一种方法展开讲解，接下来主要讲一下CORS；

# 简单请求和非简单请求
浏览器将**CORS跨域请求**分为简单请求和非简单请求；
> 如果你使用nginx反向代理解决的跨域问题，则不会有跨域请求这个说法了，因为nginx反向代理就使得前后端是同一个域了，就不存在跨域问题了。

只要同时满足一下两个条件，就属于简单请求
(1)使用下列方法之一：
- head
- get
- post

(2)请求的Heder是
- Accept
- Accept-Language
- Content-Language
- Content-Type: 只限于三个值： 
     - application/x-www-form-urlencoded
     - multipart/form-data
     - text/plain

不同时满足上面的两个条件，就属于非简单请求。
浏览器对这两种的处理，是不一样的。
## 简单请求
### 例子
对于简单请求，浏览器直接发出CORS请求。具体来说，就是头信息之中，增加一个Origin字段。
![简单请求](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1560869800767.jpeg)
上面这个例子，`post`请求，`Content-Type`为`application/x-www-form-urlencoded`，满足简单请求的条件；响应头部返回`Access-Control-Allow-Origin: http://127.0.0.1:3000`;
浏览器发现这次跨域请求是简单请求，就自动在头信息之中，添加一个`Origin`字段；`Origin`字段用来说明请求来自哪个源（协议+域名+端口号）。服务端根据这个值，决定是否同意本次请求。

### CORS请求相关的字段，都以 `Access-Control-`开头
- Access-Control-Allow-Origin：必选
   - 请求头`Origin`字段的值
   - `*`：接受任何域名
- [Access-Control-Allow-Credentials](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials)：可选，
  - true: 表示允许发送cookie，此时`Access-Control-Allow-Origin`不能设置为`*`，必须指定明确的，与请求网页一致的域名。
  - 不设置该字段：不需要浏览器发送cookie
- Access-Control-Expose-Headers：可选

### withCredentials 属性
CORS请求默认不发送Cookie和HTTP认证信息，如果要把Cookie发到服务器，一方面需要服务器同意，设置响应头`Access-Control-Allow-Credentials: true`,另一方面在客户端发出请求的时候也要进行一些设置;
```js
// XHR
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://example.com/', true); 
xhr.withCredentials = true; 
xhr.send(null);

// Fetch
fetch(url, {
  credentials: 'include'  
})
```

## 非简单请求
非简单请求就是那种对服务器有特殊要求的请求，比如请求方法为`PUT`或`DELETE`，或者`Content-Type`字段为`application/json`;
### 预检请求和回应
非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为“预检”请求；
浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段，只有得到肯定答复，浏览器才会发出正式的接口请求，否则就会报错；
![preflight](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1560869817543.jpeg)

HTTP请求的方法是POST，请求头`Content-Type`字段为`application/json`。浏览器发现，这是一个非简单请求，就自动发出一个`预检`请求，要求服务器确认可以这样请求。

#### 请求
`预检`请求用的请求方法是OPTIONS，表示这个请求是用来询问的。头信息里面，关键字段是`Origin`，表示请求来自哪个域。
除了`Origin`，`预检`请求的头信息包括两个特殊字段：
- Access-Control-Request-Method： 必选，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是`POST`
- Access-Control-Request-Headers：该字段是一个用逗号分割的字符串，执行浏览器CORS请求会额外发送的头信息字段，上例是`Content-Type`;

#### 回应
服务器收到`预检`请求以后，检查了`Origin`、`Access-Control-Request-Method`和`Access-Control-Request-Headers`字段以后，确认允许跨域请求，就可以做出回应。
上面的HTTP回应中，关键的是Access-Control-Allow-Origin字段，表示http://127.0.0.1:3000可以请求数据。该字段也可以设为星号，表示同意任意跨源请求。

如果浏览器否定了“预检”请求，就会返回一个正常的HTTP回应，但是没有任何CORS相关的头信息字段，这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被XMLHttpRequest对象的onerror回调函数捕获h。

服务器回应的其他CORS字段
- Access-Control-Allow-Methods：必需；它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的方法。这是为了避免多次`预检`请求。
- Access-Control-Allow-Headers：如果浏览器请求头里包括`Access-Control-Request-Headers`字段，则`Access-Control-Allow-Headers`字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在`预检`中请求的字段。
- Access-Control-Allow-Credentials：与简单请求时含义相同。
- Access-Control-Allow-Max-Age: 可选，用来指定本次预检请求的有效期。单位为秒。在有效期内，不用发出另一条预检请求
### 正常请求和回应
一旦服务器通过了`预检`请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个`Origin`头信息字段。服务器的回应，也都会有一个`Access-Control-Allow-Origin`头信息字段；

![normal](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1560873193334.jpeg)

# 服务端如何设置CORS

## 单独接口单独处理
比如一个简单的登录页面，需要给接口接口传入 username和password 两个字段；前端的域名为 localhost:8900，后端的域名为 localhost:3200，构成跨域。
1. 如果设置请求头`'Content-Type': 'application/x-www-form-urlencoded'`，这种情况则为简单请求；
会有跨域问题，直接设置 响应头 `Access-Control-Allow-Origin`为`*`, 或者具体的域名；注意如果设置响应头`Access-Control-Allow-Credentials`为`true`，表示要发送`cookie`，则此时`Access-Control-Allow-Origin`的值不能设置为星号，必须指定明确的，与请求网页一致的域名。
```js
const login = ctx => {
    const req = ctx.request.body;
    const userName = req.userName;
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.response.body = {
        data: {},
        msg: '登陆成功'
    };
}
```

2. 如果设置请求头`'Content-Type': 'application/json'`，这种情况则为非简单请求
处理OPTIONS请求，服务端可以单独写一个路由，来处理`login`的OPTIONS的请求
```js
app.use(route.options('/login', ctx => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type');
    ctx.status = 204;
    
}));
```

大家都知道前端调用服务端的时候，会调用很多个接口，并且每个接口处理跨域请求的逻辑是完全一样的，我们可以把这部分抽离出来，作为一个中间件；
## 写一个中间件进行处理
```js
const Koa = require("koa");
const app = new Koa();
const route = require('koa-route');
var bodyParser = require('koa-bodyparser');

app.use(bodyParser()); // 处理post请求的参数

const login = ctx => {
    const req = ctx.request.body;
    const userName = req.userName;
    const expires = Date.now() + 3600000; // 设置超时时间为一小时后
    
    var payload = { 
        iss: userName,
        exp: expires
    };
    const Token = jwt.encode(payload, secret);
    ctx.response.body = {
        data: Token,
        msg: '登陆成功'
    };
}


app.use((ctx, next)=> {
    console.log(ctx.request.headers);
    const headers = ctx.request.headers;
    if(ctx.method === 'OPTIONS') {
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'Authorization');
        ctx.status = 204;
    } else {
        next();
    }
})
app.use(route.post('/login', login));


app.listen(3200, () => {
    console.log('启动成功');
});

```

# @koa/cors是怎么实现的
```js
'use strict';

const vary = require('vary');

/**
 * CORS middleware
 *
 * @param {Object} [options]
 *  - {String|Function(ctx)} origin `Access-Control-Allow-Origin`, default is request Origin header
 *  - {String|Array} allowMethods `Access-Control-Allow-Methods`, default is 'GET,HEAD,PUT,POST,DELETE,PATCH'
 *  - {String|Array} exposeHeaders `Access-Control-Expose-Headers`
 *  - {String|Array} allowHeaders `Access-Control-Allow-Headers`
 *  - {String|Number} maxAge `Access-Control-Max-Age` in seconds
 *  - {Boolean} credentials `Access-Control-Allow-Credentials`
 *  - {Boolean} keepHeadersOnError Add set headers to `err.header` if an error is thrown
 * @return {Function} cors middleware
 * @api public
 */
module.exports = function (options) {
    const defaults = {
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    };

    options = Object.assign({}, defaults, options);

    if (Array.isArray(options.exposeHeaders)) {
        options.exposeHeaders = options.exposeHeaders.join(',');
    }

    if (Array.isArray(options.allowMethods)) {
        options.allowMethods = options.allowMethods.join(',');
    }

    if (Array.isArray(options.allowHeaders)) {
        options.allowHeaders = options.allowHeaders.join(',');
    }

    if (options.maxAge) {
        options.maxAge = String(options.maxAge);
    }

    options.credentials = !!options.credentials;
    options.keepHeadersOnError = options.keepHeadersOnError === undefined || !!options.keepHeadersOnError;

    return async function cors(ctx, next) {
        // If the Origin header is not present terminate this set of steps.
        // The request is outside the scope of this specification.
        const requestOrigin = ctx.get('Origin');

        // Always set Vary header
        // https://github.com/rs/cors/issues/10
        ctx.vary('Origin');

        if (!requestOrigin) return await next();

        let origin;
        if (typeof options.origin === 'function') {
            origin = options.origin(ctx);
            if (origin instanceof Promise) origin = await origin;
            if (!origin) return await next();
        } else {
            origin = options.origin || requestOrigin;
        }

        const headersSet = {};

        function set(key, value) {
            ctx.set(key, value);
            headersSet[key] = value;
        }

        if (ctx.method !== 'OPTIONS') {
            // Simple Cross-Origin Request, Actual Request, and Redirects
            set('Access-Control-Allow-Origin', origin);

            if (options.credentials === true) {
                set('Access-Control-Allow-Credentials', 'true');
            }

            if (options.exposeHeaders) {
                set('Access-Control-Expose-Headers', options.exposeHeaders);
            }

            if (!options.keepHeadersOnError) {
                return await next();
            }
            try {
                return await next();
            } catch (err) {
                const errHeadersSet = err.headers || {};
                const varyWithOrigin = vary.append(errHeadersSet.vary || errHeadersSet.Vary || '', 'Origin');
                delete errHeadersSet.Vary;

                err.headers = Object.assign({}, errHeadersSet, headersSet, {
                    vary: varyWithOrigin
                });

                throw err;
            }
        } else {
            // Preflight Request

            // If there is no Access-Control-Request-Method header or if parsing failed,
            // do not set any additional headers and terminate this set of steps.
            // The request is outside the scope of this specification.
            if (!ctx.get('Access-Control-Request-Method')) {
                // this not preflight request, ignore it
                return await next();
            }

            ctx.set('Access-Control-Allow-Origin', origin);

            if (options.credentials === true) {
                ctx.set('Access-Control-Allow-Credentials', 'true');
            }

            if (options.maxAge) {
                ctx.set('Access-Control-Max-Age', options.maxAge);
            }

            if (options.allowMethods) {
                ctx.set('Access-Control-Allow-Methods', options.allowMethods);
            }

            let allowHeaders = options.allowHeaders;
            if (!allowHeaders) {
                allowHeaders = ctx.get('Access-Control-Request-Headers');
            }
            if (allowHeaders) {
                ctx.set('Access-Control-Allow-Headers', allowHeaders);
            }

            ctx.status = 204;
        }
    };
};
```

