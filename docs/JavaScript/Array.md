## Array.prototype.map()
**参数是**
- callback
  - currentValue 当前元素
  - index 当前元素的索引
  - array, 调用map方法的数组
- thisArg:(可选) 执行callback函数时使用的this值

**返回值**
一个新数组，每个元素都是回调函数的结果

不修改原数组本身

### 补充
```js
['1', '2', '3'].map(parseInt); // [1, NaN, NaN]
```
Function.length, 
length属性指明， 函数有多少个必须要传的参数，即函数的形参个数。形参的数量不包括剩余参数个数，仅包括第一个具有默认值之前的参数个数
arguments.length 是函数被调用时实际传参的个数。

Function.name， name属性返回一个函数声明的名称。

map在调用callback（此时指的是parseInt）时传入三个参数，
parseInt第三个参数会被忽视，但是第二个参数不会，也就是说，parseInt 把传过来的索引值当做进制数来使用，从而返回了NaN；

parseInt(string, radix)   将一个字符串 string 转换为 radix 进制的整数， radix 为介于2-36之间的数。parseInt.length为2，
radix参数：
- 可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。
- 如果省略该参数或其值为 0，则数字将以 10 为基础来解析。如果它以 “0x” 或 “0X” 开头，将以 16 为基数。
- 如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN。

Object()构建函数，为定值创建一个包装器。如果给定值是null，或 undefined， 将会创建并返回一个空对象，将返回一个与给定值对应类型的对象。
当以非构造函数形式被调用时，Object 等同于 new Object()。

## Array.prototype.forEach()

参数同 map

返回值：
undefined

## Array.prototype.filter()
参数同 map

返回值：
一个新数组，通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组。
不会改变原数组

## Array.prototype.reduce()
参数：
- callback
   - accumulator 累计器
   - currentValue 当前值
   - currentIndex 当前索引
   - array 数组
- initialValue

回调函数第一次执行时，accumulator和currentValue有两种情况
- 1. 如果提供了initialValue， accumulator为initialValue， currentValue取数组的第一个值
- 2. 如果没有提供initialValue， accumulator取数组的第一个值，currentValue取数组的第二个值

返回值
函数累计处理的结果;
### 举例
1. 数组里面所有值得和
2. 累加对象数组里的值
3. 将二维数组转为一维
4. 计算数组中每个值出现的次数
5. 按属性对Object分类
6. 使用拓展运算符和initialValue绑定包含在对象数组中的数组
7. 数组去重

> 箭头函数的用法
```js
var f = v => v;

// 等同于
var f = function (v) {
  return v;
};
```
1. 没有参数或需要多个参数，就用一个圆括号代表参数部分
2. 代码块部分多于一条语句，就要使用大括号将他们括起来，并且使用return 语句返回
3. 如果返回一个对象，就需要使用一个圆括号把对象括起来，不然会报错，因为引擎认为大括号是代码块



## Object构建函数的方法



## Function.prototype.call()
## Function.prototype.bind()
## Function。prototype.apply()



