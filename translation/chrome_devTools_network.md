# 网络分析的参考(chrome network的相关信息)
> 以下是对 [chrome-devtools/network/reference](https://developers.google.com/web/tools/chrome-devtools/network/reference)的翻译

在这篇全面参考Chrome DevTools网络分析特性的文章中，您将发现分析页面加载方式的新方法。
注:此参考基于Chrome 58。如果您使用另一个版本的Chrome, DevTools的UI和特性可能会有所不同。检查chrome:帮助查看你运行的是什么版本的chrome。
## 1、记录网络请求
默认情况下，只要DevTools是打开的，DevTools就会在网络面板中记录所有的网络请求。
![Figure 1. The Network panel](https://developers.google.com/web/tools/chrome-devtools/network/imgs/network.png)
### 停止记录网络请求
停止记录请求：
  - 在“网络”面板上单击“停止记录网络日志”<img src="https://developers.google.com/web/tools/chrome-devtools/network/imgs/record-on.png">。它变成灰色表示DevTools不再记录请求。
  - 当网络面板处于焦点时，按Command+E (Mac)或Control+E (Windows, Linux)。

## 2、清空请求记录
单击网络面板上的Clear Clear<img src="https://developers.google.com/web/tools/chrome-devtools/network/imgs/clear-requests.png">以清除请求表中的所有请求。
![Figure 2. Clear, outlined in blue](https://developers.google.com/web/tools/chrome-devtools/network/imgs/clear.svg)

## 3、跨页面加载保存请求
若要跨页面加载保存请求，请选中网络面板上的“Preserve log”复选框。DevTools保存所有请求，直到禁用“Preserve log”。
![Figure 3. The Preserve Log checkbox, outlined in blue](https://developers.google.com/web/tools/chrome-devtools/network/imgs/preserve-log.svg)

### 在页面加载期间捕获屏幕截图
捕获屏幕截图,分析用户在等待页面加载时看到的内容。
要启用屏幕截图,请单击"捕获屏幕截图"<img src="https://developers.google.com/web/tools/chrome-devtools/network/imgs/capture-screenshots.png">在"Network"面板上捕获屏幕截图。启用后变为蓝色。
在"Network"面板处于焦点以捕获屏幕截图时重新加载页面。
一旦捕获，您可以通过以下方式与截图交互
 - 将鼠标悬停在截图上，查看截图被捕获的位置。在Overview窗格上出现一条黄线。
 - 单击屏幕快照的缩略图，以过滤捕获屏幕快照后发生的任何请求。
 - 双击缩略图来放大它。
 ![图4.将鼠标悬停在屏幕截图上。“概述”窗格和“瀑布”中的黄色垂直线表示捕获屏幕截图的时间。](https://developers.google.com/web/tools/chrome-devtools/network/imgs/screenshot-hover.png)

## 4、重播XHR请求
在请求列表上右键选择 Replay XHR
![图5.选择重播XHR](https://developers.google.com/web/tools/chrome-devtools/network/imgs/replay-xhr.png)
## 修改加载行为
通过禁用浏览器缓存来模拟第一次访问的访问者
要模拟用户第一次访问网站，选中”Disable cache“复选框。DevTools禁止浏览器缓存，这更准确地模拟了首次使用者的体验，因为在重复访问时会从浏览器缓存中获取数据。
![图6."禁用缓存”复选框，以蓝色标出](https://developers.google.com/web/tools/chrome-devtools/network/imgs/disable-cache.svg)
### 手动清除浏览器缓存

## 请求的时间细分
![network Analysis](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1562832688813.png)

- Queueing： 浏览器在一下时间排队请求：
    - 有更高优先级的请求
    - 当前域名只有6个TCP连接并发，该限制只在http/1.0和http/1.1存在，http2已经不存在这个限制了
    - 浏览器正在短暂分配磁盘缓存中的空间
- Stalled：由于排队中描述的任何原因，请求可能会停止。
- DNS Lookup：浏览器正在解析请求的IP地址。
- Proxy negotiation：浏览器正在与代理浏览器协商请求
- Request sent: 请求正在被发送
- ServiceWorker Prepatation: 浏览器正在启动服务工作者
- Request to ServinceWorker: 请求正在发动给服务端
- Waiting(TTFB): 浏览器等待接收响应的时间。TTFB代表接收响应第一个字节的耗时。此时间包括一次往返延迟和服务器准备响应所用的时间
- Content Download: 浏览器正在接收(下载)响应
- Receiving push： 浏览器通过HTTP/2服务器推送接收此响应的数据。
- Reading push: 浏览器正在读取先前收到的本地数据。
## 查看加载事件
DevTools在“网络”面板上的多个位置显示DOMContentLoaded和加载事件的时间。 DOMContentLoaded事件显示为蓝色, load事件为红色。
![event](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1562855024688.png)
## 查看总的请求数量
请求的总数量在网络面板底部的Summary窗格中。
注意:这个数字只跟踪自DevTools打开以来记录的请求。如果在DevTools打开之前发生了其他请求，这些请求将不被计算在内。
![requestCount](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1562855348773.png)

## 查看请求的堆栈信息
当JavaScript语句导致请求资源时，将鼠标悬停在Initiator列上，查看指向请求的堆栈跟踪。
![stack trace](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1562855768181.png)
## 查看资源未压缩的大小
单击“使用大请求行”，然后查看“size”列的底部值。
![The compressed size of the jquery-bundle.js file that was sent over the network was 30.9 KB, whereas the uncompressed size was 86.3 KB](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1562855955677.png)

## 大的请求行
如果希望网络请求表中有更多空白，请使用大行。在使用大行时，有些列还提供了更多的信息。例如，Size列的底值是请求的未压缩大小。