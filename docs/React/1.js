const old = [{
    label: 'haha',
    value: '66',
}, {
    label: 'haha1',
    value: '666',
}, ];
const new1 = [{
    label: 'haha',
    value: '66',
}];

const diff = require('deep-diff').diff;
const result = diff(old, new1);
console.log(JSON.stringify(result, undefined, '\t'));

// function format() {
//     result.forEach(({
//         kind,
//         path,
//         lhs,
//         rhs
//     }) => {
//         if (kind === 'E') {

//         }
//     })
// }
