# Jest 入门
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
- `toBe()`和`toEqual()`都是匹配器

> 
全局函数的完整列表，请查阅[参考文档](https://jestjs.io/docs/en/api)
匹配器的完整列表，请查阅 [参考文档](https://jestjs.io/docs/en/expect)

## 简单的例子
测试的写法分为三步：引入测试内容，运行测试内容，最后做一个断言进行比较，是否达到预期

## 回调函数

## 参考
- [Jest官方文档](https://jestjs.io/docs/en/getting-started)
- [React 测试入门教程](http://www.ruanyifeng.com/blog/2016/02/react-testing-tutorial.html)
- [Jest 单元测试入门](https://www.cnblogs.com/SamWeb/p/11454923.html)