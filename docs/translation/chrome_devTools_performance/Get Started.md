# 使用开始hrome devTools的Performance面板分析运行时性能
> 以下是对 [Get Started With Analyzing Runtime Performance](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/)的翻译

# 分析运行时性能入门
运行时性能是页面在运行时执行的方式，而不是加载。本教程将教您如何使用Chrome DevTools Performance面板分析运行时性能。就RAIL模型而言，您在本教程中学到的技能对于分析页面的响应，动画和空闲阶段非常有用。
本教程基于Chrome 59.如果您使用其他版本的Chrome，则DevTools的UI和功能可能会有所不同。检查chrome://help 您正在运行的Chrome版本。
## 开始吧
在本教程中，您将在实时页面上打开DevTools，并使用“性能”面板查找页面上的性能瓶颈。
1. 以隐身模式打开Goog​​le Chrome 。隐身模式可确保Chrome以干净的状态运行。例如，如果安装了大量扩展，那么这些扩展可能会在性能测量中产生噪音。
2. 在“隐身”窗口中加载以下页面。这是您要分析的演示。该页面显示了一堆上下移动的小蓝方块。
https://googlechrome.github.io/devtools-samples/jank/
3. 按Command+ Option+ I（Mac）或 Control+ Shift+ I（Windows，Linux）打开DevTools。

![图1。左边是演示，右边是DevTools](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/imgs/get-started.png)

> 注意：对于其余的屏幕截图，DevTools将取消停靠到单独的窗口，以便您可以更好地查看其内容。

### 模拟移动CPU
移动设备的CPU功率远低于台式机和笔记本电脑。每当您对页面进行概要分析时，请使用CPU限制来模拟您的页面在移动设备上的执行情况。
1. 在DevTools中，单击“Performance”选项卡。
2. 确保已启用“Screenshots”复选框。
3. 单击捕获设置 捕获设置。DevTools显示与其如何捕获性能指标相关的设置。
4. 对于CPU，请选择2x减速。DevTools限制你的CPU，使其比平时慢2倍。
![图2。CPU限制，用蓝色标出](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/imgs/throttling.svg)

> 注意：在测试其他页面时，如果要确保它们在低端移动设备上运行良好，请将CPU限制设置为20x减速。这个演示在20x减速时不能很好地工作，因此它只是为了教学目的而使用2x减速。

### 设置演示
很难创建一个适用于本网站所有读者的运行时性能演示。本部分允许您自定义演示，以确保您的体验与本教程中显示的屏幕截图和说明相对一致，无论您的具体设置如何。

1. 继续单击“ 添加10”，直到蓝色方块的移动速度明显慢于之前。在高端机器上，可能需要大约20次点击。

2. 单击“ 优化”。蓝色方块应该移动得更快更顺畅。
> 注意：如果在优化和未优化版本之间没有发现明显差异，请尝试单击减去10几次，然后重试。如果你添加了太多蓝色方块，你只需要最大化CPU，你就不会看到这两个版本的结果有很大差异。

3. 单击取消优化。蓝色方块移动得更慢，再次更加猛拉。

### 记录运行时性能
运行页面的优化版本时，蓝色方块移动得更快。这是为什么？两个版本都应该在相同的时间内移动每个方块相同的空间量。在“性能”面板中进行录制，以了解如何检测未优化版本中的性能瓶颈。

1. 在DevTools中，单击“ 录制” 记录。DevTools在页面运行时捕获性能指标。
![图三：分析页面](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/imgs/profiling.png)
2. 等几秒钟
3. 点击停止。DevTools停止记录，处理数据，然后在”Performance“面板上显示结果
![图4：配置文件的结果](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/imgs/results.png)
哇，这是一个压倒性的数据量。别担心，这一切都会很快变得更有意义。

## 分析结果
一旦您记录了页面的性能，就可以测量页面性能的差异，并找出原因。
### 分析每秒帧数
测量任何动画性能的主要指标是每秒帧数（FPS）。当动画以60 FPS运行时，用户会很高兴。
1. 看看FPS图表。每当你看到FPS上方的红色条形时 ，就意味着帧速率下降得太低，可能会损害用户体验。通常，绿色条越高，FPS越高。
![图5：FPS图表，以蓝色标出](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/imgs/fps-chart.svg)
2. 在FPS图表下方，您可以看到CPU图表中相应的颜色CPU图表对应于颜色摘要（Sumnary）选项卡，在性能板的底部。CPU图表充满颜色的事实意味着CPU在录制期间被最大化。每当你看到CPU长时间达到最大值时，就会找到减少工作量的方法。
![图6：CPU图表和摘要选项卡，以蓝色标出](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/imgs/cpu-summary.svg)
3. 将鼠标悬停在FPS，CPU或NET图标上。DevTools显示该页面的截图。左右移动鼠标以重放录制内容。这称为擦洗，它可用于手动分析动画的进展。
![图7：查看记录的2000ms标记左右的页面屏幕截图](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/imgs/screenshot.png)
4. 在”Frames“部分中，将鼠标悬停在其中一个绿色方块上。DevTools向您显示该特定帧的FPS。每帧可能远低于60FPS的目标
![图8：悬停在"Frames"上](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/imgs/frame.png)

当然通过这个演示，很明显该页面表现不佳。但是在实际场景中，它可能不太清楚，因此使用所有这些工具进行测量都很方便。
**额外补充：打开FPS表**
另一个方便的工具是 FPS 仪表。它在页面运行时提供FPS的实时估算
1. 按Command+ Shift+ P（Mac）或 Control+ Shift+ P（Windows，Linux）打开命令菜单。
2. 开始Rendering在Command Menu中输入，然后选择Show Rendering。
3. 在“ 渲染”选项卡中，启用FPS Meter。视口的右上角会出现一个新的叠加层。
![图9：FPS仪表](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/imgs/fps-meter.png)

4. 禁用FPS仪表，然后按Escape关闭“ 渲染”选项卡。您将不会在本教程中使用它。

> 译者注：在版本 75.0.3770.100（正式版本） （64 位）的chrome中打开FPS表的操作步骤如下： 
![FPS Meter](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1563103640316.png?width=2880&height=1526)

### 找到瓶颈
现在您已经测量并验证了动画效果不佳，接下来要回答的问题是：为什么
1. 请注意"summary"选项卡，如果未选择任何事件，此选项卡会显示活动明细。该页面大部分时间都在渲染，由于性能是减少工作量的艺术，因此您的目标是减少渲染工作所花费的时间。
![图10：Summary选项卡，以蓝色标出](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/imgs/summary.svg)

2. 展开“Main”部分，随着时间的推移，DevTools会向您显示主线程上的活动火焰图。X轴表示随时间的记录。每个tab代表一个活动。更宽的条形意味着事件需要更长时间，Y轴表示调用堆栈。当您看到事件堆叠在彼此上之时，意味着上层事件导致较低事件。
![图11：Main部分，以蓝色标出](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/imgs/main.svg)

3. 记录中有很多数据，通过 Overview(包括FPS, CPU和NET图表)上单击，按住并拖动鼠标，放大单个Animation Frame Fired事件。“Main”部分和“Summary”选项卡仅显示录制的选定部分信息。
![图12：放大单个动画帧触发事件](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/imgs/zoomed.png)
>  注：缩放另一种方法是把重点放在主要通过单击其背景或选择事件部分，然后按 W，A，S，和D键。

4. 请注意Animation Frame Fired 事件右上角的红色三角形。每当您看到红色三角形时，都会警告可能存在与此事件相关的问题。

> 注意：每当执行回调时，都会发生动画帧触发事件 [requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)。

5. 单击**动画帧触发事件(Animation Frame Fired)**, "Summary'选项卡现在显示有关该事件的信息，注意真实的链接，单击它会导致DevTools突出显示启动**动画帧触发事件**的事件。另请注意app.js:94链接，单击它会跳转到源代码中的相关行。
![图13：有关动画帧触发事件的更多信息](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/imgs/animation-frame-fired.png)

6. 在`app.update`事件下，有一堆紫色事件。如果它们更宽，看起来每个人都可能有一个红色三角形。现在单击其中一个紫色布局事件。DevTools在“Summary”选项卡中提供有关该事件的更多信息。实际上，有关于强制回流的警告（布局的另一个词）。

7. 在“Summary”选项卡中，单击“ 布局强制”(Layout Forced)下的app.js：70链接。DevTools将您带到强制布局的代码行。

![图13：导致强制布局的代码行](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/imgs/forced-layout-src.png)

> 注意：此代码的问题在于，在每个动画帧中，它会更改每个方块的样式，然后查询页面上每个方块的位置。由于样式发生了变化，浏览器不知道每个方块的位置是否发生了变化，因此必须重新布局方块以计算其位置。请参阅[避免强制同步布局](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing#avoid_forced_synchronous_layouts)以了解更多信息。

唷！这需要考虑很多，但您现在在分析运行时性能的基本工作流程中拥有坚实的基础。做得好。

**补充：分析优化版本**
使用你刚才学到的工作流程和工具，然后单击优化的演示，使优化的代码，采取另一种表现记录，然后对结果进行分析。从改进的帧速率到“Main”部分火焰图中事件的减少，您可以看到应用程序中的优化版本工作少得多，从而提高了性能。
> 注意：即使这个“优化”版本也不是很好，因为它仍然操纵top每个方块的属性。更好的方法是坚持只影响合成的属性。有关详细信息，请参阅为[动画使用变换和不透明度更改](https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count#use_transform_and_opacity_changes_for_animations)。

## 下一步

理解性能的基础是RAIL模型。此模型会向您传授对用户最重要的性能指标。请参阅[使用RAIL模型测量性能](https://developers.google.com/web/fundamentals/performance/rail)以了解更多信息。

为了让Performance面板更加舒适，练习更加完美。尝试分析您自己的页面并分析结果。如果您对结果有任何疑问，请 [打开标记为的Stack Overflow问题google-chrome-devtools](https://stackoverflow.com/users/login?ssrc=anon_ask&returnurl=https%3a%2f%2fstackoverflow.com%2fquestions%2fask%3ftags%3dgoogle-chrome-devtools)。如果可能，请包含可复制页面的屏幕截图或链接。

要真正掌握运行时性能，您必须了解浏览器如何将HTML，CSS和JS转换为屏幕上的像素。最好的起点是[渲染性能概述](https://developers.google.com/web/fundamentals/performance/rendering/)。[A Frame](https://aerotwist.com/blog/the-anatomy-of-a-frame/)的剖析深入细节。

最后，有许多方法可以提高运行时性能。本教程重点介绍了一个特定的动画瓶颈，通过“性能”面板为您提供了一个有针对性的游览，但这只是您可能遇到的许多瓶颈之一。其余的渲染性能系列有很多改进运行时性能各方面的好技巧，例如：

- [优化JS执行](https://developers.google.com/web/fundamentals/performance/rendering/optimize-javascript-execution)
- [缩小风格计算的范围和复杂性](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations)
- [避免大型，复杂的布局和布局颠簸](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing)
- [简化油漆复杂性并减少油漆区域](https://developers.google.com/web/fundamentals/performance/rendering/simplify-paint-complexity-and-reduce-paint-areas)
- [坚持仅使用Compositor属性并管理层数](https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count)
- [去抖输入处理程序](https://developers.google.com/web/fundamentals/performance/rendering/debounce-your-input-handlers)
