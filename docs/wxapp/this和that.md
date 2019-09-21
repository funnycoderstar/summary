#### 微信小程序 this和that详解及简单实例
- 微信小程序中，在wx.request({});方法调用成功或者失败之后，有时候会需要获取页面初始化数据data的情况，这个时候，如果使用，this.data来获取，会出现获取不到的情况，调试页面也会报undefiend。原因是，在javascript中，this代表着当前对象，会随着程序的执行过程中的上下文改变，在wx.request({});方法的回调函数中，对象已经发生改变，所以已经不是wx.request({});方法对象了，data属性也不存在了。官方的解决办法是，复制一份当前的对象，如下：
```
var that=this;//把this对象复制到临时变量that
```
- 在success回调函数中使用that.data就能获取到数据了。
不过，还有另外一种方式，也很特别，是将success回调函数换一种声明方式，如下：

```
success: res =>{
  this.setData({
      loadingHidden: true,
      hideCommitSuccessToast: false
  })
}
```
- 在这种方式下，this可以直接使用，完全可以获取到data数据。
再给一个完整的例子：

```
success: res => {
  if (res.data.code != 0) {
   // 提交失败
   this.setData({
    loadingHidden: true,
    hiddenTips: false,
    tipsContent: res.data.message
   })
  } else {
   // 提交成功
   this.setData({
    loadingHidden: true,
    hideCommitSuccessToast: false
   })
   subBtn = false;
 
   // 定时，3秒消失
   setTimeout(() => {
    this.setData({
     hideCommitSuccessToast: true
    })
    wx.navigateBack({ delta: 2 });
   }, 2000);
 
  }
 }
```
本文转自[转载](http://www.jb51.net/article/105467.htm)