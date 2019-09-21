#### 1, vue的生命周期
- beforeCreate: 组件实例刚刚被创建,组件属性计算之前,如data属性
- created: 组件实例创建完成,属性已绑定,但是DOM还未完成,$el属性还不存在
- beforeMount:模板编译/挂载之前
- mounted: 模板编译/挂载之后
- beforeUpdate: 组件更新之前
- updated: 组件更新之后
- activated: for keep-alive,组件被激活时调用
- deactivated: for keep-alive,组件被移除时调用
- beforeDestroy: 组件销毁前被调用
- destoryed: 组件销毁后调用
> ps:下面代码可以直接复制出去执行
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<script type="text/javascript" src="https://cdn.jsdelivr.net/vue/2.1.3/vue.js"></script>
<body>
    <div id="app">{{a}}</div>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                a: 'vuejs',
            },
            beforeCreate: function() {
                console.log('创建前');
                console.log(this.a);
                console.log(this.$el);
            },
            created: function() {
                console.log('创建之后');
                console.log(this.a);
                console.log(this.$el);
            },
            beforeMount: function() {
                console.log('mount之前');
                console.log(this.a);
                console.log(this.$el);
            },
            mounted: function() {
                console.log('mount之后');
                console.log(this.a);
                console.log(this.$el);
            },
            beforeUpdate: function() {
                console.log('更新之前');
                console.log(this.a);
                console.log(this.$el);
            },
            updated: function() {
                console.log('更新完成');
                console.log(this.a);
                console.log(this.$el);
            },
            beforeDestroy: function() {
                console.log('组件销毁之前');
                console.log(this.a);
                console.log(this.$el);
            },
            destroyed: function() {
                console.log('组件销毁之后');
                console.log(this.a);
                console.log(this.$el);
            },
        })
    </script>
</body>
</html>
```
> beforeCreated: el和data并未初始化
created: 完成data数据的初始化,el没有
beforeMount: 完成了el和data初始化
mounted: 完成挂载
![title](http://oo4xdz5i0.bkt.clouddn.com/vueLife.png)
```
vm.a = 'change';
```
![title](http://oo4xdz5i0.bkt.clouddn.com/vueUpdate.png)

#### 2, webpack打包非常慢,怎么解决

#### 3,子组件怎么给父组件通信
> 1,父组件给子组件传递数据
vue中使用props向子组件传递数据
1): 子组件在props中创建一个属性,用于接收父组件传过来的值  
2): 父组件中注册子组件  
3): 在子组件标签中添加子组件props中创建的属性  
4): 把需要传给子组件的值赋给该属性  
> 2,子组件向父组件传递数据
子组件主要通过事件传递数据给父组件
1), 子组件中需要以某种方式,例如点击事件的方法来触发一个自定义事件
2),将需要传的值作为$emit的第二个参数,该值将作为实参数传给相应自定义事件的方法
3),在父组件中注册子组件并在子组件标签上绑定自定义事件的监听
> 3,子组件向子组件传递数据
vue找那个没有直接子组件对子组件传参的方法,建议将需要传递数据的在组件,都合并为一个组件,
如果一定需要子组件对子组件传参,可以先传到父组件,再传到子组件,为了方便开发,vue推出了一个状态管理工具vuex,可以啃方便的实现组件之间的参数传递

```js
// 父组件向子组件传递数据
<!--
msg 是在data中(父组件)定义的变量
如果需要从父组件中获取logo的值,就需要使用props['msg'], 如30行
在props中添加了元素以后,就不需要在data中(子组件)中再添加变量了
-->
<template>
  <div>
    <child  @transferuser="getUser" :msg="msg"></child>  
    <p>用户名为:{{user}}(我是子组件传递给父组件的数据)</p>  
  </div>
</template>

<script>
    import child from './child.vue';
    export default {
        components: {
            child,
        },
        data() {
            return {
                user: '',
                msg: '我是父组件传给子组件的信息',
            };
        },
        methods: {
            getUser(msg) {
                this.user = msg;
                console.log(msg);
            },
        },
    };
</script>

```
```js
// 子组件向父组件传递数据
<!--
1.@ : 是  v-on的简写
2.子组件主要通过事件传递数据给父组件
3.当input的值发生变化时,将username传递给parent.vue,首先声明了一个setUser,用change事件来调用setUser
4.在setUser中,使用了$emit来遍历transferUser事件,并返回this.username,其中transferuser是一个自定义事件,功能类似一个中转,this.username通过这个事件传递给父组件
-->
<template>
  <div>
      <div>{{msg}}</div>
      <span>用户名</span>
      <input v-model="username" @change='setUser'>向父组件传值</button>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                username: '测试',
            };
        },
        props: {
            msg: {
                type: String,
            },
        },
        methods: {
            setUser() {
                this.$emit('transferuser', this.username);
            },
        },
    };
</script>



```