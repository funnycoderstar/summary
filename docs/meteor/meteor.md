写在前面的话：强烈推荐使用mac或linux系统开发，window下建议使用docker开发

### 1，下载
```
curl https://install.meteor.com/ | sh
```
### 2，新建一个meteor程序
```bash
meteor create meteorApp
cd meteorApp
meteor

```
在浏览器中输入：http://localhost:3000/

### 3，目录结构
```
|-- [node_modules]                  //项目依赖
|-- [client]                        //客户端源码
|   |-- main.css                    //主页面   
|   |-- main.js                     //客户端的主入口
|   |-- main.html                   //客户端页面组件
|-- [server]                        //服务端源码
|   |-- main.js                     //服务器的主入口
|-- .gitinore                       //git要忽略的文件
|-- package.json                    //项目配置文件

```
#### 文件
- package.json
```js
{
  "name": "meteorApp",
  "private": true,
  "scripts": {
    "start": "meteor run"
  },
  "dependencies": {
    "babel-runtime": "^6.20.0",
    "meteor-node-stubs": "~0.2.4"
  }
}
```
这是项目的配置文件，包括项目信息和项目依赖信息，两个依赖meteor-node-stubs和babel-runtime都在node_modules文件夹下
- .gitignore
```
node_modules/
```
这个就是git软件要忽略的文件呢列表，如果忽略这些文件，在Git工作区的目录下创建一个特殊的.gitigore文件，然后要把忽略的文件名填进去，git就会自动忽略这些文件，这里是忽略node_modules文件夹
#### 文件夹
> .meteor
是.meteor隐藏文件夹

> client
这里错放客户端运行文件，该文件夹只会在客户端运行;
```js
<head>
  <title>MyFirstTest</title>
</head>

<body>
  <h1>Welcome to Meteor!</h1>

  {{> hello}}
  {{> info}}
</body>

<template name="hello">
  <button>Click Me</button>
  <p>You've pressed the button {{counter}} times.</p>
</template>

<template name="info">
  <h2>Learn Meteor!</h2>
  <ul>
    <li><a href="https://www.meteor.com/try" target="_blank">Do the Tutorial</a></li>
    <li><a href="http://guide.meteor.com" target="_blank">Follow the Guide</a></li>
    <li><a href="https://docs.meteor.com" target="_blank">Read the Docs</a></li>
    <li><a href="https://forums.meteor.com" target="_blank">Discussions</a></li>
  </ul>
</template>
```
- main.css
- main.html: 不能有<html></html>标签
{{ > hello }}
{{ > info }}
这两个分别是hello模板和info模板的插入点，hello模板中的内容会替换{{> hello}},info模板中的内容会替换{{ > info}}
这两个模板就在body标签下面，打开网页后，就会发现网页的内容；
> server

- node_modules
所需要的依赖
### 4,template
- 三个顶级的标签 `<head></head>`,`<body></body>`,`<template></template>`
- 其中template解析为`meteor templates`,涉及html中`{{ > templateName }}`,涉及js中的`Template.templateName`，
- 在js中获取body,`Template.body`,可以视为父组件，包含其他子组件
- Spacebars是一种借鉴Handlebars的思想和语法,[Spacebar语法](http://meteorcapture.com/spacebars/)
```
<ul>
  {{#each tasks}}
    {{> task}}
  {{/each}}
</ul>
```
