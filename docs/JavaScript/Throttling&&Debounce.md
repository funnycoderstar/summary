## 函数节流(throlle)
指定时间间隔内只会执行一次任务, 比如: 每100毫秒最多执行一次此函数
```js
function throttle(fn, delay) {
    let canRun = true; // 上一个setTimeout是否已经结束, 是否要允许开启下一个setTimeout
    return function () {
        if(!canRun) {
            return;
        }
        canRun = false;
        setTimeout(() => {
            fn.apply(this, arguments);
            canRun = true;
        }, delay)
    }
}
```
函数节流就是通过闭包保存一个标记`(canRun = true)`, 在函数判断这个标记是否为true, 如果是true, 就继续执行函数, 如果是false, 则说明上一个setTimeout还未执行完, 则停止,判断完这个标记后立即把这个标记这是成false, 然后把外部传入的函数的执行包在一个setTimeout中, 最后在setTimeout执行完毕后再把`canRun`设置为true, 表示可以执行下一次循环了.当setTimeout还未执行的时候, canRun这个标记始终为false, 在开头的判断已经被return掉了;
## 函数防抖(debounce)
任务频繁触发的情况下, 只有任务触发的间隔超过指定间隔的时候, 任务才会执行
```js
function debounce(fn, delay) {
    let timer = null;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, delay)
    }
}
```
通过闭包保存一个标记(timer)来保存setTimeout返回的值, 每当要触发函数的时候, 需要先把上一个setTimeout清除掉, 然后再创建一个新的setTimeout, 这样就能保证执行函数后的delay间隔内如果还要触发函数, 就不会执行fn

