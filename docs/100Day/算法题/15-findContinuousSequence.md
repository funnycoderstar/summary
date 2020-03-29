```js
/**
 * @param {number} target
 * @return {number[][]}
 */
var findContinuousSequence = function(target) {
    let result = [];
    let temp = [];
    let sum = 0;
    for (let i = 1; i < target; i++) {
        temp.push(i);
        sum += i;
        // 保证进入下一轮循环的时候，sum是小于target
        while (sum >= target) {
            // 找到 sum === target的情况
            if(sum === target) {
                result.push(temp.slice());
            }
            sum -= temp.shift();
        }
    }
    return result;
};
console.log(findContinuousSequence(9));

```