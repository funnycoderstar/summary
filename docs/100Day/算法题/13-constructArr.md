
[面试题66. 构建乘积数组](https://leetcode-cn.com/problems/gou-jian-cheng-ji-shu-zu-lcof/)

## 题目描述
给定一个数组 A[0,1,…,n-1]，请构建一个数组 B[0,1,…,n-1]，其中 B 中的元素 B[i]=A[0]×A[1]×…×A[i-1]×A[i+1]×…×A[n-1]。不能使用除法。

示例:
```js

输入: [1,2,3,4,5]
输出: [120,60,40,30,24]
 
```
提示：

所有元素乘积之和不会溢出 32 位整数
a.length <= 100000

## 思路分析
`B[i]`的意义是`A`数组不包括`i`位置的所有乘积，分为`i`左边的元素乘积和`i`右边的所有的元素乘积。

对称遍历
- 从左往右遍历累乘，结果保存在数组 B 中，此时 B[i] 表示，A[i] 左边所有元素的乘积
- 然后从右往左遍历累乘，获取A[i] 右边所有元素的乘积 right，用 B[i]乘以right
- 两边遍历之后得到的 B，就是最终结果

## 解题方法
```js
/**
 * @param {number[]} a
 * @return {number[]}
 */
var constructArr = function(a) {
    const len = a.length;
    let B = [];
    if(len > 0) {
        // 第一个 for 计算左边的乘积
        // 初始化 B[0] = 1, 是因为0左边没有元素， 所以乘积为1
        B[0] = 1;
        for(let i = 1; i < len; i++) {
            B[i] = B[i - 1] * a[i - 1];
        }
        // 第二个for计算右边的
        let right = 1;
        for(let i = len - 2; i>= 0; i--) {
            right *= a[i + 1];
            B[i] *= right;
        }
    }
    return B;
};
```

复杂度为O(n),没有嵌套的for, 而是顺序的for；
