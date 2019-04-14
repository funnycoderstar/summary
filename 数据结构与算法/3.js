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