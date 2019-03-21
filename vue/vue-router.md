# vue-router
## hash模式和history模式
hash模式(vue-router默认hash模式)就是看到路由上面会有一个 `#`号, 例如`http://localhost:8800/#/`; javascript通过hashChange事件来监听url的变化
history模式,就是直接匹配的`/`, 这种模式充分利用 `history.pushState` API来完成URL跳转而无需重新加载页面
```js
const router = new VueRouter({
// 使用HTML5的History路由模式
  mode: 'history',
  routes: [...]
})
```
history模式, 需要后端配置支持, 因为我们的应用是单页应用, 后端如果没有配置, 访问 `http://localhost:8800/home`就是404;
后端需要配置在接收到所有的请求后, 都会指向同一个index.html

## 钩子函数的使用常见场景
beforeEach和afterEach

1. 修改页面的标题
```js
router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
})
```
### 微信中给vue单页应用设置标题
```js
function addELementToBody(el) {
    if (document.body) {
        document.body.appendChild(el);
    } else {
        window.onload = function () {
            document.body.appendChild(el);
        };
    }
}
function setTitle(title = '') {
    if (title) {
        window.document.title = title;
         // 兼容IOS下的微信
        if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
            const i = document.createElement('iframe');
            i.src = '/favicon.ico';
            i.style.display = 'none';
            i.onload = function () {
                setTimeout(() => {
                    i.remove();
                }, 9);
            };
            addELementToBody(i);
        }
        return Promise.resolve();
    }
    return Promise.reject('请传递title参数');
};

export default setTitle;
```
2. 每次页面跳转控制滚动到最顶部
```js
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
})
```
3. 判断是否登录
```js
router.beforeEach((to, from, next) => {
    if(window.localStorage.getItem('token')) {
        next();
    } else {
        next('/login');
    }
})
```
next参数为false时, 可以取消导航, 设置为具体的路径可以导航到指定的页面;
> 正确的使用好导航钩子可以实现一些全局性的功能, 而且便于维护

## 路由懒加载(按需加载)
如果使用babel, 则需要添加 `syntax-dynamic-import` 该插件

懒加载的写法：
```js
const Foo = () => import('./Foo.vue')
```
### 命名chunk及把组件按组分块
#### 命名chunk
使用了异步路由之后, 编译出来的每个页面的js都叫做chunk(块),默认的chunk都是以0, 1, 2, 3 ... 来命名的, 这样开发的时候不太方便看出具体是哪个模块的chunk, 我们可以给每个chunk都进行命名;
在webapck配置的出口output里通过设置chunkFilename字段修改chunk命名:

```js
{
    output: {
    publicPath: '/dist/',
    // [hash:8] 修改为8位数的hash值
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].chunk.js'
  },
}
```
有了chunk后, 在每个页面(.vue文件)里写的样式也需要配置后才会打包进main.css, 否则仍然会通过JavaScript动态创建`<style>`标签的形式写入.
配置插件
```js
plugins: [
    new ExtractTextPlugin({
      filename: '[name].[hash:8].css',
      allChunks: true
    }),
]
```
#### 把组件按组分块
使用命名chunk, 一个特殊的注释语法来提供chunk name
```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```
命名相同的webapck会打包到同一个chunk下;

.babelrc的配置
```js
{
  "presets": ["stage-3", "env"],
  "plugins": ["transform-runtime", "syntax-dynamic-import"],
  // "comments": false, 
  "env": {
    "production": {
        "plugins": [
            ["transform-remove-console"]
        ]
    }
}
}
```
> "comments": false,  该项一定不要保留,因为会把注释的部分去掉, 但是命名chunk规则是根据注释来判断的;

### 匹配404路由
在路由列表的最下面加上如下代码
```js
new Router({
  routes: [{
        // 此处省略N个路由
        {
          name: '404',
          path: '/404',
          component: () => import('./notFound.vue')
        },
        {
            path: '*', // 此处需特别注意至于最底部
            redirect: '/404'
        }
  }]
})
```