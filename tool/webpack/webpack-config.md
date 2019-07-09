## 关于webpack，你需要了解这些
- 按需加载
- tree-shaking
- code-splitting
- manifest 和 runtime的含义

## webpack按需加载
配置chunkFilename,比如vue-router的按需加载,动态import ，点击某个按钮再加载资源。


## [tree-shaking](https://webpack.docschina.org/guides/tree-shaking/) 
移除JavaScript上下文中未引用的代码（dead-code）,依赖ES6的模板语法，import export
比如一个引用了一个文件index.js import { a } from index.js, index.js中有两个函数 a, b, 只用到了a，则只打包index.js中的函数a

## [code-splitting](https://webpack.docschina.org/guides/code-splitting/)
code-splitting(代码分离): 把代码分离到不同的bundle中，然后按需加载或并行加载这些文件，代码分离可以用于获取更小的bundle


## [manifest & runtime](https://webpack.docschina.org/concepts/manifest/#runtime)

Webpack打包的代码类型，自己写的代码，第三方库代码，他们之前的引用和依赖关系 就是manifest 文件
