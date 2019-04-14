/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    if (s.length <= 1) {
        return s;
    }
    let s1 = [];
    for (let i = 0; i < s.length; i++) {
        s1.unshift(s.charAt(i));
    }
    let dp = [];
    let solution = [];
    
    for(let  i = 0; i <= s.length; i++) {
        dp[i] = [];
        solution[i] = [];
        for(let j = 0; j <= s1.length; j++) {
            dp[i][j] = 0;
            solution[i][j] = 0;
        }
    }
    let max = 0;
    for (let i = 0; i <= s.length; i++) {
        for (let j = 0; j <= s1.length; j++) {
            if(i == 0 || j == 0) {
                dp[i][j] = 0;
                solution[i][j] = 'diagonal';
            } else if(s[i -1] == s1[j -1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                solution[i][j] = dp[i][j] == dp[i-1][j] ? 'top' : 'left';
            }
            max = Math.max(max, dp[i][j]);
        }
    }
    printSolution(solution, dp, s, s1, s.length, s1.length);
    return max;
    
   
    function printSolution(solution, dp, wordX, wordY, m, n) {
        let a = m;
        let b = n;
        let i = 0;
        let j = 0;
        let answer = '';
        let x = solution[a][b];
        while(x !== 'o') {
            if(solution[a][b] == 'diagonal') {
                answer = wordX[a - 1] + answer;
                a--;
                b--;
            } else if(solution[a][b] === 'left') {
                b--;
            } else if(solution[a][b] === 'top') {
                a--;
            }
            x = solution[a][b];
        }
        console.log(answer);
    }

};
// console.log(longestPalindrome('abcecbagg'));
console.log([] == ![]);
