# vue-cli 3.0
>  [官方文档](https://cli.vuejs.org/zh/)

## 前言

Vue cli 的包名称由vue-cli改为@vue/cli, 安装此版本需要先卸载之前的版本
npm uninstall vue-cli -g 或 yarn global remove vue-cli
Node > 8.9

## 简单入门

### 1.安装
```js
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

查看是否安装成功
vue -V 或 vue —version

### 2.创建项目
```js
vue create my-project
```

vue ui  以图形化界面创建和管理项目

### 3.启动项目
```js
yarn serve 
# or
npm run serve

```
## 和之前版本的使用对比
```js
npm install -g vue-cli
vue init webpack vue-project
npm install
npm run dev
```
## 更多功能

## 可以运行单个vue文件
npm install -g @vue/cli-service-global
在App.vue文件所在目录下运行  vue serve
也可以显示指定运行文件 vue serve MyComponent.vue
