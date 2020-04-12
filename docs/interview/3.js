/**
 * @param {character[][]} board
 * @return {number}
 */
var numRookCaptures = function(board) {
    let sx = 0;
    let sy = 0;
    let dx = [1, 0 - 1, 0];
    let dy = [0, 1, 0, -1];
    let count = 0;
    // 找到白色车的坐标位置
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            if(board[i][j] === 'R') { 
                sx = i;
                sy = j;
                break;
            }
        }
    }
    for(let i = 0 ; i < 4; i++) {
        for(let step = 0;; step++) {
            const tx = sx + step * dx[i];
            const ty = sy + step * dy[i];
            if(tx < 0 || tx >= 8 || ty < 0 || tx >= 8 || board[tx][ty] === 'B') {
                break;
            }
            if(board[tx][ty] === 'p') {
                count++;
                break;
            }
        }
    }
    return count;

};

var numRookCaptures = function(board) {
    let cnt = 0, st = 0, ed = 0;
    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];

    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            if (board[i][j] == 'R') {
                st = i;
                ed = j;
                break;
            }
        }
    }
    for (let i = 0; i < 4; ++i) {
        for (let step = 0;; ++step) {
            const tx = st + step * dx[i];
            const ty = ed + step * dy[i];
            if (tx < 0 || tx >= 8 || ty < 0 || ty >= 8 || board[tx][ty] == 'B') break;
            if (board[tx][ty] == 'p') {
                cnt++;
                break;
            }
        }
    }
    return cnt;
};

// const a = [[".",".",".",".",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".","R",".",".",".","p"],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."]]
// console.log(numRookCaptures(a));


/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function(arr, k) {
    arr.sort((a, b) => a - b);
    return arr.slice(0, k + 1);
};

/**
 * @param {number[][]} grid
 * @return {number}
 */
var surfaceArea = function(grid) {
    let result = 0;
    for(let i = 0; i < grid.length - 1; i++) {
        for(let j = 0; j < grid[i].length - 1; j++) {
            result += 4 * (grid[i][j]) + 2;
            if(j > 0 && grid[i][j - 1]) {
                const m = Math.min(grid[i][j] - grid[i][j - 1]);
                result -= m * 2;
            }
            if(i > 0 && grid[i - 1][j]) {
                const n = Math.min(grid[i][j] - grid[i - 1][j]);
                result -= n * 2;
            }
            
        }
    }
    return result;
};

