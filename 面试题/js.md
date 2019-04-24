## requestAnimationFrame VS setTimeout/setInterval

requestAnimationFrame的优点如下: https://zhuanlan.zhihu.com/p/55129100
1. requestAnimationFrame不需要设置时间,采用系统时间间隔,能达到最佳的效果
2. 会把每一帧中的所有DOM操作集中起来,在一次重绘或回流中完成

