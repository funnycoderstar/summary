## ，Promise.all的地方用async怎么写
```js
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = await Promise.all(promises);
  console.log(results);
}

// 或者使用下面的写法

async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = [];
  for (let promise of promises) {
    results.push(await promise);
  }
  console.log(results);
}
```

## 实现一个sleep
```js

async function sleep(ms) {
    await new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}
(async function() {
    console.log(111);
    await sleep(1000);
    console.log(222);
    await sleep(1000);
    console.log(333);
})()
```