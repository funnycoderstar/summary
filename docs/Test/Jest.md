# Jest 入门
Jest是Facebook的一套开源的 JavaScript 测试框架，它自动集成了断言，JSDOM， 覆盖率报告等开发者所需要的所有测试用例，是一款几乎零配置的测试框架。并且它对同样是 Facebook 的开源前端框架 React 的测试十分友好。
## 测试代码放在什么地方
Jest识别三种测试文件：
- 以`.test.js`结尾的文件
- 以`.spec.js`结尾的文件
- 放到`__test__文件夹`中的文件

## 常用函数介绍
我们在看其他项目写的 jest 单元测试的时候，经常能看到一些函数，比如 `describe()`, `test()`, `it()`, `expect()`, `toBe()`,`toEqual()`等等，下面我们先简单介绍一个这些函数的作用及用法，接下来会简单写几个例子来加深这些函数的理解和记忆。

- `describe(name, fn))`： 接受两个参数，第一个参数是字符串，对这一组测试进行描述，第二个参数是一个函数，函数体就是一个个的test测试。对于一个功能进行测试，但它分为多种情况，需要多个test，最好使用`describe`把多个test包起来，形成一组测试。只有这一组测试完成之后，才能说明这个功能是好的。
- `test(name, fn, timeout)`：别名为 `it(name, fn, timeout)` 第一个参数是字符串，对这一组测试进行描述,第二个参数是包含期待期望的函数。第三个参数（可选）是超时（以毫秒为单位），用于指定中止之前要等待的时间。注意：默认超时是5秒。
- `expect()`：用于断言，接受一个参数，就是运行测试内容的结果，返回一个对象，这个对象用来调用匹配器,匹配器的参数就是我们的预期结果，这样就可以对结果和预期进行对比了
- `toBe()`和`toEqual()`都是匹配器， `toBe()`是使用`Object.is`去判断是都相等的，如果你想要检测 两个对象是否相等，则使用`toEqual()`,`toEqual()`递归检查对象或数组的每个字段。

### 全局函数
全局函数的完整列表，请查阅[参考文档](https://jestjs.io/docs/en/api)
### 匹配器
匹配器用来实现断言的功能。

> 

匹配器的完整列表，请查阅 [参考文档](https://jestjs.io/docs/en/expect)

## 简单的例子
测试的写法分为三步：引入测试内容，运行测试内容，最后做一个断言进行比较，是否达到预期

## 异步测试

> 我们将请求`https://jsonplaceholder.typicode.com/todos/1`，这是由[JSONPlaceholder](https://segmentfault.com/a/1190000016232248)提供的mock请求地址

### 回调函数
```js
function fetchData(callback) {
  request('https://jsonplaceholder.typicode.com/todos/1', function (error, response, body) {
    callback(body);
  });
}
```
问题在于一旦fetchData执行结束，此测试就在没有调用回调函数前结束。
使用单个参数调用done, 而不是将测试放在一个空参数的函数，jest会等 done 回调函数执行结束后，结束测试。
```js
test('should return data when fetchData request success', (done) => {
    function callback(data) {
        expect(JSON.parse(data)).toEqual({
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        })
        done();
    }
    
    fetchData(callback);
})
```
加上done是什么意思呢，等待。当加上done以后，这个测试有没有执行完的依据就不是执行到最后一行代码，而是看 done() 有没有被调用

### Promise
```js
function fetchData1(callback) {
    return new Promise((resolve, reject) => {
        request('https://jsonplaceholder.typicode.com/todos/1', function (error, response, body) {
            if(error) {
                reject(error);
            }
            resolve(body);
        });
    })
}
```
测试函数改为
```js
test('should return data when fetchData1 request success', () => {
    return fetchData1().then(data => {
        expect(JSON.parse(data)).toEqual({
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        })
    })
})

```
在进行Promise测试的时候，在测试代码中，一定要注意使用 return, 如果没有return，就没有等待, 没有等待，就没有resolve, then也就不会执行了，测试效果达不到。如果你想测试error, 就把测试代码改成error:
```js
test('should return err when fetchData1 request error', () => {
    return fetchData1().catch(e => {
        expect(e).toBe('error');
    })
})
```
#### `expect.assertions(1)`
jest 显示pass, 但这个error 的测试并没有执行，因为 fetchData1 返回数据了，没有机会执行catch error。按理说，这种情况要显示fail，表示没有执行到。怎么办，官网建议使用expect.assertions(1); 在测试代码之前，添加expect.assertions(1);
```js
test('should return err when fetchData1 request error', () => {
    expect.assertions(1); // // 测试代码之前添加

    return fetchData1().catch(e => {
        expect(e).toBe('error');
    })
})
```
这时jest显示fail了。expect.assertions(1); 表示要执行一次断言。后面的数字表示，在一个test中，执行断言的次数，执行多少次断言，就是进行多少次对比，后面的数字就是几。如果没有执行catch，也就没有执行断言，和 这里的1不符，也就达到了测试的目的。
#### `.resolves` 和`.rejects`
对于promise的测试，还有一个简单的方法，因为promise 只有两种情况，一个是fullfill, 一个是reject，expect() 方法提供了resolves 和rejects 属性，返回的就是resolve和reject的值，可以直接调用toEqual等匹配器。看一下代码就知道了
```js
test('should return data when fetchData1 request success', () => {
    return expect(fetchData1()).resolves.toMatch(/userId/);  // 直接在expect函数中调用 fetchData 函数
});
test('should return err when fetchData1 request error', () => {   
    return expect(fetchData1()).rejects.toBe('error');
});
```
### Async/Await
还可以使用async/await 对Promise 进行测试，因为await后面的表达式就是Promise, 这时 test 的第二个参数就要加上async关键字了
```js
test('should return data when fetchData1 request success (use async/await)', async () => {
        let expectResult = {
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        };

        let data = await fetchData1();
        expect(JSON.parse(data)).toBe(expectResult);
        
    });
    test('should return err when fetchData1 request error (use async/await)', async () => {   
        expect.assertions(1);
        try {
            await fetchData1();
        } catch(e) {
            expect(e).toBe('error');
        }
    });
```
当然，也可以把async/await 与resolves 和rejects 相结合，
```js
test('should return data when fetchData1 request success (use async/await && .resolves)', async () => {
    await expect(fetchData1()).resolves.toMatch(/userId/);
});
test('should return err when fetchData1 request error (use async/await && .rejects)', async () => {   
    await expect(fetchData1()).rejects.toBe('error');
});

```
## 钩子函数
Jest为我们提供了四个测试用例的钩子： beforeAll()、afterAll()、beforeEach()、afterEach()。
beforeAll()和afterAll() 会在所有测试用例之前和所有测试用例之后执行一次。
beforeEach() 和 afterEach()会在每个测试用例之前和之后执行。


## 分组
我们可以使用`describe`将测试用例分组，在`describe`块中的钩子函数只作用于块内的测试用例：


## Mock 函数
在测试中，Mock可以让你更方便的去测试依赖数据库，网络请求，文件等外部系统的函数。
Jest内置了 Mock 机制，提供了多种 mock方式已应对各种需求。




## 参考
- [Jest官方文档](https://jestjs.io/docs/en/getting-started)
- [React 测试入门教程](http://www.ruanyifeng.com/blog/2016/02/react-testing-tutorial.html)
- [Jest 单元测试入门](https://www.cnblogs.com/SamWeb/p/11454923.html)
- [使用Jest测试JavaScript (入门篇)](https://segmentfault.com/a/1190000016232248)
- [测试框架 Jest 实例教程](https://blog.whezh.com/jest-tutorial/)