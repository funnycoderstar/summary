### 1,简介
- [github](https://github.com/RocketChat/Rocket.Chat)
- Rocket.chat是特性最丰富的Slack开源替代品之一
- 主要功能：群组聊天，直接通信，私聊群，桌面通知，媒体嵌入，文件上传，语音/视频聊天，截图等等
- Rocket.chat原生支持windows,Mac OSX, Linux, ios和Android平台

### 2，准备工作
由于Rocket.chat使用的是Meteor框架，而Meteor框架是对Node.js的封装，源码中又使用到了CoffeeScript.js,使用数据库是MongDB，所以在Rocker.chat上做二次开发，需要学习的技术有Meteor, Node.js, CoffeeScript.js,MongDB；
#### 其他资料
- [CoffeeScipt中文网](http://coffee-script.org/)
- [Meteor中文网](http://zh.discovermeteor.com)

Rocket.chat要运行，必须安装Node.js,NPM,Meteor(包含了Mongdb)
node和npm的安装大家肯定特别熟悉，下面说一下meteor的安装过程
#### 3,安装meteor
```
curl https://install.meteor.com/ | sh
```
创建一个小工程的指令，
```bash
meteor create meteorApp
cd meteorApp
meteor

```
在浏览器中输入：http://localhost:3000/
#### 4,下载和运行Rocket.chat
下载Rocet.chat最好使用git 的命令
```
git clone git clone https://github.com/RocketChat/Rocket.Chat.git
```
等工程源码下载完毕后，进入对应的文件夹，然后运行
```
cd Rocket.Chat
npm start
```
> 在执行npm start的过程中，需要注意一下问题，否则可能会启动不了
- 1,运行会特别慢,建议加上修改源为淘宝源，具体方法如下[参考](http://blog.csdn.net/bugall/article/details/45765979)：

```
npm config set registry https://registry.npm.taobao.org
```
- 2,运行过程需要`翻墙`，因为国外的npm包在国内下载可能就被墙了

> 我在安装的过程中出现报错：
 ![](http://oo4xdz5i0.bkt.clouddn.com/phantomjs-error.png)
 找了phantomjs[镜像](https://npm.taobao.org/mirrors/phantomjs)单独安装了一下速度很快，就成功了,😊

> 运行成功命令行如下
![](http://oo4xdz5i0.bkt.clouddn.com/rocketChatSucess.png)

> 运行成功浏览器中如下
 ![](http://oo4xdz5i0.bkt.clouddn.com/rocketChat.png)

[参考](http://blog.csdn.net/u011619283/article/details/52971473)


如果运行中出现其他的问题欢迎与我交流
[aboutme](http://wangyaxing.deercv.com/)
[github](https://github.com/funnycoderstar)
[blog](http://wangyaxing.top/2017/09/01/wxapp/#more)