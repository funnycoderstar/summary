class Promise {
    constructor(fn) {
        this.status = 'pending';
        this.sList = [];
        this.fList = [];

        fn(this.resolve.bind(this), this.reject.bind(this));
    }
    then(scb, fcb) {
        if (scb) {
            this.sList.push(scb);
        }
        if(fcb) {
            this.fList.push(fcb);
        }
        return this;
    }
    catch(cb) {
        if (cb) {
            this.fList.push(cb);
        }
        return this;
    }
    resolve(data) {
        if (this.status !== 'pending') return;
        this.status = 'fulfilled';
        setTimeout(() => {
            this.sList.forEach(s => {
                data = s(data);
            })
        })
    }
    reject(err) {
        if (this.status !== 'pending') return;
        this.status = 'rejected';
        setTimeout(() => {
            this.fList.forEach(f => {
                err = f(err);
            })
        })
    }
    static reject(err) {
        return new Promise((resolve, reject) => {
            reject(err);
        })
    }
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

