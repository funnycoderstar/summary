// const obj = {
//     name: 'app',
//     age: '18',
//     a: {
//         b: 1,
//         c: 2,
//     },
// }
// const p = new Proxy(obj, {
//     get(target, propKey, receiver) {
//         console.log('你访问了' + propKey);
//         if (!(propKey in target)) {
//             console.log(111);
//             // target[key] = Tree();  // auto-create a sub-Tree
//           }
//         return Reflect.get(target, propKey, receiver);
        
//     },
//     set(target, propKey, value, receiver) {
//         console.log('你设置了' + propKey);
//         console.log('新的' + propKey + '=' + value);
//        return Reflect.set(target, propKey, value, receiver);
//     }
// });
// p.age = '20';
// console.log(p.age);
// p.newPropKey = '新属性';
// console.log(p.newPropKey);
// console.log(p.a.b);
// p.a.d = '这是obj中a的属性';
// console.log(p.a.d);

// vue是深度observe的，会对这个再次执行observe，维护另一个数组

// var deepApply = function(receiver, property, data){
//     var proxy = proxify();
//     var props = Object.keys(data);
//     var size = props.length;

//     for(var i = 0; i < size; i++){
//         property = props[i];
//         proxy[property] = data[property];
//     }
//     return proxy;
// };
// var handler = {
//     get: function(target, property, receiver){
//         console.log(1111, property);
//         if(!(property in target)){
//             console.log(1111);
//             target[property] = proxify();
//         }
//         return Reflect.get(target, property, receiver);
//     },
//     set: function(target, property, value, receiver){
//         console.log(5555, property);
//         // extend proxify to appended nested object
//         if(({}).toString.call(value) === "[object Object]") {
//             value = deepApply(receiver, property, value);
//         }
//         return Reflect.set(target, property, value, receiver);
//     },
// };
// function proxify( defprop = {} ){
//     return new Proxy(defprop, handler);
// };
// const test = proxify(obj);
// test.a.b = '666';
// console.log(test.a.b);

// function proxify(event) {
//     return isPrimitive(event) ? event : new Proxy(event, { get: getProp });
//   }
//   function isPrimitive(v) {
//       const value = v == null || (typeof v !== 'function' && typeof v !== 'object');
//          console.log(value);
//          return value;
//   }
//   function getProp (target, property) {
//     if (property in target) {
//       return proxify(target[property]);
//     } else {
//       return proxify({});
//     }
//   }

// const aaa = proxify(obj);
// console.log(aaa);
// console.log(aaa.a.b);

function createDeepProxy(target, handler) {
    const preproxy = new WeakMap();
  
    function makeHandler(path) {
      return {
        set(target, key, value, receiver) {
          if (typeof value === 'object') {
            value = proxify(value, [...path, key]);
          }
          target[key] = value;
  
          if (handler.set) {
            handler.set(target, [...path, key], value, receiver);
          }
          return true;
        },
  
        deleteProperty(target, key) {
          if (Reflect.has(target, key)) {
            unproxy(target, key);
            let deleted = Reflect.deleteProperty(target, key);
            if (deleted && handler.deleteProperty) {
              handler.deleteProperty(target, [...path, key]);
            }
            return deleted;
          }
          return false;
        }
      }
    }
  
    function unproxy(obj, key) {
      if (preproxy.has(obj[key])) {
        // console.log('unproxy',key);
        obj[key] = preproxy.get(obj[key]);
        preproxy.delete(obj[key]);
      }
  
      for (let k of Object.keys(obj[key])) {
        if (typeof obj[key][k] === 'object') {
          unproxy(obj[key], k);
        }
      }
  
    }
  
    function proxify(obj, path) {
      for (let key of Object.keys(obj)) {
        if (typeof obj[key] === 'object') {
          obj[key] = proxify(obj[key], [...path, key]);
        }
      }
      let p = new Proxy(obj, makeHandler(path));
      preproxy.set(p, obj);
      return p;
    }
  
    return proxify(target, []);
  }
  
  let obj = {
    foo: 'baz',
  }
  
  
  let proxied = createDeepProxy(obj, {
    set(target, path, value, receiver) {
      console.log('set', path.join('.'), '=', JSON.stringify(value));
    },
  
    deleteProperty(target, path) {
      console.log('delete', path.join('.'));
    }
  });
  
  proxied.foo = 'bar';
  proxied.deep = {}
  proxied.deep.blue = 'sea';
  delete proxied.foo;
  delete proxied.deep; // triggers delete on 'deep' but not 'deep.blue'