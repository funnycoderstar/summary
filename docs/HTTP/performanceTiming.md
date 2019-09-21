## 性能指标

- 从起始算起的指标:
    - 到DNS查询结束耗时: timing.domainLookupEnd - timing.navigationStart;
    - 到请求结束耗时: timing.responseEnd - timing.navigationStart;
    - 到DOM可交互耗时: timing.domInteractive - timing.navigationStart;
    - 总耗时: timing.loadEventEnd - timing.navigationStart;
- 阶段指标（按顺序）:
    - 重定向时间: timing.redirectEnd - timing.redirectStart;
    - unload事件时间: timing.unloadEventEnd - timing.unloadEventStart;
    - appcache时间: timing.domainLookupStart - timing.fetchStart;
    - DNS查询时间: timing.domainLookupEnd - timing.domainLookupStart;
    - 连接时间: timing.connectEnd - timing.connectStart;
    - 请求时间: timing.responseEnd - timing.requestStart;
    - 请求到DOM可交互时间（包含解析HTML，非defer的script和css的时间）: timing.domInteractive - timing.responseEnd;
    - DOM可交互到DOMReady时间（包含处理defer的script的时间）: timing.domComplete - timing.domInteractive;
    - load事件时间: timing.loadEventEnd - timing.loadEventStart;

![时间阶段](https://w3c.github.io/perf-timing-primer/images/navigation-timing-attributes.png)

[计算方式](https://github.com/addyosmani/timing.js)

## PerformanceTiming的属性：
![PerformanceTiming](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1562655809086.png)

Navigation Timing API提供了可用于衡量一个网站性能的数据。
Web Performance API 允许网页访问某些函数来测量网页和Web应用程序的性能。

> 以下属性均省略`PerformanceTiming.`， 按照事件发生的先后顺序，这些事件的列表如下：

- navigationStart：表征了从同一个浏览器上下文的上一个文档卸载([unload](https://developer.mozilla.org/zh-CN/docs/Web/Events/unload)：当文档或一个子资源正在被卸载时, 触发 unload事件。)结束时的UNIX时间戳。如果没有上一个文档，这个值会和PerformanceTiming.fetchStart相同。
- unloadEventStart：表示unload事件抛出时的Unix毫秒时间戳
- unloadEventEnd：表示unload事件处理完成时的Unix毫秒时间戳
- redirectStart：第一个HTTP重定向开始时的Unix毫秒时间戳，如果没有重定向，或者重定向中的一个不同源，这个值会返回0.
- redirectEnd：最后一个HTTP重定向完成时（也就是说HTTP响应的最后一个比特直接被接收到的时间）Unix毫秒时间戳
- requestStart： 返回浏览器向服务器发出HTTP请求时(或开始读取本地缓存时)Unix毫秒时间戳，如果没有重定向，或者重定向中的一个不同源，这个值会返回0.
- fetchStart：浏览器准备好使用HTTP请求来获取（fetch）文档的Unix毫秒时间戳。这个时间点会在检查任何应用缓存之前。
- domainLookupStart：域名查询开始时的Unix毫秒时间戳。如果使用了持续连接(persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和 PerformanceTiming.fetchStart一致。
- domainLookupEnd：域名查询结束时的Unix毫秒时间戳。如果使用了持续连接(persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和 PerformanceTiming.fetchStart一致。
- connectStart：返回HTTP请求开始向服务器发送时的Unix毫秒时间戳。如果使用持久连接（persistent connection），则返回值等同于fetchStart属性的值。
- connectEnd：返回浏览器与服务器之间的连接建立时的Unix毫秒时间戳，如果建立的是持久连接，则返回值等同于fetchStart属性的值。连接建立指的是所有握手和认证过程全部结束。
- secureConnectionStart：返回浏览器与服务器开始安全链接的握手时Unix毫秒时间戳。如果当前网页不要求安全连接，则返回0。
- responseStart：返回从浏览器到服务器收到(或从本地缓存读取)第一个字节时的Unix毫秒时间戳
- responseEnd：返回从浏览器到服务器收到(或从本地缓存读取)最后一个字节时的Unix毫秒时间戳
- domLoading：当前网页DOM结构开始解析时(即Document.readyState属性变为”loading“，相应的readystatechange事件触发时)
- domInteractive：返回当前网页DOM结构结束解析，开始加载内嵌资源时(即Document.readyState属性变为”interactive“，相应的readystatechange事件触发时)
- domContentLoadedEventStart：返回当解析器发送`DOMContentLoaded`事件，即所有需要被执行的脚本已经被解析时的Unix毫秒时间戳
- domContentLoadedEventEnd：返回所有需要立即执行的脚本已经被执行（不论执行顺序）时的Unix毫秒时间戳
- domComplete：返回当前文档解析完成，即`Document.readyState`变为`complete`,相应的readystatechange事件触发时的Unix毫秒时间戳
- loadEventStart：返回该文档下，load事件（当一个资源及其依赖资源已完成加载时，将触发load事件。）被发送时的Unix毫秒时间。如果这个事件还未被发送，它的值将会是0
- loadEventEnd：返回当load事件结束，即加载完成时的Unix毫秒时间戳.如果这个事件还未被发送，或者尚未完成，它的值将会是0.

> 
- 1.时间戳是自 1970 年 1 月 1 日（00:00:00 GMT）以来的秒数。它也被称为 Unix 时间戳（Unix Timestamp）, 根据表示的精确度的不同，Unix时间戳有10位（秒级），也有13位（毫秒级），也有19位（纳秒级）等。
- 2.[DOMContentLoaded](https://developer.mozilla.org/zh-CN/docs/Web/Events/DOMContentLoaded)

`window.performance.navigation`对象存储了两个属性，他们表示触发页面加载的原因。这些原因可能是页面重定向，前进后退按钮或者普通的url加载
`window.performance.navigation.type`：
- TYPE_NAVIGATE：0， 导航开始于点击链接，或者用户代理中输入url，或者表单提交，或者通过下表中TYPE_RELOAD和TYPE_BACK_FORWARD的脚本初始化操作.
- TYPE_RELOAD： 1，通过刷新操作或者location.reload()方法导航
- TYPE_BACK_FORWARD： 2，通过历史遍历操作导航
- TYPE_UNDEFINED： 255，其他非以上类型的导航


## 参考
- [Navigation Timing API](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigation_timing_API)
- [PerformanceTiming](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceTiming)
- [PerformanceNavigation](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceNavigation)

https://w3c.github.io/perf-timing-primer/#bib-NAVIGATION-TIMING-2
https://www.w3.org/TR/navigation-timing-2/#dom-performancenavigationtiming-dominteractive
https://github.com/addyosmani/timing.js/blob/master/timing.js
https://w3c.github.io/perf-timing-primer/images/navigation-timing-attributes.png
https://developers.google.com/web/tools/chrome-devtools/network-performance/reference#timing

## Document.readyState

描述了文档的加载状态
- loading： 正在加载，表示文档还在加载中
- interactive：可交互，表示文档已被解析，”正在加载“状态结束，DOM元素可以被访问，但是诸如图像，样式表和框架之类的子资源仍在加载。可以用来模拟`DOMContentLoaded`事件
- complete: 完成，文档和所有子资源已完成加载。表示load状态的事件即将被触发。模拟load事件。
```js
switch (document.readyState) {
  case "loading":
    // 表示文档还在加载中，即处于“正在加载”状态。
    break;
  case "interactive":
    // 文档已经结束了“正在加载”状态，DOM元素可以被访问。
    // 但是像图像，样式表和框架等资源依然还在加载。
    var span = document.createElement("span");
    span.textContent = "A <span> element.";
    document.body.appendChild(span);
    break;
  case "complete":
    // 页面所有内容都已被完全加载.
    let CSS_rule = document.styleSheets[0].cssRules[0].cssText;
    console.log(`The first CSS rule is: ${CSS_rule }`);
    break;
}
```

### document.onreadystatechange
当这个属性的值变化时，document.onreadystatechange将被触发

```js
// 替代 DOMContentLoaded
document.onreadystatechange = function () {
    if (document.readyState === "interactive") {
        initApplication();
    }
}
// 模拟 load 事件
document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    initApplication();
  }
}

```

## Chrome DevTools 的  “Performance Monitor”工具
可以体现实时性能：
其中有一些性能选项可以用来检测css性能：

GPU：主要用于画图
CPU：主要用于计算
我们都知道，改变CSS的 top和 left属性会触发整个像素渲染流程：绘制，布局和组合。如果我们将这些属性用于动画，它将每秒触发十几次/上百次操作；
使用 CSS 的 transform属性的 translateX/Y来切换动画，你将会发现，你将会发现，这并不会触发绘制和布局，仅仅会触发组合这一阶段，因为这是基于 GPU 的，会将你的 CPU 使用率降低为基本为 0%。
https://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/ . 为什么使用 Translate() 移动元素优于 Top/left


