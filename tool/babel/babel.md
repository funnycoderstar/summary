## Babel包的构成
核心包
babel-core: 是babel转译器本身,提供转义的API,例如babel.transform,webpack的babel-loader就是调用这个API完成转译的
babylon：js的词法解析器
babel-traverse：用于对AST（抽象语法树Abstract Syntax Tree）的遍历
babel-generator：根据AST生成代码

其他:
babel-polyfill：JS标准新增的原生对象和API的shim，实现上仅仅是core-js和regenerator-runtime两个包的封装
babel-runtime：类似于polyfill，但是不会污染全局变量

## babel的配置
作用: 下一代javaScript语法编译器; 主要是presets和plugin

## presets

### 什么是presets
不想自己动手组合插件？没问题！preset 可以作为 Babel 插件的组合，甚至可以作为可以共享的 options 配置。

```js
{
  "presets": [],
  "plugins": []
}
```
presets字段定义转码规则

```js
{
    "presets": [
      "@babel/env",
      "@babel/preset-react"
    ],
    "plugins": []
  }
```


语法转义器,只编译语法, 不编译最新的API, 比如let/const会被编译, 而includes/Object.assign等并不能被编译, API的编译需要使用babel-polyfill

补丁转义器

一种新的语法从提案到变成正式标准, 需要经历5个阶段
Stage 0  展示阶段
Stage 1  征求意见阶段
Stage 2  草案阶段
Stage 3  候选人阶段
Stage 4  定案阶段

一个提案只要能进入 Stage 2,就差不多肯定会包括在以后的正式标准中

jsx, flow插件



```js
module.exports = {
    presets: [['@vue/app', { useBuiltIns: 'entry' }]],
    plugins: [
        [
            'component',
            {
                'libraryName': 'element-ui',
                'styleLibraryName': 'theme-chalk'
            }, 'element-ui'
        ],
        [
            'component',
            {
                'libraryName': 'mint-ui',
                'style': true
            }, 'mint-ui'
        ]
    ]
};

```
```js
{
  "presets": [
    ["env", {
        "modules": false,
        "targets": {
            "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
        }
    }],
    "stage-2"
  ],
  "plugins": [
        [   "import",
            {
            "libraryName": "iview",
            "libraryDirectory": "src/components"
            }
        ],
      "transform-runtime"
    ],
  "env": {
    "test": {
        "presets": ["env", "stage-2"],
        "plugins": ["istanbul"]
    },
    "production" : {
        "plugins": [
            ["transform-remove-console"]
        ]
    }
  }
}

```
## babel-polyfill, babel-runtime, babel-plugin-transform-runtime
babel-polyfill主要包含了core-js和regenerator两部分, 它是通过改写全局protoType的方式实现的,会将新的原生对象, API这些都直接引入到全局环境,这样就会污染全局变量,这也是`polyfil`l的缺陷,这时babel-runtime上场了;

`babel-plugin-transform-runtime`是将js中使用到的新的原生对象和静态方法转译成对`babel-runtime`的引用,而其中babel-runtime的功能其实最终也是有core-js来实现的,其实真正的核心是core-js, 其他都是包装

### babel-polyfill的使用与优化
`require('babel-polyfill')`是全量引入,打包后代码冗余量比较大

如果想减小包的体积
- 可以按需进入;
- 配置只有在需要polyfill的浏览器中才进行polyfill


1. 配置按需进入
babel-polyfill主要包含了core-js和regenerator两部分。

core-js：提供了如ES5、ES6、ES7等规范中 中新定义的各种对象、方法的模拟实现。
regenerator：提供generator支持，如果应用代码中用到generator、async函数的话用到。
```js
require('core-js/modules/es6.array.from'); // 按需加载引入ES6的Array对象上新定义的方法array.from
require('core-js/es6/array'); // 按需加载引入ES6的Array对象上新定义的方法
require('core-js/es6'); // 按需加载引入ES6相关的polyfill
```
2. 配置只有在需要polyfill的浏览器中才进行polyfill
也可以在babel的env中设置useBuildins为"entry"来开启, 然后配合 targets.browsers来使用, 如果在`.babelrc`中没有设置, 则去找到`package.json`中的`browserslist`选项

```js
{
  "presets": [
    [
        "@babel/preset-env",
        {
            "useBuiltIns": "entry",
            "targets": {
                "chrome": "58",
                "ie": "11"
            }
        }
        ]
  ]
}
```
### babel-preset-env是什么
babel-preset-env是一系列插件的合集
不包含 babel-stage-x
不包含 babel-polyfill

### 有哪些选项
### modules
babel按照什么模式去处理模块，默认是不处理的，项目中我们一般是交给webpack去处理的，
webpack的tree-shaking 都是因为 ES6 modules 的静态特性才得以实现的.可以在编译阶段确定模块依赖
- false: 不处理
"amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false，默认为"auto"


### targets
需要支持的环境
如果未指定目标，@babel/preset-env则默认情况下将转换所有ECMAScript 2015+代码。
targets.node
targets.browsers
targets.uglify

### useBuiltIns:
useBuiltIns是配合polyfill使用的， 此选项配置如何@babel/preset-env处理polyfill。

- false: 默认为false， 意思是babel-polyfill全量引入
- entry: 
是按照目标环境（即oreset-env的targets属性）去polyfill的，不关心代码中是否使用,可以保证在目标环境一定可用

- usage（实验性）: 
会分析代码调用，但是对于原型链上的方法仅仅按照名字去匹配,可以得到更小的polyfill体积；

因为很难去分析代码中是否调用了，例如以下情况就分析不了，会导致出错
1. 无法分析一个对象是什么类型的
data.split(); 它会认为你用的是String方法的split,但是有可能data是个数组， split是我自己定义的方法，此时polyfill就不准确了

2. 无法分析第三方包是否用到了
include中配置了一个第三方包， 第三包中用到了ES6的 Promise，但是你自己的代码中没有用到Promise, 此时就会判断你的代码中不需要对Promise对象polyfill,然后运行的时候代码就报错了 


综上所述，最优的方案是配置 useBuiltIns为entry, 然后配置targets.browsers， 根据环境去进行polyfill
### polyfill的时机
编译的时候进行polyfill, 运行的时候判断是否需要用到polyfill

https://www.babeljs.cn/docs/plugins/preset-env/
## plugins: 你想使用的转换规则插件

babel-plugin-transform-runtime
babel-plugin-syntax-dynamic-import

## babel的编译过程及原理

### AST
抽象语法树 (Abstract Syntax Tree), 是指将代码逐字母解析成树状对象.这是语言之间的转换,代码语法检查,代码风格检查,代码格式化,代码高亮,代码错误提示,代码自动补全等等功能

我们怎么知道Babel生成了的AST有哪些节点[AST explorer](https://astexplorer.net/)

1. 解析: 将代码字符串解析成抽象语法树; 代码字符串 = AST
2. 变换: 对抽象语法树进行变换操作
3. 再建: 再根据变换后的抽象语法树再生成代码字符串

ES6代码输入 ==》 babylon进行解析 ==》 得到AST
==》 plugin用babel-traverse对AST树进行遍历转译 ==》 得到新的AST树
==》 用babel-generator通过AST树生成ES5代码

AST 抽象语法树
分词
语义分析: 语句, 表达式

### AST在很多方面用到
1.eslint对代码错误或风格的检查,发现一些潜在的错误
2.IDE的错误提示,格式化,高亮,自动补全等
3.UglifyJS压缩代码
4.代码打包工具webpack

## 参考
- [Babel是如何读懂JS代码的](https://zhuanlan.zhihu.com/p/27289600)
- [浅谈babel原理以及使用](https://moyueating.github.io/2017/07/08/%E6%B5%85%E8%B0%88babel%E5%8E%9F%E7%90%86%E4%BB%A5%E5%8F%8A%E4%BD%BF%E7%94%A8/)
- [](https://cnodejs.org/topic/5a9317d38d6e16e56bb808d1
- [babel-runtime使用与性能优化](https://www.chyingp.com/posts/understanding-babel-runtime/)
- [对babel-transform-runtime，babel-polyfill的一些理解](https://www.jianshu.com/p/7bc7b0fadfc2)
