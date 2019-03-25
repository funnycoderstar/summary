## 模块的依赖管理

对项目开发时,对项目的依赖管理体现在:
- 如何方便的获取项目需要使用的模块
- 当前项目依赖了哪些模块，或许还会指定模块依赖的环境（哪些模块是生产阶段依赖的、哪些是开发阶段依赖的
- 模块的哪些版本是和当前项目兼容的，可以直接使用
- 其他成员（或者系统）如何方便的获取所有模块，从而能让项目正常运行

## npm install --save(生产阶段的依赖) 与npm install --save-dev(开发阶段依赖)的区别
npm install 在安装 npm 包时，有两种命令参数可以把它们的信息写入 package.json 文件，一个是npm install --save另一个是 npm install --save-dev，他们表面上的区别是--save 会把依赖包名称添加到 package.json 文件 dependencies 键下，--save-dev 则添加到 package.json 文件 devDependencies 键下
它们真正的区别是，devDependencies 下列出的模块，是我们开发时用的，比如 我们安装 js的压缩包gulp-uglify 时

我们采用的是 “npm install --save-dev gulp-uglify ” （见上图）命令安装，因为我们在发布后用不到它，而只是在我们开发才用到它。dependencies 下的模块，则是我们发布后还需要依赖的模块，譬如像jQuery库或者Angular框架类似的，我们在开发完后后肯定还要依赖它们，否则就运行不了。
另外需要补充的是：
正常使用npm install时，会下载dependencies和devDependencies中的模块，当使用npm install --production或者注明NODE_ENV变量值为production时，只会下载dependencies中的模块。

npm install koa

- 会把koa包安装到node_modules目录中
- 不会修改package.json

npm install --save koa

- 会把koa包安装到node_modules目录中
- 会修改package.json,在dependencies属性下添加 koa
```js
{
   "dependencies": {
    "koa": "~1.1.0"
  }
}

```
- 之后运行npm install 命令,会自动安装mdbuild到node_modules目录中
- 之后运行npm install --production或者注明NODE_ENV变量值为production时，会自动安装koa到node_modules目录中

npm install --save-dev koa
- 会把koa包安装到node_modules目录中
- 会修改package.json,在devDependencies属性下添加 koa
```js
{
  "devDependencies": {
    "koa": "~1.1.0"
  }
}
```
- 之后运行npm install 命令,会自动安装mdbuild到node_modules目录中
- 之后运行npm install --production或者注明NODE_ENV变量值为production时，不会自动安装koa到node_modules目录中

模块的依赖如果被写入了 package.json 文件，其他合作者（比如：其他小伙伴、或者是部署服务）只要进入项目的根目录，执行 npm install 就可以将依赖的模块全部安装到 node_modules 目录下。

使用原则
运行时需要用到的包使用--save,否则使用--save-dev
```js
{
 "devDependencies": {
    "babel-core": "^6.25.0",
    "babel-loader": "^7.1.1",
    "babel-plugin-react-transform": "^2.0.2",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^0.28.4",
    "extract-text-webpack-plugin": "^3.0.0",
    "html-webpack-plugin": "^2.30.1",
    "path": "^0.12.7",
    "react-transform": "0.0.3",
    "react-transform-hmr": "^1.0.4",
    "style-loader": "^0.18.2",
    "webpack": "^3.5.4",
    "webpack-dev-server": "^2.7.1"
  },
  "dependencies": {
    "react": "^15.6.1",
    "react-dom": "^15.6.1"
  }
}
```

## 参考
- [npm install --save 与 npm install --save-dev 的区别](https://www.cnblogs.com/hollen/p/5956012.html)
- [深入 Node 模块的安装和发布](https://segmentfault.com/a/1190000004221514)

## 利用shrinkwrap锁定依赖版本
- 多人开发同步环境同步
- 锁定依赖版本
- 检查node_modules和package.json描述
- npm install安装

npm shrinkwrap 可以按照当前项目 node_modules 目录内的安装包情况生成稳定的版本号描述。
比方说，有一个包 A
```js
 {
       "name": "A",
       "version": "0.1.0",
       "dependencies": {
         "B": "<0.1.0"
       }
     }
```
还有一个包 B
```js
{
       "name": "B",
       "version": "0.0.1",
       "dependencies": {
         "C": "<0.1.0"
       }
     }

```
以及包 C
```js
{
       "name": "C",
       "version": "0.0.1"
     }

```
你的项目只依赖于 A，于是 npm install 会得到这样的目录结构
```js
A@0.1.0
     `-- B@0.0.1
         `-- C@0.0.1
```
这时候，B@0.0.2 发布了，这时候在一个新的环境下执行 npm install 将得到
```js
A@0.1.0
     `-- B@0.0.2
         `-- C@0.0.1
```
这时候两次安装得到的版本号就不一致了。而通过 shrinkwrap 命令，我们可以保证在所有环境下安装得到稳定的结果。
在项目引入新包的时候，或者 A 的开发者执行一下 npm shrinkwrap，可以在项目根目录得到一个 npm-shrinkwrap.json 文件。
```js
{
       "name": "A",
       "version": "0.1.0",
       "dependencies": {
         "B": {
           "version": "0.0.1",
           "dependencies": {
             "C": {
               "version": "0.0.1"
             }
           }
         }
       }
     }
```
shrinkwrap 命令根据目前安装在node_modules的文件情况锁定依赖版本。在项目中执行 npm install 的时候，npm 会检查在根目录下有没有 npm-shrinkwrap.json 文件，如果 shrinkwrap 文件存在的话，npm 会使用它（而不是 package.json）来确定安装的各个包的版本号信息。

这样一来，在安装时候确定的所有版本信息会稳定的固化在 shrinkwrap 里。无论是A，B 和 C中的版本如何变化，或者它们的 package.json 文件如何修改，你始终能保证，在你项目中执行 npm install 的到的版本号时稳定的。
在开发过程中，引入一个新包的流程如下

npm install PACKAGE_NAME@VERSION --save 获取特定版本的包
测试功能
测试功能正常后，执行 npm shrinkwrap 把依赖写入 shrinkwrap 文件
在代码仓库中提交 shrinkwrap / package.json 描述
升级一个包的流程应该是这样

npm outdated 获取项目所有依赖的更新信息
npm install PACKAGE_NAME@VERSION --save 获取特定版本的包
测试功能
测试功能正常后，执行 npm shrinkwrap 把依赖写入 shrinkwrap 文件
在代码仓库中提交 shrinkwrap / package.json 描述
删除一个包的流程如下

npm uninstall PACKAGE_NAME --save 删除这个包
测试功能
测试功能正常后，执行 npm shrinkwrap 把更新的依赖写入 shrinkwrap 文件
在代码仓库中提交 shrinkwrap / package.json 描述
比一般的安装多了一步手工生成 shrinkwrap 文件。在实际工作中，有时候我们会忘记这一步，导致上线时候没有获取到依赖包的特定版本。

- [使用 npm shrinkwrap 来管理项目依赖](https://tech.meituan.com/npm-shrinkwrap.html)
## package-lock.json
是当 node_modules 或 package.json 发生变化时自动生成的文件。这个文件主要功能是确定当前安装的包的依赖，以便后续重新安装的时候生成相同的依赖，而忽略项目开发过程中有些依赖已经发生的更新。
## 使用yarn
yarn 除了速度比 npm 更快、支持离线安装等特性外，对 npm 体系最大的一个冲击是 yarn 默认提供了 lock 功能。也就是说在通过 yarn 安装了一次依赖之后，如果不执行 yarn upgrade，删除后再重新安装模块的版本不会发生变化。
## webpack的happypack
问题: webpack为了方便各种资源和类型的加载,设计了以loader加载器的形式读取资源,但是受限于node的编程模型影响,所有的loader虽然以async的形式来并发调用,但是还是运行在单个node的进程以及同一个事件循环中,这就直接导致了当我们需要同时读取多个loader文件资源时,比如babel-loader需要transform各种jsx,es6的资源文件,在这种同步计算需要大量耗费cpu运算过程中,node的单进程模型就无优势了,happyback就针对解决此类问题而生
happy是webpack的一个插件,处理思路是将原有的webpack对loader的执行过程从单一进程的形式拓展到多进程模式,原本的流程保持不变,这样可以不修改原有配置的基础上来完成对编译过程的优化;
具体配置如下:
```js
 const HappyPack = require('happypack');
 const os = require('os')
 const HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length}); // 启动线程池});

module:{
    rules: [
      {
        test: /\.(js|jsx)$/,
        // use: ['babel-loader?cacheDirectory'],
        use: 'happypack/loader?id=jsx',
        exclude: /^node_modules$/
      }
    ]
  },
  plugins:[
    new HappyPack({
     id: 'jsx',
     cache: true,
     threadPool: HappyThreadPool,
     loaders: ['babel-loader']
   })
  ]
```
通过在loader中配置直接指向happypack中提供的loader,对于文件实际匹配的处理loader,则是通过配置在plugin属性来传递说明,这里happyback提供的loader和plugin的衔接匹配,则是通过id=happybabel来完成,配置完成后,loader的工作模式就转变成了如下所示
