## 关于默认this
- 浏览器默认的this为window

```js
function test() {
    console.log(this);
}
test(); //window
```
- node.js中
    - 全局环境默认this为{}
    - 
    ```
    console.log(this); // {}
    ```
    - 普通函数中默认this为global
        
    ```
    function test() {
        console.log(this);
    }
    test(); //global
    ```
    - 箭头函数中默认this为所在作用域的this
    
    ```
    var obj = {
    say: function () {
      setTimeout(() => {
        console.log(this)
      });
    }
  }
  obj.say(); // obj,此时this指的是定义他的obj
    ```

## 关于this指向
- 普通函数的this指向函数的调用者
- 箭头函数的this指向所在作用域的this

```js
var obj = {
    name: 'objName',
    say() {
        console.log(this.name);
    }
    read: () => {
        console.log(this);
        console.log(this.name);
    }
}
obj.say() // objName
obj.read() // {}, undefined
```

```js
window.val = 1;
var obj = {
    val: 2,
    dbl: function() {
        this.val *= 2;
        val *= 2;
        console.log(val);
        console.log(this.val);
    }
}
obj.dbl(); // 2 4
var func = obj.dbl;
func(); // 8 8

obj.dbl();执行这行代码时，this指的是obj，所以this.val === obj.val*=2,最后结果为4,val*=2 === window.val *= 2，最后结果是2

func()，执行这行代码时，func()没有任何前缀，this指的是window.func();所以此时this值得是window，this.val === window.val *= 2,此时window.val 为4，val*=2 === window.val *2,最后结果为8，最后console.log(this.val),与console.log(val),指的都是window.val，最后结果都是8
```