## 在 Vue 中，子组件为何不可以修改父组件传递的 Prop，如果修改了，Vue 是如何监控到属性的修改并给出警告的。

vue设计的单向数据流,数据流动的方向只能是自上而下的;

父组件传值子组件, prop属性传递
子组件传值父组件, $emit传递

这仅限于props为非数组及对象等引用类型数据，譬如字符串，数字等, 如果props是对象的话，在子组件内修改props的话，父组件是不会报错的。对象和数组都是引用传递，字符串数字属于值传递

子组件想要修改自己定义的prop怎么办
1.$emit值到父组件,由父组件绑定的prop来修改
2.
```js
<template>
<div >
    {{test.hello}}
    <child :msg="message" @changeMsg="changeValue" :test="test"></child>
</div>
</template>

<script>
import child from './child.vue';
export default {
    data() {
        return {
            message: '这是父组件传给子组件的信息',
            test: {
                hello: 1
            }
        }
    },
    components: {
        child,
    },
    methods: {
        changeValue(value) {
            this.message = value;
        }
    }
}
</script>


```
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
![error](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1555316489304.png?width=1960&height=298&imageView2/3/w/537/h/81)


```js
handlechange() {
    this.$emit('changeMsg', 'aaaa')
}
```


Vue2.0子组件不可以修改props传过来的数据，为什么引用类的数组和对象就可以进行修改呢？

如果修改了，Vue 是如何监控到属性的修改并给出警告的。
https://segmentfault.com/q/1010000008525755
https://www.zhihu.com/question/53576937