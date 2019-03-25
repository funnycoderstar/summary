---
title: webpack中html-webpack-plugin的使用
date: 2018-01-17 20:04:35
tags: 
---
## 引言
`html-webpack-plugin`是webpack的一个插件,目前用到改插件的两个作用:
- 为html文件中引入的外部资源文件`script`, `link`动态添加compile后的hash,放在引用缓存的外部文件问题
- 可以生成创建html入口文件,比如单页面可以生成一个html入口,配置N个`html-webpack-plugin`可以生成N个页面入口(及生成多页面);

## 原理

将webpack中的`entry`配置相关入口thunk和`extract-text-webpack-plugin`抽取css样式插入到该插件提供的 `template`或者`templateContent`配置项指定的内容基础上生成一个html文件,具体插入方式是将`link`插入到`head`元素中,`script`插入到`head`或者`body`中

初始化改插件时可以不配置任何参数:

```js
var HtmlWebpackPlugin = require('html-webpack-plugin')
    
webpackconfig = {
    ...
    plugins: [
        new HtmlWebpackPlugin()
    ]
}
```
不配置任何选项的 `html-webpack-plugin`插件,他会将webpack中`entry`配置所有入口`thunk`和`extract-text-webpack-plugin`抽取的css样式都插入到文件指定的位置,例如上面生成的html文件内容如下:
```js
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
  <link href="index-af150e90583a89775c77.css" rel="stylesheet"></head>
  <body>
  <script type="text/javascript" src="common-26a14e7d42a7c7bbc4c2.js"></script>
  <script type="text/javascript" src="index-af150e90583a89775c77.js"></script></body>
</html>
```
### html-webpack-plugin配置项

插件提供的配置项比较多,通过源码可以看出具体的配置项如下:
```js
this.options = _.extend({
    template: path.join(__dirname, 'default_index.ejs'),
    filename: 'index.html',
    hash: false,
    inject: true,
    compile: true,
    favicon: false,
    minify: false,
    cache: true,
    showErrors: true,
    chunks: 'all',
    excludeChunks: [],
    title: 'Webpack App',
    xhtml: false
}, options);

```
- title: 生成的html文档的标题.配置该项，它并不会替换指定模板文件中的title元素的内容，除非html模板文件中使用了模板引擎语法来获取该配置项值，如下ejs模板语法形式：
```
<title>{%= o.htmlWebpackPlugin.options.title %}</title>
```
- filename: 输出文件的文件名称,默认为index.html,不配置就是该文件;此外,还可以为输出文件指定目录位置(例如'html/index.html')
关于filename补充两点:
1.filename配置的html文件目录是相对于webpackConfig.output.path路径而言的，不是相对于当前项目目录结构的。
2.指定生成的html文件内容中的link和script路径是相对于生成目录下的，写路径的时候请写生成目录下的相对路径。

- template: 本地模板文件的位置，支持加载器(如handlebars、ejs、undersore、html等)，如比如 handlebars!src/index.hbs；
关于template补充几点：
1、template配置项在html文件使用file-loader时，其所指定的位置找不到，导致生成的html文件内容不是期望的内容。
2、为template指定的模板文件没有指定任何loader的话，默认使用ejs-loader。如template: './index.html'，若没有为.html指定任何loader就使用ejs-loader

- templateContent: string|function，可以指定模板的内容，不能与template共存。配置值为function时，可以直接返回html字符串，也可以异步调用返回html字符串。

- inject：向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同。
1、true或者body：所有JavaScript资源插入到body元素的底部
2、head: 所有JavaScript资源插入到head元素中
3、false： 所有静态资源css和JavaScript都不会注入到模板文件中

- favicon: 添加特定favicon路径到输出的html文档中，这个同title配置项，需要在模板中动态获取其路径值

- hash：true|false，是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值，添加hash形式如下所示：
```js
html <script type="text/javascript" src="common.js?a3e1396b501cdd9041be"></script>
```

- chunks：允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。在配置多个页面时，每个页面注入的thunk应该是不相同的，需要通过该配置为不同页面注入不同的thunk；

- excludeChunks: 这个与chunks配置项正好相反，用来配置不允许注入的thunk。

- chunksSortMode: none | auto| function，默认auto； 允许指定的thunk在插入到html文档前进行排序。
>function值可以指定具体排序规则；auto基于thunk的id进行排序； none就是不排序

- xhtml: true|fasle, 默认false；是否渲染link为自闭合的标签，true则为自闭合标签
- cache: true|fasle, 默认true； 如果为true表示在对应的thunk文件修改后就会emit文件
- showErrors: true|false，默认true；是否将错误信息输出到html页面中。这个很有用，在生成html文件的过程中有错误信息，输出到页面就能看到错误相关信息便于调试。

- minify: {....}|false；传递 html-minifier 选项给 minify 输出，false就是不使用html压缩。

```js
new HtmlWebpackPlugin({
    title:'rd平台',
    template: 'entries/index.html', // 源模板文件
    filename: './index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
    showErrors: true,
    inject: 'body',
    chunks: ["common",'index']
})
```