## 升级babel 7 && webapck 4
```js
npx babel-upgrade --write
```
[vue-loader 的变更](https://vue-loader.vuejs.org/zh/migrating.html#%E5%80%BC%E5%BE%97%E6%B3%A8%E6%84%8F%E7%9A%84%E4%B8%8D%E5%85%BC%E5%AE%B9%E5%8F%98%E6%9B%B4)
[babel 7.x 更新](https://babel.docschina.org/docs/en/7.0.0/v7-migration)
配置文件由 `.babelrc`改为 `babel.config.js`
包重命名：babylon 现在是 @babel/parser

## webpack 4

[webpack4升级完全指南](https://segmentfault.com/a/1190000014247030)
[webpack3升级到webpack4](https://github.com/diamont1001/webpack-summary/issues/4)
https://juejin.im/post/5c3d81f451882524f2302bbd
npm i -D webpack-cli

mode的修改

vue-loader 新版本用法的修改
clean-webpack-plugin 新版本用法的修改

[mini-css-extract-plugin](https://www.jianshu.com/p/91e60af11cc9)
[深入浅出的webpack构建工具---DllPlugin DllReferencePlugin提高构建速度(七)](https://www.cnblogs.com/tugenhua0707/p/9520780.html)
[webpack优化之HappyPack 实战](https://juejin.im/post/5ad9b0ecf265da0b7155d521)
[【vue-cli 3.0】 vue.config.js配置 - 路径别名](https://segmentfault.com/a/1190000016135314)
[Friendly-errors-webpack-plugin](https://www.npmjs.com/package/friendly-errors-webpack-plugin)识别某些类别的webpack错误，并清理，聚合和优先级，以提供更好的开发人员体验。

webpack.optimization.splitChunks


## DllPlugin 
插件能够快速快速打包，能把第三方依赖的文件能提前进行预编译打包到一个文件里面去，提高了构建速度。因为很多第三方插件我们并不需要改动他，所以我们想这些第三方库在我们每次编译的时候不要再次构建它就好，因此Dllplugin插件就产生了。

autoDllPlugin插件又是干什么的呢?
Dllplugin构建dll的js文件之后，在index.html需要手动引入dll文件，因为HtmlWebpackPlugin插件不会把dll.js文件自动打包到页面上去，它只会对bundle.js自动引入进去，因此AutoDllPlugin就是来解决这个问题的.
因此推荐 AutoDllPlugin， HtmlWebpackPlugin， 这两个插件一起使用，因为它可以节省手动将Dll包添加到自己的HTMl中

## happypack

