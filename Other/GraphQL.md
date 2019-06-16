# 目录
- 什么是GraphQL
- 解决了什么问题
- GraphQL一个简单的入门示例

# 什么是GraphQL
官方文档定义：一种用于API的查询语言， Graph + Query
有以下特点
1. 请求你所要的数据不多不少
2. 获取多个资源只用一个请求
3. 描述所有可能的类型系统

# 解决了什么问题

## 1. 来说一个实际的场景：
前后端联调接口一直以来都是特别费劲的一个环节，使用REST接口，接口返回的数据格式，数据类型（有哪些字段，字段的类型）都是后端自己预先定义好的，如果返回的数据格式并不是调用者所期望的，作为前端的我们可以通过以下两种方式去解决
- 和后端沟通，该接口（更改数据源）
- 自己做一些适配工作（处理数据源）
有这种经历的人都知道，让后端改接口这是一个很不现实方案，尤其是对于三端（web、andriod、ios）公用同一套后端接口的情况下， 让后端改接口的结构基本不可能，所以一般都是前端自己做一些接口数据的适配工作

其实我们真的很希望， 我们需要什么数据，需要什么格式，后端就按照什么格式给我们返回什么样的数据结构，我们要哪些字段，后端就只给我们返回我们需要的这些字段， 其他的都不返回，这样，前端就和后端解耦了，我们不用再每天和后端因为接口问题去撕逼，GraphQL就是一个这样的思路来帮助我们解决这个前后端联调接口的问题， 在前端直接写查询， 后端只管给前端返回前端查询的这些数据；

## 2. 还有一种场景: 
一个页面里展示的信息， info1, info2, info3，前端需要请求多个接口，info1对应的接口A中的a字段，info2对应的接口B中的b字段，info3对应的接口C中的c字段
```js
// /api/user/A
{
    id: 1111,
    name: '张三',
    a: '当前页面要展示的info1',
    b: 'b'
    // 其他字段
}
// /api/order/B
{
    id: 2222,
    name: 'hahah',
    a: 'a'
    b: '当前页面要展示的info2',
    // 其他字段
}
// /api/system/C
{
    id: 3333,
    name: 'hehe',
    a: 'a'
    c: '当前页面要展示的info3',
    // 其他字段
}
```
这个时候，稍微有点脾气的前端，都会去找后端撕逼，

前端A: “就这三个字段，你还让我请求三个接口，你不能一个接口都返回给我吗”， 
后端B：“哎， 我也想啊，但是xxxxx， 所以我这边不好改，”， 
...
最后那就这样吧。

当然，我举得这个例子是一个很简单的场景，实际开发过程中要比这个还要复杂；

如果使用GraphQL的话，前端自己写查询，这个页面需要哪些需哪数据，后端就返回给哪些数据，
这是考虑到后端所有的接口都在同一个域下面，但是一般比较复杂的系统，后端都会分为不同的域， 用户域，商品域，基础模块域，交易域等等，这时即使用了GraphQL也可能

后端C：“你看其他都不是我负责的域，我要是自己给你封装一个，我自己底层需要经过xxxxx等复杂的步骤去获取其他域的，这个很复杂， 你还是直接去他哪个域去查询吧”， 

有两种方法，
- 你就再多写一个GraphQL
- 自己写一个node中间层，中间层来处理这些接口数据的聚合，换句话说，中间层来聚合成一个GraphQL查询来返回给前端， 中间层分别取调用服务端的三个接口，然后把三个接口返回的数据聚合成前端所需要的

# GraphQL一个简单的入门示例

## 准备
```js
npm i --save express  express-graphql graphql cors
```

## 服务端代码
```js
var express = require('express');
var graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors'); // 用来解决跨域问题

// 创建 schema，需要注意到：
// 1. 感叹号 ！ 代表 not-null
// 2. rollDice 接受参数
const schema = buildSchema(`
  type Query {
    username: String
    age: Int!
  }
`)
const root = {
    username: () => {
        return '李华'
    },
    age: () => {
        return Math.ceil(Math.random() * 100)
    },
}
const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.listen(3300);
console.log('Running a GraphQL API server at http://localhost:3300/graphql')
```
## 客户端代码
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>graphql demo</title>
</head>

<body>
    <button class="test">获取当前用户数据</button>
    <p class="username"></p>
    <p class="age"></p>
</body>
<script>
    var test = document.querySelector('.test');
    test.onclick = function () {
        var username = document.querySelector('.username');
        var age = document.querySelector('.age');
        fetch('http://localhost:3300/graphql', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                query: `{
                    username,
                    age,
            }`
            }),
            mode: 'cors' // no-cors, cors, *same-origin
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (res) {
                console.log('返回结果', res);
                username.innerHTML = `姓名：${res.data.username}`;
                age.innerHTML = `年龄：${res.data.age}`
            })
            .catch(err => {
                console.error('错误', err);
            });
    }
</script>

</html>
```

## 运行结果
![graphql](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1560253107918.gif)

## 参考
[graphql官方文档](http://graphql.cn/)
[GraphQL 入门介绍](https://www.cnblogs.com/Wolfmanlq/p/9094418.html)