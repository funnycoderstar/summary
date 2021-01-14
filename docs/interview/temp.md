## 2020年面试总结

本篇面试题总结并没有按照公司那样分类而是按照知识点进行非简单分类，很多面试题问的频率非常高，所以面试的时候如果第一次问完，没回答上来或者回答的不太好，一定要在面完的第一时间记录下来并且查找资料，否则就忘记了，或者之后再看就没有了当时迫切想知道具体答案的那种心情了（有迫切的想知道某些知识的心情的时候目标很明确，学东西也会印象深刻记得牢）


## 笔试题
1. 写一个深拷贝，考虑 正则，Date这种类型的数据  ( * 3)
2. Vue自定义指令懒加载 (* 2)
3. 判断DOM标签的合法性，标签的闭合，span里面不能有div， 写一个匹配DOM标签的正则
4. 替换日期格式，xxxx-yy-zz 替换成 xxx-zz-yy
5. 实现Promise.all, Promise.allSettled的实现
6. 获取一段DOM节点中标签个数最多的标签

笔试题中的算法题
1. 二叉树的最大高度
2. 另一个树的子树
3. 相同的树
4. 斐波那契数列
5. 

## CSS
1. css var 自定义变量的兼容性
2. flex
    - flex: 1具体代表什么, 有什么应用场景
3. 

## JS
1. 宏任务和微任务 ( * 6)
1.1 下面输出什么
```js
console.log('start');
setTimeout(() => {
    console.log('children2');
    Promise.resolve().then(() => {
        console.log('children3');
    })
}, 0);

new Promise(function(resolve, reject) {
    console.log('children4');
    setTimeout(function() {
        console.log('children5');
        resolve('children6')
    }, 0)
}).then((res) => {
    console.log('children7');
    setTimeout(() => {
        console.log(res);
    }, 0)
})
// start children4 children2 children3 children5 children7   children6 
```
1.2 下面题目输出什么
```js
const p = function() {
    return new Promise((resolve, reject) => {
        const p1 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(1)
            }, 0)
            resolve(2)
        })
        p1.then((res) => {
            console.log(res);
        })
        console.log(3);
        resolve(4);
    })
}


p().then((res) => {
    console.log(res);
})
console.log('end');

// 3 end 2 4
// 注意 1是不输出的
```
2. String([]) 为 ’‘， String({})为 '[object object]'
3. 首屏加载优化
4. 浏览器渲染（从输入url到页面渲染的完成过程）
5. 说一下你对Promise的了解
## React
1. React hooks

## Vue
1. vue3.0

## HTTP
1. HTTP缓存 (* 4)
2. 简单请求和复杂请求


## 新东方1面
1. 代码的执行顺序
```js
console.log('start');
setTimeout(() => {
    console.log('children2');
    Promise.resolve().then(() => {
        console.log('children3');
    })
}, 0);

new Promise(function(resolve, reject) {
    console.log('children4');
    setTimeout(function() {
        console.log('children5');
        resolve('children6')
    }, 0)
}).then((res) => {
    console.log('children7');
    setTimeout(() => {
        console.log(res);
    }, 0)
})
// start children4 children2 children3 children5 children7   children6 

```
这道题对应的知识点:
- 宏任务和微任务
- 浏览器中宏任务和微任务有哪些，

2. 写一个深拷贝，考虑 正则，Date这种类型的数据
3. webpack的优化
4. HTTP缓存
5. 首屏加载优化
6. 浏览器渲染（从输入url到页面渲染的完成过程）
7. React hooks
8. vue3.0
9. 说一下你对Promise的了解
10. webapck的plugin和loader的编写

```js
function deepCopy(originObj, map = new WeakMap()) {
    // 判断是否为基本数据类型
    if(typeof originObj === 'object') {
        // 判断是都否为数组
        const cloneObj = Array.isArray(originObj) ? [] : {};
        // 判断是否为循环引用
        if(map.get(originObj)) {
            return map.get(originObj);
        }
        map.set(originObj, cloneObj);
        for(const prop in originObj) {
            cloneObj[prop] = deepCopy(originObj[prop], map);
        }
        return cloneObj;
    } else {
        return originObj;
    }
}

```

## 新东方二面
1. 判断DOM标签的合法性，标签的闭合，span里面不能有div， 写一个匹配DOM标签的正则
2. String([]) 为 ’‘， String({})为 '[object object]'
3. 替换日期格式，xxxx-yy-zz 替换成 xxx-zz-yy
```js
var reg = /(\d{2})\.(\d{2})\/(\d{4})/
var data = '10.24/2017'
data = data.replace(reg, '$3-$1-$2')
console.log(data)//2017-10-24
```
4. CSS的实现
    - 淘宝购物车添加商品到购物车的动画
    - toolTip的实现
- [这回试试使用CSS实现抛物线运动效果](https://www.zhangxinxu.com/wordpress/2018/08/css-css3-%e6%8a%9b%e7%89%a9%e7%ba%bf%e5%8a%a8%e7%94%bb/)

5. HTTP2的性能优化方面，真的优化很多么
6. webapck plugin和loader的顺序
8. DLLPlugin原理，为什么不直接使用压缩版本的js
9. 通过哪些指标去衡量性能优化的
10. 写一个时钟的组件，需要考虑什么
11. React hooks的坑（可能会有内存泄露的问题）,react组件的性能测试，React的errorBundray
12. 获取一段DOM节点中标签个数最多的标签


## 知乎一面
1. hooks相关的题目
    - hooks如何监听响应的，内部是如何做到只有数据修改的时候才执行函数
    - 依赖的值发生变化，需要不停地监听和绑定事件
    - Hoc和mixin的区别是什么（有点和其自身的缺点）
    - render props 和HOC相比的优缺点

2. ref相关的题目
    - 创建ref的几种方法

3. context
    - 怎么使用
    - 内部原理怎么做到的

4. React新的生命周期，为什么 getDrivedStatefromProps是静态的
5. react中TS的声明

## 知乎二面

1. Redux相关的题目
    - redux使用方法，为什么action要返回一个函数，返回一个对象可以么
    - state为什么要设计成不可变的
    [为什么redux要返回一个新的state引发的血案](https://juejin.im/post/5c1b6925e51d455ac91d6bac)
    [阮一峰-Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

2. 简单请求和复杂请求
[阮一峰-跨域资源共享 CORS 详解](https://www.ruanyifeng.com/blog/2016/04/cors.html)

3. 设置强缓存的情况下如何让用户请求到最新的资源
[前端缓存最佳实践](https://zhuanlan.zhihu.com/p/52916788)

4.  说一下flex
    - flex: 1具体代表什么, 有什么应用场景
    - flex-basic
[Flex 布局教程：语法篇](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

5. babel的缓存是怎么实现的
6. webapck的HMR，怎么配置：
  - 浏览器是如何更新的
  -  如何做到页面不刷新也就就自动更新的
  - webpack-dev-server webapck-dev-middleware

[Webpack Hot Module Replacement 的原理解析#15](https://github.com/Jocs/jocs.github.io/issues/15)

7. cli工具的一些实现， babel和webpack配置的封装，为什么不直接放在单独的文件中

8. Promise的相关代码编写
```js
function timeout(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms, 'true');
    });
  }
  
  timeout(1000).then((value) => {
    console.log(value);
  });

```
## 知乎三面

1. css var 自定义变量的兼容性
2. 为什么要离职，
3. 想去什么样的团队，


## 快手1面
1. 写一个简单的diff
2. webapck相关的
 - 自己有没有写过ast, 
 - webpack通过什么把公共的部分抽出来的，属性配置是什么，写一道算法题，如何比较两颗树，找出两个树公共的部分，一颗树是否是另一颗的子树。
webpack怎么配置mock转发代理，

3. mock的服务，怎么拦截转换的
修改的XMLHTTPRequest对象，使用mock版本替代的

4. cli有哪些配置

5. 缓存（强缓存），如何设置缓存，
6. HTTP2

7. 单例的应用

8. 什么是闭包，闭包的应用场景
https://juejin.im/post/58f1fa6a44d904006cf25d22

## 快手2面
1. 如何判断 当前浏览器是否支持webp
2. 自定义指令的懒加载
[延迟加载(Lazyload)三种实现方式](https://zhuanlan.zhihu.com/p/25455672)
```js
<div>
    <img src="loading.gif" data-src="https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_1280.jpg" alt="">
    <img src="loading.gif" data-src="https://cdn.pixabay.com/photo/2014/08/01/00/08/pier-407252_1280.jpg" alt="">
    <img src="loading.gif" data-src="https://cdn.pixabay.com/photo/2014/12/15/17/16/pier-569314_1280.jpg" alt="">
    <img src="loading.gif" data-src="https://cdn.pixabay.com/photo/2010/12/13/10/09/abstract-2384_1280.jpg" alt="">
    <img src="loading.gif" data-src="https://cdn.pixabay.com/photo/2015/10/24/11/09/drop-of-water-1004250_1280.jpg">
</div>
```

```js
var img = document.getElementsByTagName('img');
 var n = 0;
 lazyload();

 function throttle(fn, wait) {
    let timer = null;
    return function(...args) {
        if(!timer) {
            timer = setTimeout(() => {
                timer = null;
                fn.apply(this, args)
            }, wait)
        }
    }
 }
 window.addEventListener('scroll', throttle(lazyload, 200));
 
 function lazyload() {
    var seeHeight = window.innerHeight; 
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    for(let i = n; i < img.length; i++) {
        console.log(img[i].offsetTop, seeHeight, scrollTop);
        if(img[i].offsetTop < seeHeight+ scrollTop) {
            if(img[i].getAttribute('src') === 'loading.gif') {
                img[i].src = img[i].getAttribute("data-src");
            }
            n = i + 1;
        }
        
    }
 }
```

```js
Vue.directive('lazy', (el, binding) => {
  const backImg = document.createElement('img');
  el.setAttribute('lazy', 'loading');
  el.src = loading;
  backImg.onload = () => {
    el.setAttribute('lazy', 'loaded');
    el.src = binding.value;
  };
  backImg.src = binding.value;
});
```
3. 找出document中以 b开头的标签
```js
const tags = document.getElementsByTagName('*');
const value = [...tags].filter((item) => item.tagName.startsWith('B'))
```
或者
```js
const $prefixBElements = [];
function dfs($el) {
    if ($el.tagName.startsWith('B')) {
        $prefixBElements.push($el);
    }
    for (const $child of $el.children) {
        dfs($child);
    }
}
dfs(document.documentElement);
console.log($prefixBElements);
```
4. 翻转二叉树

```js
var a = { b: 1};
var c = a;
a = { b: 2}
console.log(c);
// { b: 1};
```

vue3.0的新特性，了解compose api和react hooks的区别
proxy除了拦截它的getter和setter外，还能做什么


## 快手三面
深拷贝和浅拷贝
实现Promise.allSettled，和Promise.all类似
同步阻塞，异步非阻塞

弱引用，WeakMap和Map的区别


## 腾讯1面

手写一个轮播图，要求图片是从后端返回，3秒1轮播，无缝轮播，动画平滑，提到了requestAnimation,介绍其用法
手写节流
手写ES6的继承
安全相关 XSS的反射型是什么，怎么避免


## 头条一面
- 合并两个有序数组
- 事件循环
下面代码输出什么
```js
const p = function() {
    return new Promise((resolve, reject) => {
        const p1 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(1)
            }, 0)
            resolve(2)
        })
        p1.then((res) => {
            console.log(res);
        })
        console.log(3);
        resolve(4);
    })
}


p().then((res) => {
    console.log(res);
})
console.log('end');

// 3 end 2 4
// 注意 1是不输出的
```
- 行内元素和块级元素的区别:
- position有哪些值，分别是什么含义
- 盒模型

说一下promise
new Vue做了什么：
Vue 初始化主要就干了几件事情，合并配置，初始化生命周期，初始化事件中心，初始化渲染，初始化 data、props、computed、watcher 等等；

编译和vdom的过程

HTTPS的整个详细过程

思考：怎么着可以描述得更加详细一些。


301和302的区别


## 头条二面

1. 实现一个自定义hook - usePrevious
```js
usePrevious

const [count, setCount] = useState(0);
const previousCount = usePrevious(count);

setCount(count => count + 1);
```
2. 实现一个vue的双向绑定
```js
function observe(src: Object): Object {

}

// 监听 getter/setter

eg.
const obj = observe({ name: 'name', age: 0} )
obj.name; // console.log('getter name')

obj.name = 'new name'; // console.log(setter name')
```
3. 求二叉树的高度
```js
// 二叉树高度
interface Node {
    left: Node | null;
    right: Node | null;
    val: number;
}
function findHeight(root?: Node): number {

}
```


## 高频问题
- 事件循环
- diff算法
- key的作用
- HTTPS的过程

## 事件循环
## diff算法

1. 数据发生变化时，Vue是怎么更新节点的
我们先根据真实DOM生成一颗virtual DOM，当virtual DOM某个节点的数据改变后会生成一个新的Vnode，然后Vnode和oldVnode作对比，发现有不一样的地方就直接修改在真实的DOM上，然后使oldVnode的值为Vnode。
diff的过程就是调用名为patch的函数，比较新旧节点，一边比较一边给真实的DOM打补丁。

2. 比较新旧节点，只会在同级比较
列表对比的时候，使用key进行对比，这样才能复用老的DOM树上的节点。

- 判断两节点是否值得比较，值得比较则执行patchVnode
- 不值得比较则用Vnode替换oldVnode


3. 更新变化了的部分
JavaScript