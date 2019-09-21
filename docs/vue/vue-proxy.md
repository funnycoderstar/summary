
## 一： Object.defineProperty() 和 Proxy
### vue 2.X 通过 Object.defineProperty()来实现vue数据的双向绑定的
有以下问题
- 1.vue中检测不到对象属性的添加和删除
- 2.无法监控到数组下标的变化，导致直接通过数组的下标给数组设置值，不能实时响应。

### vue3.0 通过Proxy来实现的，解决了以上问题

## 二：具体原理

### proxy

主要是因为Proxy是拦截对象，对`对象`进行一个"拦截"，外界对该对象的访问，都必须先通过这层拦截。无论访问对象的什么属性，之前定义的还是新增的，它都会走到拦截中，

### Object.defineProperty()
Object.defineProperty()是对`对象的某个具体属性`的setter和getter方法进行拦截，新属性的话，需要重新去对象新属性的setter和getter方法进行拦截，

vue在创建实例的时候把data深度遍历所有属性,并使用 Object.defineProperty 把这些属性全部转为 getter/setter。让 Vue 追踪依赖，在属性被访问和修改时通知变化。所以属性必须在 data 对象上存在才能让 Vue 转换它，这样才能让它是响应的。

当你在对象上新加了一个属性newProperty,当前新加的这个属性并没有加入vue检测数据更新的机制(因为是在初始化之后添加的),vue.$set是能让vue知道你添加了属性, 它会给你做处理；$set内部也是通过调用Object.defineProperty()去处理的
