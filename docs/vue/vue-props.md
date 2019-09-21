## 总结vue props中需要注意的问题
props default 数组，对象， 函数的默认值写法
```js
props: {
    propA: [String, Number],
    propB: Number,
    propC: Boolean,
    propD: {
        type: Array,
        default: () => [],
    },
    propE: {
        type: Object,
        default: () => ({}),
    },
    propF: {
        type: Function,
        default: () => {
            return () => {},
        },
    },
}
```

## 如何理解vue的单向数据流
所有的prop都使得其父子prop 之间形成了一个单向下行绑定：父级prop的更新会向下流动到子组件中，但是反过来不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流像难以理解。

额外的，每次父组件发生变化，子组件中所有的prop都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变prop。如果你这样做了，vue会在浏览器的控制台中发出警告。

这里有两种常见的试图改变一个prop的情形:
1. **这个prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的prop 数据来使用。**这种情况下，最好定义一个本地的data 属性并将这个prop作为其初始值：
```js
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
```
2. **这个prop以一种原始的值传入且需要进行转换。**在这种情况下，最好使用这个prop的值来定义一个计算属性。
```js
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```
> 注意在 JavaScript中对象和数组都是通过引用传入的，所以对于一个数组或对象类型的prop来说，在子组件中改变这个对象或数组本身将会影响到父组件的状态


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
- [vuejs文档- prop 的单向数据流](https://cn.vuejs.org/v2/guide/components-props.html#%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81)
- [vue2.0中，子组件修改父组件传递过来得props，该怎么解决？](https://segmentfault.com/q/1010000008525755)
- [Vue2.0子组件不可以修改props传过来的数据，为什么引用类的数组和对象就可以进行修改呢？](https://www.zhihu.com/question/53576937)


