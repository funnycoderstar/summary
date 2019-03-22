# 编写一个cli工具

## 1.在package.json中添加

```javascript
"bin": {
    "testc": "index.js",
    "test-cli": "index.js"
  },
```

## 2.在index.js头部添加注释

```javascript
#!/usr/bin/env node
```

## 3.用到的工具

* commander
* node中的process,child\_process, fs, path模块
* deepmerge
* yeoman-generator
* camelcase
* shelljs

