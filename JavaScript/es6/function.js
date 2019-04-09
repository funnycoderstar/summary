// 1,函数参数的默认值
function log(x, y ='World') {
    console.log(x, y);
}

function Point(x = 0, y = 0) {
    this.x = x;
    this.y = y;
}
var p = new Point();
// 参数变量是默认声明的,所以不能用let和const再次声明

// 2,rest参数
// 形式为“...变量名”,该变量用于获取函数的多余参数
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) 
// rest参数代表一个数组
function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
    console.log(item);
  });
}

var a = [];
push(a, 1, 2, 3)
// rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。