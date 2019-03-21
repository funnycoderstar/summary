### 使用flex布局
flex使用方法很简单,只需要将其display属性设置为flex即可,也可以设置行内的flex,记得webkit内核的浏览器,必须加上-webkit,
- 注意，设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。
```js
.ele {
    display: -webkit-flex;
    diaplay: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
}
```
> 在flex中,最核心的概念就是容器和轴,其中容器分为父容器和子容器,轴分为主轴和交叉轴(主轴默认为水平方向,方向向右,交叉轴为主轴顺时针旋转90度)
### 父容器属性
父容器有六个属性
- flex-direction: 主轴方向.
- flex-wrap: 超出父容器子容器的排列方式
- flex-flow: flex-direction属性和flex-wrap属性的简写方式
- justify-content: 子容器在主轴的排列方向
- align-items: 子容器的交叉轴上的排列方式
- align-content: 多根轴线的对齐方式
#### flex-direciton属性
flex-direction属性决定主轴的方向(主轴的方向不一定是水平的,这个属性就是设置主轴的方向,主轴默认是水平方向,从左至右)
```
.box {
    flex-direction: row;           // 默认值,主轴为水平方向,起点在左端,从左到右
    flex-direction: row-reverse;   // 主轴为水平方向,起点在右端,从右到左
    flex-direction: column;        // 主轴为垂直方向,起点在上端,从上到下
    flex-direction: column;        // 主轴为垂直方向,起点在下端,从下到上
}
```
#### flex-wrap属性
flex-wrap属性决定自容器如果在一条轴线排不下时,如何换行
```
.box {
    flex-wrap: nowrap;           // 默认,不换行
    flex-wrap: wrap;       // 换行,第一行在下面
    flex-wrap: column;     // 换行,第一行在=上面
}
```
### 子容器也有6个属性
- order: 子容器的排列顺序
- flex-grow: 子容器剩余空间的拉伸比例
- flex-shrink: 子容器超出空间的压缩比例
- flex-basis: 子容器不伸缩情况下的原始尺寸
- flex: 子元素的flex属性是flex-grow, flex-shrink, flex-basis的简写
- align-self: 允许单个子容器与其他字容器不一样的对齐方式,可覆盖父元素aligns-items属性(交叉轴),默认是auto,表示继承父元素的align-items属性,如果没有付元素,则等同于strech

#### order属性
order属性定义子容器的排列顺序,数值越小,排列越靠前
```
item {
    order: <interger>
}
```
### flex-grow属性
flex-grow属性定义子容器的放大比例,默认为0
```
item {
    flex-grow: <number>; /* default 0 */
}
```
如果子容器的flex-grow属性都为1,则他们将等分剩余空间(如果有的话).如果一个项目的flex-grow属性为2,其他项目都为1,则前者占据的剩余空间将比其他项多一倍;

### flex-shrink属性
flex-shrink定义了子容器的缩小比例,默认为1,如果空间不足,该项目将缩小
```
item {
    flex-shrink: <number>; /* default 1 */
}
```
如果所有子容器的flex-shrink属性都为1,当空间不足时,都将等比例缩小.如果一个项目的flex-shrink的属性为0,其他项目都为1,则空间不足时,前者不缩小;
负值对该属性无效
### flex-basis属性
flex-basis属性定义了在分配多余空间之前,项目占据了主轴空间,浏览器根据这个属性,计算主轴是否有多余空间.它的默认值为auto,即项目的本来大小;
```
item {
    flex-basis: <length> | auto; /* default auto */
}
```
它可以设置跟width和height属性一样的值(比如350px),则项目将占据固定空间

### flex属性是
flex是flex-grow,flex-shrink,flex-basis的缩写
