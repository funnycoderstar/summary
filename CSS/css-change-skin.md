## 换肤功能
一键换肤功能最主要的思路就是可以通过js去改变css中的颜色值，基于这个思路，我们可以考虑用一下几个方案实现
- 通过js动态创建style标签，切换颜色的，将表示颜色的部分css替换掉
- less
`less.modifyVars`方法可以用来改变变量值
```js
less.modifyVars({
  '@buttonFace': '#5B83AD',
  '@buttonText': '#D9EEF2'
});
```
- css自定义属性，可以通过js去修改CSS中定义的变量
```js
// get variable from inline style
element.style.getPropertyValue("--my-var");

// get variable from wherever
getComputedStyle(element).getPropertyValue("--my-var");

// set variable on inline style
element.style.setProperty("--my-var", 'red');
```

## 参考
[聊一聊前端换肤](https://juejin.im/post/5ca41617f265da3092006155)