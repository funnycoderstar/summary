```js
var arr = [1, 2, 3, 5, 7, 2, 0, 1];
const result = arr.sort().reduce((init, current) => {
    if(init.length === 0 || init[init.length - 1] !== current) {
        init.push(current);
    }
    return init;
}, [])
console.log(result);
```

Object.create()

## Function.prototype.apply()

- 将数组添加到另一个数组中
concat确实具有这样的行为，但它实际上并不附加到现有数组，而是创建并返回一个新数组
- 使用apply和内置函数
```js
const arr = [3, 6, 1, 5];
const result = Math.max.apply(null, arr);
console.log(result);
```
- 
# vue-scroler
滚动，上拉加载，下拉刷新

# npx
npm  5.2版本起，增加了npx命令。

## 调用项目安装的模块

```
npm i -D mocha
```
在命令行调用的时候，只能使用
```js
// 在项目的根目录下执行
node-modules/.bin/mocha --version
```
npx就是想解决这个问题
```js
npx mocha --version
```
原理：
运行的时候，会到node_modules/.bin路径和环境变量$PATH里面，检查命令是否存在。
注意，Bash 内置的命令不在$PATH里面，所以不能用。比如，cd是 Bash 命令，因此就不能用npx cd。

## 避免全局安装模块

create-react-app这个模块是全局安装，npx 可以运行它，而且不进行全局安装。
```js
npx create-react-app my-react-app
```
上面代码再运行的时候，npx将`create-react-app`下载到一个临时目录，使用以后再删除。所以再次执行上面命令时，会重新下载`create-react-app`

注意，只要 npx 后面的模块无法在本地发现，就会下载同名模块。比如，本地没有安装http-server模块，下面的命令会自动下载该模块，在当前目录启动一个 Web 服务。

--no-install参数：强制使用本地模块，不下载远程模块。如果本地不存在该模块，就会报错
--ignore-existing参数：忽略本地的同名模块，强制安装远程模块

## 使用不同版本的node
```js
npx node@0.12.8 -v
```

面命令会使用 0.12.8 版本的 Node 执行脚本。原理是从 npm 下载这个版本的 node，使用后再删掉。


## 执行 GitHub 源码

[npx 使用教程](http://www.ruanyifeng.com/blog/2019/02/npx.html)

# happypack
```js
npm i -D happypack
```
## 将常用的 loader 替换为 happypack/loader
```js
const happypack = require('happypack');
module.exports = {
    module: {
        rules: [
            test: /.js$/,
            // use: ['babel-loader?cacheDirectory'], 之前是使用这种方式直接使用loader
            // 现在用下面的方式替换成  happypack/loader ， 并使用指定 id 创建的HappyPack插件
            use: ['happypack/loader?id=babel'],
            // 排除node_modules下的目录
            exclude: /node_modules/
        ]
    }
}
```
## 创建 happypack插件

```js
const HappyPack = require('happypack');
module.exports = {
    module: {
        rules: [
            test: /.js$/,
            // use: ['babel-loader?cacheDirectory'], 之前是使用这种方式直接使用loader
            // 现在用下面的方式替换成  happypack/loader ， 并使用指定 id 创建的HappyPack插件
            use: ['happypack/loader?id=babel'],
            // 排除node_modules下的目录
            exclude: /node_modules/
        ]
    },
    plugins: [
        ...,
        new HappyPack({
            /**
             * 必须配置
             * 
            */
            id: 'babel', // id 标识符，要和 rules中指定的id 对应起来
            // 需要使用的 loader， 用法和rules 中 Loader配置一样
            // 可以是字符串，也可以是对象形式
            loaders: ['babel-loaderr?cacheDirectory'] 
        })
    ]

}
```

## 示例

配置单个 loader 时
```js
exports.module = {
    rules: [
        {
            test: /.js$/,
            use: 'happypack/loader?id=babel'
        }
    ]
}
exports.plugins = [ 
    new HappyPack({
        id: 'babel',
        loaders: ['babel-loader?cacheDirectory']
    })
];
```
配置多个 loader 时
```js
exports.module = {
    rules: [
        {
            test: /.(css|less)$/,
            use: 'happypack/loader?id=styles'
        }
    ]
}
exports.plugins = [ 
    new HappyPack({
        id: 'styles',
        loaders: ['style-loader', 'css-loader', 'less-loader']
    })
];
```
Happypack 配置项 
- id: String类型，对于 happypack来说是唯一的id标识，用来关联 module.rules的 happypack/loader
- loaders: Array类型，设置各种 loader配置，与 module.rules中loader配置用法一样

```js
// 无配置时，可直接使用字符串形式
new HappyPack({
    id: 'babel',
    loaders: ['babel-loader?cacheDirectory']
})
// 有配置项时，可以使用对象形式
new HappyPack({
    id: 'babel',
    loaders: [{
        loader: 'babel-loader',
        options: {
            cacheDirectory: true
        }
    }]
})
```
- threads: Number类型，指示对应 loader编译文件时同时使用的进程数，默认是 3
- threadPool: HappyThreadPool对象,代表共享进程池，即多个HappyPack实例都使用同一个共享池中的子进程去处理任务，以防止资源占用过多。
```js
// 创建一个happyThreadPool，作为所有 loader 共用的线程池
const happyThreadPool = HappyPack.ThreadPool({size: 5});

new Happypack({
    id: 'babel',
    loaders: [
        {
            loader: 'babel-loader',
            options: {
                cacheDirectory
            }
        }
    ],
    threadPool: happyThreadPool,
})

```
- verbose: 是否允许happypack输出日志，默认是true
- verboseWhenProfiling： 是否允许 happypack 在运行 webpack --profile 时输出日志，默认是 false
- debug: 是否允许 happypack 打印 log 分析信息，默认是 false


> [使用 happypack 提升 Webpack 项目构建速度](https://juejin.im/post/5c6e0c3a518825621f2a6f45)

# webpack
module.noParse

module rules中的 include 和 exclude


# babel7

babel-upgrade 这个工具会自动帮你安装所需的插件，并且把 package.json 和 .babelrc 文件相关的地方都改好，非常好用！

- @babel/preset-env
- @babel/polyfill（已废弃）
- @babel/runtime
- @babel/plugin-transform-runtime

## @babel/preset-env


## @babel/polyfill
```js
// 注意，这个库在 Babel 7.4.0 后已被弃用，用下面的代替：

import 'core-js/stable';
import 'regenerator-runtime/runtime';
// 但思想是一样的。
```
## @babel/runtime
```js
npm i --save @babel/runtime
```
@ babel / runtime是一个包含Babel模块化运行时助手和一个版本的regenerator-runtime的库。
```js
class A { }
// 转码后
"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var A = function A() {
  _classCallCheck(this, A);
};
```
每次转换class新语法的时候，都会用_classCallCheck这个函数去替换

## @babel/plugin-transform-runtime
这个和@babel/runtime 配合使用。延续上面的例子,如果你的项目有多个js文件里面有class需要转码，那每个文件都会有一个重复的_classCallCheck函数定义，plugin-transform-runtime 的一个主要作用就是从统一的地方去引用这些帮助函数，消除代码冗余从而减少打包的体积；
```js
var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var Circle = function Circle() {
  _classCallCheck(this, Circle);
};

```
1. 配合@babel/time使用，将一些公共的helper函数抽出来，减少代码体积
2. 为你使用的 @babel/polyfill 代码创建一个局部的作用域，而不是暴露在全局作用域。对于应用来说，暴露在全局作用域，没有任何问题，假如你在库里面使用，并且是暴露在全局作用域的，就可能会有问题。

## 安装说明
```js
npm i --save @babel/runtime 
npm i --save-dev @babel/preset-env @babel/plugin-transform-runtime
```
@babel/runtime 为什么会安装为运行环境依赖呢？
还记得 plugin-transform-runtime 会从统一的地方去引用这些帮助函数吗，这意味着这些代码会在运行时运行，所以当然是运行时依赖了。

## 其他
- @babel/runtime和@babel/runtime-corejs的区别
- @babel/runtime-corejs2和@babel/runtime-corejs3的区别




- [Babel 7 转码的正确姿势](https://juejin.im/post/5d5667da6fb9a06af71230de)
- [babel中的runtime-corejs和plugin-transform-runtime](https://jsweibo.github.io/2019/08/10/babel%E4%B8%AD%E7%9A%84runtime-corejs%E5%92%8Cplugin-transform-runtime/)
