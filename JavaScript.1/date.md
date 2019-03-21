> 处理时间,获得昨天,明天,后天...以及对应的星期

```js
const arr = [ '周日', '周一', '周二', '周三', '周四', '周五', '周六', ];
        function getDateStr(count) {
            if (count === 0) {
                return '今天';
            }
            const date = new Date();
            date.setDate(date.getDate() + count);
            const index = date.getDay();  // 获取周几,0为周日
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return year + '-' + month + '-' + day + '(' + arr[index] + ')';
        }
        for (let i = 0; i < this.startDayItems.length; i++) {
            this.startDayItems[i] = getDateStr(i);
        }
        
        // 得出一个数组
        startDayItems: [ '今天', '2017-04-17（周二）', '2017-04-18（周三）', '2017-04-19（周四）', '2017-04-20（周五）', '2017-04-21（周六）', '2017-04-22（周日）', ],
        
```

> 时间戳转换成 2017.03 

```js
const date = new Date();
const Y = date.getFullYear() + '.';
const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
this.todayTime = Y + M;

```
> 时间戳装换成  yyyy-MM-dd hh:mm:ss
  2017-04-21 08:19:00
```js
time(value) {
    const date = new Date(value * 1000);
    const Y = date.getFullYear() + '-';
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    const D = date.getDate() + ' ';
    const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() + ':';
    const s = date.getSeconds(); 
    return (Y + M + D + h + m + s);
},

```

>日期格式转换为 时间戳

```js
// 也很简单
const strtime = '2017-04-20 20:55:49:123';
const date = new Date(strtime); //传入一个时间格式，如果不传入就是获取现在的时间了，这样做不兼容火狐。
// 可以这样做
const date = new Date(strtime.replace(/-/g, '/'));

// 有三种方式获取，在后面会讲到三种方式的区别
time1 = date.getTime();
time2 = date.valueOf();
time3 = Date.parse(date);

/* 
三种获取的区别：
第一、第二种：会精确到毫秒
第三种：只能精确到秒，毫秒将用0来代替
比如上面代码输出的结果(一眼就能看出区别)：
1398250549123
1398250549123
1398250549000 
*/

```

> Date()的参数

```js
new Date("month dd,yyyy hh:mm:ss");
new Date("month dd,yyyy");
new Date("yyyy/MM/dd hh:mm:ss");
new Date("yyyy/MM/dd");
new Date(yyyy,mth,dd,hh,mm,ss);
new Date(yyyy,mth,dd);
new Date(ms);

// 比如
new Date("September 16,2016 14:15:05");
new Date("September 16,2016");
new Date("2016/09/16 14:15:05");
new Date("2016/09/16");
new Date(2016,8,16,14,15,5); // 月份从0～11
new Date(2016,8,16);
new Date(1474006780);

```
> 用正则表达式格式化日期
```js
// 格式化日期
var reg = /^(\d{4})[/-](\d{2})[/-](\d{2})$/
console.log('2016/11/18'.replace(reg, '$1年$2月$3日')) //2016年11月18日
console.log('2016-11-18'.replace(reg, '$1年$2月$3日')) //2016年11月18日
console.log('2016-11-18'.replace(reg, '$1$2$3')) //20161118
```
分组经常和反向引用一起使用，反向引用在前面的replace方法就有了，只不过没有说他的概念，这里说一下：当一个正则表达式被分组后，每个分组自动被赋予一个组号，一左到右分别是 $1 $2…
分组，又称为子表达式。把正则表达式拆分成小表达式。
```js
// 不分组，量词仅作用到最后一个字符(c)
console.log(/abc{2}/.test('abcabc')); // false
console.log(/abc{2}/.test('abcc')); //true

//分组，量词作用于整个括号里的子表达式
console.log(/(abc){2}/.test('abcabc')); // true
console.log(/(abc){2}/.test('abcc')); //false
```

