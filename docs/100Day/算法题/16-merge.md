```js
/**
 * @param {number[]} A
 * @param {number} m
 * @param {number[]} B
 * @param {number} n
 * @return {void} Do not return anything, modify A in-place instead.
 */
var merge = function(A, m, B, n) {
    let i = m - 1;
    let j = n - 1;
    let index = m + n - 1;
    while(i >= 0  && j >= 0) {
        if(A[i] >= B[j]) {
            A[index] = A[i];
            i--;
        } else {
            A[index] = B[j];
            j--; 
        }
        index--;
    }
    while(j >= 0) {
        A[index] = B[j];
        index--;
        j--;
    }
    return A;
};
console.log(merge([1,2,3,0, 0, 0], 3, [2,5,6], 3));
```