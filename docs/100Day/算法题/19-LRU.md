

JavaScript实现LeetCode第146题： [LRU缓存机制](https://leetcode-cn.com/problems/lru-cache/)
## 题目描述

运用你所掌握的数据结构，设计和实现一个 [LRU (最近最少使用) 缓存机制](https://baike.baidu.com/item/LRU)。它应该支持以下操作： 获取数据 get 和 写入数据 put 。

获取数据 get(key) - 如果密钥 (key) 存在于缓存中，则获取密钥的值（总是正数），否则返回 -1。
写入数据 put(key, value) - 如果密钥不存在，则写入其数据值。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。

示例:
```js
LRUCache cache = new LRUCache( 2 /* 缓存容量 */ );

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // 返回  1
cache.put(3, 3);    // 该操作会使得密钥 2 作废
cache.get(2);       // 返回 -1 (未找到)
cache.put(4, 4);    // 该操作会使得密钥 1 作废
cache.get(1);       // 返回 -1 (未找到)
cache.get(3);       // 返回  3
cache.get(4);       // 返回  4
```
进阶:

你是否可以在 O(1) 时间复杂度内完成这两种操作？

## 解题思路

思路：哈希表（Map） + 双向链表
这个问题可以用哈希表，辅以双向链表记录键值对的信息。所以可以在 O(1) 时间内完成 put 和 get 操作，同时也支持 O(1)) 删除第一个添加的节点。
![img](https://pic.leetcode-cn.com/815038bb44b7f15f1f32f31d40e75c250cec3c5c42b95175ec012c00a0243833-146-1.png)

使用双向链表的一个好处是不需要额外信息删除一个节点，同时可以在常数时间内从头部或尾部插入删除节点。
一个需要注意的是，在双向链表实现中，这里使用一个伪头部和伪尾部标记界限，这样在更新的时候就不需要检查是否是 null 节点。
![img](https://pic.leetcode-cn.com/48292c190e50537087ea8c60ed44062675d55a73d1a59035d26e277a36b7b8e2-146-2.png)

解题步骤：
1. 使用Map记录缓存值,使用链表记录缓存操作顺序,最后操作的缓存放在链表头部,链表尾部就是最少操作的缓存

2. 读取缓存时,更新缓存操作顺序,将缓存节点从链表中移除, 再将其添加到链表头部, 移除节点时要保证链表的连续性,为了在 O(1)时间完成该操作,需要使用双向链表

3. 设置缓存时
    - 如果是已存在的缓存,则直接更新缓存值即可,并更新缓存操作的顺序;
    - 如果是不存在的缓存,则将缓存加到链表头部, 添加后如果缓存超出上限, 则将链表尾部的缓存清掉

## 解题方法
```js
class DoubleLinkList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    /**
     * 链表头部插入
     * 1.如果头部和尾部都存在, 则直接在头部之前插入
     *     修改原来head的prev指向当前node, node的next指向原先的head, node的prev设置为null修改head为当前node
     * 2.如果头部或尾部不存在, 则设置当前node为head和tail
     *     node的next指向null, node的prev设置为nul
     */
    unshift(node) {
         
        if (this.head && this.tail) {
            node.prev = null;
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        } else {
            node.prev = node.next = null;
            this.head = this.tail = node;
        }

        this.length++;
        return node;
    /**
     * 链表尾部删除
     * 1.判断tail是否存在
     * 2.判断head和tail是否相等
     *    相等: this.head = this.tail = null;
     *    不相等: this.tail.prev.next = null; this.tail = this.tail.prev;
     */
    pop() {
        if (this.tail) {
            const node = this.tail;
            if (this.head === this.tail) {
                this.head = this.tail = null;
            } else {
                this.tail.prev.next = null;
                this.tail = this.tail.prev;
            }
            this.length--;
            return node;
        }
    }
    /**
     * 删除具体的某个节点
     * 1.node等于head
     * 2.node等于tail
     * 3.node即不等于head, 也不等于tail
     */
    remove(node) {
        if (node !== this.head && node !== this.tail) {
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }
        if (node === this.head) {
            this.head = this.head.next;
        }
        if (node === this.tail) {
            this.tail = this.tail.prev;
        }
        this.length--;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.list = new DoubleLinkList();
        this.map = new Map();
    }

    get(key) {
        let node = this.map.get(key);
        if (node) {
            this.list.remove(node);
            this.list.unshift(node);
            return node.value;
        } else {
            return -1;
        }
    }

    put(key, value) {
        let node = this.map.get(key);
        if (node) {
            node.value = value;
            this.list.remove(node);
            this.list.unshift(node);
        } else {
            node = { key, value };
            this.list.unshift(node);
            this.map.set(key, node);
            if (this.list.length > this.capacity) {
                const tail = this.list.pop();
                this.map.delete(tail.key);
            }
        }
    }
}
```

## 复杂度分析

- 时间复杂度：对于 put 和 get 都是 O(1)。
- 空间复杂度：O(capacity)，因为哈希表和双向链表最多存储 capacity + 1 个元素。

## 参考
[官方题解](https://leetcode-cn.com/problems/lru-cache/solution/lru-huan-cun-ji-zhi-by-leetcode/)