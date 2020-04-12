## Vue.use 源码分析

## Vue.use用法

vue提供了 Vue.use 的全局api来注册插件，比如 Vuex、vue-router等

### 用法
Vue.use(plugin)
- 参数如果是一个对象，必须提供 install 方法
- 参数如果是一个函数，自身会被当做install方法，方法调用的时候，会将vue作为参数传入
- Vue.use(plugin) 调用之后，插件会的 install方法会默认接受第一个参数，这个参数是vue

这个方法需要在 new vue() 之前调用。
Vue.use 会自动阻止多次注册相同插件，即使调用多次也只会注册一次。

## Vue.use 源码分析

我们可以从源码入手分析一下，基于vue 2.6.11 版本，源码地址为：[src/core/global-api/use.js](https://github.com/vuejs/vue/blob/dev/src/core/global-api/use.js)

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
Vue.use主要做了两件事
1. 检查插件是否已经注册，注册过得不需要重复注册

2. 没有注册的，调用插件的install方法（参数是对象，则调用对象的install方法，如果是函数，则直接当做install方法调用）,同时将Vue作为第一个参数传入

## Vue-Router中的 install

基于 vue-router3.1.6 版本，源码位置： [src/install.js](https://github.com/vuejs/vue-router/blob/dev/src/install.js)
```js
import View from './components/view'
import Link from './components/link'

/*
  export 一个 Vue 引用，在打包的时候不希望把 Vue作为依赖包打进去，但是又希望可以使用 Vue提供的一些方法，
*/
export let _Vue

// Vue.use安装插件时候需要暴露的install方法
export function install (Vue) {
  // 判断是否已安装过
  if (install.installed && _Vue === Vue) return
  install.installed = true

  _Vue = Vue

  const isDef = v => v !== undefined

  const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal)
    }
  }
  // 混入 beforeCreate 
  Vue.mixin({
    beforeCreate () {
      // 在option上面存在router则代表是根组件 
      if (isDef(this.$options.router)) {
        this._routerRoot = this
        // 根组件的_router属性为，new Vue传进去的router
        this._router = this.$options.router
        // 执行 init方法
        this._router.init(this)
        // 通过defineReactive方法，来把this._router.history.current变成响应式的，这个方法的底层就是object.defineProperty
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        // 如果该组件不是根组件，那么递归往上找，直到找到根组件的。
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
      registerInstance(this, this)
    },
    destroyed () {
      registerInstance(this)
    }
  })
  /*
    下面通过给 Vue.prototype定义$router、$route属性后，所有的Vue实例（组件）都可以直接访问到
  */

  // 设置代理，访问 this.$router 时直接代理到 this._routerRoot._router
  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })
  // 设置代理，访问 this.$route 时直接代理到 this._routerRoot._route
  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })

  // 注册 router-view 和 router-link 组件
  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)

  const strats = Vue.config.optionMergeStrategies
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
}
```
vue-router中的install方法主要做了以下几件事：

1. 通过 mixin混入的方式，如果是根组件，则直接把根组件的 _router 设置为  this.$options.router

2. 如果不是根组件，那么递归往上找，直到找到根组件的，使用_routerRoot标记

3. 通过给 Vue.prototype定义`$router`、`$route`属性后，使得所有的Vue实例（组件）都可以直接访问到 `$router`、`$route` 属性

4. 注册<router-link>、<router-view>组件


## 参考
- [vue官方文档-插件](https://cn.vuejs.org/v2/guide/plugins.html)
- [前端路由简介以及vue-router实现原理](https://juejin.im/post/5b10b46df265da6e2a08a724)
- [Vue.use(plugin)详解](https://juejin.im/post/5d8464a76fb9a06b3260ad30)