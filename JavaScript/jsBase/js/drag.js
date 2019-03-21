// 跨文档消息传递
postMessage('a message', 'http://www.baidu.com');
// 原生拖放
dragstart drag ondragend

// 一个元素拖动到一个有效的放置目标时
dragenter dragover dragleave/drag

dataTransfer //被拖动元素向放置目标传递字符串格式的数据
// 里面的两个方法 getData() && setData();
// 里面的两个属性 drapEffect //被拖动元素能够执行哪种放置行为 none copy move link 搭配effectAllowed使用
// 其他属性 addElement(element) clearData(format) setDragImage(element, x, y) type
effectAllowed // uninitialized none copy link move copyLink copyMove linkMove all

// h5 的新属性 draggable //表示元素是否可以拖动 true false

// video && audio
// width height poster(指定图像url在视频加载期间显示一副图像)src 
// 使用video和audio元素的play(),pause()可以手工控制媒体文件的播放
// 检测编解码器的支持情况
canPlayType()  //返回 probably maybe '',也可以用来检测视频格式

// 历史状态管理  首选hashchange事件 更新history对象

history.pushState({},'','test.html') //状态对象,新状态标题,可选相对的url 会创建新的历史状态 ,此时按下'后退'会触发window.popstate
window.popstate 事件发生后event.status为当前的状态
更新当前状态 replaceState

