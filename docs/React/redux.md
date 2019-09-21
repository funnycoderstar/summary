## redux

redux的三个概念: action reducer store

* action: 一个包含type的object, 通常把一个返回action对象的函数称为action函数, 直接简称为action

```js

function action(data) {
    return {
        type: 'Action1',
        data,
    };
}


```
* reducer: 一个根据action type来更新数据的函数

```js
function reducer(state = { data: 1 }, action) {
    switch (action.type) {
        case 'action1': {
            const newState = JSON.parse(JSON.stringify(state));
            return newState;
        }
        case 'action2': {
             const newState = JSON.parse(JSON.stringify(state));
             return newState;
        }
        default: {
            return state;
        }
    }
}

```

* store: 使用createStore从reducer函数创建的数据对象, 包含getState和dispatch方法

```js
import { createStore } from 'redux';

let store = createStore(reducer);
console.log(store.getState())

store.dispatch(action(0))
console.log(store.getState())
```


*注意! 更新数据需要dispatch对应的action*

## react-redux

用于将redux于react结合

* Provider: 顶层组件, 注入store对象

```js
import { Provider } from 'react-redux';

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'),
);

```

* connect: 工具函数, 参数一为函数, 该函数接收state, 返回一个对象, 对象包含一系列数据. 参数二为函数, 该函数接收dispatch, 返回一个对象, 对象包含一系列方法
```js
import { connect } from 'react-redux';  

class App extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'action1',
            data: 1,
        });
    }

    render() {
        // this.props.func1();
        // this.props.func2();
        return (
            <div>
            </div >
        );
    }
}

export default connect(
    state => ({
        data: state.data,
        obj: state.obj,
    }),
    dispatch => ({ dispatch }),
)(App);

```


## immutable.js

特殊的object(MAP)/array(LIST)

* 更新数据: set setIn update updateIn
* 读取数据: get getIn
* 可以直接比较(深层比较)
* 创建(fromJS), 还原(toJS)

```js
// 上述的reducer可以用下面的代码优化

function reducer(state = immutable.fromJS({ data: 1, obj: { aa: 1 } }), action) {
    switch (action.type) {
        case 'action1': {
            return state.set('data', action.data * 10);
        }
        case 'action2': {
            return state.setIn(['obj', 'aa'], action.data);
        }
        default: {
            return state;
        }
    }
}

```



### 优点

* 无需深复制, 更新数据自动返回一个新对象
* 适合与react shouldComponentUpdate结合来优化性能


## pure-render-decorator

自动创建shouldComponentUpdate的工具, 需要配置babel decorator特性才能使用