Node开发离不开npm,而脚本功能是npm 最强大,最常用的功能之一
npm脚本(npm scripts)

## 1.什么是npm 脚本
npm 允许在package.json文件里面,使用`scripts`字段定义脚本命令
```js
{
    "scripts": {
        "build": "node build.js"
    },
}
```
上面代码是`package.json`文件的一个片段,里面`scripts`字段是一个对象,它的每一个属性,对应一段脚本,比如,build命令对应的的脚本是 `node build.js`
命令行下使用 `npm run `命令,就可以执行这段脚本.
```js
$ npm run build
# 等同于执行
$ node build.js
```
这些定义在`package.jso`n里面的脚本,就被称为npm 脚本,优点很多
```
- 项目的相关脚本,可以集中在同一个地方
- 不同项目的脚本命令,只要功能相同,就可以有相同的对外接口.用户不需要知道怎么测试你的项目,只要运行npm run test即可
- 可以利用npm提供的很多辅助功能

```
查看当前项目的所有npm 命令,可以使用不带任何参数的 `npm run` 命令
```js
npm run
```
## 2.原理
npm 脚本的原理非常简单,每当执行 `npm run` ,就会自动新建一个Shell,在这个Shell里面执行指定的脚本命令.因此,只要是Shell(一般是Bash)可以运行的命令,就可以直接写在npm脚本里面

比较特别的是, `npm run`新建的这个shell,会将当前目录的 `node_modules/.bin`子目录加入`PATH`变量,执行结束后,再将`PATH`变量恢复原样.

这意味着,当前目录的  `node_modules/.bin`子目录里面所有脚本,都可以直接用脚本名调用,而不必加上路径.比如，当前项目的依赖里面有 Mocha，只要直接写mocha test就可以了。

```
"test": "mocha test"
```
而不用写成下面这样
```
"test": "./node_modules/.bin/mocha test"
```
由于 npm脚本的唯一要求就是可以在Shell执行,因此它不一定是Node脚本,任何可执行文件都可以写在里面.
npm 脚本的退出码，也遵守 Shell 脚本规则。如果退出码不是0，npm 就认为这个脚本执行失败。
## 3.通配符
npm 脚本就是shell脚本,因此可以使用Shell通配符
```
"lint": "jshint *.js"
"lint": "jshint **/*.js"
```
*代表任意文件名,**表示任意一层子目录
如果要将通配符传入原始命令，防止被 Shell 转义，要将星号转义。
```
"test": "tap test/\*.js"
```

## 4.传参
