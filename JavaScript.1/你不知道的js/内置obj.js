// const obj = {
//     b: 2
// };
// Object.defineProperty(
//     obj,
//     'a',
//     {
//         enumerable: false,
//         value: 1
//     }
// )
// for( let k in obj) {
//     console.log(k, obj[k]);
// } // b 2
// console.log(obj.propertyIsEnumerable('a')); // false
// console.log(obj.propertyIsEnumerable('b')); // true

// console.log(Object.keys(obj)); // [ 'b' ]
// console.log(Object.getOwnPropertyNames(obj)); // [ 'b', 'a' ]
// // 只会查对象包含的属性

// var myArray = [1, 2, 3,];
// for( var v of myArray) {
//     console.log(v);
// };

// var myArray = [1, 3, 4];
// var it = myArray[Symbol.iterator];
// it.next();
// it.next();
// it.next();
// it.next();
// var myObject = {
//     a: 2,
//     b: 3
// };

// Object.defineProperty(myObject, Symbol.iterator,{
//     enumerable: false,
//     writable: false,
//     configurable: true,
//     value: function() {
//         var o = this;
//         var idx = 0;
//         var ks = Object.keys[o];
//         return {
//             next: function() {
//                 return {
//                     value: o[ks[idx++]],
//                     done: (idx > ks.length)
//                 };
//             }
//         }
//     }
// });
// var it = myObject[Symbol.iterator];
// it.next();
// it.next();


function Observer(data) {
    this.data = {};
    for (const key of Object.keys(data)) {
        if (typeof data[key] === 'object') {
            data[key] = new Observer(data[key]);
        }
        Object.defineProperty(this.data, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                console.log(`你访问了${key}`);
                return data[key];
            },
            set: function (newVal) {
                if (typeof newVal === 'object') {
                    newVal = new Observer(newVal);
                }
                console.log(`你设置了${key}`);
                console.log(`新的${key}=${newVal}`);
                if (newVal === data[key]) {
                    return;
                }
                data[key] = newVal;
            }
        })
    }
}

Observer.prototype.$watch = function (key, cd) {
    let value = this[key];
    Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log(`你访问了${key}`);
            return value;
        },
        set: function (newValue) {
            cd(newValue);
            value = newValue;
            return newValue;
        }
    })
}

const app1 = new Observer({
    name: 'wang',
    sex: 'giri',
    age: 12,
});
console.log(app1.data.name);
app1.data.sex = 'boy';
console.log(app1.data.sex);
app1.age = 100;
app1.$watch('age', function(newVal) {
    console.log(`我现在年龄变了，我现在${newVal}岁了`);
})
