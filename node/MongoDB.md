# MongoDB
MongoDB一种NoSQL数据库，存储的数据对象由键值对组成。
MongoDB
## 增
insert、insertOne、insertMany、save
## 删
deleteOne、deleteMany、remove
## 改
update、save
## 查
findOne 和 find
条件操作符 sort，limit skip
复合条件查询 and or

## MongoDB可视化工具
[Robo 3T](https://robomongo.org/download)


# mongoose
```js
const mongoose = require('mongoose'); // 引用mongoose模块
mongoose.connect('mongodb://localhost/test'); // 创建一个数据库连接

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
```

# 参考
[mongoosejs](http://mongoosejs.net/docs/guide.html)
[MongoDB使用初探](https://juejin.im/post/5d0f34c7f265da1ba25268ee?utm_date=0624&utm_source=wx&utm_type=article&utm_medium=fe)
[Mongoose学习参考文档——基础篇](https://cnodejs.org/topic/504b4924e2b84515770103dd)