# 使用Chrome DevTools优化网站速度

# 教程的目标
本教程将教您如何使用Chrome DevTools找到使网站加载速度更快的方法。
# 先决目标
# 介绍
# 第一步：审核网站
了解您的报告
![图10：整体表现得分](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/overall.png)
该指标部分提供了网站的性能的定量测量。每个指标都可以深入了解性能的不同方面，比如。 **First ContentFul Paint**会告诉您何时首次将内容绘制到屏幕上，这是用户感知页面加载的重要里程碑，而 Time to Interactive则标记页面准备就绪以处理用户交互的点。
![图11：指标部分](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/metrics.png)

将鼠标悬停在某个指标上1以查看其说明，然后了解详情以阅读相关文档。
![图12：将鼠标悬停在 First ContentFul Paint 指标上](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/fmp.png)

下面是一组截图，显示页面在加载时的外观。
![图13：页面在加载过程中的外观截图](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/screenshots.png)

“Opportunities”部分提供了有关如何改进此特定页面的加载性能的具体提示

![图14：“Opportunities”部分](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/opportunities.png)

单机一个“Opportunity”以了解它的更多信息。
![图15：有关文本压缩机会的更多信息](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/compression.png)


点击了解更多以查看有关机会重要原因的文档，以及有关如何解决问题的具体简单
![图16：文本压缩机会的文档](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/reference.png)

“ 诊断”部分提供了有关导致页面加载时间的因素的详细信息。
![图17：诊断部分](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/diagnostics.png)

在顺利通过审核部分显示你什么该网站是做正确的，单击以展开该部分
![图18：通过审核部分](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/passed.png)


# 第二步：实验

“audit”报告机会的部分为您提供了如何提高页面性能的提示。。在本节中，您将对代码库实施建议的更改，在每次更改后审核网站以衡量它对网站速度的影响。

## 启用压缩文本
您的报告称启用文本压缩是提高网页性能的最佳机会之一。
文本压缩是指通过网络发送文本文件之前缩小或压缩文本文件的大小。有点像你可以在发送电子邮件之前压缩文件夹以减小其大小。

在启用压缩之前，您可以通过以下两种方法手动检查文本资源是否已压缩。
1. 单击”Network“选项卡
![图19：网络面板](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/network.png)

2. 单击“ 使用大请求行” <img src="https://developers.google.com/web/tools/chrome-devtools/network-performance/imgs/large-resource-rows-button.png">使用大请求行。网络请求表中行的高度增加。
![图20：网络请求表中的大行](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/largerows.png)

3. 如果在网络请求表中未看到“ size”列，请单击表标题，然后选择“size”。
每个Size单元格显示两个值，每行显示一个值。上面的值是下载资源的大小。下面的值是未压缩资源的大小。如果两个值相同，则再通过网络发送资源时，资源不会被压缩。例如，在图20中，顶部和底部值bundle.js都是1.4 MB。

您还可以通过检查资源的HTTP标头来检查压缩：
1. 单击bundle.js。
2. 单击“Headers ”选项卡。
![图21：”Headers”选项卡](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/headers.png)
3. 在Response Headers 的头部，你应该没有看到一个 `content-encoding` 这个响应头部，这意味着bundle.js没有压缩。当资源被压缩，这头一般设置为gzip，deflate或br。有关这些值的说明，请参阅[指令](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Encoding#Directives)。

足够的解释。是时候做一些改变了！通过添加几行代码启用文本压缩：

1. 在编辑器选项卡中，单击server.js。
![图22：编辑server.js](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/server.png)
2. 将以下代码添加到server.js。一定要把`app.use(compression())`放在 `app.use(express.static('build'))`的前面。
```js
...
   const fs = require('fs');
   const compression = require('compression');
   app.use(compression());
   app.use(express.static('build'));
   ...
```
> 注意：通常，您必须compression通过类似的方式安装软件包npm i -S compression，但这已经为您完成了。
## 调整图像的大小
## 消除阻塞渲染资源
您的最新报告称，消除渲染阻塞资源现在是最大的机会。
渲染阻止资源是外部JavaScript或CSS文件,浏览器必须下载、解析和执行它才能够显示页面。 目标是仅运行正确显示页面所需的核心CSS和JavaScript代码。

然后，第一个任务是找到不需要在页面加载时执行的代码。

1. 单击“ 消除渲染阻止资源”以查看阻止的资源： lodash.js和jquery.js。
![图29：有关减少渲染阻塞资源 机会的 更多信息](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/render.png)

2. 按Command+ Shift+ P（Mac）或 Control+ Shift+ P（Windows，Linux，Chrome OS）打开命令菜单，开始键入Coverage，然后选择显示Coverage。
![图30：从“审核”面板中打开“命令菜单”](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/commandmenu.png)
![图31：Coverage选项卡](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/coverage.png)

3. 单击“ 重新加载” <img src="https://developers.google.com/web/tools/chrome-devtools/speed/imgs/reload.png">。覆盖选项卡提供了如何代码在很多的概述bundle.js，jquery.js以及lodash.js正在而页面加载执行。图32表明，大约有76％和30％的jQuery和Lodash文件没有被使用。
![图32：覆盖率报告](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/coveragereport.png)
4. 点击“jquery.js”行。DevTools在Sources面板中打开文件。如果它旁边一个绿色条，则执行这一行代码，红色条意味着它没有被执行，并且在页面加载时绝对不需要。
![图33：在Sources面板中查看jQuery文件](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/jquery.png)
5. 稍微滚动一下jQuery代码。执行的一些行实际上只是注释。通过删除注释的缩小器运行这段代码是另一种减小文件大小的方法。

简而言之，当您使用自己的代码时，Coverage选项卡可以帮助您逐行分析代码，并且只提供页面加载所需的代码。
是否需要jquery.js和lodash.js文件加载页面？“请求阻止”（Request Blocking）选项卡可以显示资源不可用时会发生什么。

1. 单击“ 网络”选项卡。
2. 按Command+ Shift+ P（Mac）或 Control+ Shift+ P（Windows，Linux，Chrome OS）再次打开命令菜单。
3. 开始输入blocking，然后选择显示请求阻止（Show Request Blocking.）。
![图34. The Request Blocking tab](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/blocking.png)
4. 单击添加图案 <img src="https://developers.google.com/web/tools/chrome-devtools/speed/imgs/libs.png"> ，键入/libs/*，然后按Enter确认。
![图35：添加模式以阻止对libs目录的 任何请求](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/libs.png)

5. 重新加载页面。jQuery和Lodash请求时红色的，这意味着它们被阻止了。页面仍然加载并且是交互式的，因此看起来不需要这些资源！
![图36：“网络”面板显示已阻止请求](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/blockedlibs.png)
6. 单击“ 删除所有模式” 删除所有模式 以删除/libs/*阻止模式。
通常，“请求阻止”选项卡对于模拟任何给定资源不可用时页面的行为方式非常有用。

现在，从代码中删除对这些文件的引用并再次审核页面：
1. 回到编辑器选项卡，打开template.html。
2. 删除<script src="/libs/lodash.js">和 <script src="/libs/jquery.js"></script>。
3. 等待站点重新构建并重新部署。
4. 再次从“ 审核”面板审核页面。您的总分应该会再次提高。
![图37：删除渲染阻止资源后的“审核”报告](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/report4.png)
### 优化现实世界中的关键渲染路径
在[关键渲染路径](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/)是指你需要加载一个页面的代码，通常，您可以通过仅在页面加载期间传送关键代码来加速页面加载，然后延迟加载其他所有内容。
- 您不大可能找到可以直接删除的脚本，但是您经常会发现页面加载期间不需要请求许多脚本，而且是可以异步请求，请参阅[使用async或defer](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/#use_async_or_defer)
- 如果您正在使用框架，请检查它是否具有生产模式。此模式可以使用诸如 tree shaking之类的功能，以便消除阻止关键渲染不需要的代码。



## 少做主线程工作

# 总结
- 每当您着手优化站点的负载性能时，始终要先进行审核。审核建立了一个基线，并为您提供了如何改进的提示
- 每次只做一个更改，并在每次更改之后审计页面，以了解独立的更改如何影响性能。