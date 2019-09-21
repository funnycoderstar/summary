function my_co(it) {
    return new Promise((resolve, reject) => {
        function next(data) {
            try {
                var {value, done } = it.next(data);
            } catch(e) {
                reject(e);
            }
            // done为true,表示迭代完成
            if(!done) {
                Promise.resolve(value).then(val => {
                    next(val)
                }, reject)
            } else {
                resolve(value);
            }
        }
        next();
    })
}
function *test() {
    yield new Promise((resolve, reject) => {
        setTimeout(resolve, 100);
    })
    yield new Promise((resolve, reject) => {
        resolve(1);
    })
    yield 10;
    return 100;
}
my_co(test()).then(data => {
    console.log(data);
}).catch((err) => {
    console.log('err', err);
})

