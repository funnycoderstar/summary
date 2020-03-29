## 目录
- 1. 伪类和伪元素
- 2. 实现固定宽高比(width: height = 4: 3 )的div，怎么设置
- 3. CSS选择器
- 4. flex: 1 完整写法
- 5. display: none和 visible: hidden的区别
- 

### 1. 伪类和伪元素
为什么引入? css引入伪类和伪元素概念是为了格式化文档树以外的信息。伪类和伪元素是用来修饰不在文档树中的部分。

伪类用于当元素处于某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，用户悬停在指定的元素时，我们可以通:hover来描述这个元素的状态。虽然它和普通的css类类似，可以为已有的元素添加样式，但是它只有处于dom树无法描述的状态下才能为元素添加样式，所以将其称为伪类。

伪元素用于创建不在文档树中的元素，并为其添加样式，比如说，我们可以通过：before来在一个元素前添加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。

CSS3 规范中的要求使用双冒号 (::) 表示伪元素，以此来区分伪元素和伪类，比如::before 和::after 等伪元素使用双冒号 (::)，:hover 和:active 等伪类使用单冒号 (:)。虽然 CSS3 标准要求伪元素使用双冒号的写法，但也依然支持单冒号的写法。

[总结伪类和伪元素](http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/#prettyPhoto)

### 2. 实现固定宽高比(width: height = 4: 3 )的div，怎么设置
1. 利用css中 padding百分比的计算方法： padding设置为百分比，是以元素的宽度乘以100%从而得到的padding值的。
在div的width为固定的情况下，设置height为0，使内容自然溢出，再通过设置padding-bottom使元素有一定高度。
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
利用将padding-top或padding-bottom设置成百分比，来实现高度满足宽度的某个比例。因为，当margin/padding取形式为百分比的值时，无论是left/right，还是top/bottom，都是以父元素的width为参照物的！
[css实现宽高比](https://blog.csdn.net/Honeymao/article/details/77884744)

### 3. CSS选择器
- 基础选择器
    - 通用选择器(*)
    - 标签选择器（div）
    - class选择器(.wrap)
    - id选择器（#wrap）
- 属性选择器
  - css2.1
    - E[att]： 匹配所有具有att属性的E元素，不考虑它的值
    - E[att=val]：匹配所有att属性等于"val"的E元素
    - E[att~=val]：匹配所有att属性具有多个空格分隔的值、其中一个值等于"val"的E元素
  - css3
    - 
- CSS 2.1中的伪类
   - E:first-child：匹配父元素的第一个子元素
   - E:link	匹配所有未被点击的链接
   - E:focus	匹配获得当前焦点的E元素
- CSS 2.1中的伪元素
   - E:first-line	匹配E元素的第一行
   - E:first-letter	匹配E元素的第一个字母
   - E:before	在E元素之前插入生成的内容
   - E:after	在E元素之后插入生成的内容
- CSS 3的反选伪类
   - E:not(s)	匹配不符合当前选择器的任何元素

[CSS选择器笔记](http://www.ruanyifeng.com/blog/2009/03/css_selectors.html)

### 4. flex: 1 完整写法, 

flex属性是flex-grow, flex-shrink 和 flex-basis, 默认值为0 1 auto。后两个属性可选。

flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
[Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

### 5. display: none和 visible: hidden的区别

display: none 不占据空间
visible: hidden 占据空间

双飞翼布局
bfc (set middle area overflow is hidden)

## css解析规则
从右向左解析