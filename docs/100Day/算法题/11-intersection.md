## 两个数组的交集

JavaScript实现LeetCode第349题：两个数组的交集
## 题目描述
给定两个数组，编写一个函数来计算它们的交集。

示例 1:
```js
输入: nums1 = [1,2,2,1], nums2 = [2,2]
输出: [2]
```
示例 2:
```js
输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出: [9,4]
```
说明:
  - 输出结果中的每个元素一定是唯一的。
  - 我们可以不考虑输出结果的顺序。

## 解题思路
幼稚的方法是根据第一个数组 nums1 迭代并检查每个值是否存在在 nums2 内。如果存在将值添加到输出。这样的方法会导致 O(nxm) 的时间复杂性，其中 n 和 m 是数组的长度。

使用set 来实现线性时间复杂度
## 解法方法

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
    // 使用 set 来存储结果
    const result = new Set();
    const set2 = new Set(nums2);
    for(let i = 0; i < nums1.length; i++) {
        // set查找的时间复杂度为 O(1)
        if(set2.has(nums1[i])) {
            result.add(nums1[i]);
        }
    }
    // 最后需要将set转成数组
    return Array.from(result);
};
```

## 复杂度分析
- 时间复杂度是： O(n)，实际为（ m + n），m为nums1的个数，n为 set2 （PS: 系数可以忽略）
- 空间复杂度： O(n)，我们忽略存储答案所使用的空间，因为它对算法本身并不重要。

## 参考
[LeetCode第349题：两个数组的交集题解](https://leetcode-cn.com/problems/intersection-of-two-arrays/solution/liang-ge-shu-zu-de-jiao-ji-by-leetcode/)

