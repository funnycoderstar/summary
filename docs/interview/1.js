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
 * // 找出链表的中间节点
 */
var middleNode = function(head) {
    let fast = head;
    let slow = head;
    while(fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 * // 从尾到头打印链表
 */
var reversePrint = function(head) {
    let result = [];
    let newHead = head;
    while(newHead) {
        result.unshift(newHead.val);
        newHead = newHead.next;
    }
    return result;
};

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
 * // 反转链表
 * 双指针
 * preNode是指前面的一个节点
 */
var reverseList = function(head) {
    let prevNode = null;
    while(head) {
        let tempNode = head.next;
        head.next = prevNode;
        prevNode = head;
        head = tempNode;
    }
    return prevNode;
    
};

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
 * 回文链表：双指针
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

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 1290. 二进制链表转整数
 * @param {ListNode} head
 * @return {number}
 */
var getDecimalValue = function(head) {
    let result = 0
    while(head) {
        result = result * 2 +  head.val;
        head = head.next;
    }
    return result;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 * 面试题 02.01. 移除重复节点
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeDuplicateNodes = function(head) {
    const set = new Set();
    let prev = null;
    let current = head;
    while(current) {
        if(set.has(current.val)) {
            prev.next = current.next;
            current = prev.next;
        } else {
            set.add(current.val);
            prev = current;
            current = current.next;
        }
    }
    return head;
};
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 * 203. 移除链表元素
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
    let linknode = new ListNode(0);
    linknode.next = head;
    let prev = linknode;
    let current = linknode;
    while(current) {
        if(current.val === val) {
            prev.next = current.next;
        } else {
            prev = current;
        }
        current = current.next;
    }
    return linknode.next;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 * 面试题 02.02. 返回倒数第 k 个节点
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {number}
 * 初始化: 使用双指针，i, j
 * 构建双指针距离: 先将i向后移动k次，此时 i，j的距离为k
 * 双指针共同移动: 同时移动i，j，直到i指向null，此时j位置的val就是答案
 * 返回值:  https://pic.leetcode-cn.com/c11759b47df01442d2bacdc3a693531e1c5e905c741307f4bf61efffb08ce15d-aa.png
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
 * @return {ListNode}
 * 面试题22. 链表中倒数第k个节点
 * 解法同上
 */
var getKthFromEnd = function(head, k) {
    let p = head;
    for(let i = 0; i < k; i++) {
        p = p.next;
    }
    while(p) {
        p = p.next;
        head = head.next;
    }
    return head;
    
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 面试题 02.03. 删除中间节点
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function(node) {
    node.val = node.next.val;
    node.next = node.next.next;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/** 
 * 面试题52. 两个链表的第一个公共节点
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 * https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1585472571147.png?width=640&height=307&imageView2/1/q/80/w/420/h/201
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
function ListNode(val) {
        this.val = val; 
        this.next = null;
    }
const testlist = new ListNode(1);
testlist.next =  new ListNode(3);
testlist.next =  new ListNode(2);
console.log(middleNode(testlist));


