## 笔试题：HTML标签的相关操作判断

1. 统计HTML标签中以b开头的标签数量 
2. 统计HTML标签中出现次数最多的标签 
3. 判断DOM标签的合法性 
    - 标签的闭合 
    - span里面不能有div
    - 其他符合HTML标签合法性的规则
    
## 一些基础知识
###  getElementsByTagName()
在DOM中根据标签去获取元素的原生api是 `getElementsByTagName()`，它返回的是一个包含所有给定标签名称的元素 HTML集合[HTMLCollection](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCollection "HTMLCollection"), 整个文件结构都会被搜索，包括根节点。

我们可以通过 `document.getElementsByTagName('*')`来获取当前文档中的所有标签。

![HTMLCollection](http://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1589469841817.png)

还有一点需要注意：

HTMLCollection 对象是一种类数组对象，可以通过位置来访问。

请注意，虽然可以通过方括号语法来访问 HTMLCollection 的值，而且这个对象也有length属性，但是它并不是Array的实例。所以在需要使用 数组的方法的时候，比如 forEach， filter 等需要将类数组转为真正的数组。下面几种方法都可以实现：

- 扩展运算符可以将其转为真正的数组，这个里面也是有一点需要注意，是因为  HTMLCollection 对象实现了 Iterator。对于那些没有部署 Iterator 接口的类似数组的对象，扩展运算符就无法将其转为真正的数组。
```js
// 1
let tags = document.getElementsByTagName('div');
let array = [...tags];

// 2
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};

// TypeError: Cannot spread non-iterable object.
let arr = [...arrayLike];
```
- `Array.from`：用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）
- `Array.prototype.slice.call()`，比如在函数中我们经常使用它，将函数的参数 arguments（也是类数组）转为真正的数组 `var args = Array.prototype.slice.call(arguments);`


### startsWith
下面引用自 [ECMAScript 6 入门 - 字符串的新增方法](https://es6.ruanyifeng.com/#docs/string-methods "ECMAScript 6 入门 - 字符串的新增方法")

JavaScript 只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。
- `includes()`：返回布尔值，表示是否找到了参数字符串。
- `startsWith()`：返回布尔值，表示参数字符串是否在原字符串的头部。
- `endsWith()`：返回布尔值，表示参数字符串是否在原字符串的尾部。
```js
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true

```
这三个方法都支持第二个参数，表示开始搜索的位置。
```js
let s = 'Hello world!';

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
```

###  map
JavaScript的对象中只能使用字符串作为键，ES6 提供了 Map 数据结构，类似于对象，但是它的”键“不限制于字符串。Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应。map比对象更为灵活。

## 1. 统计HTML标签中以b开头的标签数量 

```js
const tags = document.getElementsByTagName('*');
// 要使用数组的方法必须将类数组转为真正的数组
const value = [...tags].filter((item) => item.tagName.startsWith('B'))
```
或者
```js
const $prefixBElements = [];
function dfs($el) {
    if ($el.tagName.startsWith('B')) {
        $prefixBElements.push($el);
    }
    for (const $child of $el.children) {
        dfs($child);
    }
}
dfs(document.documentElement);
console.log($prefixBElements);
```

## 2. 统计HTML标签中出现次数最多的标签 
和 `实现一个统计一个字符串中出现字符最多的字符`及`统计一篇文章中出现最多的字`是差不多类型的题。

```js
const tags = document.getElementsByTagName('*');
let map = new Map();
let maxStr = '';
let max = 0;
// 只是使用下标来获取，没有使用数组的方法，所以不需要将类数组转为数组
for(let i = 0; i < tags.length; i++) {
    let value = map.get(tags[i].tagName)
    if(value) {
        map.set(tags[i].tagName, ++value)
    } else {
        map.set(tags[i].tagName, 1);
    }
    if(value > max) {
        maxStr = tags[i].tagName;
        max = value;
    }
}
console.log(`当前最多的标签为 ${maxStr}，个数为 ${max}` );
```
当然此题中使用对象来存储也是可以的。

## 3. 判断DOM标签的合法性 

判断标签的闭合可以使用栈，跟判断有效的括号差不多。

Vue中的 [compiler/parser/html-parser.js](https://github.com/vuejs/vue/blob/dev/src/compiler/parser/html-parser.js "compiler/parser/html-parser.js") 中其实会有该部分相关的逻辑实现。

这道题暂时还没想到合适的答案，如果你有合适的答案，欢迎提供给我。

