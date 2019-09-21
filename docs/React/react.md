> 参考<<深入React技术栈>>一书
### 1，做react需要会什么
- react主要负责渲染的功能，想做好一个项目，需要其他库和工具的配合，比如用redux管理数据，react-router管理路由，react全面拥抱es6
webpack也的会用，要提高性能，需要按需加载,immutable.js也的用上，还有单元测试

### 2，react是什么
- 用脚本进行DOM操作的代价很昂贵。DOM和js各为一个岛屿，他们之间用收费桥梁连接，js每次访问DOM,都必须交纳过桥费，推荐的做法是努力减少过桥的次数，努力待在js岛上.
react是虚拟DOM,他创造了虚拟DOM并将他们储存起来，每当状态发生变化的时候就会创造新的虚拟节点和以前的进行对比,将变化的部分进行渲染,整个过程没有对DOM进行获取和操作，只有一个渲染的过程，所以说react是一个UI框架

### 3，React的组件化
- react的一个组件是由dom视图和state数据组成，state是数据中心，他的状态决定这视图的状态。react采用setState来控制视图的更新。setState会自动调用render函数，触发视图的重新渲染，如果只是state数据的变化而没有调用setState，并不会触发更新。

### 4，react的diff算法
- 组件更新的时候回创建一个新的虚拟DOM树并且会和之前储存的dom🌲进行计较。react提出一种假设,相同的节点具有类似的解构,而不同的节点具有不同的结构,在这种假设之上进行逐层的比较,如果发现节点是不同的，那就直接删除旧的节点以及它所包含所有子节点然后替换成新的节点,如果是相同的节点，则只进行属性的更改
对于列表的diff算法稍有不同,因为雷彪通常具有相同的结构,在对列表节点进行删除,插入，排序的时候,单个节点的整体操作远比一个个对比一个个替换要好的多，所以在创建列表的时候需要设置key值,这样react才能分清谁是谁，当然不写key值也可以，但这样通常会报出警告，通知我们加上key值以提高react的性能

### 5,React组件是怎么来的
- react系统内部设计了一套类系统，利用它来创造react组件， React.createClass() - 创造一个类,当然这不是必须的，Facebook官方推荐的写法是用es6的class类来创造组件

```
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            params: '',
        }
    }
}
```
两种写法的功能实现的功能一样但是原理却不同，es6的class类可以看作是构造函数的语法糖，可以把他当做构造函数来看，extends实现了类之间的继承 -- 定义一个类Main继承React.Component所有的属性和方法，组件的生命周期函数就是从这儿继承来的.constructor是构造器，在实例化对象时调用,super调用父类的constructor创造了父类的实例对象this,然后用子类的构造函数进行修改
当我们使用组件< Main />时，其实是对Main类的实例化——new Main，只不过react对这个过程进行了封装，让它看起来更像是一个标签。
有三点值得注意：1、定义类名字的首字母必须大写 2、因为class变成了关键字，类选择器需要用className来代替。 3、类和模块内部默认使用严格模式，所以不需要用use strict指定运行模式。

### 6,组件生命周期
组件在初始化时会触发5个钩子函数
1,getDefaultProps() 设置默认的props，也可以用defaultProps设置组件的默认属性
2,getInitialState() 使用es6的class语法时是没有这个钩子函数的，可以直接在constructor中定义this.state。此时可以直接访问this,props。
3,componentWillMount() 组件初始化时调用，以后组件更新不调用,整个生命周期只调用一次，此时可以修改state。
4,render() react中最重要的步骤,创建虚拟dom,进行diff算法,更新dom树都在此进行，此时就不能更改state了。
5,componentDidMount() 组件渲染之后调用,可以通过this.getDOMNode()获取和操作dom节点，只调用一次

更新时也会触发5个钩子函数
6,componentWillReceiveProps(nextProps) 组件初始化时不调用,组件接受新的props时调用。
7,shouldComponentUpdate(nextProps,nextState) react性能优化非常重要的一环。组件接受新的state或者props时调用,我们可以设置在此对比前后两个props和state是否相同,如果相同返回false组织更新。不过调用this.forceUpdate会跳过此步骤
8,componentWillUpdate(nextProps, nextState) 组件初始化时不调用，只在组件将要更新时才调用,此时可以修改state
9,render()
10,componentDidUpdate() 组件初始化时不调用,组件更新完成后调用,此时可以获取dom节点

还有一个卸载钩子函数
11,componentWillUnMount() 组件将要卸载时调用,一些事件监听和定时器需要在此时清除

以上可以看出来react共有10个周期函数(render重复一次),这10个函数可以满足我们所有对组件操作的需求,利用的好可以提高开发效率和组件性能


react生命周期
