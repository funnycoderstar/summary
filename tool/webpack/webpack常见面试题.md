# webpack常见面试题
1. 常见的loader和plugin，loader和plugin的区别, webpack的plugins和loaders的实现原理
2. webpack如何优化编译速度
3. webpack性能优化手段
4. 如何编写loaders和plugins
5. webpack 热更新原理
6. webpack babel配置中的stage-0是什么意思？
7. 如何提高webpack打包的速度
8. webpack 打包的过程
9. 和其他构建工具的区别(gulp, grunt, rollup)

## 1. webpack 的 loader 和 plugin
### loader
对模块的源代码进行转换, webpack只能处理javaScript, 如果要处理其他类型的文件, 就需要使用loader进行转换;
1. loader可以使你在 import 或"加载"模块时预处理文件
2. loader允许你在javascript模块中 import css文件
3. 将文件从其他语言转为javascript, 比如ts-loader

常用的loader

- style-loader: 创建style标签将css文件嵌入到html中
- css-loader: 处理其中的@import和url()
- less-loader: 将less转为css
- url-loader: 将图片大小小于limit参数的转成base64的图片(data url), 大于limit参数的, url-loader会调用file-loader进行处理
- file-loader: 解析项目中的url引入(不仅限于css), 根据我们的配置, 将图片拷贝到响应的路径, 再根据我们的配置, 修改打包后文件使用路径, 使之指向正确的文件

### plugin
plugin: 插件, 用来扩展webpack功能

常用的plugin
- htmlWebpackPlugin: 根据模板自动生成html文件, 并自动引用css和js文件
- extract-text-webpack-plugin: 将Js中引用的样式文件单独抽离成css文件
- DefinePlugin: 编译时配置全局变量
- happypack：通过多进程模型，来加速代码构建

## 2.webapck和其他构建工具的区别(gulp, grunt, rollup)
webpack, 提供了前端模块化的方案

gulp/grunt, 可以理解为帮助前端自动化的工具, 主要是定义一些任务

rollup 适合打包库

## 3.webpack热部署原理
webpack-dev-middleware
webpack-hot-middleware

eventSource主动向客户端推送更新的内容

https://zhuanlan.zhihu.com/p/30623057
https://zhuanlan.zhihu.com/p/30669007


## 简单看一下现象
有一个`__webpack_hmr`的请求
- 1.这里看的的内容类型为eventStream,具体是啥请看之后介绍的 EventSource
- 2.返回信息为message, 内容关键的有个 action: async和hash:73c528ba5b06e7e9ab26,这里的几个信息后面都会用到,这里的hash为webpack初始化的一个hash, 在vendor.js文件里面可以看到, 每次页面首次加载时, 都会重新生成一个(var hotCurrentHash = “73c528ba5b06e7e9ab26”)
- 有一个空的message信息,通过观察发现和后面查看代码发现,这个是为了保证后端与客户端通信保持连接, 后端隔一段时间会向客户端发送一段信息

## 热更新实现分析
1. EventSource 服务端与客户端通信
通过查看代码webpack-hot-middleware/client发现通信是用window.EventSource实现, EventSource又是什么呢
EventSource是HTML5中Server-send Events规范的一种技术实现. EventSource接口用于接收服务器发送的事件.它通过 HTTP 连接到一个服务器, 以text/event-stream形式接收事件, 不关闭连接.通过 EventSource服务端可以主动给客户端发送消息,使用的是HTTP协议, 单项通信, 只能服务端向浏览器发送; 与WebSocket相比轻量, 使用简单,支持线重连.更多信息参考: [MDN](https://developer.mozilla.org/zh-CN/docs/Server-sent_events/Using_server-sent_events)

2. Node 端通信实现
Node 通过中间件 [webpack-hot-middleware/middleware.js](https://github.com/webpack-contrib/webpack-hot-middleware/blob/master/middleware.js)
3. 创建 createEventStream 流

看了一下核心代码, 主要是向客户端发送消息
- compile: 发送编译中消息给客户端
- build: 发送编译完成消息给客户端
- sync: 文件修复热更新或者报错会发送该消息
```js
function createEventStream(heartbeat) {
  var clientId = 0;
  var clients = {};
  function everyClient(fn) {
    Object.keys(clients).forEach(function(id) {
      fn(clients[id]);
    });
  }
  var interval = setInterval(function heartbeatTick() {
    everyClient(function(client) {
      client.write('data: \uD83D\uDC93\n\n');
    });
  }, heartbeat).unref();
  return {
    close: function() {
      clearInterval(interval);
      everyClient(function(client) {
        if (!client.finished) client.end();
      });
      clients = {};
    },
    // 初始化 EventStream 发送消息通道
    handler: function(req, res) {
      var headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/event-stream;charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        // While behind nginx, event stream should not be buffered:
        // http://nginx.org/docs/http/ngx_http_proxy_module.html#proxy_buffering
        'X-Accel-Buffering': 'no',
      };

      var isHttp1 = !(parseInt(req.httpVersion) >= 2);
      if (isHttp1) {
        req.socket.setKeepAlive(true);
        Object.assign(headers, {
          Connection: 'keep-alive',
        });
      }

      res.writeHead(200, headers);
      res.write('\n');
      var id = clientId++;
      clients[id] = res;
      req.on('close', function() {
        if (!res.finished) res.end();
        delete clients[id];
      });
    },
    publish: function(payload) {
      everyClient(function(client) {
        client.write('data: ' + JSON.stringify(payload) + '\n\n');
      });
    },
  };
}
// 根据 Webpack 编译状态 主动发送消息给客户端
function webpackHotMiddleware(compiler, opts) {
  opts = opts || {};
  opts.log =
    typeof opts.log == 'undefined' ? console.log.bind(console) : opts.log;
  opts.path = opts.path || '/__webpack_hmr';
  opts.heartbeat = opts.heartbeat || 10 * 1000;

  var eventStream = createEventStream(opts.heartbeat);
  var latestStats = null;
  var closed = false;

  if (compiler.hooks) {
    compiler.hooks.invalid.tap('webpack-hot-middleware', onInvalid);
    compiler.hooks.done.tap('webpack-hot-middleware', onDone);
  } else {
    compiler.plugin('invalid', onInvalid);
   
    compiler.plugin('done', onDone);
  }
  function onInvalid() {
    if (closed) return;
    latestStats = null;
    if (opts.log) opts.log('webpack building...');
    eventStream.publish({ action: 'building' });
  }
  function onDone(statsResult) {
    if (closed) return;
    // Keep hold of latest stats so they can be propagated to new clients
    latestStats = statsResult;
    publishStats('built', latestStats, eventStream, opts.log);
  }
  var middleware = function(req, res, next) {
    if (closed) return next();
    if (!pathMatch(req.url, opts.path)) return next();
    eventStream.handler(req, res);
    if (latestStats) {
      // Explicitly not passing in `log` fn as we don't want to log again on
      // the server
      publishStats('sync', latestStats, eventStream);
    }
  };
  middleware.publish = function(payload) {
    if (closed) return;
    eventStream.publish(payload);
  };
  middleware.close = function() {
    if (closed) return;
    // Can't remove compiler plugins, so we just set a flag and noop if closed
    // https://github.com/webpack/tapable/issues/32#issuecomment-350644466
    closed = true;
    eventStream.close();
    eventStream = null;
  };
  return middleware;
}
```

4. 客户端通信实现
服务端通过 EventSource发送消息给客户端, 我们来看看客户端的通信实现: [webpack-hot-middleware/blob/master/client.js](https://github.com/webpack-contrib/webpack-hot-middleware/blob/master/client.js)
```js
var source = new window.EventSource('(http://127.0.0.1:9000/__webpack_hmr)');
source.onopen = handleOnline; // 建立链接
source.onerror = handleDisconnect;
source.onmessage = handleMessage; // 接收服务端消息，然后进行相应处理
```
Node端会主动发送消息给客户端, 客户端关键代码处理消息如下
```js
unction processMessage(obj) {
  switch(obj.action) {
    case "building": 
      if (options.log) {
        console.log(
          "[HMR] bundle " + (obj.name ? "'" + obj.name + "' " : "") +"rebuilding"
        );
      }
      break;
    case "built": // 这里没有break，所以 编译完成会执行 build 和 sync 逻辑
      if (options.log) {
        console.log(
          "[HMR] bundle " + (obj.name ? "'" + obj.name + "' " : "") +
          "rebuilt in " + obj.time + "ms"
        );
      }
      // fall through
    case "sync":
      processUpdate(obj.hash, obj.modules, options);
      break;
    default:
      if (customHandler) {
        customHandler(obj);
      }
  }
}
```
上面的building, built, sync三种消息与服务端发送的消息对应, 这样就完成了服务端和客户端通信
因build的action时, build case没有break, 所以当修改文件时, 编译完成发送build消息时, 会依次执行build和sync逻辑,也就是进入 processUpdate流程, processUpdate接收到(hash, module)之后, 进入module.hot.check和module.hot.apply流程


5. 客户端热更新
首先我们再来看看 module.hot 初始化实现逻辑: 

module.hot 初始化
webpack_require 函数定义时, 通过hotCreateModule为每一个module初始化hot逻辑
```js
function __webpack_require__(moduleId) {
  var module = installedModules[moduleId] = {
    i: moduleId,
    l: false,
    exports: {},
    hot: hotCreateModule(moduleId), // 前端通过 ajax 获取热更新文件内容
    parents:xxxx,
    children: []
  };
  return module.exports;
}
```
hotCreateModule实现
```js
function hotCreateModule(moduleId) {
  var hot = {
    accept: function(dep, callback) {
    },
    check: hotCheck,
    apply: hotApply,
    status: function(l) {},
    .....
  }
  return hot;
}
```

6. hotCheck：前端通过 ajax 获取热更新文件内容
每次服务端发送的消息(EventStream)的hash将作为下次 `hot-update.json`和`hot-`
7. hotEnsureUpdateChunk 实现

8. 开启更新机制
开启热更新构建后, 每个Vue组件构建的代码都有下面这么一段hotAPI代码
```js

```

## 总结
![img](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1556098546991.png?width=720&height=815&imageView2/3/)
1. webpack编译期, 为需要热更新的entry注入热更新代码(EventSource通信)
2. 页面首次打开后, 服务端与客户端通过 EventSource建立通信渠道,把下一次的hash返回前端
3. 客户端获取到hash, 这个hash将作为下一次请求服务端 hot-update.js和hot-update.json的hash
4. 修改页面代码后, webpack监听到文件修改后, 开始编译, 编译完成后, 发送build消息给客户端
5. 客户端获取hash, 成功后客户端构造 `hot-update.js`script链接, 然后插入主文档
6. hot-update.js插入成功后, 执行hotApi的createRecord和reload方法, 获取到 Vue 组件的render方法 重新render组件, 继而实现 UI 无刷新更新

## 参考
[Webpack 热更新实现原理分析](https://zhuanlan.zhihu.com/p/30623057)

## 4.webpack 打包的过程

## 5.编写一个plugin和loader
## 6.webpack如何优化编译速度

项目方面
1. 使用Yarn
2. 删除没有使用的依赖
webpack
1. happypack
原理就是让loader可以多进程地去处理文件









