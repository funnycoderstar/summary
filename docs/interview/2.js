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

/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function(nums) {
    const set = new Set();
    for(let i = 0; i < nums.length; i++) {
        if(set.has(nums[i])) {
            return nums[i];
        } else {
            set.add(nums[i])
        }
    }
};

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 * // 392. 判断子序列
 * 双指针法
 * 初始化 i, j为0， 分别指向s和t的第0个字符，在t中找到 s[i] 字符后，i++试图找下一个字符
 * 如果最后 i 到达了 s末尾，就说明找到了该字符串
 */
var isSubsequence = function(s, t) {
    let i = 0;
    let j = 0;
    while( i < s.length && j < t.length) {
        if(s[i] === t[j]) {
            i++;
            j++;
        } else {
            j++;
        }
    }
    return i === s.length;
};

/**
 * @param {number[]} nums
 * @return {number}
 * 面试题42. 连续子数组的最大和
 */
var maxSubArray = function(nums) {
    let currentSum = nums[0]; // 不能声明为0，可能会有负值
    let maxSum = nums[0];
    for(let i = 1; i < nums.length; i++) {
        // 连续子数组的最大和，所以要比较 nums[i] 和c urrentSum += nums[i]
        currentSum = Math.max(nums[i], currentSum += nums[i]);
        maxSum = Math.max(currentSum, maxSum);
    }
    return maxSum;

};

/**
 * @param {number[]} nums
 * @return {number}
 * 面试题 17.16. 按摩师，跟198. 打家劫舍 https://leetcode-cn.com/problems/house-robber/ 重题

 * 只有1个时，第0个最大的为 nums[0]， 
 * 只有2个时，第1个最大的为 nums[0]和nums[1]的最大值， 
 * 第i个时，包括两种情况，需要判断最大值，dp[i] = max(dp[i - 1], dp[i - 2] + nums[i]
 *  1. 接受i, 那么为 dp[i - 2] + nums[i]
 *  2. 不接受 i, dp[i - 1]
 */
var massage = function(nums) {
    const len = nums.length;
    if(len === 0) {
        return 0;
    }
    if(len === 1) {
        return nums[0];
    }
    let prevMax = nums[0];
    let currentMax = Math.max(nums[0], nums[1]);
    for(let i = 2; i < len; i++) {
        const temp  = currentMax;
        currentMax = Math.max(currentMax, prevMax + nums[i]);
        prevMax = temp;
    }
    return currentMax;
   
};

/**
 * @param {number[]} cost
 * @return {number}
 * dp[i] = Math.min(dp[i - 2], dp[i - 1]) + cost[i]
 */
var minCostClimbingStairs = function(cost) {
    const len = cost.length;
    let dp  = new Array(len+1).fill(0);
    dp[0] = cost[0];
    dp[1] = cost[1];
    for(let i = 2; i <= len; i++) {
        if(i === len) {
            dp[i] = Math.min(dp[i -2], dp[i - 1])
        } else {
            dp[i] = Math.min(dp[i -2], dp[i - 1]) + cost[i];
        }
        
    }
    return dp[len];
};

/**
 * @param {number[]} nums
 * @return {number}
 * 乘积最大子序列: https://leetcode-cn.com/problems/maximum-product-subarray/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by--36/
 * 遍历数组时计算当前最大值，不断更新
 * 令imax为当前最大值，则当前最大值为 imax = max(imax * nums[i], nums[i])
 * 由于存在负数，那么会导致最大的变最小的，最小的变最大的。因此还需要维护当前最小值imin，imin = min(imin * nums[i], nums[i])
当负数出现时则imax与imin进行交换再进行下一步计算

 */
var maxProduct = function(nums) {
    let max = nums[0];
    let dpMax = nums[0];
    let dpMin = nums[0];
    for(let i = 1; i < nums.length; i++) {
        const preMax = dpMax;
        dpMax = Math.max(dpMin * nums[i], Math.max(preMax * nums[i], nums[i]));
        dpMin = Math.min(dpMin * nums[i], Math.min(preMax * nums[i], nums[i]));
        max = Math.max(dpMax, max);
    }
    return max;
};

/**
 * @param {number} n
 * @return {number}
 * 面试题 08.01. 三步问题
 * dp[i]表示上i阶的方式，可以选择从i-1、i-2、i-3处走上来。
 */
var waysToStep = function(n) {
    const m = 1e9+7;
    let dp = [0, 1, 2, 4];
    for(let i = 4; i <= n;i++) {
        dp[i] = (dp[i - 1] + dp[i - 1] + dp[i - 3]) % m;
    }
    return dp[n];
};

/**
 * @param {number} N
 * @return {boolean}
 */
var divisorGame = function(N) {
    return N % 2 === 0
};

/**
 * @param {number[]} arr
 * @return {number[]}
 */
var arrayRankTransform = function(arr) {
    
    
};