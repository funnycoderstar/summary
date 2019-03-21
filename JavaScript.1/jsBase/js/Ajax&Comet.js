// XHR的用法
xhr.open("get","example.php",false);
xhr.send(null);
// responseText: 作为响应主体被返回的文本
// reponseXML: 如果响应的内容类型是'text/xml'或'application/xml',这个属性中将保存包含着响应数据的XML DOM文档
// status: 响应的HTTP状态
// statusText: HTTP状态的说明

// 发送异步请求可以检测XHR对象的readStatus属性,该属性表示请求/响应过程中的当前活动阶段
// 0:未调用open()
// 1:启动. 调用open(),但未调用send();
// 2,发送,调用send(),但尚未调用send();
// 3,接收,已经接收到部分响应数据
// 4,完成,已经接收到全部响应数据

// xhr.absort()在接收响应之前还可以调用来取消异步请求

