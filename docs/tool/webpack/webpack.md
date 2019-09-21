## webpack output的path和publicPath选项

output 告诉webpack怎么存储输出结果以及存储到哪里。
path仅仅告诉webpack结果存储到哪里，publicPath被许多Webpack的插件用于在生产模式下更新内嵌到CSS，html文件里面的URL值
```js
module.exports = {
  //...
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    publicPath: 'https://cdn.example.com/assets/'
  }
};
```
output.path中的URL以HTML页面为基准; 是webpack所有文件的输出的路径，必须是绝对路径；
output.publicPath，并不会对生成文件的路径造成影响，主要是对你的页面里面引入的的资源的路径做对应的补全, 常见的就是CSS文件里面引入的图片 例如：当将资源托管到 CDN 时。

[webpack output-path](https://webpack.docschina.org/configuration/output/#output-path)
[webpack中output之path和publicPath详解](https://blog.csdn.net/qq_39207948/article/details/80631435)