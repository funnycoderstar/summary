## vue自定义组件怎么实现v-model
v-model实际上就是一个语法糖，v-model在内部为不同输入元素使用不同的属性并抛出不同的事件：但是想单选框，多选框等类型的输入控件可能将value特性用于不同的目的。mode选项可以用来避免这样的冲突；

```js
Vue.component('base-checkbox', {
  model: {
    prop: 'checked', // v-model绑定的值
    event: 'change', // 当值发生变化时通过 $emit change事件改变props的值
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```
现在在这个组件上使用v-model的值
```js
<base-checkbox v-model="lovingVue"></base-checkbox> 
```

这里的`lovingVue`的值会传入名为checked的prop。同时当<base-checkbox> 触发一个change事件并附带一个新值的时候，这个`lovingVue`的属性将会被更新

> 注意你仍然需要在组件的props选项里声明checked这个prop。

## 参考
[vuejs文档-自定义事件](https://cn.vuejs.org/v2/guide/components-custom-events.html)
