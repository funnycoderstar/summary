## 认识bash

linux默认的shell是bash,有一下几个优点

- 命令记忆功能(history)
- 命令与文件补全功能([Tab]按键的好处)：
[Tab]接在一串命令的第一字后面，则为命令补全
[Tab]接在一串命令法人第二个字以后，则为文件补全
- 命令别名设置功能(alias)
alias lm='ls -al'
- 作业控制，前台，后台控制
- 程序脚本(shell script)

### shell的变量功能

brew为命令行安装软件的工具
curl 命令行发起ajax请求

你能不能执行某个命令跟PATH这个变量有很大的关系，例如执行 ls 这个命令时，系统是通过PATH这个变量里面的内容所记录的路径顺序来找到命令；如果在找完PATH变量内的路径还找不到ls这个命令时。会显示‘commond not found’的错误信息

为了区分与自定义变量的不同，环境变量通常用大写字母表示

变量的显示与设置： echo unset
变量被显示时，前面必须加上“$”字符

echo $PATH


子进程
在目前这个shell的情况下,去打开另一个新的shell，新的shell就是子进程。在一般状态下,父进程的自定义变量是无法再子进程内使用的,但是通过export将变量变为环境变量后，就能够在子进程下面应用了
设置全局环境变量

echo $myname
myname=wang
unset myname

设置当前命令行的全局变量，默认为bash 配置文件为.bashrc， zsh为.zshrc
