- JavaScript实现LeetCode第112题：路径总和
- JavaScript实现LeetCode第113题：路径总和II
- JavaScript实现LeetCode第437题：路径总和III

## 路径总和

### 题目描述
给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。

说明: 叶子节点是指没有子节点的节点。

示例: 
给定如下二叉树，以及目标和 sum = 22，
```js

              5
             / \
            4   8
           /   / \
          11  13  4
         /  \      \
        7    2      1
```
返回 true, 因为存在目标和为 22 的根节点到叶子节点的路径 5->4->11->2。

### 解题思路

二叉树的一些题，首先肯定会想到使用递归
1. 首先判空，然后解决叶子结点，当遍历到叶子结点的时候就看剩下的数和自己的值是否相等
2. 其他情况就挨个遍历左子树和右子树各个结点，注意下次遍历的 sum 要减去自己的值

```js
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum = function(root, sum) {
    if(root === null) {
        return false;
    }
    // 如果是叶子结点，则看该结点值是否等于剩下的 sum
    if(root.left === null && root.right === null) {
        return root.val === sum;
    }
    // 每次遍历一个结点都要减去自己的值后重新递归
    return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val);
};
```
- 时间复杂度：O(n)，每个节点都要被访问一次
- 空间复杂度：最坏情况下，整棵树是非平衡的，例如每个节点都只有一个孩子，递归会调用 N 次（树的高度），因此栈的空间开销是 O(N) 。但在最好情况下，树是完全平衡的，高度只有 log(N)，因此在这种情况下空间复杂度只有O(log(N)) 。

## 路径总和II
### 题目描述
给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。

说明: 叶子节点是指没有子节点的节点。

示例:
```js
给定如下二叉树，以及目标和 sum = 22，

              5
             / \
            4   8
           /   / \
          11  13  4
         /  \    / \
        7    2  5   1
返回:

[
   [5,4,11,2],
   [5,8,4,5]
]

```
### 解题思路
使用 递归 + 回溯 的思想 DFS 遍历整个二叉树求出每条目标路径

1. 首先创建 一个空数组 result 用来存储满足条件的目标路径，然后定义递归方法 getPath 寻找每条路径上满足条件的路径
2. 用栈来存储当前遍历的节点路径
    - 从根结点开始深度优先遍历，每经过一个节点，将节点入栈，当有遍历到叶子节点的时候，到达叶子节点，且当前路径之和等于给定目标值，则找到一个可行的解决方案，将其加入结果数组
    - 到达叶子节点，且当前路径之和不等于给定目标值，将节点出栈
3. 所有遍历结束返回 result 即可。

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
    // 设定一个结果数组result来存储所有符合条件的路径
    const result = [];
    if(root) {
        getPath(root, sum, [], 0, result)
    }
    function getPath(root, sum, stack, curSum, result) {
        // 设定一个栈stack来存储当前路径中的节点
        // 从根结点开始深度优先遍历，每经过一个节点，将节点入栈
        stack.push(root.val);
        // 设定一个和curSum来标识当前路径之和
        curSum += root.val;
        // 到达叶子节点，且当前路径之和等于给定目标值，则找到一个可行的解决方案，将其加入结果数组
        if(!root.left && !root.right && sum === curSum) {
            result.push(stack.slice(0));
        }
        if(root.left) {
            getPath(root.left, sum, stack, curSum, result) 
        }
        if(root.right) {
            getPath(root.right, sum, stack, curSum, result) 
        }
        stack.pop()
    }
    return result;
};
```
## 路径总和III
### 题目描述
给定一个二叉树，它的每个结点都存放着一个整数值。

找出路径和等于给定数值的路径总数。

路径不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。

二叉树不超过1000个节点，且节点数值范围是 [-1000000,1000000] 的整数。

示例：
```js
root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8

      10
     /  \
    5   -3
   / \    \
  3   2   11
 / \   \
3  -2   1

返回 3。和等于 8 的路径有:

1.  5 -> 3
2.  5 -> 2 -> 1
3.  -3 -> 11
```

### 解题思路
深度优先遍历 + 递归

以每个节点为根节点，都算一遍路径和为sum的有几条，然后加起来。

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number}
 */
var pathSum = function(root, sum) {
    if(root === null) {
        return 0;
    }
    // 以root为根的树中等于sum的路径树 = 左子树中的路径数 + 右子树中的路径数 + 以root为起点的路径数
    return pathSum(root.left, sum) + pathSum(root.right, sum) + dfs(root, sum);
    function dfs(root, sum) {
        if(root === null) {
            return 0;
        }
        sum-=root.val;
        return (sum === 0 ? 1 : 0) + dfs(root.left, sum) + dfs(root.right, sum);
    }
};
```