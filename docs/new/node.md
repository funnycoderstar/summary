apt-get：Ubuntu下面的管理工具
homebrew: macOS的包管理工具

nvm
一键安装全局模块：nvm reintall-packages
若经常切换版本，最痛苦的莫过于全局模块需要重新安装，比如全局安装了gulp-cli模块之后又重新安装了一个Node.js版本，那么此时的gulp命令是无法使用的，唯一能做的就是重新安装全局模块，针对这种情况，nvm提供了一个很贴心的一件安装全局模块的 nvm reintall-packages 命令
> 版本
LTS: Long-Term Support版本，有官方支持，推荐给绝大多数用户使用，一般用于生产环境，对于Bug和安全问题的修复非常及时
current: 当前正在开发的尝鲜版本
奇数版本都是尝试性的，偶数版本的一般为LTS版本；


npm 
安装模块
无选项：将模块安装到本地node_modules目录下，但不保存在package.json里。
--save-prod（-P）
--save-dev（-D）
--global(-g)

> 为了避免引用模块缺失，保证依赖模块都出现在package.json里，使用npm i --save 是一个好的习惯

commonjs核心
- 使用module.exports 定义模块
- 通过require关键字引用模块

nrm 
在不同的npm源之间来回切换
nrm test : 对这些源进行网络测速