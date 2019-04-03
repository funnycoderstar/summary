## 理解一些基础概念
原型链，类，实例， 类属性，类方法， 实例属性，实例方法
```js
class A {
    static b = '1'
    static classMethod() {
        return 'hello'
    }

}
const a = new A();
a.c = 5;
a.sayHello = function() {
    console.log('welcome')
}
```

A: 类
b: 类属性
classMethod: 类方法
A: 实例


## 实现一个promise
```js

class Promise {
    constructor(fn) {
        this.status = 'pending';
        this.resoveList = []; // 成功后回调函数
        this.rejectList = []; // 失败后的回调函数

        fn(this.resolve.bind(this), this.reject.bind(this));
    }
    then(scb, fcb) {
        if (scb) {
            this.resoveList.push(scb);
        }
        if(fcb) {
            this.rejectList.push(fcb);
        }
        return this;
    }
    catch(cb) {
        if (cb) {
            this.rejectList.push(cb);
        }
        return this;
    }
    resolve(data) {
        if (this.status !== 'pending') return;
        this.status = 'fulfilled';
        setTimeout(() => {
            this.resoveList.forEach(s => {
                data = s(data);
            })
        })
    }
    reject(err) {
        if (this.status !== 'pending') return;
        this.status = 'rejected';
        setTimeout(() => {
            this.rejectList.forEach(f => {
                err = f(err);
            })
        })
    }
    // 实现Promise.reject
    static reject(err) {
        return new Promise((resolve, reject) => {
            reject(err);
        })
    }
    // 实现Promise.resolve
    static resolve(err) {
        return new Promise((resolve, reject) => {
            resolve(err);
        })
    }
    
}

const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('resolve');
        resolve(222);
    }, 1000)
})

p.then(data => {
    setTimeout(() => {
        console.log('data', data);
    })
    return 3333;
}).then(data2 => {
    console.log('data2', data2);
}).catch(err => {
    console.error('err', err);
});

const p1 = Promise.reject('出错了');
p1.then(null, function (s) {
    console.log(s)
  });

```


