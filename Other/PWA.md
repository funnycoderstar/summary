## 什么是PWA
PWA(Progressive Web Apps)是谷歌近几年一直在推进Web应用新模型。PWA借助 Service Worker缓存网站的静态资源， 甚至是网络请求， 使网络在离线时也能访问。并且能够为网站指定一个图标添加到手机桌面， 实现点击桌面图标即可访问网站
## 离线和缓存
### Service Worker 简介
`Service Worker`是浏览器在后台独立与网页运行的脚本。是它让PWA拥有极快的访问速度和离线运行能力。
如何做到的呢
### 注册 `Service Worker`
`Service Worker`
```js
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
            console.log('ServiceWorker registration successful with scope: ',
                registration.scope
            )
        })
        .catch(err => {
            console.log('ServiceWorker registration failed: ', err)
        })
}
```
需要注意的是， `Service Worker` 脚本除了域名为`localhost`时能运行在http协议下以外，只能运行`https`协议下

### 安装
```js
const CACHE_NAME = 'cache-v1'
const DATA_CACHE_NAME = 'data-cache-v1'
const PRE_CACHE = ['/index.html', '/css/app.css', '/js/app.js']

self.addEventListener('install', e => {
    console.log('[ServiceWorker] Install')
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(PRE_CACHE)
        })
    )
})

```
在安装的时候预缓存网站的静态资源， 任何资源路径出错都会造成 `Service Worker`安装失败
### 代理请求
```js
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            if (response) {
                return response
            }
            const fetchRequest = e.request.clone() return fetch(fetchRequest).then(response => { // Check if we received a valid response
                if (!response || response.status !== 200) {
                    return response
                }
                const responseToCache = response.clone()

                caches.open(DATA_CACHE_NAME).then(cache => {
                    cache.put(e.request, responseToCache)
                }) return response
            })
        })
    )
})

```
安装成功后， `Service Worker`就可以监听网站的所有请求，匹配到缓存时直接返回，未匹配到请求服务器，服务器成功返回时添加到缓存

## 更新
```js
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                        console.log('[ServiceWorker] Removing old cache', key) return caches.delete(key)
                    }
                })
            )
        })
    )
})

```
我们只要修改 `Service Worker`文件就能更新它。当我们每次访问网站时就会去下载这个文件，当发现文件不一致时，就会安装新`Service Worker`，安装成功后，它将进入等待阶段。当我们关闭窗口重新导航到网站时(刷新网页不行)，新`Service Worker`将开始控制网站。旧`Service Worker`终止工作并触发`activate`事件

有一些问题
1. 预缓存的静态资源修改后在下一次发版时的文件名都不一样，手动写死太低效， 最好每次都自动生成资源文件名
2. 缓存资源是以硬编码字符串判断是否有效，这样每次发版本都需要手动修改，才能更新缓存。而且每次都是全量更新。能否以文件的粒度进行资源缓存呢？
3. 请求代理没有区分静态资源和动态接口。已经缓存的动态接口也会一直返回缓存， 无法请求新数据。


### workbox
`workbox`是由谷歌浏览器团队发布，用来协助创建PWA应用的 JavaScript库。当然直接用`workbox`还是太复杂了， 谷歌还很贴心的发布了一个`webpack`插件，能够自动生成`Service Worker`和静态资源列表 `workbox-webpack-plugin`

## 参考
- [文档](https://lavas.baidu.com/pwa/README)
- [借助 workbox 将网站升级成 PWA](https://www.imooc.com/article/31524)

