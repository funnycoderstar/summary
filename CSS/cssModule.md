## 怎么避免css相互覆盖呢?

比较常用的办法是，在外层的DOM上添加唯一class来区分不同的组件，除了这种方法，还有两种方法可以避免css相互覆盖：  
1. 使用css scoped  
2. 使用CSS Modules

## 使用css scoped

### 1.什么是scoped

我们都知道JS是有作用域的概念的， CSS的规则是作用于全局的。`css scoped`给我们提供了`CSS作用域`的概念, 即在style标签上加上 scoped, 那么当前style下的样式只作用于当前组件，并不是作用于全局

### 2. 实现原理

```js
<template>
    <div class="container">
        哈哈哈
    </div>
</template>

<style scoped>
    .container {
        color: red;
    }
</style>
```

最终编译的结果为：

![img](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1553959508870.png?width=1668&height=284&imageView2/3/w/537/h/91)

Vue中的scoped属性的效果主要是通过PostCss实现的：  
1. 给加了scoped属性组件中所有的DOM添加一个独一无二的属性  
2. 给CSS选择器添加一个属性选择器

### 3. 如果你想在父组件中改变子组件的样式，该怎么做呢

#### 3.1 stylus的样式穿透 使用&gt;&gt;&gt;， sass和less的样式穿透 使用/deep/

```css
外层 >>> 第三方组件 
        样式

   .container >>> .swiper-pagination-bullet-active
    background: red
```

```css
外层 /deep/ 第三方组件 {
        样式
    }
    .container /deep/ .swiper-pagination-bullet-active{
      background: red;
    }
```

#### 3.2 如何修改第三方库的样式， 使用两个style标签

```css
<style>
/* 修改第三方库的样式 */
</style>

<style scoped>
/* 自己的组件内样式 */
</style>
```

### 4. 慎用scoped

1. 父组件无scoped属性， 子组件带有 scoped, 父组件是无法操作子组件的样式的，虽然我们可以在全局中通过该类标签的标签选择器设置样式，但会影响到其他组件（项目中应该避免使用标签选择器）
2. 父组件有scoped, 子组件无， 父组件也无法设置子组件的样式， 因为父组件的所有标签都会带有`data-v-957c9522` 唯一标识， 但子组件不会带有这个唯一的标识属性
3. 父子组件都有，也无法更改样式

## [CSS Modules](https://github.com/css-modules/css-modules)

### 什么是CSS Modules

CSS Modules 加入了局部作用域和模块依赖

### 实现原理

CSS的规则是全局的，任何一个组件的样式规则，对整个页面有效；  
产生局部作用域的唯一方法，就是使用一个独一无二的class名字，不会与其他选择器重名，这就是CSS Modules的实现原理：将每个类名编译成独一无二的哈希值；

举个例子

```js
import React from 'react';
import style from './App.css'; // 从JS模块导入CSS模块时，它会导出一个对象，其中包含从本地名称到全局名称的所有映射。

export default () => {
  return (
    <h1 className={style.title}>
      Hello World
    </h1>
  );
};
```

App.less

```less
.title {
  color: red;
}
```

```js
<h1 class="_3zyde4l1yATCOkgn-DBWEL">
  Hello World
</h1>

._3zyde4l1yATCOkgn-DBWEL {
  color: red;
}
```

### 如何配置

可以通过webpack配置引入项目, 对css-loader进行配置

```js
module.exports = {
  entry: __dirname + '/index.js',
  output: {
    publicPath: '/',
    filename: './bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader?modules"
      },
    ]
  }
};
```

上面关键的一行是 `style-loader!css-loader?modules`, 它在css-loader后面加了一个查询参数`modules`,表示打开CSS Modules功能

### 如何使用

#### 1. 全局作用域

CSS Modules允许使用 :global\(.className\)语法，声明一个全局规则。凡是这样声明的class,都不会被编译成哈希字符串

```css
.title {
  color: red;
}

:global(.title) {
  color: green;
}
```

#### 2. 定义哈希类型

```js
module: {
  loaders: [
    // ...
    {
      test: /\.css$/,
      loader: "style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]"
    },
  ]
}
```

#### 3. class的组合

一个选择器可以继承另一个选择器的规则

```css
.className {
  color: green;
  background: red;
}

.otherClassName {
  composes: className;
  color: yellow;
}color: red;
}
```

#### 4. 输入其他模块

选择器也可以继承其他CSS文件里面的规则

```css
.className {
  background-color: blue;
}

.title {
  composes: className from './another.css';
  color: red;
}
```

## 总结

以上介绍的这几种方式都可以解决样式覆盖的问题，关键看你自己怎么选择，我们现在的项目中使用的是在外层的DOM上添加唯一class来区分不同的组件

## 参考



