# yarn
[官方文档](https://yarnpkg.com/lang/en/)

## yarn是什么? 能干什么
yarn是facebook发布的一种包管理工具，作用同npm 一样，是一个包管理用具

## 优点？
- 快速： 1.会缓存它下载的每个包， 无需重复下载；能并行化操作以最大资源利用率
- 可靠： 使用格式详尽而又简洁的 lockfile文件 和确定性算法来安装依赖，能够保证在一个系统上的运行的安装过程也会以同样的方式运行在其他系统上。
- 安全： 安装包被执行前校验其完整性

## 如何使用
### 安装
```js
brew install yarn
// 或 
npm install -g yarn
```
## 基本工作流
```js
// 初始化
yarn init 
// 添加包
yarn add [package]
// 升级包
yarn upgrade [package]
// 移除依赖包
yarn remove [package]
// 安装所有依赖
yarn 或 yarn install
```
1.创建一个新项目
2.增加/更新/删除依赖
3.安装所有的依赖
4.加入版本管理中(yarn.lock必须提交到代码仓库)
5.持续集成(为了加速构建，Yarn 缓存目录可以跨构建保存起来, 具体可以查看官网的解释： https://yarnpkg.com/zh-Hans/docs/install-ci)
## yarn.lock文件作用?
- 1.为了跨机器安装得到相同的版本，yarn需要比你配置package.json中的依赖列表需要更多的信息， yarn需要准确存储每个安装的依赖是哪个版本
- 2.yarn.lock文件是自动生成的， 增加、删除、升级包依赖等， 会自动更新yarn.lock文件， 不要直接编辑
- 3.该文件需要提交到版本控制系统
别担心发布 yarn.lock 文件，因为它对库的用户不会有任何作用。

