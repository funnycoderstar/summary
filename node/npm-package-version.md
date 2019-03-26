## Node.js中package.json中库的版本号

## ~和^的区别
最近总是碰到一些问题, 在本地好好的, 在线上就出现了问题, 本地也一直复现不了, 后来把node_modules目录删除了之后, 重新安装, 就在本地复现了这个问题,可以看了git history, 并没有人修改package.json中的版本号,于是认真的了解了一下package.json中库的版本号;

~和^的区别
```js
    "babel-loader": "^7.1.1",
    "body-parser": "~1.15.2"
```
npm install --save xxx, 会优先考虑使用 `^`而不是`~`

以版本号x.y.z为例
x:主版本号, 当你做了不兼容的API修改
y:次版本号, 当你做了向下兼容的功能性问题
z:修订号, 当你做了向下兼容的问题修复

`~x.y.z`, 会更新到y最新的版本, 例如 `body-parser`: ~1.15.2, 这个库会去匹配到1.15.z的最新版本, 如果出现了1.16.0, 则不会自动升级
`^x.y.z`, 会更新到x的最新版本, 例如 `babel-loader`: ^7.1.1, 这个库会去匹配7.y.z的最新版本, 如果出现了8.1.1, 则不会自动升级

可以参考[npm官方给出的解释](https://github.com/npm/node-semver#caret-ranges-123-025-004)
^1.2.3 := >=1.2.3 <2.0.0
^0.2.3 := >=0.2.3 <0.3.0
^0.0.3 := >=0.0.3 <0.0.4

大多数情况下遵循这种版本号规则的依赖包都没问题, 但是npm是开源的世界, 并不是所有的都严格遵循这种规则, 所以会出现上述的问题;

## 为什么需要package锁

有如下几个可能原因, 在某些情况下, package.json是无法保证每个人自己电脑上执行的 npm install 后安装的依赖版本都是一样的
1.如果package.json中记录的依赖包的版本是一个版本范围, 一旦执行npm i 会导致这个包更新到最新版本
2.就算你依赖了一个固定版本的包(如A 1.1.1), 但你依赖的包A可能依赖其他的包B,而A在声明依赖时可能也使用了semser命名, 如 ^1.2.3, 如果包B release 了新版, 也会导致包B会安装到更新版本
3.不同人使用的npm程序的版本不同

如果依赖包的版本不一致, 会导致开发环境和生产环境产品不一致的行为; 或者导致不同团队成员之前也产品环境差异

## 如何解决包版本不一致的情况

### 1.npm 使用package-lock.json文件来解决这个问题
执行npm install会自动生成package.json文件, 只要执行普通的安装, 更新等可能会修改 package.json的npm命令, 都会自动同步修改package-lock.json文件
```js
npm install xxx
npm rm xxx
npm update xxx
```
### 2.npm 还支持[npm-shrinkwrap.json](https://www.npmjs.cn/cli/shrinkwrap/), 和package-lock.json功能完全一样
执行 `npm shrinkwrap`来生成npm-shrinkwrap.json
此命令将根据 package-lock.json 文件创建一个新的或覆盖已有的 npm-shrinkwrap.json 文件。 此命令创建和更新的文件将优先于任何其他现有或将有的 package-lock.json 文件。


### 3.使用yarn
使用yarn主要有一下优点
- 快速: 会缓存它下载的每个包，无需重复下载；能并行化操作以最大资源利用率
- 可靠:使用格式详尽而又简洁的 lockfile文件 和确定性算法来安装依赖，能够保证在一个系统上的运行的安装过程也会以同样的方式运行在其他系统上。
- 安全: 安装包被执行前校验其完整性

> yarn速度比npm快一些, yarn的锁文件是yarn.lock, 能解决包版本不一致的情况


