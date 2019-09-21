
## path.join([...paths])

使用平台特定的分割符把全部给定的path片段连接到一起,并规范化生成的路径
长度为零的path片段会被忽略,如果连接后的路径字符串是一个长度为零的字符串,则返回'.',表示当前工作目录

```js
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// 返回: '/foo/bar/baz/asdf'
```


## path.resolve([...paths])

将一个路径或路径片段的序列解析成一个绝对路径
给定的路径序列是从右向左被处理的,后面每个path被依次解析,知道构造完成一个绝对目录;
例如
```js
path.resolve('/foo', '/bar', 'baz')会返回 /bar/baz
```
如果处理完全部给定的path片段后还未生成一个绝对路径,则当前的工作目录会被用上;
生成的路径是规范化后的,且末尾的斜杠会被删除,除非路径被解析为跟目录;
长度为0的path会被忽略
如果没有传入path片段,则path.resolve()会返回当前工作目录的绝对路径;
```js
path.resolve('/foo/baz', '/tmp/file/'); 返回 /tmp/file
path.resolve('/foo/baz', 'tmp/file/'); 返回/foo/baz/tmp/file

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// 如果当前工作目录为 /home/myself/node，
// 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'
```
在任何模块文件内部，可以使用__dirname变量获取当前模块文件所在目录的完整绝对路径。
__dirname：全局变量，存储的是文件所在的文件目录
__filename：全局变量，存储的是文件名

## process.cwd()

返回Node.js进程当前的工作目录(返回当前进程的工作目录)

## process.env 用法

process.env是Node环境变量;
使用场景: 依靠这个我们就可以给服务器打上一个标签,这样的话,我们可以根据不同的环境,做一些配置上的处理,例如开始sourceMap,后端接口的域名切换;

### 配置环境变量
windows配置
临时
```js
# node中常用的到的环境变量是NODE_ENV，首先查看是否存在 
set NODE_ENV
# 如果不存在则添加环境变量 
set NODE_ENV=production
# 环境变量追加值 set 变量名=%变量名%;变量内容 
set path=%path%;C:\web;C:\Tools
# 某些时候需要删除环境变量 
set NODE_ENV=
```
永久
右键(此电脑) -> 属性(R) -> 高级系统设置 -> 环境变量(N)...

Linux配置

临时
查看环境变量,添加环境变量,删除环境变量
```js
# node中常用的环境变量是NODE_ENV,首先查看是否存在
echo $NODE_ENV
# 如果不存在则添加环境变量
export NODE_ENV=produciton
# 环境变量追加值
export path=$path:/home/download:/usr/local/
# 某些时候需要删除环境变量
unset NODE_ENV
# 某些时候需要显示所有的环境变量
env
```
永久
打开配置文件所在
```js
# 所有用户都生效
vim /etc/profile
# 当前用户生效
vim ~/.bash_profile
```
在文件末尾添加类似如下语句进行环境变量的设置和修改
```js
# 在文件末尾添加如下格式的环境变量
export path=$path:/home/download:/usr/local/
export NODE_ENV = production
```

最后修改完成后需要运行如下语句令系统重新加载
```js
# 修改/etc/profile文件后
source /etc/profile
# 修改~/.bash_profile文件后
source ~/.bash_profile
```

解决环境导致后端接口变换问题
可以在不同环境的机器上设置不同的 NODE_ENV，当然这个字段也不一定。你也可以换成其他的NODE_ENV_NIZUISHUAI等等，反正是自定义的

解决步骤
1.修改代码里的后端地址配置
```js
{
    serverUrl:
        process.env.NODE_ENV === 'dev' ?
               'http://dev.com':
        process.env.NODE_ENV === 'production' ?
               'http://production.com': ''
}
```
2.在linux上设置环境变量
```
export NODE_ENV = dev
```

## 参考
[Node环境变量 process.env 的那些事儿](https://segmentfault.com/a/1190000011683741)