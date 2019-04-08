## [路径总和](https://www.jianshu.com/p/f23b061c229a)

## [买卖股票的最佳时机](https://www.jianshu.com/p/dd8adde07dfe)

## 实现一个find(obj, target)
```js
var obj = {
    key1: 'str1',
    key2: {
        key3: 'str2',
        key4: 'str3',
        key5: {
            key6: 'str4',
            key7: 'str6',
        }
    }
}
```

比如 find(obj, 'str6'), 返回 key2, key5, key7

```js

function find(obj, target) {
    let result = [];
    function findKey(obj, target) {
        for(let [key, value] of Object.entries(obj)) {
            if(value == target) {
                result.push(key);
            } else if(typeof value == 'object') {
                findKey(value, target);
                result.push(key);
            } else {
                result = [];
            }
        }
        return result;
    }
    return findKey(obj, target);
}
console.log(find(obj, 'str6')); // [ 'key7', 'key5', 'key2' ]
```
## 统计和最大的字母
比如： ['1a', '2a', '5b', '4c', '6d'] ， 输出

```js
var arr = ['1a', '2a', '5b', '4c', '6d'];

function foo() {
    let obj = {};
    let max = -1;
    let letter = '';
    for(let i = 0; i < arr.length; i++) {
        const len = arr[i].length;
        if(obj[arr[i].charAt(len-1)]) {
            obj[arr[i].charAt(len-1)] += Number(arr[i].substr(0, len-1));
        } else {
            obj[arr[i].charAt(len-1)] = Number(arr[i].substr(0, len-1));
        }
        if(obj[arr[i].charAt(len-1)] > max) {
            max = obj[arr[i].charAt(len-1)];
            letter = arr[i].charAt(len-1);
        }
    }
    console.log(letter, max);
    return `${letter}: ${max}`
    // return obj;
}
console.log(foo()); // d: 6
```
