## 移动端真机调试

1. [safari调试iPhone app web页面](https://blog.csdn.net/guoyuyanmen/article/details/52485439)

2. [Charles 抓包使用教程](https://www.cnblogs.com/mawenqiangios/p/8270238.html)

3. [手机端出现调试工具-eruda](https://github.com/liriliri/eruda)
```js
var scriptTag = document.createElement("script");
scriptTag.src = 'http://cdn.jsdelivr.net/npm/eruda';
document.body.appendChild(scriptTag);
scriptTag.onload = function() {
    eruda.init();
}
```

## 手机端兼容问题

登陆页面跳转不过去: 复现这个问题的情况是 ios10, safari的无痕模式; localStorage.setItem会报错; 后面系统ios11改了无痕模式的机制, 解决了这个问题

https://github.com/fa-ge/blog/issues/4

