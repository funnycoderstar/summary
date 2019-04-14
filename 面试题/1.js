function IsContinuous1(numbers){
   function resvetNumber(str) {
        switch(str) {
            case 'A':
                return 1;
            case 'J':
                return 11;
            case 'Q':
                return 12;
            case 'K':
                return 13;
            default:
               return null;
                
        }
   }
   
   let wangNums = 0;
   let grapNums = 0; // 排序后元素的差值
   let reg = /0-9/g;
   
   for(let i = 0; i < numbers; i++) {
       let value = numbers.charAt(i);
        if(value == '0') {
            wangNums ++;
        } else {
            let temp = reg.test(value) ? value : resvetNumber(str);
            if(numbers[i] == numbers[i+1]) {
                return false;
            } else {
               grapNums += (numbers[i+1] - numbers[i] - 1);
            }
        }
   }
   if(grapNums <= wangNums) {
        return true;
    }
    return false;
}

function IsContinuous(numbers) {
    if(numbers.length != 5) {
        return false;
    }

    numbers.sort((a, b) => a - b);
    let wangNums = 0; // 王的个数
    let grapNums = 0; // 排序后元素的差值
    for(let i = 0; i < numbers.length - 1; i++) {
         if(numbers[i] == 0) {
             wangNums++;
         } else if(numbers[i] == numbers[i+1]) {
             //不是王，并且还是对子，那肯定不是顺子了
             return false;
         } else {
            //不是王，计算一下两两的差值，最后与王的个数做比较
            grapNums += (numbers[i+1] - numbers[i] - 1);
         }
    }
    //差值小于王的个数，说明可以用王来构成顺子
    if(grapNums <= wangNums) {
        return true;
    }
    return false;
}

console.log(IsContinuous([1,3,2,5,4]));
