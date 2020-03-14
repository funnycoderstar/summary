

JavaScript实现LeetCode第53题：最大子序和

## 题目描述
给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
示例:
```js

输入: [-2,1,-3,4,-1,2,1,-5,4],
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
```

## 解题思路
这是一道动态规划类的题目;
声明两个变量, `currentSum`: 之前连续几个值相加的和, `maxSum`: 当前最大的子序列和
- 1.比较`nums[i]`,跟`currentSum`加上`nums[i]`后的值, 将较大的赋值给`currentSum`;此时计算的是用上`nums[i]`的最大的子序列和，但不一定是整个过程中的最大子序和，需要第二步骤的判断；
举例说明 ：
[1, 2, -1], 计算到第三个值是， `currentSum`为1+2-1=2， 但是在计算到第二个数的时候，它才是最大子序和，1 + 2 = 3， 所以需要声明一个变量`maxSum`， 来计算是否是当前最大的子序列和
- 2.比较`currentSum`, `maxSum`, 将较大的值赋值给`maxSum`

## 代码实现
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    for(let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum+=nums[i]); // 比较当前的和跟加上nums[i]后的值, 将较大的赋值给currentSum
        maxSum = Math.max(currentSum, maxSum); // 比较currentSum, maxSum, 将较大的值赋值给maxSum
    }
    return maxSum;
};

```
