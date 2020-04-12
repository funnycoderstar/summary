## 目录
01. 伪类和伪元素
02. 实现固定宽高比(`width: height = 4: 3`)的div，怎么设置
03. CSS选择器
04. CSS解析规则
05. `flex: 1` 完整写法
06. `display: none`和 `visibility:hidden`的区别
07. `em` `rem` `vh` `vw` `calc()` `line-height` 百分比
08. `rem`实现原理及相应的计算方案
09. 清除浮动方法及原理
10. `postcss`是什么
11. `css modules`
12. `CSS`预处理器
13. CSS 中的 `vertical-align` 有哪些值？它在什么情况下才能生效？
14. BFC(块格式化上下文)
15. 常见布局的实现

## 1. 伪类和伪元素

### 为什么引入?
`css`引入伪类和伪元素概念是为了格式化文档树以外的信息。伪类和伪元素是用来修饰不在文档树中的部分。
### 伪类
**伪类** 用于当元素处于某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，用户悬停在指定的元素时，我们可以通:hover来描述这个元素的状态。虽然它和普通的css类类似，可以为已有的元素添加样式，但是它只有处于dom树无法描述的状态下才能为元素添加样式，所以将其称为伪类。

![图片来源网络](http://www.alloyteam.com/wp-content/uploads/2016/05/%E4%BC%AA%E7%B1%BB.png)
### 伪元素
**伪元素** 用于创建不在文档树中的元素，并为其添加样式，比如说，我们可以通过：before来在一个元素前添加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。

![图片来源网络](http://www.alloyteam.com/wp-content/uploads/2016/05/%E4%BC%AA%E5%85%83%E7%B4%A0.png)

CSS3 规范中的要求使用双冒号 (::) 表示伪元素，以此来区分伪元素和伪类，比如::before 和::after 等伪元素使用双冒号 (::)，:hover 和:active 等伪类使用单冒号 (:)。虽然 CSS3 标准要求伪元素使用双冒号的写法，但也依然支持单冒号的写法。

> [总结伪类和伪元素](http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/#prettyPhoto)

## 2. 实现固定宽高比(width: height = 4: 3 )的div，怎么设置
利用css中 `padding`百分比的计算方法： `padding`设置为百分比，是以元素的宽度乘以`100%`从而得到的`padding`值的。

在`div`的`width`为固定的情况下，设置`height`为`0`，使内容自然溢出，再通过设置`padding-bottom`使元素有一定高度。
```css
.element {
    /* 16:9宽高比，则设padding-bottom:56.25% */
    /* height: 0px, 防止矩形被里面的内容撑出多余的高度*/
    width: 100vw; 
    height: 0px; 
    padding-bottom: 56.25%;
    background: pink;
}
```
利用将`padding-top`或`padding-bottom`设置成百分比，来实现高度满足宽度的某个比例。因为，当`margin/padding`取形式为百分比的值时，无论是`left/right`，还是`top/bottom`，都是以父元素的`width`为参照物的！

> [css实现宽高比](https://blog.csdn.net/Honeymao/article/details/77884744)

## 3. CSS选择器
- 通用选择器(*)
- 标签选择器（div）
- class选择器(.wrap)
- id选择器（#wrap）
- 属性选择器(E[att], E[att=val], E[att~=val])
    - E[att]： 匹配所有具有att属性的E元素，不考虑它的值
    - E[att=val]：匹配所有att属性等于"val"的E元素
    - E[att~=val]：匹配所有att属性具有多个空格分隔的值、其中一个值等于"val"的E元素
- 相邻选择器(h1 + p)
- 子选择器（ul > li）
- 后代选择器（li a）
- 伪类选择器
   - E:first-child：匹配父元素的第一个子元素
   - E:link	匹配所有未被点击的链接
   - E:focus 匹配获得当前焦点的E元素
   - E:not(s) 反选伪类，匹配不符合当前选择器的任何元素

> 详细查看[CSS选择器笔记](http://www.ruanyifeng.com/blog/2009/03/css_selectors.html)

选择器的优先级（就近原则）：!important > [ id > class > tag ]

## 4. css解析规则

CSS选择器是 **从右向左解析** 。

若从左向右的匹配，发现不符合规则，需要进行回溯，会损失很多性能。

若从右向左匹配，先找到所有的最右节点，对于每一个节点，向上寻找父节点直到找到根元素或者满足条件的匹配规则，则结束这个分支的遍历。

两种匹配规则的性能差别很大，是因为从右向左的匹配在第一步就筛选掉了大量的不符合条件的最右节点（叶子节点），而从左向右的匹配规则的性能都浪费在了失败的查找上面。

举例说明：
```js
.mod-nav h3 span { font-size: 16px; }
```
为什么从右向左的规则要比从左向右的高效？
![图片来源网络](https://images0.cnblogs.com/blog/551140/201309/26164119-951c7e9264f046e3aca49b8c466086fd.png)

若从左向右的匹配，过程是：从`.mod-nav`开始，遍历子节点`header`和子节点`div`，然后各自向子节点遍历。在右侧`div`的分支中，最后遍历到叶子节点`a`，发现不符合规则，需要回溯到`ul`节点，再遍历下一个`li-a`，假如有1000个`li`，则这`1000`次的遍历与回溯会损失很多性能。


再看看从右至左的匹配：先找到所有的最右节点span，对于每一个`span`，向上寻找节点`h3`，由`h3`再向上寻找`class=mod-nav`的节点，最后找到根元素html则结束这个分支的遍历。

很明显，两种匹配规则的性能差别很大。之所以会差别很大，是因为从右向左的匹配在第一步就筛选掉了大量的不符合条件的最右节点（叶子节点）；而从左向右的匹配规则的性能都浪费在了失败的查找上面。

> 答案来源于 [CSS选择器从右向左的匹配规则](http://www.cnblogs.com/zhaodongyu/p/3341080.html)

## 5. flex: 1 完整写法
Flex 布局概念: 
采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"

### flex: 1 完整写法
`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`, 默认值为`0 1 auto`。后两个属性可选。

`flex-grow`属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

`flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

`flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

> [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html) 、[Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

## 6. display: none和 visibility:hidden的区别

1. 是否占据空间
   - display: none 不占据空间
   - visibility:hidden 占据空间
   
2. 是否渲染
    - display:none，会触发reflow（回流），进行渲染。
    - visibility:hidden，只会触发repaint（重绘），因为没有发现位置变化，不进行渲染。
  
3. 是否是继承属性(株连性)
    - display:none，display不是继承属性，元素及其子元素都会消失。
    - visibility:hidden，visibility是继承属性，若子元素使用了visibility:visible，则不继承，这个子孙元素又会显现出来。


## 7. em rem vh vw calc(), line-height 百分比
### em
em: 相对单位，参考物是父元素的font-size，具有继承的特点。如果字体大小是16px（浏览器的默认值），那么 1em = 16px
### rem
rem：相对单位，可理解为”root em”, 相对根节点html的字体大小来计算，不会像em那样，依赖于父元素的字体大小，而造成混乱
### vw 和vh
vw：viewpoint width，视窗宽度，1vw等于视窗宽度的1%。

vh：viewpoint height，视窗高度，1vh等于视窗高度的1%。

vmin：取当前vw和Vh中较小的那一个值， vmax：取当前Vw和Vh中较大的那一个值


vw、vh 与 % 百分比的区别：
- % 是相对于父元素的大小设定的比率，vw、vh 是视窗大小决定的。
- vw、vh 优势在于能够直接获取高度，而用 % 在没有设置 body 高度的情况下，是无法正确获得可视区域的高度的，所以这是挺不错的优势。

### calc()
calc(): CSS3中新增的一个函数, 用于动态计算宽/高, 语法非常简单，就像我们小时候学加 （+）、减（-）、乘（*）、除（/）一样，使用数学表达式来表示
 - 使用“+”、“-”、“*” 和 “/”四则运算；
 - 可以使用百分比、px、em、rem等单位；
 - 可以混合使用各种单位进行计算；
 - 表达式中有“+”和“-”时，其前后必须要有空格，如"width: calc(12%+5em)"这种没有空格的写法是错误的；

### line-height 百分比
可以直接查看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/line-height)上的相关解释：

line-height 属性被指定为以下任何一个：
- 一个 <数字>： 该属性的应用值是这个无单位数字<数字>乘以该元素的字体大小
- 一个 <百分比>：与元素自身的字体大小有关。计算值是给定的百分比值乘以元素计算出的字体大小
- 一个 <长度> 
- 关键词 normal。


## 8.rem实现原理及相应的计算方案

rem布局的本质是等比缩放，一般是基于宽度.

需要了解的基础知识：

1. 默认浏览器设置的字体大小为16px
2. viewport属性
width、height、initial-scale、maximum-scale、minimum-scale、user-scalable这些属性，分别表示宽度、高度、初始缩放比例、最大缩放比例、最小缩放比例、是否允许用户缩放
```js
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1.0, user-scalable=no">
```
3. dpr, dpr是设备像素比，是css里面1px所能显示的像素点的个数，dpr的值越大，显示的越精细;window.devicePixelRatio获取到当前设备的dpr。

rem实现适配的原理：
  - 核心思想： 百分比布局可实现响应式布局，而rem相当于百分比布局。
  - 实现原理：动态获取当前视口宽度width，除以一个固定的数n，得到rem的值。表达式为rem = width / n。
  - 通过此方法，rem大小始终为width的n等分。

计算方案：
1. 通过dpr设置缩放比，实现布局视口大小
```js
var scale = 1 / devicePixelRatio;  
document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale='+ scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
```
2. 动态计算html的font-size
```js
// 设置根元素字体大小。此时为宽的100等分
document.documentElement.style.fontSize = ocument.documentElement.clientWidth / 100 + 'px';
```

实际开发过程中，可以使用 [lib-flexible](https://github.com/amfe/lib-flexible)库，但是如果每次写的时候都要手动去计算有点太过麻烦了，我们可以通过在webpack中配置 [px2rem-loader](https://github.com/Jinjiang/px2rem-loader), 或者 [pxrem-loader](https://github.com/cupools/pxrem-loader#readme)，主要原理就是需要自己配置 px转rem的计算规则，在编辑的时候直接计算转成rem。所以在开发的时候直接按照设计稿的尺寸写px，编译后会直接转化成rem；


Rem相关文章推荐：
- [移动端页面开发适配 rem布局原理](https://segmentfault.com/a/1190000007526917)
- [使用Flexible实现手淘H5页面的终端适配](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)
- [Rem布局的原理解析](https://zhuanlan.zhihu.com/p/30413803)

## 9.清除浮动方法及原理

为什么要清除浮动：父元素因为子级元素浮动引起的内部高度为0的问题。

清除浮动常用的四种方式：
1. 父级`div`定义`height`
2. 额外标签法： 在有浮动的父级元素的末尾插入了一个没有内容的块级元素div 并添加样式`clear:both`。
3. 利用伪元素：父级div定义 伪类:after，我们可以写一个`.clearfix` 工具样式，当需要清除浮动时，就为其加上这个类 `.clearfix:after { display: block; clear :both; content: '';}`。
4. 父级添加`overflow`属性： 包含浮动元素的父标签添加样式`overflow`为`hidden`或`auto`，通过触发BFC方式，实现清除浮动

> [清除浮动的四种方式及其原理理解](https://juejin.im/post/59e7190bf265da4307025d91)

## 10. postcss

我们都知道”babel“的存在，可以让我们使用比较新的js语法，postcss则可以理解为CSS的”babel“，可以让我们使用比较新的CSS语法

postcss 不是类似less的CSS预处理器， 而是一种允许用JS插件来转变样式的工具。
postcss提供了一个解析器，它能够将CSS解析成抽象语法树(AST)。

postcss的常用插件
- [autoprefixer](https://github.com/postcss/autoprefixer)： autoprefixer插件会给根据CanIUse的兼容性去检查你的CSS代码，然后自动为你的CSS代码加上浏览器厂商的私有前缀
- [precss](https://github.com/jonathantneal/precss)
- [postcss-cssnext](https://github.com/MoOx/postcss-cssnext/)
- [PostCSS 是个什么鬼东西？](https://segmentfault.com/a/1190000003909268)

## 11. css modules
css modules作用: 
    - 避免css相互覆盖的方法，CSS Modules 加入了局部作用域和模块依赖
实现原理
    CSS的规则是全局的，任何一个组件的样式规则，对整个页面有效；  
    产生局部作用域的唯一方法，就是使用一个独一无二的class名字，不会与其他选择器重名，这就是CSS Modules的实现原理：将每个类名编译成独一无二的哈希值；

[CSS Modules 用法教程](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)

## 12. css 预处理器

CSS 预处理器是一个能让你通过预处理器自己独有的语法来生成CSS的程序。
绝大多数CSS预处理器会增加一些原生CSS不具备的特性，例如代码混合，嵌套选择器，继承选择器等

最流行的CSS预处理器
- less
- sass
- stylus
- postcss

## 13. CSS 中的 vertical-align 有哪些值？它在什么情况下才能生效？

vertical-align属性值：
- 线类：baseline、top、middle、bottom
- 文本类：text-top、text-bottom
- 上标下标类：sub、super
- 数值百分比类：20px、2em、20%等（对于基线往上或往下偏移）

> 负值相对于基线往下偏移，正值往上偏移，事实上vertical-align:base-line等同于vertical-align:0。这个负值真的是 CSS 神器！
vertical-align生效前提：

- 内联元素span、strong、em、img、button、input等
- display值为inline、inline-block、inline-table或table-cell的元素
- 需要注意浮动和绝对定位会让元素块状化，因此此元素绝对不会生效

## 14.[BFC(块格式化上下文)]
### 概念
格式化上下文, 它是页面中的一块渲染区域,并且有一套渲染规则,它决定了其子元素将如何定位,以及和其他元素的关系和相互渲染作用
BFC 即 Block Formatting Contexts (块级格式化上下文)，它属于上述定位方案的普通流。

### 触发BFC
只要元素满足下面任一条件即可触发
- 根元素(`<html>`)
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 行内块元素（元素的 display 为 inline-block）
- overflow 值不为 visible 的块元素

> [10 分钟理解 BFC 原理](https://zhuanlan.zhihu.com/p/25321647), [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

## 15 常见布局的实现
- 水平垂直居中
- 两列布局
### 水平垂直居中
1. flex布局： 父元素设置 `display: flex; justify-content: center; slign-items: center`
2. `position: absolute` + `transform: translate(-50%, -50%)` , translate是基于元素本身的宽高去计算百分比的，所以同样适用于宽度和高度都不固定的情况
3. `position: absolute` + `let: 0; right: 0; top: 0; bottom: 0; margin: auto`;

### 两列布局
左边宽度固定, 右边宽度自适应
 - 左边浮动, 下个元素就会独占位置,并排一行
 - left元素浮动， right元素设置 `width: 100%; padding-left:left`元素的宽度;
右边宽度固定, 左边宽度自适应
 - 左右都浮动,左边自适应元素设置外层div 100%宽度, 这样就会独占一行, 然后里层设置右边的margin, 把右边元素位置空出来
### 三列布局
中间自适应, 左右两边固定有如下几种方法
- flex布局: `display: flex; ustify-content: space-between;` 
- position实现: 左右边设置绝对定位,设置一个最外级div (给父元素设置relative,相对于最外层定位); 
    - 注意绝对定位的元素脱离文档流,相对于最近的已经定位的元素进行定位, 无需考虑HTML中结构的顺序
    - 缺点：有顶部对齐问题，需要进行调整，注意中间的高度为整个内容的高度
- float实现: 需要将中间的内容放在html结构的最后,否则右侧会沉在中间内容的下侧
    - 原理: 元素浮动后,脱离文档流,后面的元素受浮动影响,设置受影响元素的margin值即可
- 圣杯布局和双飞翼布局
### 圣杯布局和双飞翼布局
- 共同点：三栏全部float浮动，但左右两栏加上负margin让其跟中间栏div并排，以形成三栏布局。[负边距](http://www.cnblogs.com/2050/archive/2012/08/13/2636467.html)是这两种布局中的重中之重
- 不同点：解决“中间栏div内容不被遮挡”的思路不同

#### 圣杯布局
- 1.三者都设置向左浮动
- 2.设置middle宽度为100%;
- 3.设置负边距， left设置负左边距为100%, right设置负左边距为负的自身宽度
- 4.设置content的padding值给左右两个子面板留出空间
- 5.设置两个子面板为相对定位，`left面板`的left值为负的`left面板`宽度，`right面板`的right值为负的`right面板`的值

但是圣杯布局有个问题：**当面板的middle部分比两边的子面板宽度小的时候，布局就会乱掉**。因此也就有了双飞翼布局来克服这个问题。如果不增加任何标签，想实现更完美的布局非常困难，因此双飞翼布局在主面板上选择了加一个标签
#### 双飞翼布局

- 1.三者都设置向左浮动。
- 2.设置middle宽度为100%。
- 3.设置 负边距，left设置负左边距为100%，right设置负左边距为负的自身宽度
- 4.设置middle-content的margin值给左右两个子面板留出空间。

对比两者可以发现，双飞翼布局与圣杯布局的主要差别在于：

- 1.双飞翼布局给主面板（中间元素）添加了一个父标签用来通过margin给子面板腾出空间
- 2.圣杯布局采用的是padding,而双飞翼布局采用的margin, 解决了圣杯布局的问题
- 3.双飞翼布局不用设置相对布局，以及对应的left和right值

> 详解查看 [常见CSS布局的实现](https://github.com/funnycoderstar/blog/issues/125)


## 碎碎念
CSS这些题其实都不难，平常开发的时候也经常会遇到，死记硬背也是记不住的，需要自己多动手敲一下才能理解并且记忆深刻，真正融化为自己的知识，很多词（比如BFC，圣杯布局，双飞翼布局等）我第一次听到的时候并不知道他们是什么，而且感觉从名称上很难理解，但是多看几遍，多理解，见多了也就记住了。

上面给出的答案大多是从网上搜的，也不一定是最好的，主要是通过题目来查漏补缺，有问题或者有更好的答案，欢迎大家补充。


## CSS相关文章推荐
- [50道 CSS 基础面试题（附答案）](https://www.itcodemonkey.com/article/2853.html)
- [你未必知道的49个CSS知识点](https://juejin.im/post/5d3eca78e51d4561cb5dde12)
- [你未必知道的CSS知识点（第二季）](https://juejin.im/post/5d9ec8b0518825651b1dffa3)
- [个人总结（css3新特性）](https://juejin.im/post/5a0c184c51882531926e4294)
- [前端基础篇之CSS世界](https://juejin.im/post/5ce607a7e51d454f6f16eb3d)