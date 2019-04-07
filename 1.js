// new Promise((resolve) => {
//     console.log(111);
//     setTimeout(() => {
//         resolve(222)
//     }, 1000)
// }).then((value) => {
//     console.log(value);
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(333)
//         }, 1000)
//     })
// }).then((value) => {
//     console.log(value);
// })

// async function sleep(ms) {
//     await new Promise((resolve) => {
//         setTimeout(resolve, ms);
//     })
// }
// (async function() {
//     console.log(111);
//     await sleep(1000);
//     console.log(222);
//     await sleep(1000);
//     console.log(333);
// })()

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}
function *print() {
    console.log(111);
    yield sleep(1000);
    console.log(222);
    yield sleep(1000);
    console.log(333);
}
let it = print();
it.next();
it.next();
it.next();
// co是Generator执行器