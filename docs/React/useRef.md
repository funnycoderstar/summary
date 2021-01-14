##  useRef
## 前言
useRef 是 react hooks的一种。
相信大家都知道ref是干啥的，ref主要是用来获取DOM的。

## 一个非常常见的例子
```js
function Counter() {
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={handleAlertClick}>
        Show alert
      </button>
    </div>
  );
}
```
按下下面的步骤进行操作：
- 点击增加counter到3
- 点击一下 “Show alert”
- 点击增加 counter到5并且在定时器回调触发前完成

你猜alert会弹出什么呢？
会是5吗？— 这个值是alert的时候counter的实时状态。
或者会是3吗？— 这个值点击时候的状态。

正确的答案是3

## 抛开问题，先说一下函数式组件



## 回到最开始的例子
可以使用 useRef获取最新的state。

what, how, why

## useRef的一些使用场景
理解了useRef，我们可以使用它来做一些事情。usePrevious，useTimeout

## 推荐好的自定义hooks库

## 总结

## 参考



