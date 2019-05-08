## 什么是Flutter
Flutter是谷歌的移动UI框架，可以快速在ios和Android上构建高质量的原生用户界面。Flutter可以与现有的代码一起工作。在全世界，Flutter正在被越来越多的开发者和组织使用， 并且Flutter是完全免费，开源的

特点：
1. 跨平台：
2. 原生用户界面
3. 开源免费


## 和其他技术对比有什么优势
现在，主流的移动开发平台是Android和IOS, 每个平台上的开发技术不太一样，针对每个平台开发应用需要特定的人员， 但这样一来开发效率低下，因而需要进行跨平台开发。
跨平台开发技术从最开始的Hybrid混合开发技术，到React Native的桥接结束， 一直在演进

Hybrid开发主要依赖于Webview, 但WebView是一个重量级的控件，很容易产生内存问题，而且复杂的UI在webView上显示的性能不好。
React Native 技术抛开了WebView, 利用JavaScript Core 来做桥接， 将JavaScript调用转为 Native调用。React Native 最终会生成对应的自定义原生控件。这种策略将框架本身和App开发者绑定在系统的控件上，不仅框架本身需要处理大量平台相关的逻辑，随着系统版本变化和API的变化，开发者可能也需要处理不同平台的差异，甚至有些特征只能在部分平台上实现，这样使得跨平台性大打折扣。

Flutter是最新的跨平台开发技术，可以横跨 Android, ios, MacOS, Wnidows, Linux等多个系统。FLutter采用更为彻底的跨平台方案，即自己实现了一套UI框架，然后直接在GPU上渲染UI页面。

## 如何学习
[Flutter中文网](https://flutterchina.club/)