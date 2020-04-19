/**
 * @param {number[]} height
 * @return {number}
 * // 看懂题，但是没有清晰的思路的题, 不知道什么逻辑循环
 */
var maxArea = function(height) {
    let l = 0;
    let maxArea = 0;
    let r = height.length - 1;
    // 
    while(l < r) {
        maxArea = Math.max(maxArea, (r - l) * Math.min(height[r], height[l]));
        if(height[r] >= height[l]) {
            l++;
        } else {
            r--;
        }
    }
    return maxArea
};
console.log(maxArea([1,8,6,2,5,4,8,3,7]));
