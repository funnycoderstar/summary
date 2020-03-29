

## 链表
链表存储有序的元素集合，但不同于数组，链表中每个元素在内存中并不是连续放置的。每个元素由一个存储元素本身的节点和一个指向下一个元素的节点（也称为指针或链接）组成，下图展示了一个链表的结构。

![链表](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1583417540981.png)

由于不必须按顺序存储，链表在插入的时候可以达到 O(1) 的复杂度，但是查找一个节点或者访问特定编号的节点则需要 O(n)的时间.


## 题目列表
- [leetcode206.反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)
- [leetcode324.回文链表](https://leetcode-cn.com/problems/palindrome-linked-list/)
- [leetcode876. 链表的中间结点](https://leetcode-cn.com/problems/middle-of-the-linked-list/)
- [面试题 02.02. 返回倒数第 k 个节点](https://leetcode-cn.com/problems/kth-node-from-end-of-list-lcci/)
- [面试题52. 两个链表的第一个公共节点](https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/)

## 1. 反转链表
使用迭代：
在遍历列表时，将当前节点的 next 指针改为指向前一个元素。由于节点没有引用其上一个节点，因此必须事先存储其前一个元素。在更改引用之前，还需要另一个指针来存储下一个节点。不要忘记在最后返回新的头引用。

![img](https://pic.leetcode-cn.com/9ce26a709147ad9ce6152d604efc1cc19a33dc5d467ed2aae5bc68463fdd2888.gif)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let prevNode = null; // 前指针节点
    //每次循环，都将当前节点指向它前面的节点，然后当前节点和前节点后移
    while(head != null) {
        let tempNode = head.next; //临时节点，暂存当前节点的下一节点，用于后移
        head.next = prevNode; //将当前节点指向它前面的节点
        prevNode = head; //前指针后移
        head = tempNode;  //当前指针后移
    }
    return prevNode;
 };
```

## 2. 回文链表

用快慢指针遍历的同时翻转前半部分，然后与后半部分比较即可。
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    if(head === null || head.next === null) {
        return true;
    }
    let mid = head;
    let pre = null;
    let reversed = null;
    // 快慢指针找出中间节点
    while(head !== null && head.next !== null) {
        pre = mid;
        mid = mid.next;
        head = head.next.next;
        // 反转前半段
        pre.next = reversed;
        reversed = pre;
    }
    // 如果是奇数个
    if(head) {
        mid = mid.next;
    }
    // 将反转完之后的前半段和后半段做对比
    while(mid) {
        if(reversed.val !== mid.val) {
            return false;
        }
        reversed = reversed.next;
        mid = mid.next;
    }
    return true;
};
```

## 3.找出链表的中间节点

快慢指针做法：
1. 使用慢指针 slow 和快指针fast 两个指针同时遍历链表。快指针一次前进两个结点，速度是慢指针的两倍
2. 这样，当快指针到达链表尾部时，慢指针正好到达链表的中部。

![img](https://pic.leetcode-cn.com/404d110d9578be8c86697c991fa35a86412224911eb5d49a0ad001af59d5339e.gif)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
    let fast = head;
    let slow = head;
    // 循环的条件是 fast != null && fast.next != null，防止出现空指针异常。
    while(fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    // 链表元素为奇数个时，slow 指向链表的中点
    // 链表元素为偶数个时，slow 指向链表两个中点的右边一个
    return slow;
};

```

## 4. 倒数第K个节点

1. 初始化: 使用双指针，i, j
2. 构建双指针距离: 先将i向后移动k次，此时 i，j的距离为k
3. 双指针共同移动: 同时移动i，j，直到i指向 null，此时j位置的val就是答案
3. 返回值

![img](https://pic.leetcode-cn.com/c11759b47df01442d2bacdc3a693531e1c5e905c741307f4bf61efffb08ce15d-aa.png)
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {number}
 */
var kthToLast = function(head, k) {
    let p = head;
    for(let i = 0; i < k; i++) {
        p = p.next;
    }
    while(p) {
        p = p.next;
        head = head.next;
    }
    return head.val;
};
```

## 5.两个链表的第一个公共节点
我们使用两个指针 node1，node2 分别指向两个链表 headA，headB 的头结点，然后同时分别逐结点遍历，当 node1 到达链表 headA 的末尾时，重新定位到链表 headB 的头结点；当 node2 到达链表 headB 的末尾时，重新定位到链表 headA 的头结点。

这样，当它们相遇时，所指向的结点就是第一个公共结点。


![getIntersectionNode](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1585498246061.gif)
```js
/** 
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    let node1 = headA; 
    let node2 = headB;
    while(node1 !== node2) {
        node1 = node1 ? node1.next : headB;
        node2 = node2 ? node2.next : headA;
    }
    return node1;
};
```

## 参考
题解参考 leetcode官方题解。具体的可以去leetcode官网查看。