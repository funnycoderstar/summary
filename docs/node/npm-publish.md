
# 在npm上发布自己的包
## 发布包
1.创建你要发布的包
```
mkdir test-wyx
cd test-wyx
npm init
touch readme.md
touch index.js
mkdir lib
cd lib
touch test.js


```
/lib/test.js
```js
const a = {
    fu : function() {
        console.log( '这是我的第一个npm包' );
    };
}
module.exports = a; // 把a暴漏出去
```
index.js
```js
const a = require( './lib/test.js' );
module.exports = a; //把a暴漏出去
```

现在的目录结构
```js
-test-wyx
    -lib
        -test.js
    -index.js
    -package.json
    -readme.md
```
2.创建npm账号,两种方式
第一种: 打开[npm](https://www.npmjs.com/)注册
第二种: 命令行注册
```js
npm adduser
```
依次输入用户名，密码，邮箱就注册成功了。注册成功会自动登录，所以现在已经在本地登录成功。
如果你已经有npm账号可通过如下命名登录
```
npm login
```
输入用户名账号和密码即可登录

3.发布包

```
npm publish
```
4.这时你就可以在[npm](https://www.npmjs.com/)官网 ,通过在搜索框中输入test-wyx来查询到你刚才发布的包了。
5.更新包，你修改过包里的js文件时，同时还得修改package.json里version的版本号后才可重新发布。

## 应用包
1.新建一个文件夹
```
mkdir test
cd test
```
2.安装这个包
```
npm install test-wyx
```
3.然后，在test文件夹下新建in.js文件，输入如下代码
```
const test = require( 'test-wyx' );
test.fu();
```
4.在test文件夹,右键选择git bash here,输入如下命令
```
node in.js
```
就可以输出这是我的第一个npm包

## 参考
- [【npm】利用npm安装/删除/发布/更新/撤销发布包](https://www.cnblogs.com/penghuwan/p/6973702.html#_label3_0)
- [在npm发布自己的包](https://segmentfault.com/a/1190000010224751)