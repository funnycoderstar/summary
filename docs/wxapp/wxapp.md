> 总结一下小程序的坑
#### 1，遇到安卓上数据显示不出来,但是ios和安卓上显示不出来
- 上网查了一下，[参考1](http://www.wxapp-union.com/forum.php?mod=viewthread&tid=2980)，[参考2](http://www.wxapp-union.com/forum.php?mod=viewthread&tid=1909),
 - 可能原因如下：
 - 1.域名配置问题，证书信任问题
 - 2.es6在安卓上有的不支持，即使开启es6转es5的语法，安卓上也不支持
 - ...
- 问题一，问了后端，他们说检查好几遍了，不是这儿的问题，所以排除，
- 问题二，查了一下[小程序中es6语法的支持](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/details.html?t=201716)把用到的不支持的语法改了(可以用webpack配置babel,但是发现此问题时已经打算提交审核，时间紧迫,所以先把不支持的语法改了)，还是不行，排除问题2；
后来就冷静的思考了一下，为什么安卓上没有数据，请求数据前的步骤是否走通，然后一步一个log的看，我们这里的登录逻辑是先有个get请求，后端返回true或false来判断是都需要登录，判断为true时需要获取返回信息头部的session字段，然后之后每次请求头部带上这个字段，
```
function getStorage(key) {
    return new Promise(function (resolve, reject) {
        // 先判断本地数据存储有没有cookie
        wx.getStorage({
            key: key,
            success: function (res) {
                resolve(res.data);
            },
            fail: function (res) {
                console.log(res);
                resolve(null);
                // if (res.errMsg == 'getStorage:fail' || res.errMsg == 'getStorage:fail data not found') {
                    <!--安卓返回 getStorage:fail， ios 返回 res.errMsg == 'getStorage:fail data not found'-->
                //     console.log('没有cookie');
                //     resolve(null);
                // } else {
                //     console.log('这是一个问题');
                //     reject(res.errMsg);
                // }
            },
        });
    });
}
```
- 判断本地缓存没有 session的时候时请求的第一个登录接口，安卓返回 getStorage:fail， ios 返回 res.errMsg == 'getStorage:fail data not found'，刚开始只判断了res.errMsg == 'getStorage:fail data not found'，所以安卓上会一直走reject，最后错误被catch出来，而并没有请求接口，导致没有数据
- 总结： 微信小程序开发过程中一定要用真机测试，微信开发者工具和真机上很多地方都有出入

#### 2，小程序接口异步问题
- 没有使用别的框架，单纯的按照微信小程序的官方文档来写，所以并不能用es7的 async函数和await，只能用目前小程序所支持的promise,但是对每一个封装有很麻烦
- 解决方案：写一个转换函数，将小程序的所有api转换成promise函数
```
const wx = {
    fun1: () => console.log(1),
    fun2: ({a, b, success, fail}) => {
        if (a + b > 10) {
            fail('error: a + b > 10');
            return;
        }
        success(a + b);
    },
};
function promiseify(func) {
    return (args) => {
        return new Promise((resolve, reject) => {
            func(Object.assign(args, {
                success: resolve,
                fail: reject,
            }));
        })
    }
}
for (const key in wx) {
    if (Object.prototype.hasOwnProperty.call(wx, key) && typeof wx[key] === 'function') {
        wx[`_${key}`] = promiseify(wx[key]);
    }
}
wx._fun2({a: 3, b: 4}).then(sum => {
    console.log(sum);
}).catch(err => {
    console.log(err);
});

wx._fun2({a: 5, b: 6}).then(sum => {
    console.log(sum);
}).catch(err => {
    console.log(err);
});
```

#### 3,ios数据无法正常显示，请求接口一直显示need login,
- 登录逻辑： 1，微信授权 2,去请求get的login判断为true,时 3，获取header里的session存储起来，之后每次请求都得带上 4，去请求post的login接口
所以先从判断授权开始，但是在真机上测试时，一开始并不弹出授权弹窗
- 参考[提升用户体验，微信小程序“授权失败”场景的优雅处理](https://devework.com/weixin-weapp-auth-failed.html)
所以尝试不在登录之前判断微信授权，果然可以请求到数据；而在需要的时候去判断是否授权，具体参考上述文档

但是最后在onShow的时候也遇到一些问题
tabBar页面A   navigatorTo 到页面B，然后B   switchTab 到A，这里A会执行onShow()；
但是我再从A跳到B再switchTab回来，A就不会再执行onShow()了，
去开发者社区询问，得知此问题在下个版本会修复


