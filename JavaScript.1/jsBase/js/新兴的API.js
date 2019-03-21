// 1,requestAnimationFrame()
// 2,page Visibility API 页面可见性api 只有IE10和Chrome支持,ie为document.msHidden;Chrome则是document.webkitHidden

// document.hidden: 表示页面是否隐藏的布尔值,页面隐藏包括页面在后台标签页中或者浏览器最小化
// document.visibilityState: 
// visibilitychange:

//3 Geolocation API  在浏览器中的实现是navigator.geolocation对象,有三个方法
// getCurrentPosition() 触发请求用户共享地理定位信息的对话框,接收三个参数,成功回调函数,可选的失败回调函数和可选的选项对象

// 4,File API 在表单中的文件输入字段的基础上,又添加了一些直接访问文件信息的接口,html5在DOM中为文件输入元素添加了一个files集合,files集合中包含一组File对象
// File对象都有下列只读属性
// name: 本地文件系统中的文件名,
// size:文件字节大小
// type: 字符串,文件的MIME类型
// lastModifideDate: 字符串,文件上一次被修改的时间(只有chrome支持);

// FileReader类型实现的是一种异步文件读取机制
//readAsText(file,encoding);
// readAsDataURL(file)
// readAsBinaryString(file):
// readAsArrayBuffer(file)
// 事件:progress,error,load

// Web计时
// window.performance 对象

