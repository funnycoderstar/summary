# webpack  require.ensure

vue-cli构建的项目,默认情况下执行npm run build,会将所有的js代码打包为一个整体

router/index.js
```js
import Hello from '@/components/Hello'
import Province from '@/components/Province'
import Segment from '@/components/Segment'
import User from '@/components/User'
import Loading from '@/components/Loading'
```
执行 npm run build 会打包为一个整体 app.[contenthash].js ,这个文件是非常大,可能几兆或者几十兆,加载会很慢


所以我们需要分模块打包,把我们想要组合在一起的组件打包到一个 chunk块中去

分模块打包需要下面这样使用 webpack的 require.ensure,并且在最后加入一个 chunk名,

相同 chunk名字的模块将会打包到一起

```js
const Province = r => require.ensure([], () => r(require('@/components/Province.vue')), 'chunkname1')
const Segment = r => require.ensure([], () => r(require('@/components/Segment.vue')), 'chunkname1')
const Loading = r => require.ensure([], () => r(require('@/components/Loading.vue')), 'chunkname3')
const User = r => require.ensure([], () => r(require('@/components/User.vue')), 'chunkname3')
```
这样就把一个大的 js文件分为一个个小的js文件了,按需去下载,其他的使用方法和import的效果一样

# 语法
```js
require.ensure(dependencies: String[], callback: function(require), chunkName: String)
```

# commonjs预加载懒执行

require.ensure(['./list'], function(require){
    var list = require('./list');
    list.show();
});

给require.ensure的第一个参数传了['./list']，执行到这里的时候list.js会被浏览器下载下来，但是并不会执行list.js模块中的代码，也就是webpack官网说的，不会进行evaluate。真正进行evaluate的时候是到了后面这句var list = require('./list');这就是所谓的懒执行。

