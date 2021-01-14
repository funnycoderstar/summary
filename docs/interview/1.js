/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    // dp[i][k][0 or 1], 第 i 天，最多进行 k 次交易， 0 代表手上没有股票，1代表手上有股票
    // dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
    // dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
    //第一次 买入， 卖出的利润
    let oneBuy = - prices[0];
    let oneSell = 0;
    // 继第一次之后，第二次买入卖出的利润
    let twoBuy = - prices[0];
    let twoSell = 0;
    for (let i = 0; i < prices.length; i++) {
        // 第一次买入后，利润为 -prices[i]
        oneBuy = Math.max(oneBuy, -prices[i]);
        oneSell = Math.max(oneSell, prices[i] + oneBuy);
        // 第二次买入后的利润， 第一次卖出的利润 - prices[i]
        twoBuy = Math.max(twoBuy, oneSell - prices[i])
        twoSell = Math.max(twoSell, prices[i] + twoBuy);
    }
    return twoSell;

};
console.log(maxProfit([2, 1, 2, 0, 1]));
console.log(maxProfit([3, 3, 5, 0, 0, 3, 1, 4]));
