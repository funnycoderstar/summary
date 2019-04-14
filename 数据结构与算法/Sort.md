# 排序算法
## 归并排序
归并排序是一种分治算法。其思想是经原始数组分割成较小的数组，直到每一个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组
```js
function mergeSort(arr) {
    return mergeSortRec(arr);
    // 分成小数组，直到每个数组为一项
    function mergeSortRec(array) {
        let length = array.length;
        if(length == 1) {
            return array;
        } 
        var mid = Math.floor(length / 2);
        var left = array.slice(0, mid);
        var right = array.slice(mid, length);
        return merge(mergeSortRec(left),mergeSortRec(right))
    }
    // 合并
    function merge(left, right) {
        var result = [];
        let i = 0;
        let j = 0;
        while(i < left.length && j < right.length) {
            if(left[i] < right[j]) {
                result.push(left[i]);
                i++;
            } else {
                result.push(right[j]);
                j++;
            }
        }
        while(i < left.length) {
            result.push(left[i]);
            i++;
        }
        while(j < right.length) {
            result.push(right[j]);
            j++;
        }
        return result;
    }
}

console.log(mergeSort([12, 9, 4, 10]));
```