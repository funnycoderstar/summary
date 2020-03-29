/**
 * @param {number[]} nums
 * @return {number}
 */
var thirdMax = function(nums) {
    let max = nums[0];
    let secondMax = null;
    let thirdMax = null;

    for(let i = 1; i < nums.length; i++) {
        if(nums[i] > max) {
            thirdMax = secondMax;
            secondMax = max;
            max = nums[i];
        } else if(nums[i] < max  && (secondMax === null || nums[i] > secondMax)) {
            thirdMax = secondMax;
            secondMax = nums[i];
        } else if(nums[i] < secondMax  && (thirdMax === null || nums[i] > thirdMax)) {
            thirdMax = nums[i];
        }
    }
    
    return thirdMax === null ? max : thirdMax;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    
};