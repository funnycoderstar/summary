# webpack常见面试题
## webpack 的 loader 和 plugin 区别，举几个常用的 loader 和 plugin 并说出作用

## loader
对模块的源代码进行转换, webpack只能处理javaScript, 如果要处理其他类型的文件, 就需要使用loader进行转换;
1. loader可以使你在 import 或"加载"模块时预处理文件
2. loader允许你在javascript模块中 import css文件
3. 将文件从其他语言转为javascript, 比如ts-loader

### 常用的loader

style-loader: 创建style标签将css文件嵌入到html中
css-loader: 处理其中的@import和url()
less-loader: 将less转为css
url-loader: 小于1000Kb的转成base64的图片(data url)
file-loader: 

## plugin
plugin: 插件, 用来扩展webpack功能


### 常用的plugin
htmlWebpackPlugin:
UglifyJsPlugin


## webapck和其他构建工具的区别(gulp, grunt, rollup)
webpack 主要是模块的
gulp 主要是定义一些任务
rollup 适合打包库

## webpack模块热替换原理


##  webpack 打包的过程





