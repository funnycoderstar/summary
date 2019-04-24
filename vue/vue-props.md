## 在 Vue 中，子组件为何不可以修改父组件传递的 Prop，如果修改了，Vue 是如何监控到属性的修改并给出警告的。

vue设计的单向数据流,数据流动的方向只能是自上而下的;

父组件传值子组件, prop属性传递
子组件传值父组件, $emit传递

这仅限于props为非数组及对象等引用类型数据，譬如字符串，数字等, 如果props是对象的话，在子组件内修改props的话，父组件是不会报错的。对象和数组都是引用传递，字符串数字属于值传递

子组件想要修改自己定义的prop怎么办: $emit值到父组件,由父组件绑定的prop来修改


```html
<template>
<div>
    {{msg}}
    <button @click="handlechange">
        change
    </button>
</div>
</template>

<script>
export default {
    props: {
        msg: {
            type: String,
            default: '111',
        }
    },
    methods: {
        handlechange() {
            this.msg = 'aaa'
        }
    }
}
</script>
```
![error](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1555316489304.png?width=1960&height=298&imageView2/3/)


```js
handlechange() {
    this.$emit('changeMsg', 'aaaa')
}
```


Vue2.0子组件不可以修改props传过来的数据，为什么引用类的数组和对象就可以进行修改呢？
基础类型赋值时是值拷贝, 如果传入的props为对象或数组，是引用类型，那么就相当于父组件向子组件传入了一个指针，你定义的change方法, 只是修改了对象或者数组中的值, 并没有修改指针（内存），注意在 JavaScript 中对象和数组是引用类型，指向同一个内存空间，如果 prop 是一个对象或数组，在子组件内部改变它会影响父组件的状态。

如果修改了，Vue 是如何监控到属性的修改并给出警告的？

## 参考

https://segmentfault.com/q/1010000008525755
https://www.zhihu.com/question/53576937

