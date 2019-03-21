# 函数节流

> [函数节流](http://www.alloyteam.com/2012/11/javascript-throttle/)

> ## 使用场景:
>
> * 对于常见的场景，如网页滚动时，经常会有滚动到哪时做什么样的动画效果，遂要注册onscroll事件，如何减少触发次数，到达优化性能，同时又满足效果要求不卡顿，一个是优化事件内代码，减少代码量，二就是做函数节流。
> * 在前端开发中，有时会为页面绑定resize事件，或者为一个页面元素绑定拖拽事件（其核心就是绑定mousemove），这种事件有一个特点，就是用户不必特地捣乱，他在一个正常的操作中，都有可能在一个短的时间内触发非常多次事件绑定程序。而大家知道，DOM操作时很消耗性能的，这个时候，如果你为这些事件绑定一些操作DOM节点的操作的话，那就会引发大量的计算，在用户看来，页面可能就一时间没有响应，这个页面一下子变卡了变慢了。甚至在IE下，如果你绑定的resize事件进行较多DOM操作，其高频率可能直接就使得浏览器崩溃。



> **原理**
>
> 定时器，当触发一个事件时，先setTimeout让这个事件延迟一会再执行，如果在这个时间间隔内又触发了事件，那我们就clear掉原来的定时器，再setTimeout一个新的定时器延迟一会执行

```javascript
function throttle(method, context) {
    clearTimeout(method, tId);
    method.tId = setTimeout(function(){
        method.call(context);
    })
}
window.onresize = function() {
     throttle(myFunc);
}
```

```javascript
var throttle = function(fn, delay) {
    var timer = null;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn.apply(context, args);
        }, delay);
    }
}
window.onresize = throttle(myFunc, 100);
```

```javascript
var throttleV2 = function (fn, delay, mustRunDelay) {
    var timer = null;
    var t_start;
    return function() {
        var context = this, args = arguments, t_curr = +new Date();
        clearTimeout(timer);
        if(!t_start) {
            t_start = t_curr;
        }
        if(t_curr - t_start >= mustRunDelay) {
            fn.apply(context, args);
        } else {
            timer = setTimeout(function() {
                fn.apply(context, args);
            }, delay);
        }
    }
}
window.onresize = throttleV2(myFunc, 50, 100);
```

