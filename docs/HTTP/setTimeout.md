## 60 fps与设备刷新率
目前大多数设备的屏幕刷新率为60次/秒，如果在页面中有一个动画或者渐变效果，或者用户正在滚动页面，那么浏览器渲染动画或页面的每一帧的速率也需要跟设备屏幕的刷新率保持一致。

其中每个帧的预算时间仅比16毫秒多一点（1秒/ 60 = 16.6毫秒）。但实际上，浏览器有整理工作要做，因此您的所有工作是需要在10毫秒内完成。如果无法符合此预算，帧率将下降，并且内容会在屏幕上抖动。此现象通常称为卡顿，会对用户体验产生负面影响。
## setTimeout 和 requestAnimationFrame

跳帧: 假如动画切换在 16ms, 32ms, 48ms时分别切换，跳帧就是假如到了32ms，其他任务还未执行完成，没有去执行动画切帧，等到开始进行动画的切帧，已经到了该执行48ms的切帧。就好比你玩游戏的时候卡了，过了一会，你再看画面，它不会停留你卡的地方，或者这时你的角色已经挂掉了。必须在下一帧开始之前就已经绘制完毕;

FPS（Frames Per Second）：画面每秒传输帧数。就是指动画或视频的画面数。每秒绘制的画面；最大 60 fps, 每秒绘制60帧，一帧用时16.66ms js控制在10ms以内，剩下6ms用于图层合并等
重绘和回流，js执行完，下一帧绘制前，
FP（First Paint）: 从空白到第一次开始有内容的时间
FCP（First Contentful Paint）: 从空白到第一次有内容的时间
FMP（First Meaningful Paint）: 从空白到第一次有意义内容的时间， 大致已经渲染完80%的DOM结构
DCL（DOMContentLoaded Event）: 从空白到DOM结构已经渲染完成的时间
L（Onloaded Event）: 所有资源加载完成的时间

内联CSS可以提升FCP的时间


fp 给body标签加一个内联样式背景色，会减小fp的时间，

fp是chrome浏览器独有的特性，可以通过 window.chrome.loadTime()来获取到firstPaintTime，不过它的值都是Unix秒，需要乘以1000，换算成毫秒做计算。
![chrome.loadTime](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1562687926727.png)

`requestAnimationFrame`实现跳帧动画， requestAnimationFrame的第二个参数

requestidlecallback，在浏览器空闲的时期依次调用函数



First Paint entry contains a DOMHighResTimeStamp reporting the time when the browser first rendered after navigation. This excludes the default background paint, but includes non-default background paint and the enclosing box of an iframe. This is the first key moment developers care about in page load – when the browser has started to render the page.

First Paint reports the time when the browser first rendered after navigation. This excludes the default background paint, but includes non-default background paint. This is the first key moment developers care about in page load – when the browser has started to render the page.”

First Contentful Paint entry contains a DOMHighResTimeStamp reporting the time when the browser first rendered any text, image (including background images), non-white canvas or SVG. This excludes any content of iframes, but includes text with pending webfonts. This is the first time users could start consuming page content.

