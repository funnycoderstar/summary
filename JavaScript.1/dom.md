#### 常见dom问题 参考[破解前端面试（80% 应聘者不及格系列）：从 DOM 说起](https://juejin.im/post/58f558efac502e006c3e5c97)

> 1,页面上有个空的无序列表节点，用 <ul></ul> 表示，要往列表中插入 3 个 <li>，每个列表项的文本内容是列表项的插入顺序，取值 1, 2, 3，怎么用原生的 JS 实现这个需求？同时约定，为方便获取节点引用，可以根据需要为 <ul> 节点加上 id 或者 class 属性。

```js
(() => {
    var ndContainer = document.getElementById('js-list');
    if (!ndContainer) {
        return;
    }

    for (var i = 0; i < 3; i++) {
        var ndItem = document.createElement('li');
        ndItem.innerText = i + 1;
        ndContainer.appendChild(ndItem);
    }
})();

```
> 2,如何绑定事件? 现在页面上有了内容，接下来添加交互。问题：要当每个 <li> 被单击的时候 alert 里面的内容，该怎么做？

```js
for (let i = 0; i < 3; i++) {
    const ndItem = document.createElement('li');
    ndItem.innerText = i + 1;
    ndItem.addEventListener('click', function () {
        alert(i);
    });
    ndContainer.appendChild(ndItem);
}

```

```js
for (var i = 0; i < 3; i++) {
    var ndItem = document.createElement('li');
    ndItem.innerText = i + 1;
    ndItem.addEventListener('click', function () {
        alert(this.innerText);
    });
    ndContainer.appendChild(ndItem);
}

```
- 因为 EventListener 里面默认的 this 指向当前节点，使用箭头函数需要格外注意，因为箭头函数会强制改变函数的执行上下文。

> 3,数据量变大之后？把循环终止条件修改为 i < 300，但是在 DOM 中注册的事件监听函数增加了 100 倍,使用事件委托能有效的减少事件注册的数量，并且在子节点动态增减是无需修改代码，使用事件委托的代码如下:

```js
(() => {
    var ndContainer = document.getElementById('js-list');
    if (!ndContainer) {
        return;
    }

    for (let i = 0; i < 300; i++) {
        const ndItem = document.createElement('li');
        ndItem.innerText = i + 1;
        ndContainer.appendChild(ndItem);
    }

    ndContainer.addEventListener('click', function (e) {
        const target = e.target;
        if (target.tagName === 'LI') {
            alert(target.innerHTML);
        }
    });
})();

```
- 如果要在 <ul> 中插入 30000 个 <li>，会有什么问题？代码需要怎么改进？几乎可以肯定，页面体验不再流畅，甚至会出现明显的卡顿感，该怎么解决？

- 出现卡顿感的主要原因是每次循环都会修改 DOM 结构，外加大循环执行时间过长，浏览器的渲染帧率（FPS）过低。而实际上，包含 30000 个 <li> 的长列表，用户不会立即看到全部，大部分甚至根本都不会看，那部分都没有渲染的必要,现代浏览器提供了 requestAnimationFrame API 来解决非常耗时的代码段对渲染的阻塞问题.

- 可以从减少 DOM 操作次数、缩短循环时间两个方面减少主线程阻塞的时间。减少 DOM 操作次数的良方是 DocumentFragment；而缩短循环时间则需要考虑使用分治的思想把 30000 个 <li> 分批次插入到页面中，每次插入的时机是在页面重新渲染之前。由于 requestAnimationFrame 并不是所有的浏览器都支持

```js
(() => {
    const ndContainer = document.getElementById('js-list');
    if (!ndContainer) {
        return;
    }

    const total = 30000;
    const batchSize = 4; // 每批插入的节点次数，越大越卡
    const batchCount = total / batchSize; // 需要批量处理多少次
    let batchDone = 0;  // 已经完成的批处理个数

    function appendItems() {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < batchSize; i++) {
            const ndItem = document.createElement('li');
            ndItem.innerText = (batchDone * batchSize) + i + 1;
            fragment.appendChild(ndItem);
        }

        // 每次批处理只修改 1 次 DOM
        ndContainer.appendChild(fragment);

        batchDone += 1;
        doBatchAppend();
    }

    function doBatchAppend() {
        if (batchDone < batchCount) {
            window.requestAnimationFrame(appendItems);
        }
    }

    // kickoff
    doBatchAppend();

    ndContainer.addEventListener('click', function (e) {
        const target = e.target;
        if (target.tagName === 'LI') {
            alert(target.innerHTML);
        }
    });
})();

```
> 4 DOM 树的遍历？数据结构和算法在很多人前端同学看来是没啥用的东西，实际上他们掌握的也不好，但不论前端还是后端，扎实的 CS 基础是工程师必备的知识储备，有了这种储备在面临复杂的问题，才能彰显出工程师的价值。JS 中的 DOM 可以天然的跟树这种数据结构联系起来

```js
<div class="root">
    <div class="container">
        <section class="sidebar">
            <ul class="menu"></ul>
        </section>
        <section class="main">
            <article class="post"></article>
            <p class="copyright"></p>
        </section>
    </div>
</div>

```
对这颗 DOM 树，期望给出广度优先遍历（BFS）的代码实现，遍历到每个节点时，打印出当前节点的类型及类名，例如上面的树广度优先遍历结果为：

```
DIV .root
DIV .container
SECTION .sidebar
SECTION .main
UL .menu
ARTICLE .post
P .copyright

```
这要求对 DOM 树中节点关系的表示方式比较清楚，关键属性是 childNodes 和 children，两者有细微的差别。如果是深度优先的遍历（DFS），使用递归非常容易写出来，但是广度优先则需要使用队列这种数据结构来管理待遍历的节点

```js
const traverse = (ndRoot) => {
    const queue = [ndRoot];

    while (queue.length) {
        const node = queue.shift();

        printInfo(node);

        if (!node.children.length) {
            continue;
        }

        Array.from(node.children).forEach(x => queue.push(x));
    }
};

const printInfo = (node) => {
    console.log(node.tagName, `.${node.className}`);
};

// kickoff
traverse(document.querySelector('.root'));

```