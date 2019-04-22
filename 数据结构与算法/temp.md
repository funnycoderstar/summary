## 剑指offer系列
### 21.[栈的压入、弹出序列](https://www.nowcoder.com/practice/d77d11405cc7470d82554cb392585106?tpId=13&tqId=11174&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
思路：
- 1.借助一个辅助栈（数组temp），将原数列依次压入(push)辅助栈，栈顶元素与所给的出栈队列相比，如果相同则出栈
- 2.如果不同，则继续压栈，直到原数列中所有的数字压栈完毕
- 3.检测辅助栈中是否为空，若空，则该序列是压栈序列对应的一个弹出序列。否则说明序列不是该栈的弹出序列

```js
function IsPopOrder(pushV, popV) {
    if (pushV.length === 0 || popV.length === 0) {
        return;
    }
    let temp = [];
    let j = 0;
    for (let i = 0; i < pushV.length; i++) {
        temp.push(pushV[i]);
        while(temp.length && temp[temp.length - 1] === popV[j]){
            temp.pop();
            j++;
        }
    }
    return temp.length === 0;
}
```

### 22.[从上往下打印二叉树](https://www.nowcoder.com/practice/7fe2212963db4790b57431d9ed259701?tpId=13&tqId=11175&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
```js
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function PrintFromTopToBottom(root){
    let result = [];
    function levelOrderNode(root, deep) {
        if(root != null) {
            if(result[deep]) {
                result[deep].push(root.val);
            } else {
                result[deep] = [root.val];
            }
            const nextDeep = deep+1;
            levelOrderNode(root.left, nextDeep);
            levelOrderNode(root.right, nextDeep);

        }
    }
    levelOrderNode(root, 0);
    return result;
}
```
### 23.[二叉搜索树的后序遍历序列](https://www.nowcoder.com/practice/a861533d45854474ac791d90e447bafd?tpId=13&tqId=11176&rp=1&ru=%2Fta%2Fcoding-interviews&qru=%2Fta%2Fcoding-interviews%2Fquestion-ranking)
思路：
BST的后序合法序列是，对于一个序列S，最后一个元素是X(也就是根)，如果去掉最后一个元素的序列为T,那么T满足：T可以分为两段，前一段(左子树)小于X，后一段（右子树）大于X，且这两段（子树）都是合法的后序序列。左子树和右子树分别进行递归
找住二叉查找树的特点：左子树<根<=右子树  使用分治思想

- 1、确定root(sequence[end])
- 2、遍历序列（除去root(sequence[end])结点），找到第一个大于root(sequence[end])的位置，则该位置左边为左子树，右边为右子树；
- 3、遍历右子树，若发现有小于roo(sequence[end])的值，则直接返回false；
- 4、分别判断左子树和右子树是否仍是二叉搜索树（即递归步骤1、2、3）。

```js
function VerifySquenceOfBST(sequence){
    if(!sequence.length) {
        return false;
    }
    return judge(sequence, 0, sequence.length - 1);
    function judge(sequence, start, end) {
        if(start >= end) {
            return true;
        }
        let i = start;
        // 找到第一个大于根结点的位置，则左边为左子树，右边为右子树
        while( sequence[i] < sequence[end]) { 
            i++;
        }
        // 循环时去除root，end传入的参数为 sequence.length - 1
        for(let j = i; j < end; j++) {
            // 有一个小于root，则返回false
            if(sequence[j] < sequence[end]) {
                return false;
            }
        }
        return judge(sequence, start, i - 1) && judge(sequence, i, end - 1)
    }
}
```
### 24[二叉树中和为某一值的路径](https://www.nowcoder.com/practice/b736e784e3e34731af99065031301bca?tpId=13&tqId=11177&tPage=2&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)

思路
1.递归先序遍历树，把结点加入路径
2.若该节点是叶子节点则比较当前路径和是否等于期待和
3.弹出节点，每一轮递归返回到父节点， 当前路径也应该回退一个节点
```js
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function FindPath(root, expectNumber) {
    let result = [];
    let path = [];
    if (root) {
        dfs(root, expectNumber);
    }
    return result;

    function dfs(root, expectNumber) {
        path.push(root.val);
        // 若该节点是叶子节点则比较当前路径和是否等于期待和
        if (root.left === null && root.right === null && expectNumber === root.val) {
            result.push(path.slice(0)); //注意这里不能直接 result.push(path), 因为path会修改， 所以这里要使用深拷贝
            
        }
        if (root.left) {
            dfs(root.left, expectNumber - root.val);
        }
        if (root.right) {
            dfs(root.right, expectNumber - root.val);
        }
        path.pop(); // 弹出节点，因为该节点已经计算完毕， 每一轮递归返回到父节点， 当前路径也应该回退一个节点
       
    }
}

```
### 25[复杂链表的复制](https://www.nowcoder.com/practice/f836b2c43afc4b35ad6adc41ec941dba?tpId=13&tqId=11178&rp=2&ru=%2Fta%2Fcoding-interviews&qru=%2Fta%2Fcoding-interviews%2Fquestion-ranking&tPage=2)

思路1
1.递归思想,把大问题转换成小问题
2.将复杂链表分为头节点和剩余节点两部分,剩余部分采用递归方法

```js

/*function RandomListNode(x){
    this.label = x;
    this.next = null;
    this.random = null;
}*/
function Clone(pHead){
    if(!pHead) {
        return;
    }
    // 复制头节点
    let node = new RandomListNode(pHead.label);
    node.random = pHead.random;
    // 递归其他节点
    node.next = Clone(pHead.next);
    return node;
}

```
## 思路2: 在原链表中复制然后分离
1.在旧链表中，复制每一个节点，并将复制的节点插入到该节点后面
![1](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1555685221626.png?width=462&height=107&imageView2/3/w/537/h/123)
2.遍历链表， 初始化复制节点的random指向。
![2](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1555685231548.png?width=456&height=107&imageView2/3/w/537/h/126)
3.将链表拆分成原链表和复制所得链表
![3](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1555685241672.png?width=463&height=109&imageView2/3/w/537/h/126)
## 代码
```js
/*function RandomListNode(x){
    this.label = x;
    this.next = null;
    this.random = null;
}*/
function Clone(pHead){
    if(pHead === null) {
        return;
    }
    // 对应思路二中的第一步：
    let currentNode = pHead;
    while(currentNode !== null) {
        let node = new RandomListNode(currentNode.label);
        node.next = currentNode.next;
        currentNode.next = node;
        currentNode = node.next;
    }
    // 对应思路二中的第二步：
    currentNode = pHead;
    while(currentNode != null && currentNode.next != null) {
        if(currentNode.random) {
            currentNode.next.random = currentNode.random.next;
        }
        currentNode = currentNode.next.next;
    }
    //拆分，对应思路二中的第三步：      
    let pCloneHead = pHead.next;
    let temp = null;
    currentNode = pHead;
    while(currentNode.next != null) {
        temp = currentNode.next;
        currentNode.next = temp.next;
        currentNode = temp;
    }
    return pCloneHead;
}
```

## leetcode
