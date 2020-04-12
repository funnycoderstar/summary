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

## vue.use

vue提供了 Vue.use 的 全局api来注册插件

```js
export function initUse (Vue: GlobalAPI) {
  // 接受一个plugin参数
  Vue.use = function (plugin: Function | Object) {
    // _installedPlugins 存储所有注册过的 plugin
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    // 保存注册组件的数组，不存在及创建
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    // toArray(arguments, 1)实现的功能就是，获取Vue.use(plugin,xx,xx)中的其他参数。
    const args = toArray(arguments, 1)
    // 在参数中第一位插入Vue，从而保证第一个参数是Vue实例
    args.unshift(this)
    // 如果提供了 install 方法，则直接调用
    if (typeof plugin.install === 'function') {
      // 如果组件是对象，且提供install方法，调用install方法将参数数组传入，改变`this`指针为该组件
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      // 否则直接执行
      plugin.apply(null, args)
    }
    // 将plugin存储到  installedPlugins
    installedPlugins.push(plugin)
    return this
  }
  
}
```

## vue-router原理

## 前端路由
前端路由，就是解析不同的url路径，动态渲染对应的HTML内容，它的作用就是根据不同的路径映射到不同的视图

url变化而不重新刷新页面的两种方式：
- hash模式，类似这种 `http://www.xxx.com/#/login`
  - 注意它的最大特征就是有个 `#`号，`#`号后面的参数内容发生变化，而不重新请求
  - hash值发生变化，触发 [hashchange](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/hashchange_event) 事件，我们可以通过监听  hashchange 事件实现更新页面内容的操作
- history模式 类似 `http://www.xxx.com/login`
  - 使用`pushState `和 `replaceState`两个API来实现改变url内容而不发送请求，同时还有popstate事件。
  - 主要history模式没有`#`号，但是因为没有 `#`号，用户刷新页面，浏览器还是会向服务端发送请求，所以在使用 history模式的时候，为了避免404的情况，需要在服务器上设置，把所有路由都重定向到根页面

## vue-router

vue-router提供了 hash、history、abstract 3 种路由方式和 <router-link> 和 <router-view> 2 种组件;
以下是基于 vue-router3.1.6 版本及进行的分析

### install
使用 vue.use 注册，即 vue-router提供自身提供install的方法

源码位置： [src/install.js](https://github.com/vuejs/vue-router/blob/dev/src/install.js)
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
        this._router = this.$options.router
        // 执行 init方法
        this._router.init(this)
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
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

### 初始化

```js
// ...

import type { Matcher } from './create-matcher'

export default class VueRouter {
  // ...

  constructor (options: RouterOptions = {}) {
    this.app = null
    this.apps = []
    this.options = options
    this.beforeHooks = []
    this.resolveHooks = []
    this.afterHooks = []
    this.matcher = createMatcher(options.routes || [], this)

    let mode = options.mode || 'hash'
    this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false
    if (this.fallback) {
      mode = 'hash'
    }
    if (!inBrowser) {
      mode = 'abstract'
    }
    this.mode = mode

    switch (mode) {
      case 'history':
        this.history = new HTML5History(this, options.base)
        break
      case 'hash':
        this.history = new HashHistory(this, options.base, this.fallback)
        break
      case 'abstract':
        this.history = new AbstractHistory(this, options.base)
        break
      default:
        if (process.env.NODE_ENV !== 'production') {
          assert(false, `invalid mode: ${mode}`)
        }
    }
  }

  // ...
  beforeEach (fn: Function): Function {
    return registerHook(this.beforeHooks, fn)
  }

  beforeResolve (fn: Function): Function {
    return registerHook(this.resolveHooks, fn)
  }

  afterEach (fn: Function): Function {
    return registerHook(this.afterHooks, fn)
  }

  onReady (cb: Function, errorCb?: Function) {
    this.history.onReady(cb, errorCb)
  }

  onError (errorCb: Function) {
    this.history.onError(errorCb)
  }

  push (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    // $flow-disable-line
    if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
      return new Promise((resolve, reject) => {
        this.history.push(location, resolve, reject)
      })
    } else {
      this.history.push(location, onComplete, onAbort)
    }
  }

  replace (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    // $flow-disable-line
    if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
      return new Promise((resolve, reject) => {
        this.history.replace(location, resolve, reject)
      })
    } else {
      this.history.replace(location, onComplete, onAbort)
    }
  }

  go (n: number) {
    this.history.go(n)
  }

  back () {
    this.go(-1)
  }

  forward () {
    this.go(1)
  }
  
}

```

### HashHistory

```js
/* @flow */

import type Router from '../index'
import { History } from './base'
import { cleanPath } from '../util/path'
import { getLocation } from './html5'
import { setupScroll, handleScroll } from '../util/scroll'
import { pushState, replaceState, supportsPushState } from '../util/push-state'

// 继承 History 基类
export class HashHistory extends History {
  constructor (router: Router, base: ?string, fallback: boolean) {
    // 调用  History 基类 的构造函数
    super(router, base)
     // 判断是否是从 history降级来的
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      // 如果是降级过来，且做了降级处理的，则直接 return
      return
    }
    // 保证 hash 是以 / 开头
    ensureSlash()
  }

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  setupListeners () {
    const router = this.router
    const expectScroll = router.options.scrollBehavior
    const supportsScroll = supportsPushState && expectScroll

    if (supportsScroll) {
      setupScroll()
    }

    window.addEventListener(
      supportsPushState ? 'popstate' : 'hashchange',
      () => {
        const current = this.current
        if (!ensureSlash()) {
          return
        }
        this.transitionTo(getHash(), route => {
          if (supportsScroll) {
            handleScroll(this.router, route, current, true)
          }
          if (!supportsPushState) {
            replaceHash(route.fullPath)
          }
        })
      }
    )
  }

  push (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    const { current: fromRoute } = this
    this.transitionTo(
      location,
      route => {
        pushHash(route.fullPath)
        handleScroll(this.router, route, fromRoute, false)
        onComplete && onComplete(route)
      },
      onAbort
    )
  }

  replace (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    const { current: fromRoute } = this
    this.transitionTo(
      location,
      route => {
        replaceHash(route.fullPath)
        handleScroll(this.router, route, fromRoute, false)
        onComplete && onComplete(route)
      },
      onAbort
    )
  }

  go (n: number) {
    window.history.go(n)
  }

  ensureURL (push?: boolean) {
    const current = this.current.fullPath
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current)
    }
  }

  getCurrentLocation () {
    return getHash()
  }
}

function checkFallback (base) {
  // 获取 location 的值
  const location = getLocation(base)
  // 如果当前地址不是以 /# 开头的
  if (!/^\/#/.test(location)) {
    // 需要修改为 hash 模式下的 /# 开头
    window.location.replace(cleanPath(base + '/#' + location))
    return true
  }
}
// 保证 hash 以 / 开头
function ensureSlash (): boolean {
  // 得到hash值
  const path = getHash()
  // 如果是以 / 开头的，则直接返回
  if (path.charAt(0) === '/') {
    return true
  }
  // 如果不是 / 开头的，需要手工处理成 以 / 开头的
  replaceHash('/' + path)
  return false
}

export function getHash (): string {
  
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  // 因为兼容性问题 这里没有直接使用 window.location.hash
  // 因为 Firefox decode hash 值
  let href = window.location.href
  const index = href.indexOf('#')
  // empty path
  // 如果此时没有 # 则返回 ''
  if (index < 0) return ''

  href = href.slice(index + 1)
  // decode the hash but not the search or hash
  // as search(query) is already decoded
  // https://github.com/vuejs/vue-router/issues/2708
  const searchIndex = href.indexOf('?')
  if (searchIndex < 0) {
    const hashIndex = href.indexOf('#')
    if (hashIndex > -1) {
      href = decodeURI(href.slice(0, hashIndex)) + href.slice(hashIndex)
    } else href = decodeURI(href)
  } else {
    href = decodeURI(href.slice(0, searchIndex)) + href.slice(searchIndex)
  }

  return href
}

function getUrl (path) {
  const href = window.location.href
  const i = href.indexOf('#')
  const base = i >= 0 ? href.slice(0, i) : href
  return `${base}#${path}`
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path))
  } else {
    window.location.hash = path
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path))
  } else {
    window.location.replace(getUrl(path))
  }
}

```
在实例化的时候，做两件事, 针对于不支持 history api 的降级处理，以及保证默认进入的时候对应的 hash 值是以 / 开头的，如果不是则替换。
### HTML5History


## 参考
- [前端路由简介以及vue-router实现原理](https://juejin.im/post/5b10b46df265da6e2a08a724)
- [Vue.use(plugin)详解](https://juejin.im/post/5d8464a76fb9a06b3260ad30)

## 其他
- PWA原理

## 虚拟DOM
虚拟DOM 就是使用一个 原生的JavaScript对象来描述 一个DOM节点。
```js
<div id="wrap">
    <p class="text">好好学习，天天向上</p>
</div>
```
使用虚拟DOM表示如下：

```js
const element = {
  // 标签名
  tagName: 'div',
  properties: {
    id: 'wrap',
  },
  children: [
    {
      tagName: 'p',
      properties: {
        class: 'text',
        children: ['好好学习，天天向上']
      },
    }
  ]
}
```
## 虚拟DOM和diff算法
将DOM节点用虚拟DOM表示，对比新旧 虚拟DOM 两个对象的差异 (diff算法)，将差异的部分渲染到 DOM 树，即只渲染 变化了的部分。


## 参考
- [https://juejin.im/post/5a3200fe51882554bd5111a0](https://juejin.im/post/5a3200fe51882554bd5111a0)


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