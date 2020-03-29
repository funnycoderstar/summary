
JavaScript实现leetcode 945. 使数组唯一的最小增量

## 题目描述
给定整数数组 A，每次 move 操作将会选择任意 A[i]，并将其递增 1。

返回使 A 中的每个值都是唯一的最少操作次数。

示例 1:
```js
输入：[1,2,2]
输出：1
解释：经过一次 move 操作，数组将变为 [1, 2, 3]。
```
示例 2:
```js
输入：[3,2,1,2,1,7]
输出：6
解释：经过 6 次 move 操作，数组将变为 [3, 4, 1, 2, 5, 7]。
可以看出 5 次或 5 次以下的 move 操作是不能让数组的每个值唯一的。
```
提示：
- 0 <= A.length <= 40000
- 0 <= A[i] < 40000

## 思路分析
第一种：暴力解决
用数组统计每个数出现的次数，每次递增1，直到增加到一个没有重复出现过得数字位置。这种时间复杂度大，可以为 O(n^2)

第二种：排序
1. 先排序
2. 遍历数组
   - 用一个队列来保存当前重复需要递增的一些值
   - 找到前一个值和当前值差值大于1的，说明可以将之前重复的值递增到 [A[i - 1] + 1]这个区间范围内的数
3. 遍历完成后，队列不为空，则可以将剩下的值依次递增为 [A[n−1]+1,∞)中的数字， A[n−1]代表数组的最后一个值。


## 解题方法

直接用排序实现。
```js
/**
 * @param {number[]} A
 * @return {number}
 */
var minIncrementForUnique = function(A) {
    A.sort((a, b) => a - b);
    const queue = [];
    let result = 0;
    let prev = A[0] - 1;
    for(let i = 0; i < A.length; i++) {
        if(A[i] === prev) {
            queue.push(A[i]);
        } else if(A[i] === prev + 1) {
            prev++;
        } else {
            // 队列不为空，则需要先处理队列中的值
            if(queue.length) {
                const n = queue.shift();
                // 直接更新到要更新的值
                result += prev + 1 - n;
                // 每次加1
                prev++;
                // 队列不为空，因此还是保留在当前值，而不往后遍历
                i--;
            } else {
                prev = A[i];
            }
        }
    }
    // 队列不为空，则可以将剩下的值依次递增为 [prev+1,∞)中的数字，prev代表数组的最后一个值。
    while(queue.length) {
        const n = queue.shift();
        result += prev + 1 - n;
        prev++;
    }
    return result;
};
```