期望的用法
```js
useInterval(() => {
    // 你自己的代码
    setCount(count + 1);
}, 1000);
```
useInterval 的代码
```js
import React, { useState, useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // 保存新回调
  useEffect(() => {
    savedCallback.current = callback;
  });

  // 建立 interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
```