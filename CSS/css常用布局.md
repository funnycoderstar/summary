## 常见布局的实现
- 水平垂直居中
    - 宽度和高度都固定
    - 宽度和高度都不固定
- 两列布局
  - 左边宽度固定, 右边宽度自适应
  - 右边宽度固定, 左边宽度自适应
- 三列布局
    - 中间自适应, 左右两边固定

## 水平垂直居中

1. flex局部, 父元素设置 `display: flex;justify-content: center;align-items: center;`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .wrap {
            width: 300px;
            height: 300px;
            background-color: red;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .content {
            width: 200px;
            height: 100px;
            background-color: blue;
            
        }
    </style>
</head>
<body>
    <div class="wrap">
        <div class="content">
            haha
        </div>
    </div>
</body>
</html>
```
2. 使用定位
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
        transform: translate(-50%, -50%);
        border: 1px solid green;
    }
</style>
<div class="container">
    <div class="child">
        子元素
    </div>
</div>
```

## 两列布局
### 左边宽度固定, 右边宽度自适应

1. 左边浮动, 下个元素就会独占位置,并排一行
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .left {
            width: 200px;
            height: 100px;
            background-color: blue;
            float: left;
        }
        .right {
            width: auto;
            height: 100px;
            background-color: red;
            
        }
    </style>
</head>
<body>
    <div class="left">
    
    </div>
    <div class="right">

    </div>
</body>
</html>
```
2. left元素浮动， right元素设置width: 100%,padding-left:left元素的宽度;

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
### 右边宽度固定, 左边宽度自适应

左右都浮动,左边自适应元素设置外层div 100%宽度, 这样就会独占一行, 然后里层设置右边的margin, 把右边元素位置空出来

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            border: 0;
        }
        .left-fa {
            float: left;
            width: 100%;
        }
        .left {
            height: 100px;
            background-color: blue;
            margin-right: 200px;
        }
        .right {
            /* float: left; */
            width: 200px;
            height: 100px;
            background-color: red;
            margin-left: -200px;
            
        }
    </style>
</head>
<body>
    <div class="left-fa">
        <div class="left">
                left
        </div>
    </div>
    <div class="right">
        right
    </div>
    
</body>
</html>
```
## 三列布局

中间自适应, 左右两边固定有如下几种方法
- position实现
- float实现
- float和BFC配合圣杯布局
- flex布局

1. position实现: 左右边设置绝对定位,设置一个最外级div (给父元素设置relative,相对于最外层定位)
注意绝对定位的元素脱离文档流,相对于最近的已经定位的元素进行定位, 无需考虑HTML中结构的顺序
缺点：有顶部对齐问题，需要进行调整，注意中间的高度为整个内容的高度

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            border: 0;
        }
        .main {
            position: relative;
        }
        .left {
            width: 200px;
            height: 100px;
            background-color: blue;
            position: absolute;
            top: 0;
            left: 0;
        }
        .middle {
            margin-left: 200px;
            height: 100px;
            background-color: yellow;
            margin-right: 200px;
        }
        .right {
            position: absolute;
            width: 200px;
            height: 100px;
            background-color: red;
            top: 0;
            right: 0;
        }
    </style>
</head>
<body>
    <div class="main">
        <div class="left">
                left
        </div>

        <div class="middle">
                middle
        </div>
        
        <div class="right">
            right
        </div>
    </div>
    
    
</body>
</html>
```
2. float实现: 需要将中间的内容放在html结构的最后,否则右侧会沉在中间内容的下侧
原理: 元素浮动后,脱离文档流,后面的元素受浮动影响,设置受影响元素的margin值即可

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            border: 0;
        }
        .main {
            overflow: hidden;
        }
        .left {
            width: 200px;
            height: 100px;
            background-color: blue;
            float: left;
        }
        .right {
            width: 200px;
            height: 100px;
            background-color: red;
            float: right;
        }
        /* 利用中间元素的margin值控制两边的间距, 宽度小于左右部分宽度之和时，右侧部分会被挤下去*/
        .middle {
            height: 100px;
            background-color: yellow;
            margin-left: 200px;
            margin-right: 200px;
        }
        
    </style>
</head>
<body>
    <div class="main">
        <div class="left">
                left
        </div>
        <div class="right">
            right
        </div>
        <!-- 需要将中间的内容放在html结构的最后,否则右侧会沉在中间内容的下侧 -->
        <div class="middle">
                middle
        </div>
    </div>
</body>
</html>
```
3. float和BFC配合圣杯布局
必须将中间部分的HTML结构写在最前面




