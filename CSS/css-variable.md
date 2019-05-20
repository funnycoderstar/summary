> 使用css自定义属性实现一键换肤功能

## css自定义属性简介

css 的自定义属性功能(var), 在css中使用变量,和less及scss不同的是,在js中可以直接修改变量值;

## 用法: [MDN]()

它们使用自定义属性符号（例如`--main-color: black;`）进行设置，并使用var()函数。
例如: `color: var(--main-color)`;

```js
:root {
  --main-color: brown;
}

.one {
  color: white;
  background-color: var(--main-color);
  margin: 10px;
  width: 50px;
  height: 50px;
  display: inline-block;
}
```
可以在javascript中设置
```js
// get variable from inline style
element.style.getPropertyValue("--my-var");

// get variable from wherever
getComputedStyle(element).getPropertyValue("--my-var");

// set variable on inline style
element.style.setProperty("--my-var", 'red');
```
浏览器支持
css自定义属性目前支持的浏览器有
![](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1537873558720.png?width=2594&height=956&imageView2/3/)

## 使用[css-vars-polyfill](https://github.com/jhildenbiddle/css-vars-ponyfill) 
![](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1537873565560.png?width=874&height=300&imageView2/3/)

### 原理简析
刚开始第一眼想到的肯定是遍历所有的文件将CSS变量的值转为静态的值，但是有几个问题需要考虑一下
1.将所有的都遍历一遍然后进行替换，如果能快速的做到？
2.新增DOM节点的时候，怎么判断？ (MutationObserver)

先判断当前是否原生支持 css自定义属性;
```js
const isBrowser       = typeof window !== 'undefined';
const isNativeSupport = isBrowser && window.CSS && window.CSS.supports && window.CSS.supports('(--a: 0)');
```
从指定的`<style>`和`<link>`元素获取，解析和转换CSS自定义属性为静态值，然后将带有静态值的新`<style>`元素附加到DOM，以便为旧版浏览器提供CSS自定义属性兼容性。
还为现代和旧版浏览器中的运行时值的实时更新提供了单一界面。



## polyfill

> 补充polyfill 的简单解释
polyfill用于表示根据新特性的定义,创建一段与之行为等价但能够在旧的javascript环境中运行的代码

引用 wiki 里的一句话解释

> In web development, a polyfill is code that implements a feature on web browsers that do not support the feature. Most often, it refers to a JavaScript library that implements an HTML5web standard, either an established standard (supported by some browsers) on older browsers, or a proposed standard (not supported by any browsers) on existing browsers. Formally, "a polyfill is a shim for a browser API".

可以这样简单的理解一下: 
css自定义变量在IE浏览器中无法使用,但是使用了[css-vars-polyfill](https://github.com/jhildenbiddle/css-vars-ponyfill) ,就可以让我们在IE9+中也可以使用该属性;
还记得 [babel-polyfill](https://babeljs.io/docs/en/babel-polyfill/) 么,  babel允许我们使用es6的语法,它主要是把es6的语法转成大多数浏览器可是支持的es5语法, 可以使用 工具 来看一下平常所写的es6语法对应到es5是什么样的, 例如
![](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1537873573302.png?width=1748&height=268&imageView2/3/)
但是像  Array.from , Object.assign, Array.prototype.includes, promise, async ,await 这些都是es5语法中没有的,我们还是想使用,但是很多浏览器不支持怎么办, babel-polyfill就是帮我们解决这个问题的




