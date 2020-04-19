## 函数防抖(debounce)
防抖：不管事件触发频率多高，一定**在事件触发 n 秒后才执行**，如果在一个事件执行的 n秒内又触发了这个事件，就以新的事件的时间为准，n秒后才执行，总之，触发完事件 n 秒内不再触发事件，n秒后再执行。

思路：
1. 返回一个函数； 
2. 每次触发事件时都取消之前的定时器

需要注意问题：
1. this指向
2. 参数的传递 
3. 是否要立即调用一次

```js
function debounce(fn, wait, immediate) {
    let timer = null;
    //  返回一个函数
    return function(...args) {
        // 每次触发事件时都取消之前的定时器
        clearTimeout(timer);
        // 判断是否要立即执行一次
        if(immediate && !timer) {
            fn.apply(this, args);
        }
        // setTimeout中使用箭头函数，就是让 this指向 返回的该闭包函数，而不是 debounce函数的调用者
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}
```
通过闭包保存一个标记(timer)来保存setTimeout返回的值, 每当要触发函数的时候, 需要先把上一个setTimeout清除掉, 然后再创建一个新的setTimeout, 这样就能保证执行函数后的 wait 间隔内如果还要触发函数, 就不会执行fn

### 使用场景
1. 窗口大小变化，调整样式 
```js
window.addEventListener('resize', debounce(handleResize, 200));
```
window 的 resize、scroll， mousedown、mousemove， keyup、keydown等高频触发的事件

2. 搜索框，输入后1000毫秒搜索
```js
debounce(fetchSearchData, 1000);
```
可以这样去理解记忆：函数防抖是 **在事件触发 n 秒后才执行**，在监听  scroll事件和 resize 事件时，只要 n 秒后才执行一次就可以了，不需要每次只要以触发 scroll或 resize的时候就执行。n秒内的执行是没有意义的。

## 函数节流(throttle)
函数节流：不管事件触发频率有多高，只在单位时间内执行一次。

有两种思路实现： 使用时间戳和定时器

### 使用时间戳

```js
function throttle(fn, wait)  {
    // 记录上一次执行的时间戳
    let previous = 0;
    return function(...args) {
        // 当前的时间戳，然后减去之前的时间戳，大于设置的时间间隔，就执行函数，否则不执行
        if(Date.now() - previous > wait) {
            // 更新上一次的时间戳为当前时间戳
            previous = Date.now();
            fn.apply(this, args);
        }
    }
}
```
第一次事件肯定触发，最后一次不会触发(比如说监听 onmousemove，则鼠标移除后，立即停止触发事件)

### 使用定时器
```js
function throttle(fn, wait)  {
    // 设置一个定时器
    let timer = null;
    return function(...args) {
        // 判断如果定时器不存在就执行，存在则不执行
        if(!timer) {
            // 设置下一个定时器
            timer = setTimeout(() => {
                // 然后执行函数，清空定时器
                timer = null;
                fn.apply(this, args)
            }, wait)
        }
    }
}
```
第一次事件不会触发(fn是放在 setTimeout中执行的，所以第一次触发事件至少等待 wait 毫秒之后才执行)，最后一次一定触发

### 定时器和时间戳结合

两者结合可以实现，第一次事件会触发，最后一次事件也会触发
```js
function throttle(fn, wait)  {
    // 记录上一次执行的时间戳
    let previous = 0;
    // 设置一个定时器
    let timer = null;
    return function(...args) {
        // 当前的时间戳，然后减去之前的时间戳，大于设置的时间间隔
        if(Date.now() - previous > wait) {
            clearTimeout(timer);
            timer = null
            // 更新上一次的时间戳为当前时间戳
            previous = Date.now();
            fn.apply(this, args);
        } else if(!timer) {
            // 设置下一个定时器
            timer = setTimeout(() => {
                timer = null;
                fn.apply(this, args)
            }, wait)
        }
    }
}
```


## 参考
- [JavaScript专题之跟着underscore学防抖](https://github.com/mqyqingfeng/Blog/issues/22)
- [JavaScript专题之跟着 underscore 学节流](https://github.com/mqyqingfeng/Blog/issues/26)
- [防抖和节流](http://www.conardli.top/docs/JavaScript/%E9%98%B2%E6%8A%96.html)