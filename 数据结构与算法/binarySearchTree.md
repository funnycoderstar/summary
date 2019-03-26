> javascript实现一个二叉搜索树, 包含插入一个节点, 中序遍历, 前序遍历, 后序遍历

```js
// 二叉搜索树, 左节点小于右节点
function BinarySearchTree() {
    var Node = function(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    };
    var root = null;
    this.insert = function(key) {
        var newNode = new Node(key);
        if(root == null) {
            root = newNode;
        } else {
            insertNode(root, newNode)
        }
    }
    // 中序遍历
    this.inOrderTraverse = function(callback) {
        inOrderTraverseNode(root, callback);
    }
    // 先序遍历
    this.preOrderTraverse = function(callback) {
        preOrderTraverseNode(root, callback);
    }
    // 后序遍历
    this.postOrderTraverse = function(callback) {
        postOrderTraverseNode(root, callback);
    }
    
}
var insertNode = function(node, newNode) {
    // 首先判断在放在左侧节点还是放在右侧节点
    if(newNode.key < node.key) {
        if(node.left == null) {
            node.left = newNode;
        } else {
            insertNode(node.left, newNode);
        }
    } else {
        if(node.right == null) {
            node.right = newNode;
        } else {
            insertNode(node.right, newNode);
        }

    }
}

// 中序遍历首先访问左侧子节点, 接着对这个节点进行一些操作(callback), 再访问右侧子节点
var inOrderTraverseNode = function(node, callback) {
    if(node !== null) {
        inOrderTraverseNode(node.left, callback);
        callback(node.key);
        inOrderTraverseNode(node.right, callback);
    }
}

// 先序遍历会优先访问父节点本身, 再访问左侧子节点, 再访问右侧子节点
var preOrderTraverseNode = function(node, callback) {
    if(node != null) {
        callback(node.key);
        preOrderTraverseNode(node.left, callback);
        preOrderTraverseNode(node.right, callback);
    }
}
// 后序遍历会优先访问左侧子节点, 再访问右侧子节点, 最后是父节点本身
var postOrderTraverseNode = function(node, callback) {
    if(node != null) {
        postOrderTraverseNode(node.left, callback);
        postOrderTraverseNode(node.right, callback);
        callback(node.key);
    }
}

var tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);

function printNode(value){
    console.log(value);
}
```
## 中序遍历
```js
tree.inOrderTraverse(printNode);
```
![中序遍历](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1553592182410.png?width=1256&height=706&imageView2/3/w/536/h/301)

## 前序遍历
```js
tree.preOrderTraverse(printNode);
```
![前序遍历](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1553592244731.png?width=1136&height=746&imageView2/3/w/536/h/352)

## 后序遍历
```js
tree.postOrderTraverse(printNode);
```
![后序遍历](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1553592253305.png?width=1144&height=644&imageView2/3/w/537/h/302)