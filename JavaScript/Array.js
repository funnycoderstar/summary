const people = [
    {name: 'aaa', age: 1},
    {name: 'bbb', age: 1},
    {name: 'ccc', age: 2}
];
function gounpBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
        const key = obj[property];
        if(!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {})
}
const a = gounpBy(people, 'age');
console.log(a);
