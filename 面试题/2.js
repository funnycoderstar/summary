/**
 * // Definition for a Node.
 * function Node(val,next,random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */
/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
    if(head === null) {
        return;
    }
    // 在旧链表中，复制每一个节点，并将复制的节点插入到该节点后面
    let currentNode = head;
    while(currentNode !== null) {
        let node = new Node(currentNode.val);
        node.next = currentNode.next;
        currentNode.next = node;
        currentNode = node.next;
    }
    // 遍历链表， 初始化复制节点的random指向。
    currentNode = head;
    while(currentNode != null && currentNode.next != null) {
        if(currentNode.random) {
            currentNode.next.random = currentNode.random.next;
        }
        currentNode = currentNode.next.next;
    }
    // 将链表拆分成原链表和复制所得链表
    let pCloneHead = head.next;
    let temp = null;
    currentNode = head;
    while(currentNode.next != null) {
        temp = currentNode.next;
        currentNode.next = temp.next;
        currentNode = temp;
    }
    return pCloneHead;
};

