# 介绍模块化发展历程
IIFE, AMD, CMD, CommonJS, UMD, Webapck(require.ensure), ES6 Module, `<script type="module">`

模块化： 抽离公共代码，隔离作用域，避免变量冲突

## IIFE： 使用自执行函数来编写模块化, 特点：在一个单独的函数作用域中执行代码， 避免变量冲突
```js
(function() {
    return {
        data: []
    }
})()
```
## AMD 使用requireJS来编写模块化， 特点：依赖必须提前声明好
```js
define('./index.js', function(code) {
    // code就是index.js的返回内容
})
```

## CMD 使用seaJS来编写模块化，特点：支持动态引入依赖文件
```js
define(function(require, exports, module) {
    // code就是index.js的返回内容
    var indexCode = require('./index.js')
})
```
## CommonJS: nodejs中自带的模块化
```js
var fs = require('fs')
```
## UMD：兼容AMD, CommonJS模块化语法
## webpack(require.ensure): webpack 2.x版本的代码分割
## ES Modules: ES6引入的模块化，支持import来引入另一个js
```js
import a from 'a';
```