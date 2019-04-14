## 重建二叉树
输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

## 解题思路
二叉树是每个节点最多有两个子树的结构
 - 先序遍历：首先访问根，再先序遍历左子树，最后访问
 - 中序遍历：首先访问左子树，再访问根，最后访问右子树
 - 后序遍历：首先访问左子树，再访问右子树，最后访问根节点

先序遍历的第一个元素是根节点treeNode，中序遍历的根节点位置在中间 midIndex, 在midIndex左边的肯定是treeNode的左子树的中序遍历，midIndex的右边肯定treeNode的右子树的中序遍历；
先序遍历的第二个位置到secondIndex, 也是 treeNode左子树的先序遍历，剩下 secondIndex的右边也就是treeNode的右子树的先序遍历，把四个子数组找出来， 分别左右递归调用

## 代码实现
```js
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function reConstructBinaryTree(pre, vin){
    if(!pre || pre.length == 0) {
        return;
    }
    let treeNode = new TreeNode(pre[0]);
    for(let i = 0; i < pre.length; i++) {
        if(vin[i] == pre[0]) {
            treeNode.left = reConstructBinaryTree(pre.slice(1, i + 1), vin.slice(0, i));
            treeNode.right = reConstructBinaryTree(pre.slice(i + 1), vin.slice(i + 1))
        }
    }
    return treeNode;
}
```