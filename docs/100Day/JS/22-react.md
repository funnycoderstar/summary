## JSX -> JS的转换

可以直接在 babel里面进行查看: 

```js
<div id="box">
   <span>child1</span>
   <span>child2</span>
</div>
```

```js
"use strict";

/*#__PURE__*/
React.createElement("div", {
  id: "box"
}, /*#__PURE__*/React.createElement("span", null, "child1"), /*#__PURE__*/React.createElement("span", null, "child2"));
```

## react-element
createElement

## react-component
component
pureComponent


## React性能优化
浏览器中的重绘和重排是影响网页性能最大的因素，virtual Dom就是尽可能地减少浏览器的重绘和重排
防止不必要的渲染：
pureComponent

纯函数
- 相同的输入必定有相同点的输出
- 过程没有副作用
- 没有状态依赖

pureRender本质：重新实现了 shouldComponentUpdate生命周期方法，把当前传入的 props和state与之前的做浅比较，如果返回false,那么组件不会执行 render方法。

shallowEqual
```js
function shallowEqual(obj, newObj) {
    if(obj === newObj) {
        return true;
    }
    const objKeys = Object.keys(obj);
    const newObjKeys = Object.keys(newObj);

    if(objKeys.length !== newObjKeys) {
        return false;
    }

    return objKeys.every((key) => {
        newObj[key] === obj[key];
    })
}
```
Immutable: 实现高效对比前后两个复杂对象，同时提升原来使用解构返回一个新的对象的效率


key

render -> diff -> 更新DOM


## React中函数式编程的思想
