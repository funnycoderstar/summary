## 怎么实现两列布局

left元素浮动
right元素设置width: 100%,padding-left:left元素的宽度;

```html
<style>
    .wrap {
        width: 100%;
        background-color: gray;
        height: 100px;
    }
    .left {
        width: 200px;
        height: 100%;
        background-color: green;
        float: left;
    }
    .right {
        width: 100%;
        padding-left: 200px;
        background-color: fuchsia;
        height: 100%;
    }
</style>
<div class="wrap">
    <div class="left">左侧元素</div>
    <div class="right">右侧元素</div>
</div>
```

## 块级元素垂直水平居中

1.
```html
<style>
    .container {
        width: 500px;
        height: 500px;
        border:1px solid red;
    }
    .child {
        width: 200px;
        height: 200px;
        position: absolute;
        left: 250px;
        top: 250px;
        transform: translate(-100px, -100px);
        border: 1px solid green;
    }
</style>
<div class="container">
    <div class="child">
        子元素
    </div>
</div>
```
## transform/ transition/ animation区别

