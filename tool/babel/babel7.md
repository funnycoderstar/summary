## @babel/preset-env 的 useBuiltIns

```js
// .babelrc.js
module.exports = {
    presets: [
        [
            "@babel/preset-env",
            
            {
                "modules": false, // 模块使用 es modules ，不使用 commonJS 规范，具体看文末附录
                "useBuiltIns": 'usage', // 默认 false, 可选 entry , usage
            }
        ]
    ]
}
```
useBuiltIns 值为
1. false 不启用 polyfill，如果在业务入口import '@babel/polyfill', 会无视 .browserslist 将所有的 polyfill 加载进来。
2. entry 启用， 需要手动 import '@babel/polyfill' 才生效（否则会抛出错误：regeneratorRuntime undefined）, 根据 .browserslist 过滤出 需要的 polyfill (类似 polyfill.io 方案)
3. usage : 不需要手动import '@babel/polyfill'(加上也无妨，编译时会自动去掉), 且会根据 .browserslist + 业务代码使用到的新 API 按需进行 polyfill。


[Show me the code，babel 7 最佳实践](https://juejin.im/post/5c03a4d0f265da615e053612)

## @babel/preset-env 的 modules 选项
启用将ES6模块语法转换为其他模块类型。
设置为false, 是不转换

> webpack代码经过Babel loader 以及其他各种代码的loader之后，再把代码整合。所以该选项一定要设置为 false, webpack才能做按需加载

## Babel 7 change
包重命名： babylon 改为 @babel/parser
您仍然可以在配置中使用包名称的简写版本（删除preset-或plugin-）
删除了 @babel/polyfill， 现在@babel/polyfill主要只是core-js2的别名.


