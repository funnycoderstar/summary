1. v-model 原理
 
语法糖
model选项：
```js
model: {
    prop: 'checked',
    event: 'change'
}
```
[自定义组件的 v-model](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)
2. nextTick
监听到数据变化，并不会立即更新，而是先加入到一个队列中，到下一个事件循环在统一更新。
使用 `Promise.then()`, `MutationObserver`, `setImmediate`

[异步更新队列](https://cn.vuejs.org/v2/guide/reactivity.html)
3.  key 的作用
key的作用就是更新组件时判断两个节点是否相同。相同就复用，不相同就删除旧的创建新的。

4. 


css语法：
1. 伪类和伪元素
为什么引入? css引入伪类和伪元素概念是为了格式化文档树以外的信息。伪类和伪元素是用来修饰不在文档树中的部分。

伪类用于当元素处于某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，用户悬停在指定的元素时，我们可以通:hover来描述这个元素的状态。虽然它和普通的css类类似，可以为已有的元素添加样式，但是它只有处于dom树无法描述的状态下才能为元素添加样式，所以将其称为伪类。

伪元素用于创建不在文档树中的元素，并为其添加样式，比如说，我们可以通过：before来在一个元素前添加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中


2. 实现固定宽高比的div，怎么设置
3. CSS选择器


js
1. 基本数据类型
2. 为什么symbol是一个函数
跟simbol的用途有关，它主要是用来
3. BigInt为什么可以用来存储大整数
4. 去重(元素是对象，数组)
5. 事件循环队列

http相关
1. 浏览器缓存, Etag和last-modified分别有什么问题。
2. 


双向绑定原理
vue2.x的definedProperty和 vue3.0的 proxy

异步循环事件循环
Http代码
依赖注入
性能优化手段：

vue组件通信方法，









