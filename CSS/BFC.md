## BFC是什么

### 常见定位布局

- 普通流
- 浮动
- 绝对定位

### 概念
格式化上下文, 它是页面中的一块渲染区域,并且有一套渲染规则,它决定了其子元素将如何定位,以及和其他元素的关系和相互渲染作用
BFC 即 Block Formatting Contexts (块级格式化上下文)，它属于上述定位方案的普通流。

### 触发BFC
只要元素满足下面任一条件即可触发
- body根元素
- 浮动元素
- 绝对定位元素
- display为inline-block
- overflow除了visible以外的值(hidden, auto, scroll)

### 特性及应用
1. 同一个BFC下外边距会发生折叠
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        div {
            width: 100px;
            height: 100px;
            background-color: red;
            margin:100px;
        }
    </style>
</head>
<body>
    <div></div>
    <div></div>
</body>
<script>
</script>
</html>
```
![BFC](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1555513552484.png?width=582&height=778&imageView2/3/w/178/h/240)

从效果上看，因为两个 div 元素都处于同一个 BFC 容器下 (这里指 body 元素) 所以第一个 div 的下边距和第二个 div 的上边距发生了重叠，所以两个盒子之间距离只有 100px，而不是 200px。

首先这不是 CSS 的 bug，我们可以理解为一种规范，如果想要避免外边距的重叠，可以将其放在不同的 BFC 容器中。


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .container {
            overflow: hidden;
        }
        p{
            width: 100px;
            height: 100px;
            background-color: red;
            margin:100px;
        }
    </style>
</head>
<body>
    <div class="container">
        <p></p>
    </div>
    <div class="container">
            <p></p>
        </div>
</body>
<script>
</script>
</html>
```
![BFC](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1555513722801.png?width=744&height=936&imageView2/3/w/189/h/240)
2.BFC 可以包含浮动的元素（清除浮动）
3.BFC 可以阻止元素被浮动元素覆盖




## 参考
[10 分钟理解 BFC 原理](https://zhuanlan.zhihu.com/p/25321647)



