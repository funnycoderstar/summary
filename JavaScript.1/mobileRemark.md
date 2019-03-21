> 最近遇到项目中要做一个评论动态的功能,然后遇到了几个很恶心的问题

- 1,如果我们需要将输入框固定在屏幕下方，而当键盘被唤起同时输入框固定在键盘上方

```
键盘会将页面顶上去。那么如果希望可以将输入框和键盘完全贴合，我们可以使用div模拟一个假的输入框，使用定位将真正的输入框隐藏掉，当点击假的输入框的时候，将真正的输入框定位到键盘上方，并且手动获取输入框焦点。

1、真正的输入框的位置计算：
首先记录无键盘时的window.innerHeight，当键盘弹出后再获取当前的window.innerHeight，两者的差值即为键盘的高度，那么定位真输入框自然就很容易了
2、在ios下手动获取焦点不可以用click事件，需要使用tap事件才可以手动触发
$('#fake-input').on($.os.ios?'tap' : 'click', function() {
        initHeight = window.innerHeight;
        $('#input').focus();
    });
3、当键盘收起的时候我们需要将真输入框再次隐藏掉，除了使用失去焦点（blur）方法，还有什么方法可以判断键盘是否收起呢？
这里可以使用setInterval监听，当当前window.innerHeight和整屏高度相等的时候判断为键盘收起。
注意：键盘弹起需要一点时间，所以计算当前屏幕高度也需要使用setInterval
4、因为textarea中的文字不能置底显示，当输入超过一行textarea需要自动调整高度，因此将scrollHeight赋值给textarea的height。当删除文字的时候需要height也有变化，因此每次input都先将height置0，然后再赋值。
$('#textarea').css('height', 0);
$('#textarea').css('height', $('#textarea')[0].scrollHeight);

```

- 2,移动端虚拟键盘把fixed定位、绝对定位元素顶上去bug的解决方案(H5 web 移动端 输入框, 键盘唤起后fixed定位好的元素跟随页面滚动了起来… fixed属性失效了！满屏任性横飞)

```
window.onresize = function(e){
  if(e.target.outerHeight < $('body').height()){
    $('#bottom').css({'position':'static'});
  }else{
    $('#bottom').css({'position':'fixed'});
  }
}

```

最后总结遇到的问题如下
- 虚拟键盘弹起时，fixed样式失效
- 无法监听虚拟键盘弹起、关闭状态

- js拿不到键盘的 弹起/收起 事件;

- ios上键盘 弹起/收回 不会触发window.resize事件;

- android 4.4 以下, 键盘唤起时, 不仅会触发resize, 而且会触发scroll事件;
- (如果有需要滑动失去焦点这个需求, 选择touchMove, 不要选择scroll)

- ios之所以会遮挡输入框, 是因为, 第三方输入法的tool bar 或者 键盘也被当做可视区域了(包含在键盘弹出时的window.innerHeight)

总结
最后建议, 类似这种需求,尽量不要放在屏幕下50%:

转场输入评论, 微博等;

弹窗到可视区域上50%区域, 3G门户;

[参考1](http://www.alloyteam.com/2017/03/moves-the-input-box-fill-series-a/)
[参考2](http://www.cnblogs.com/yexiaochai/p/3561939.html)
[参考3](http://www.zhimengzhe.com/Javascriptjiaocheng/96116.html)