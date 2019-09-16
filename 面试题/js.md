## requestAnimationFrame VS setTimeout/setInterval

requestAnimationFrame的优点如下: https://zhuanlan.zhihu.com/p/55129100
1. requestAnimationFrame不需要设置时间,采用系统时间间隔,能达到最佳的效果
2. 会把每一帧中的所有DOM操作集中起来,在一次重绘或回流中完成


## 前端性能优化
1. 合并请求
合并请求主要目的是减少浏览器发起的请求数， 从而减少在发起请求过程中花费的时间；
具体手段有： 合并JS, 合并CSS以及合并小图片（使用雪碧图）等方式来优化
2. 域名拆分
浏览器的并发请求数目限制是针对同一域名， 为什么这么做呢
3. 开启gzip, CDN
5. Minify
将JS和CSS等文本进行最小化处理
6. 按需加载资源
7. 启用 HTTP/2
8. 缓存
[https://www.zhihu.com/question/20474326](浏览器允许的并发请求资源数是什么意思？)
[常见的前端性能优化手段都有哪些？都有多大收益？](https://www.zhihu.com/question/40505685/answer/86898655)

