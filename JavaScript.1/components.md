css3动画基础

过渡:transition
元素从一种样式逐渐改变为另一种的效果;必须规定两项内容
- 指定要添加效果的css属性
- 指定效果的持续时间

过渡属性
- transition: 简写属性,用于在一个属性中设置四个过渡属性
- transition-property: 应用过渡的css属性的名称
- transition-duration: 定义花费的时间,默认为0;
- transition-timing-function: 规定过渡效果的时间曲线,默认 ease
- transition-delay: 规定过渡效果何时开始.默认为0;

动画: @keyframes
@keyframes规则是创建动画.@keyframes规则内指定一个css样式和动画将逐步从目前的样式改为新的样式

当在@keyframes创建动画,把它绑定到一个选择器,否则动画不会有任何效果;
指定至少这两个css3的动画属性绑定想一个选择器
- 规定动画的名称
- 规定动画的时长

请用百分比来规定变化发生的时间，或用关键词 "from" 和 "to"，等同于 0% 和 100%。
0% 是动画的开始，100% 是动画的完成。
为了得到最佳的浏览器支持，您应该始终定义 0% 和 100% 选择器。

动画属性
- @keyframes: 规定动画
- animation: 所有动画属性的简写属性, 除了animation-play-state属性
- animation-name: 规定@keyframes动画的名称
- animation-duration: 规定动画完成一个周期所花费的秒或毫秒,默认是0
- animation-timing-function: 规定动画的速度曲线,默认是'ease'
- animation-delay: 规定动画何时开始.默认是0
- animation-iteration-count: 规定动画被播的次数.默认是1
- animation-direction: 动画是否在下一周期逆向地播放.默认是'normal';
- animation-play-state: 规定动画是否正在运行或暂停,默认是'running'

## 学习iview组件

vue动画

## 进入/离开 & 列表过渡

vue在插入,更新或者移除DOM时,提供不同方式的过渡效果

Vue提供transition的封装组件,下列情形中,可以给任何元素和组件添加entering/leaving过渡
- 条件渲染(使用v-if);
- 条件展示(使用v-show)
- 动态组件
- 组件根节点

过渡的类型

1. v-enter:进入过渡的开始状态.在元素被插入时生效,在下一个帧被移除
2. v-enter-active:定义过渡的状态.在元素的整个过渡过程中起作用,在元素被插入时生效,在transition/animation完成过渡之后移除,这个类可以被用来定义过渡的过程时间,延迟和曲线函数.
3. v-enter-to: 2.1.8版及以上,定义进入过渡状态的结束状态,在元素被插入一帧后生效(与此同时 v-enter 被删除),在transition/animation完成之后移除
4. v-leave: 定义离开过渡的开始状态,在离开过渡被触发时生效,在下一个帧移除.
5. v-leave-active: 定义过渡的状态.在元素整个过渡过程中作用,在元素整个过程中作用,在离开过渡被触发后立即生效,在transition/animation完成之后移除.这个类可以被用来定义过渡过程,延迟和曲线函数.
6. v-leave-to: 2.1.8版及以上 定义离开过渡的结束状态,在离开过渡被触发一帧后生效(于此同时 v-leave被删除),在transition/animation完成之后被移除


对于这些在 enter/leave 过渡中切换的类名, v- 是这些类名的前缀,使用 `<transition name="my-transition">`可以重置前缀, 比如 `v-enter`替换为 `my-transition-enter`