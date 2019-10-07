## 准备工作
### 1,Rocket,chat的css采用postcss的写法,没有用过postcss的童鞋可以看一下[postnext](http://cssnext.io/features/)
### 2,Rocket.chat是基于meteor的,meteor采用[Spacebar语法](http://meteorcapture.com/spacebars/)
## 开始源码之旅
- /server 包含服务器端代码
- /server/configuration
- /server/lib
- /server/methods 包含可从客户端调用的Meteor远程方法
- /server/publications包含Meteor 发布实现
- /server/startup 包含在启动时运行的服务器逻辑

- /client 包含客户端代码
- /client/routes 包含由flow-router处理的应用程序路由
- /client/startup 在客户端启动时运行的内容
- /client/helpers
- /client/methods
- /client/notifications
- /client/lib

- /public 包含静态资源,比如字体和图像,以及一些通用代码

- /packages 包含模块化代码,这些代码采用Meteor包的形式,构成服务器逻辑很大一部分
- /packages/rocketchat-ui 包含核心UI包
- /packages/rocketchat-ui-XXX 是包含各种 UI 组件的实现的包。
- /packages/rocketchat-lib/server/models 包含聊天服务器逻辑所使用的数据模型定义，目前在 MongoDB 中实现。
