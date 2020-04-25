#### 用Object.defineProperty()简单实现vue中的数据绑定$watch
```
function Observer(data) {
    this.data = {};
    for (const key of Object.keys(data)) {
        Object.defineProperty(this.data, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                console.log('你访问了' + key);
                return data[key];
            },
            set: function (newVal) {
                console.log('你设置了' + key);
                console.log('新的' + key + '=' + newVal);
                if (newVal === data[key]) {
                    return;
                }
                data[key] = newVal;
            }
        })
    }
}
Observer.prototype.$watch = function (key, cd) {
    let value = this[key];
    Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log(`你访问了 ${key}`);
            return value;
        },
        set: function (newValue) {
            cd(newValue);
            value = newValue;
            return newValue;
        },
    })
}

const app1 = new Observer({
    name: 'wangyaxing',
    age: '24',
    a: {
        b: 1,
        c: 2,
    },
});
const app2 = new Observer({
    city: 'beijing'
});
app1.$watch('age', function(newValue) {
    console.log(`我年纪变了，我现在 ${newValue}岁了`);
});

app1.age = 100;
app1.age;
app1.age = 120;
app1.a.b;
app1.a.c = 10;
app1.a = {
    e: 100,
}
```



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
function helper(node, curSum, target, preSum) {
   if (!node) { return 0; }
   curSum += node.val;
   let res = preSum.get(curSum - target) || 0;
   const tmp = preSum.get(curSum) || 0;
   preSum.set(curSum, tmp + 1);// curSum的次数
   res += helper(node.left, curSum, target, preSum) 
       + helper(node.right, curSum, target, preSum);
       
   preSum.set(curSum, tmp);
   return res;
}
var pathSum = function(root, sum) {
   const preSum = new Map();
   preSum.set(0, 1);
   return helper(root, 0, sum, preSum);
};