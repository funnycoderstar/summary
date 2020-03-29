## 进制转换

//十进制转其他

```js
var x = 110;
console.log(x);
console.log(x.toString(8));
console.log(x.toString(32));
console.log(x.toString(16));
```

//其他转十进制
```js
var x = "110";
console.log(parseInt(x, 2));
console.log(parseInt(x, 8));
console.log(parseInt(x, 16));
```

//其他转其他
```js
//先用parseInt转成十进制再用toString转到目标进制
console.log(String.fromCharCode(parseInt(141, 8)));
console.log(parseInt("ff", 16).toString(2));
```

## 质数

## 位运算

## 链表和数组

数组增删元素复杂度为 O(n);
链表的存储方式使得它可以高效的在指定位置插入与删除，时间复杂度均为 O(1)。


https://leetcode-cn.com/problems/kth-node-from-end-of-list-lcci/solution/tu-jie-shuang-zhi-zhen-you-zou-cchao-guo-100de-ti-/

链表的经常碰到的面试题

获取倒数第k个元素，获取中间位置的元素，判断链表是否存在环，判断环的长度等和长度与位置有关的问题。这些问题都可以通过灵活运用双指针来解决。
倒数第k个元素的问题
有两个指针 p 和 q，初始时均指向头结点。首先，先让 p 沿着 next 移动 k 次。此时，p 指向第 k+1个结点，q 指向头节点，两个指针的距离为 k 。然后，同时移动 p 和 q，直到 p 指向空，此时 p 即指向倒数第 k 个结点。可以参考下图来理解：

![img1](https://pic.leetcode-cn.com/9f50c5f89c713601613b6b18ac0c7053db39e478bae8e8f34810b5dab1f9ca7c.png)
获取中间元素的问题。
设有两个指针 fast 和 slow，初始时指向头节点。每次移动时，fast向后走两次，slow向后走一次，直到 fast 无法向后走两次。这使得在每轮移动之后。fast 和 slow 的距离就会增加一。设链表有 n 个元素，那么最多移动 n/2 轮。当 n 为奇数时，slow 恰好指向中间结点，当 n 为 偶数时，slow 恰好指向中间两个结点的靠前一个(可以考虑下如何使其指向后一个结点呢？)。

![img2](https://pic.leetcode-cn.com/aee1dbea92600ffb97023d8d4d98d21c6a0882fd1b996c34f9c994f8bf37e296.png)

### 参考
[数据结构与算法——链表](https://leetcode-cn.com/circle/article/igN07f/)