## vue中scroll函数的用法

```js
data () {
  return {
    scrolled: false
  };
},
methods: {
  handleScroll () {
    this.scrolled = window.scrollY > 0;
  }
},
created () {
  window.addEventListener('scroll', this.handleScroll);
},
destroyed () {
  window.removeEventListener('scroll', this.handleScroll);
}

```
## 实现吸顶效果
在实现之前，我们首先补充一些知识（已经了解该部分知识的同学可以跳过）
- scrollTop
- offsetTop
- clientHeight
- window.scrollTo(x, y)
- 函数节流/防抖


scrollTop: 可以获取或设置一个元素的内容垂直滚动的像素数。
![image](https://developer.mozilla.org/@api/deki/files/842/=ScrollTop.png)
[scrollTop](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTop)

offsetTop: 

> scrollTop 和 offsetTop 区别
scrollTop：当前元素**顶端**距离**窗口顶端距离**，鼠标滚轮会影响其数值。
offsetTop：当前元素**顶端**距离**父元素顶端距离**，鼠标滚轮不会影响其数值。


scrollTo: 
- window.scrollTo(x, y), 滚动到文档中的某个坐标。
- Element.scrollTo(x, y),

offsetHeight: 返回该元素的像素高度，高度包含该元素的 padding + border

position: fixed, 当元素祖先的transform属性非none时，容器由视口改为该祖先。

```js

```

在以上的基础上实现锚点效果


## 参考
- [vue锚点吸顶组件](https://zhuanlan.zhihu.com/p/59317112)




