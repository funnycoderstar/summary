## Babel包的构成
[核心包](https://github.com/babel/babel/tree/master/packages#core-packages)
@babel/core: 是babel转译器本身,提供转义的API,例如babel.transform,webpack的babel-loader就是调用这个API完成转译的
@babel/parser：js的词法解析器
@babel/traverse：用于对AST（抽象语法树Abstract Syntax Tree）的遍历
@babel/generator：根据AST生成代码

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

### 举例说明
`const add = (a, b) => a + b;`生成的AST代码如下：
```js
{
  "type": "Program",
  "start": 0,
  "end": 28,
  "body": [
    {
      "type": "VariableDeclaration", // 变量声明
      "start": 0,
      "end": 28,
      "declarations": [ // 具体声明
        {
          "type": "VariableDeclarator",
          "start": 6,
          "end": 27,
          "id": {
            "type": "Identifier", // 标识符
            "start": 6,
            "end": 9,
            "name": "add"
          },
          "init": {
            "type": "ArrowFunctionExpression", // 箭头函数
            "start": 12,
            "end": 27,
            "id": null,
            "expression": true,
            "generator": false,
            "params": [ // 参数
              {
                "type": "Identifier",
                "start": 13,
                "end": 14,
                "name": "a"
              },
              {
                "type": "Identifier",
                "start": 16,
                "end": 17,
                "name": "b"
              }
            ],
            "body": {
              "type": "BinaryExpression", // 二项式
              "start": 22,
              "end": 27,
              "left": { // 二项式左边
                "type": "Identifier",
                "start": 22,
                "end": 23,
                "name": "a"
              },
              "operator": "+", // 二项式运算符
              "right": { // 二项式右边
                "type": "Identifier",
                "start": 26,
                "end": 27,
                "name": "b"
              }
            }
          }
        }
      ],
      "kind": "const"
    }
  ],
  "sourceType": "module"
}
```
```js
{
    "type": "Program",
    "body": [
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "add"
                    },
                    "init": {
                        "type": "ArrowFunctionExpression",
                        "id": null,
                        "params": [
                            {
                                "type": "Identifier",
                                "name": "a"
                            },
                            {
                                "type": "Identifier",
                                "name": "b"
                            }
                        ],
                        "body": {
                            "type": "BinaryExpression",
                            "operator": "+",
                            "left": {
                                "type": "Identifier",
                                "name": "a"
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "b"
                            }
                        },
                        "generator": false,
                        "expression": true,
                        "async": false
                    }
                }
            ],
            "kind": "const"
        }
    ],
    "sourceType": "script"
}
```

如果想要了解更多，可以阅读和尝试：
- [分析 AST](https://astexplorer.net/)
- [esprima](https://esprima.org/demo/parse.html#)
- [可视化AST](http://resources.jointjs.com/demos/javascript-ast)
- [AST 规范](https://github.com/estree/estree)
### AST在很多方面用到
1.eslint对代码错误或风格的检查,发现一些潜在的错误
2.IDE的错误提示,格式化,高亮,自动补全等
3.UglifyJS压缩代码
4.代码打包工具webpack

### babel的工作过程
![Babel](https://img.alicdn.com/tps/TB1nP2ONpXXXXb_XpXXXXXXXXXX-1958-812.png)

- Parse（解析）： 将代码字符串解析成抽象语法树； ES6代码输入 ==》进行解析(@babel/parser) ==》 得到AST
- Transform(转换)：对抽象语法树进行变换操作；plugin用@babel/traverse对AST树进行遍历转译 ==》 得到新的AST树
- Generate(代码生成)：再根据变换后的抽象语法树再生成代码字符串；用@babel/generator通过AST树生成ES5代码

我们来看看Babel是如何把 const add = (a, b) => a + b,看看它如何经过Babel变成： 
```js
var add = function add(a, b) {
  return a + b;
};
```

### Parse(解析)
Parse阶段细分为两个阶段： 分为**词法分析**(Lexical Analysis, LA)和**语法分析**(Syntactic Analysis, SA)
#### 词法分析
词法分析阶段可以看成是对代码进行”分词“， 它接受一段源代码，然后执行一段 tokenize函数，把代码分割成被称为 Tokens的东西，Tokens是一个数组，由一些代码的碎片组成。比如数字，标点符号，运算符号等等。例如这样
```js
[
    { "type": "Keyword", "value": "const" },
    { "type": "Identifier", "value": "add" },
    { "type": "Punctuator", "value": "=" },
    { "type": "Punctuator", "value": "(" },
    { "type": "Identifier", "value": "a" },
    { "type": "Punctuator", "value": "," },
    { "type": "Identifier", "value": "b" },
    { "type": "Punctuator", "value": ")" },
    { "type": "Punctuator", "value": "=>" },
    { "type": "Identifier", "value": "a" },
    { "type": "Punctuator", "value": "+" },
    { "type": "Identifier", "value": "b" }
]

```
通过 https://esprima.org/demo/parse.html# 生成；
我们来试着实现一下 tokenize 函数：
```js
/**
 * 词法分析 tokenize
 * @param {string} code JavaScript 代码
 * @return {Array} token
 */
function tokenize(code) {
    if (!code || code.length === 0) {
        return [];
    }
    var current = 0; // 记录位置
    var tokens = []; // 定义一个空的 token 数组
    
    var LETTERS = /[a-zA-Z\$\_]/i;
    var KEYWORDS = /const/; //  模拟一下判断是不是关键字
    var WHITESPACE = /\s/;
    var PARENS = /\(|\)/;
    var NUMBERS = /[0-9]/;
    var OPERATORS = /[+*/-]/;
    var PUNCTUATORS = /[~!@#$%^&*()/\|,.<>?"';:_+-=\[\]{}]/;
    
    // 从第一个字符开始遍历
    while (current < code.length) {
        var char = code[current];
        // 判断空格
        if (WHITESPACE.test(char)) {
          current++;
          continue;
        }
        // 判断连续字符
        if (LETTERS.test(char)) {
            var value = '';
            var type = 'Identifier';
            while (char && LETTERS.test(char)) {
                value += char;
                char = code[++current];
            }
            // 判断是否是关键字
            if (KEYWORDS.test(value)) {
                type = 'Keyword'
            }
            tokens.push({
                type: type,
                value: value
            });
            continue;
        }
        // 判断小括号
        if (PARENS.test(char)) {
            tokens.push({
              type: 'Paren',
              value: char
            });
            current++;
            continue;
        }
        // 判断连续数字
        if (NUMBERS.test(char)) {
          var value = '';
          while (char && NUMBERS.test(char)) {
            value += char;
            char = code[++current];
          }
          tokens.push({
            type: 'Number',
            value: value
          });
          continue;
        }
        // 判断运算符
        if (OPERATORS.test(char)) {
            tokens.push({
                type: 'Operator',
                value: char
            });
            current++;
            continue;
        }
        // 判断箭头函数
        if (PUNCTUATORS.test(char)) {
            var value = char;
            var type = 'Punctuator';
            var temp = code[++current];
            if (temp === '>') {
                type = 'ArrowFunction';
                value += temp;
                current ++;
            }
            tokens.push({
                type: type,
                value: value
            });
            continue;
        }
        tokens.push({
            type: 'Identifier',
            value: char
        });
        current++;
    }
    return tokens;
}

```

#### 语法分析

语法分析之后，代码已经变成了一个Tokens数组了，那么现在需要通过语法分析把Tokens转化为上面提到过得AST;

可以看一下官方的实现： https://github.com/babel/babel/tree/master/packages/babel-parser/src/parser

### Transform(转换)
对AST进行操作。我们可以看到AST中有很多相似的元素，他们都有一个Type属性，这样的元素被称作节点。一个节点通常包含若干属性，可以用于描述AST的部分信息。
比如这是一个最常见的 Identifier 节点：
```js
{
    type: 'Identifier',
    name: 'add'
}
// 表示这是一个标识符。
```
所以操作 AST 也就是操作其中的节点。可以增删改这些节点。从而转换为实际需要的AST.
babel对于AST的遍历是深度优先遍历，对于AST上的每一个分支Babel都会向下遍历走到尽头，然后再向上遍历退出刚遍历过得节点，然后寻找一一个分支。
```js
{
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration", // 变量声明
      "declarations": [ // 具体声明
        {
          "type": "VariableDeclarator", // 变量声明
          "id": {
            "type": "Identifier", // 标识符（最基础的）
            "name": "add" // 函数名
          },
          "init": {
            "type": "ArrowFunctionExpression", // 箭头函数
            "id": null,
            "expression": true,
            "generator": false,
            "params": [ // 参数
              {
                "type": "Identifier",
                "name": "a"
              },
              {
                "type": "Identifier",
                "name": "b"
              }
            ],
            "body": { // 函数体
              "type": "BinaryExpression", // 二项式
              "left": { // 二项式左边
                "type": "Identifier",
                "name": "a"
              },
              "operator": "+", // 二项式运算符
              "right": { // 二项式右边
                "type": "Identifier",
                "name": "b"
              }
            }
          }
        }
      ],
      "kind": "const"
    }
  ],
  "sourceType": "module"
}

```
根节点我们就不说了，从 declarations 里开始遍历：
1. 声明了一个变量，并且知道了它的内部属性（id, init）,然后我们再以此访问每一个属性以及它们的子节点。
2. id 是一个Identifier,有一个name属性表示变量
3. 之后是init，init也是有好几个内部属性
 - type是ArrowFunctionExpression，表示这是一个箭头函数表达式
 - params是这个箭头函数的入参，其中每一个参数都是一个Identifier类型的节点
 - body属性是这个箭头函数的主体，这是一个BinaryExpression二项式：left,operator,right，分别表示二项式的左边变量，运算符以及右边变量。

这是遍历 AST 的白话形式，再看看 Babel 是怎么做的：
这个过程是通过使用[@babel/traverse](https://github.com/babel/babel/tree/master/packages/babel-traverse)来完成的

babel 会维护一个称作 Visitor 的对象，这个对象定义了用于 AST 中获取具体节点的方法。

**Visitor**
一个Visitor一般来说是这样的：
```js
var visitor = {
    ArrowFunction() {
        console.log('我是箭头函数');
    },
    IfStatement() {
        console.log('我是一个if语句');
    },
    CallExpression() {}
};

```
当我们遍历 AST 的时候，如果匹配上一个 type，就会调用 visitor 里的方法。

这只是一个简单的 Visitor。
上面说过，Babel 遍历 AST 其实会经过两次节点：遍历的时候和退出的时候，所以实际上 Babel 中的 Visitor 应该是这样的：
```js
var visitor = {
    Identifier: {
        enter() {
            console.log('Identifier enter');
        },
        exit() {
            console.log('Identifier exit');
        }
    }
};

```
比如我们拿这个 visitor 来遍历这样一个 AST：
```js
params: [ // 参数
    {
        "type": "Identifier",
        "name": "a"
    },
    {
        "type": "Identifier",
        "name": "b"
    }
]

```
过程可能是这样的...

- 进入 Identifier(params[0])
- 走到尽头
- 退出 Identifier(params[0])
- 进入 Identifier(params[1])
- 走到尽头
- 退出 Identifier(params[1])

回到上面的🌰，箭头函数是 ES5 不支持的语法，所以 Babel 得把它转换成普通函数，一层层遍历下去，找到了 ArrowFunctionExpression 节点，这时候就需要把它替换成 FunctionDeclaration 节点。所以，箭头函数可能是这样处理的：
```js
import * as t from "@babel/types";

var visitor = {
    ArrowFunction(path) {
        path.replaceWith(t.FunctionDeclaration(id, params, body));
    }
};

```
### Generate(代码生成)
经过上面两个阶段，需要转译的代码已经经过转换，生成新的AST了，最后根据这个AST来输出代码
这个过程是通过使用[@babel/generator](https://github.com/babel/babel/tree/master/packages/babel-generator)来完成的，当然，也是深度优先遍历
```js
/**
 * Babel's code generator, turns an ast into code, maintaining sourcemaps,
 * user preferences, and valid output.
 */

class Generator extends Printer {
  constructor(ast, opts = {}, code) {
    const format = normalizeOptions(code, opts);
    const map = opts.sourceMaps ? new SourceMap(opts, code) : null;
    super(format, map);

    this.ast = ast;
  }

  ast: Object;

  /**
   * Generate code and sourcemap from ast.
   *
   * Appends comments that weren't attached to any node to the end of the generated output.
   */

  generate() {
    return super.generate(this.ast);
  }
}

```

## 参考
- [Babel是如何读懂JS代码的](https://zhuanlan.zhihu.com/p/27289600)
- [浅谈babel原理以及使用](https://moyueating.github.io/2017/07/08/%E6%B5%85%E8%B0%88babel%E5%8E%9F%E7%90%86%E4%BB%A5%E5%8F%8A%E4%BD%BF%E7%94%A8/)
- [](https://cnodejs.org/topic/5a9317d38d6e16e56bb808d1
- [babel-runtime使用与性能优化](https://www.chyingp.com/posts/understanding-babel-runtime/)
- [对babel-transform-runtime，babel-polyfill的一些理解](https://www.jianshu.com/p/7bc7b0fadfc2)
- [理解 Babel 插件](http://taobaofed.org/blog/2016/09/30/babel-plugins/)
- [初学 Babel 工作原理](https://juejin.im/post/5d11d797f265da1bd305676b#comment)