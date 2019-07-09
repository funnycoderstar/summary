## 性能指标
总体指标
到 DOM 可交互耗时 timing.domComplete - timing.navigationStart
总耗时timing.loadEventEnd - timing.navigationStart
到 DNS 查询结束耗时timing.domainLookupEnd - timing.navigationStart
到请求结束耗时timing.responseEnd - timing.navigationStart
首次渲染耗时timing.msFirstPaint

阶段指标（按顺序）
重定向时间timing.redirectEnd - timing.redirectStart
unload 事件时间timing.unloadEventEnd - timing.unloadEventStart
appcache 时间timing.domainLookupStart - timing.fetchStart
DNS 查询时间timing.domainLookupEnd - timing.domainLookupStart
连接时间timing.connectEnd - timing.connectStart
请求时间timing.responseEnd - timing.requestStart
请求到 DOM 可交互时间（包含解析HTML，非defer的script和css的时间）timing.domInteractive - timing.responseEnd
DOM 可交互到 DOMReady 时间（包含处理defer的script的时间）timing.domComplete - timing.domInteractive
load 事件时间timing.loadEventEnd - timing.loadEventStart

到 DOM 可交互耗时timing.domComplete - timing.navigationStart
总耗时timing.loadEventEnd - timing.navigationStart
## PerformanceTiming的属性：
![PerformanceTiming](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1562655809086.png)

Navigation Timing API提供了可用于衡量一个网站性能的数据。
Web Performance API 允许网页访问某些函数来测量网页和Web应用程序的性能。

> 以下属性均省略`PerformanceTiming.`

navigationStart：表征了从同一个浏览器上下文的上一个文档卸载(unload)结束时的UNIX时间戳。如果没有上一个文档，这个值会和PerformanceTiming.fetchStart相同。
requestStart： 返回浏览器向服务器发出HTTP请求时(或开始读取本地缓存时)Unix毫秒时间戳
responseStart：返回从浏览器到服务器收到(或从本地缓存读取)第一个字节时的Unix毫秒时间戳
responseEnd：返回从浏览器到服务器收到(或从本地缓存读取)最后一个字节时的Unix毫秒时间戳
domLoading：当前网页DOM结构开始解析时(即Document.readyState属性变为”loading“，相应的readystatechange事件触发时)
domInteractive：返回当前网页DOM结构结束解析，开始加载内嵌资源时(即Document.readyState属性变为”interactive“，相应的readystatechange事件触发时)
domContentLoadedEventStart：返回当解析器发送`DOMContentLoaded`事件，即所有需要被执行的脚本已经被解析时的Unix毫秒时间戳
domContentLoadedEventEnd：返回所有需要立即执行的脚本已经被执行（不论执行顺序）时的Unix毫秒时间戳
domComplete：返回当前文档解析完成，即`Document.readyState`变为`complete`,相应的readystatechange事件触发时的Unix毫秒时间戳
loadEventStart：返回该文档下，load事件被发送时的Unix毫秒时间。如果这个事件还未被发送，它的值将会是0
loadEventEnd：返回当load事件结束，即加载完成时的Unix毫秒时间戳.如果这个事件还未被发送，或者尚未完成，它的值将会是0.

## 参考
- [Navigation Timing API](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigation_timing_API)
- [PerformanceTiming](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceTiming)
- [PerformanceNavigation](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceNavigation)

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




