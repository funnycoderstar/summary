function throttle(method, context) {
    clearTimeout(method, tId);
    method.tId = setTimeout(function(){
        method.call(context);
    })
}
window.onresize = function() {
     throttle(myFunc);
}

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