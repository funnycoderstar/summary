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





js
1. 基本数据类型
2. 为什么symbol是一个函数
跟simbol的用途有关，它主要是用来
3. BigInt为什么可以用来存储大整数
4. 去重(元素是对象，数组)

5. 事件循环队列
6. 函数科柯里化
7. bind, call, apply
都是 Function 原型上的方法，
原型链，this，参数三个以上的时候call的性能好些，使用 console.time('A'), console.timeEnd('A')测试代码性能
8. (5).add(3).minus(6)







## 

9. 求数组交集
```js

```
11. 旋转数组
```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    k = k % nums.length;
    const arr = nums.splice(-k);
    nums.splice(0, 0, ...arr);
};

```
直接修改原来的数组而不引入新的变量
k值大于 nums的长度的时候，需要从头开始，所以直接计算 k % nums.length 求出最后需要移动的次数
https://leetcode-cn.com/problems/rotate-array/solution/xuan-zhuan-shu-zu-by-leetcode/




## http3.0


## HTTP2.0，做了哪些优化，有哪些问题



## TCP和UDP
TCP： 是可靠的传输协议
UDP：

## nextTick

## 协商缓存和强缓存

强缓存：
- expries
- cache-control: max-age
协商缓存： 
- last-modified/if-modified
- Etag/if-none-match


## 性能优化
使用户觉得页面加载快！
size小：Gzip压缩，图片压缩，按需加载
加载块：静态资源加缓存： CDN缓存，HTTP缓存
视觉欺骗，骨架屏，加一个loading动画用户会感觉时间变快


## webpack打包速度优化
升级版本
增量构建: lazy-compier-plugin
多线程：happypack
加缓存：cache,

vue-router: 动态加载
splitChunks：
## webpack打包体积优化

## webpack HMR








