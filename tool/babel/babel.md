
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

## babel编译过程和编译原理

抽象语法树
- 先转成AST