
## babel的配置
作用: 下一代javaScript语法编译器; 主要是presets和plugin

## presets
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

modules: 

targets: 需要支持的环境
targets.node
targets.browsers
targets.uglify

useBuiltIns:
- entry: 是按照目标环境去polyfill的，不关心代码中是否使用,可以保证在目标环境一定可用
- usage: 会分析代码调用，但是对于原型链上的方法仅仅按照名字去匹配,可以得到更小的polyfill体积

https://www.babeljs.cn/docs/plugins/preset-env/
## plugins: 你想使用的转换规则插件

babel-plugin-transform-runtime
babel-plugin-syntax-dynamic-import

## babel编译过程和编译原理

抽象语法树
- 先转成AST