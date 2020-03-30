## vue
- nextTick的原理及运行机制
- keep-alive的实现原理及缓存策略
- vue的数据驱动及如何实现
- vue响应式原理
- vue-router原理
- computed 属性为什么能够在依赖改变的时候，自己发生变化
- watcher
- vue.use

## vue.use

vue提供了 Vue.use 的 全局api来注册插件，源码地地址为：[src/core/global-api/use.js](https://github.com/vuejs/vue/blob/dev/src/core/global-api/use.js)

```js
export function initUse (Vue: GlobalAPI) {
  // 接受一个plugin参数，限制为 Function | Object两种类型
  Vue.use = function (plugin: Function | Object) {
    // _installedPlugins 存储所有注册过的 plugin
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    // 保存注册组件的数组，不存在则创建，存在则直接返回，不允许重复注册
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    // 将传入的参数转换成数组
    const args = toArray(arguments, 1)
    // 将Vue对象拼接到数组头部
    args.unshift(this)
    // 如果提供了 install 方法，则直接调用
    if (typeof plugin.install === 'function') {
      // 如果组件是对象，且提供install方法，调用install方法将参数数组传入，改变`this`指针为该组件
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      // 否则直接执行
      plugin.apply(null, args)
    }
    // 将plugin存储到  installedPlugins，表示y已经注册过
    installedPlugins.push(plugin)
    return this
  }
}

```

```js
/**
 * Convert an Array-like object to a real Array.
 */
export function toArray (list: any, start?: number): Array<any> {
  start = start || 0
  let i = list.length - start
  const ret: Array<any> = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}
```


## 其他
- PWA原理


## fiber

render之前的生命周期，即将被废弃
componentWillMount
componentWillUpdate
componentWillReceiveProps


在16.x版本之前，每个生命周期在加载或更新过程中只会调用一次，因为新的fiber架构允许在 diff的时候不停的中断执行，所有render之前的声明周期可能会执行很多次。

fiber分为两部分
- Reconciliation Phase
    - 进行diff，找出需要更新的DOM，这个过程是分片的。
- Commit Phase
    -  更新渲染DOM，一气呵成。

js是单线程的，如果当前在执行一个很耗时的任务，那么剩下的任务就要等当前任务执行完之后再执行。16.x版本之前，React的更新过程是同步的，当React决定要更新DOM时，从diff到更新DOM，一气呵成。这种就会有一个问题，更新的组件比较复杂并且多(层级深等)的时候，此时如果用户点击了页面某个按钮，可能会因为正在批量更新DOM还未进行完成，按钮无法响应的问题。
fiber架构第一个阶段是分片的，将一个任务成很多个小的任务去执行，每次只执行一个小的任务，然后去看一下有没有优先级更高的任务，如果有，则去执行优先级更好的任务，如果没有，接着再执行下一小段任务。
为什么第二个阶段，更新渲染DOM必须是同步的呢，这个也很好理解。你总不能渲染了一半的时候去干其他的事情吧。





## 英语阅读打卡

[Let’s fall in love with React Fiber](https://medium.com/free-code-camp/lets-fall-in-love-with-react-fiber-90f2e1f68ded)