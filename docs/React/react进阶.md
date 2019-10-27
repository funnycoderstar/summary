## 与第三方库协同

### 集成带有DOM 操作的插件

### 和其他视图库集成

## 深入JSX
实际上，JSX仅仅只是 React.createElement(component, props, ...children)函数的语法糖。如下JSX代码
```js
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```
会编译为
```js
React.createElement(
    MyButton,
    {color: 'blue', shadowSize: 2},
    'Click me'
)
```
如果没有子节点，你还可以使用自闭合的标签形式，如
```js
<div className="sidebar" />
```

会编译为
```js
React.createElement(
    'div',
    {className: 'sideBar'},
    null
)
```
### 指定React元素类型
JSX标签的第一部分指定了React元素的类型。
大写字母开头的JSX标签意味着他们是React组件。这些标签会被编译为对命名变量的直接引用，所以，当你使用JSX <Foo/> 表达式时，Foo 必须包含在作用域内。

### React必须在作用域内
### 布尔类型、Null 以及 Undefined 将会忽略
值得注意的是有一些 “falsy” 值，如数字 0，仍然会被 React 渲染。例如，以下代码并不会像你预期那样工作，因为当 props.messages 是空数组时，0 仍然会被渲染：
```js
<div>
  {props.messages.length &&
    <MessageList messages={props.messages} />
  }
</div>
```
要解决这个问题，确保 && 之前的表达式总是布尔值。
```js
<div>
  {props.messages.length > 0 &&
    <MessageList messages={props.messages} />
  }
</div>
```
## 性能优化
### 使用 Chrome Performance 标签分析组件
[Profiling React performance with React 16 and Chrome Devtools.](https://calibreapp.com/blog/react-performance-profiling-optimization/)
[用户计时API](https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API)
### 使用开发者工具中的分析器进行组件分析
[介绍React分析器](https://zh-hans.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html)
### 虚拟化长列表
如果你的应用渲染了长列表（上百甚至上千的数据），我们推荐使用"虚拟滚动"技术。这项技术会在有限的时间内仅渲染有限的内容，并奇迹般地降低重新渲染组件消耗的时间，以及创建 DOM节点的数量。
[react-window](https://react-window.now.sh/) 和 [react-virtualized](https://bvaughn.github.io/react-virtualized/) 是热门的虚拟滚动库。
### 避免调停
如果你不知道什么情况下你的组件不需要更新，你可以在 shouldComponentUpdate中返回false来跳过整个渲染过程。这包含该组件的render调用以及之后的操作。

大部分情况下，你可以继承 [React.PureComponent]以代替手写shouldComponentUpdate()。它用当前与之前的props 和state的浅比较覆写了 shouldComponentUpdate() 的实现。

### shouldComponentUpdate的作用

大多数情况下，你可以使用 React.PureComponent 来代替手写 shouldComponentUpdate。但它只进行浅比较，浅比较会有遗漏，那你就不能使用它了。当数据结构很复杂时，情况会变得很麻烦。
```js
class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}

class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar']
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // 这部分代码很糟，而且还有 bug
    const words = this.state.words;
    words.push('marklar');
    this.setState({words: words});
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} />
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}
```
问题在于 PureComponent 仅仅会对新老 this.props.words 的值进行简单对比。由于代码中 WordAdder 的 handleClick 方法改变了同一个 words数组，使得新老this.props.words 比较的其实还是同一个数组。即便实际上数组中的单词已经变了，但是比较结果是相同的。可以看到，即便多了新的单词需要被渲染，ListOfWords 却并没有被更新。
### 不可变数据的力量
避免该问题最简单的方式是避免更正你正用于 props或state的值。例如，上面的 handleClick方法可以用concat重写：

```js
handleClick() {
    this.setState(state => ({
        words: state.words.concat(['marklar'])
    }));
}
```
ES6 数组支持扩展运算符，这让代码写起来更方便了。如果你在使用 Create React App，该语法已经默认支持了。
```js
handleClick() {
  this.setState(state => ({
    words: [...state.words, 'marklar'],
  }));
};
```
你可以用类似的方式改写代码来避免可变对象的产生。例如，我们有一个叫做 colormap的对象。我们希望写一个方法来将 colormap.right 设置为'blue'。我们可以这么写：
```js
function updateColorMap(colormap) {
    colormap.right = 'blue';
}
```
为了不改变原本的对象，我们可以使用 Object.assign方法
```js
function updateColorMap(colormap) {
    colormap.right = 'blue';
    return Object.assign({}, colormap, {right: 'blue'}});
}
```
现在updateColorMap 返回了一个新的对象，而不是修改老对象。Object.assign 是ES6的方法，需要 polyfill.

这里有一个 JavaScript 的提案，旨在添加[对象扩展属性](https://github.com/tc39/proposal-object-rest-spread)以使得更新不可变对象变得更方便：
```js
function updateColorMap(colormap) {
  return {...colormap, right: 'blue'};
}
```
当处理深层嵌套对象时，以 immutable（不可变）的方式更新令它们费解。如遇到此类问题，请参阅 [immer](https://github.com/immerjs/immer), [immutability-helper](https://github.com/kolodny/immutability-helper)。这些库会帮助你编写高可读性的代码，且不会失去 immytability(不可变性)带来的好处。

### 总结
1. 如何使用 Chrome Performance 标签分析组件？
2. 如何使用开发者工具中的分析器进行组件分析？
3. 如何虚拟化长列表
4. 怎么实现 避免调停
5. shouldComponentUpdate的作用
5. React.PureComponent和React.Component 有什么区别
6. 为什么需要不可变数据（immutable）

## Portals

Portal提供了一种将子节点渲染到存在于父组件以外的DOM节点优秀的方案。
```js
ReactDOM.createPortal(child, container);
```

第一个参数 （child）是任何可渲染的React子元素，例如一个元素，字符串或Fragment。第二个参数（container）是一个DOM元素。

### 用法
通常来讲，当你从组件的render方法返回一个元素时，该元素将被挂载到DOM节点中离其最近的父节点：
```js
render() {
    // React挂载了一个新的 div, 并且把子元素渲染其中。
    return (
        <div>
            {this.props.children}
        </div>
    )
}
```
然而，有时候将子元素插入到DOM节点中的不同位置也是有好处的：
```js
render() {
    // React 并没有创建一个新的div。它只是把子元素渲染到`domNode`中。
    // `domNode`是一个可以在任何位置的有效DOM节点
    return ReactDOM.createPortal(
        this.props.children,
        domNode
    )
}
```
一个portal的典型用例是当父组件有overflow: hidden或z-index样式时，但你需要子组件能够在视觉上"跳出"其容器。例如，对话框，悬浮框以及提示框
### 通过 Portal 进行事件冒泡
尽管portal可以被放置在DOM树中的任何地方，但在任何其他方面，其行为和普通的 React子节点行为一致。由于 portal 仍存在于React树，且与DOM树中的位置无关，那么无论其子节点是否是 portal，像 context 这样的功能都是不变的。
这包含事件冒泡。一个从 portal 内部触发的事件会一直冒泡至包含 React 树的祖先，即便这些元素并不是 DOM 树 中的祖先

在父组件里捕获一个来自 portal 冒泡上来的事件，使之能够在开发时具有不完全依赖于 portal 的更为灵活的抽象。例如，如果你在渲染一个 <Modal /> 组件，无论其是否采用 portal 实现，父组件都能够捕获其事件。
### 总结
1. Portals是什么， 是解决什么问题的？
2. 通过 Portal 进行事件冒泡，父组件能捕获么？

## Profiler API
Profiler 测量渲染一个React应用多久渲染一次以及渲染一次的"代价"。它的目的是识别应用中渲染较慢的部分，或是使用`类似 memoization优化`的部分，并从相关优化中获益。
Profiling 增加了额外的开支，所以它在生产构建中会被禁用。
### 用法
Profiler能添加在React树中的任何地方来测量树中这部分渲染所带来的开销。它需要两个 prop: 一个是id(string)，一个是当组件树中的组件“提交”更新的时候被React调用的回调函数 onRender(function)。
例如，为了分析 Navigation 组件和它的子代：
```js
render(
    <APP>
        <Profiler id="Navigation" onRender={callback}>
            <Navigation  {...props} />
        </Profiler>
        <Main {...props} />
    </APP>
)
```
多个 Profiler 组件能测量应用中的不同部分：
```js
render(
    <APP>
        <Profiler id="Navigation" onRender={callback}>
            <Navigation  {...props} />
        </Profiler>
        <Profiler id="Main" onRender={callback}>
            <Main {...props} />
        </Profiler>
        
    </APP>
)
```
嵌套使用 Profiler 组件来测量相同一个子树下的不同组件。
```js
render(
  <App>
    <Profiler id="Panel" onRender={callback}>
      <Panel {...props}>
        <Profiler id="Content" onRender={callback}>
          <Content {...props} />
        </Profiler>
        <Profiler id="PreviewPane" onRender={callback}>
          <PreviewPane {...props} />
        </Profiler>
      </Panel>
    </Profiler>
  </App>
);
```
> 注意 Profiler是一个轻量级组件，我们仍然应该在需要时才使用它。对一个应用来说，每添加一些都会给CPU和内存带来一些负担。

### onReader回调
Profier需要一个 onRender函数作为参数。React会在 profier包含的组件树中任何组件"提交"一个更新的时候调用这个函数。它的参数描述了渲染了什么和花费了什么
```js
function onRenderCallback(
  id, // 发生提交的 Profiler 树的 “id”
  phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
  actualDuration, // 本次更新 committed 花费的渲染时间
  baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
  startTime, // 本次更新中 React 开始渲染的时间
  commitTime, // 本次更新中 React committed 的时间
  interactions // 属于本次更新的 interactions 的集合
) {
  // 合计或记录渲染时间。。。
}
```
## 不使用ES6
通常我们会用 JavaScript 的 class 关键字来定义 React 组件：
```js
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
如果你还未使用过 ES6，你可以使用 create-react-class 模块：
```js
var createReactClass = require('create-react-class');
var Greeting = createReactClass({
  render: function() {
    return <h1>Hello, {this.props.name}</h1>;
  }
});
```
ES6 中的 class 与 createReactClass() 方法十分相似，但有以下几个区别值得注意。
### 声明默认属性
无论是函数组件还是 class组件，都拥有 defaultProps属性
```js
class Greeting extends React.Component {
    // ...
}
Greeting.defaultProps = {
    name: 'Mary'
}
```
### 初始化state
### 自动绑定
### Mixins
## 不使用 JSX
每个JSX元素只是调用 `React.createElement(component, props, ...children)`的语法糖。因此，使用 JSX可以完成的任何事情都可以通过纯 JavaScript完成
## 协调

### 设计动力
### Diffing 算法
### 比对不同类型元素
### 比对同一类型的元素
### 比对同类型的组件元素
### 对子节点进行递归
### keys
### 权衡

## Refs & DOM

### 何时使用 Refs
### 勿过度使用 Refs
### 创建 Refs
### 访问 Refs
### 将DOM Refs 暴露给父组件
### 回调Refs
### 关于回调 refs 的说明

## Render Props

### 使用Render Props 来解决横切关注点（Cross-Cutting Concerns）
### 使用Props而非 render
### 注意事项
将 Render Props 与 React.PureComponent 一起使用时要小心

## 静态类型检查
像 Flow 和TypeScript等这些静态类型检查器，可以在运行前识别某些类型的问题。他们还可以通过自动补全等功能来改善开发者的工作流。出于这个原因，我们建议在大型代码库中使用 Flow 或TypeScript 来代替 PropTypes。
### Flow
### 在项目中添加 Flow
### 从编译后的代码中去除 Flow 语法
### TypeScript
### 在 Create React App 中使用 TypeScript
```js
npx create-react-app my-app --typescript
```

[TypeScript React Starter](https://github.com/Microsoft/TypeScript-React-Starter/blob/master/tsconfig.json) 提供了一套默认的 tsconfig.json 帮助你快速上手。

## 严格模式
## 使用Proptypes 进行类型检查
> 自React V15.5起， React.PropTypes已移入另一个包中。请使用 prop-types 库代替。

你可以使用 flow 或 TypeScript 等 JavaScipt 扩展来对整个应用程序做类型检查，即使不用这些扩展，React也内置了一些类型检查的功能。要在组件的 props 上进行类型检查，你只需配置特定的 propTypes 属性：

```js
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```
PropTypes 提供一系列验证器，可用于确保组件接收到的数据类型是有效的。在本例中, 我们使用了 PropTypes.string。当传入的 prop 值类型不正确时，JavaScript 控制台将会显示警告。出于性能方面的考虑，propTypes 仅在开发模式下进行检查。

### PropTypes
### 限制单个元素
你可以通过PropTypes.element来确保传递给组件的 Children中只包含一个元素
```js
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // 这必须只有一个元素，否则控制台会打印警告。
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};
```
### 默认 Prop 值
你可以通过配置特定的 defaultProps属性 来定义prop的默认值
```js
lass Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// 指定 props 的默认值：
Greeting.defaultProps = {
  name: 'Stranger'
};

// 渲染出 "Hello, Stranger"：
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
```
或
```js
class Greeting extends React.Component {
  static defaultProps = {
    name: 'stranger'
  }

  render() {
    return (
      <div>Hello, {this.props.name}</div>
    )
  }
}
```
defaultProps 用于确保 this.props.name 在父组件没有指定其值时，有一个默认值。propTypes 类型检查发生在 defaultProps 赋值后，所以类型检查也适用于 defaultProps。

## 非受控组件
在大多数情况下，我们推荐使用 受控组件 来处理表单数据。在一个受控组件中，表单数据是由 React 组件来管理的，另一种替代方案是使用非受控组件，这时表单数据将交由 DOM节点来处理.

### 默认值
在React渲染生命周期时，表单元素上的 value 值将会覆盖 DOM节点中的值。在非受控组件中，你经常希望 React能赋予组件一个初始值，但是不去控制后序的更新。在这种情况下，你可以指定一个 defaultValue 属性，而不是value
```js
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"
          type="text"
          ref={this.input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```
### 文件输入
```js
<input type="file" />
```
在 React 中，<input type="file" /> 始终是一个非受控组件，因为它的值只能由用户设置，而不能通过代码控制。

您应该使用 File API 与文件进行交互。下面的例子显示了如何创建一个 DOM 节点的 ref 从而在提交表单时获取文件的信息。

```js
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(
      `Selected file - ${
        this.fileInput.current.files[0].name
      }`
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

ReactDOM.render(
  <FileInput />,
  document.getElementById('root')
```
### 总结
1. 什么是受控组件和非受控组件？区别是什么
2. 受控组件和非受控组件分别适合在哪种场景

## Web Component
声明式编程：对于声明式的编程范式，你不在需要提供明确的指令操作，所有的细节指令将会更好的被程序库所封装，你要做的只是提出你要的要求，声明你的用意即可。**它关注的是你要做什么，而不是如何做.**
函数式编程：是声明式编程的一部分。JavaScript中的函数是第一类公民，这意味着函数是数据，你可以像保存变量一样在应用程序中保存，检索和传递这些函数。
函数式编程有些核心概念：
- 不可变性（Immutability）
- 纯函数（Pure Functions）
- 数据转换 (Data Transformations)
- 高阶函数 ( Higher-Order Functions)
- 递归
- 组合

命令式编程：喜欢大量使用可变对象和指令，我们总是习惯于创建对象或者变量，并且修改它们的状态或者值，或者喜欢提供一系列指令，要求程序执行。

React和 Web Components 为了解决不同的问题而生。而 Web Components 为可复用组件提供了强大的封装，而React则提供了声明式的解决方案，使得DOM与数据保持同步。两者旨在互补。作为开发人员，可以自由选择在 Web Components 中使用 React，或者在 React 中使用 Web Components，或者两者共存。
大多数开发者在使用 React 时，不使用 Web Components，但你可能会需要使用，尤其是在使用 Web Components 编写的第三方UI组件时。

### 在React中使用 Web Components
```js
class HelloMessage extends React.Component {
  render() {
    return <div>Hello <x-search>{this.props.name}</x-search>!</div>;
  }
}
```
### 在Web Components 中使用React
```js
class XSearch extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    const name = this.getAttribute('name');
    const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
    ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
  }
}
customElements.define('x-search', XSearch);
```