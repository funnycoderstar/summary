PWA是一系列用到的技术
- Web APP Manifest: 添加到桌面， <link ref="mainfest"  href=""/>
- service Worker(核心): 是一个web worker。HTTPS的限制，在浏览器加载完所有资源的时候进行注册
    - 不能访问操作DOM
    - 会自动休眠，不会随浏览器关闭所失效(需要手动卸载)
    - 离线缓存内容开发者可控
    - HTTPS或 localhost（因为要拦截请求）
    - 所有API基于 Promise
- push Api && Notification api 消息推送，兼容性很差

注册service Worker
```js
// 在浏览器加载完所有资源的时候进行注册
window.addEventListener('load', () => {
    // 解决离线缓存问题
    // 判断当前浏览器是否支持 
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(resgteration => {
            console.log(resgteration)
        });
    }
    
})
```
```js

const CACHE_NAME = 'cache_1' + 1; // 默认情况 sw文件变化后会重新注册 serviceworker

// 要缓存的文件
const CACHE_LIST = [
    '/',
    '/index.html',
    'index.less'
]
// serviceWorker 需要拦截请求
self.addEventListener('fetch', (e) => {
    console.log(e.request.url)
})

// 缓存，需要缓存内容
function preCache() {
    // 开启一个缓存空间
    return caches.open(CACHE_NAME).then(cache => {
        // 添加列表到缓存
        return cache.addAll(CACHE_LIST)
    })
}
// 安装
self.addEventListener('install', (e) => {
    // 如果上一个 serviceWorker不销毁，需要手动 skipwaiting
    console.log('install')
    e.waitUtil(
        // skipWaiting 缓存版本更新自动跳过
        preCache().then(skipWaiting)
    ) // 等待Promise执行完成
})
function clearCache() {
    return caches.keys().then(keys => {
        return Promise.all(
            keys.map(key => {
            if(key !== CACHE_NAME) {
               return caches.delete(key);
            }
        })
        )
       
    })
}
// 当前serviceWorker安装完毕后
// 激活 当前serviceWorker, 让service立即生效 self.clients.claim()
self.addEventListener('activate', (e) => {
    console.log(e.request.url)

     e.waitUtil(
       // 清除没用的缓存，并且将当前的进行激活
       Promise.all([
           clearCache(),
           self.clients.claim()
       ])
        
    ) // 等待
})

// 添加主屏幕，两次访问 间隔5分钟
// 
```

安装的时候进行缓存，请求的时候会拦截请求