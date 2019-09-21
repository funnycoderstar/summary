
# 1.在package.json中添加
```js
"bin": {
    "testc": "index.js",
    "test-cli": "index.js"
  },
```
# 2.在index.js头部添加注释

```js
#!/usr/bin/env node
```

# 3.用到的工具
- commander
- node中的process,child_process, fs, path模块
- deepmerge
- yeoman-generator
- camelcase
- shelljs


