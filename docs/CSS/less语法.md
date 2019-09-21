## [less](http://lesscss.cn/features/#parent-selectors-feature)

## 变量既可以当做css属性的值,也可以用过选择器名称,属性名称,url和@import语句

作为选择器名称

```js
@button-prefix: ~'test-button';
@{button-prefix} {
    font-weight: bold;
    line-height: 40px;
}
// 编译为
.test-button {
    font-weight: bold;
    line-height: 40px;
}
```

作为属性名称

```css
@property: 'color';

.test-button {
    @{property}: #333;
    background-@{property}: #999;
}
// 编译为
.test-button {
    color: #333;
    background-color: #999;
}
```

## less的转义

有些转义字符需要加上`~`使用的时候才不会被转义  
在将LESS代码编译为CSS代码之后，〜“some\_text"中的任何内容将显示为 some\_text 。

## 引用父选择器 `&`

1.修改类或伪类

```less
a {
    color: #333;
    &:hover {
        color: red;
    }
}
// 编译为

a {
    color: #333;
}
a:hover {
    color: red;
}
```

2.产生重复的类名称

```less
.button {
    &-ok {
        background-image: url("ok.png");
    }
    &-cancel {
        background-image: url("cancel.png");
    }
    &-custom {
        background-image: url("custom.png");
    }
}
// 编译为
.button-ok {
  background-image: url("ok.png");
}
.button-cancel {
  background-image: url("cancel.png");
}
.button-custom {
  background-image: url("custom.png");
}
```

3.多`&`   
重复引用父选择器而不重复其名称

```less
.link {
  & + & {
    color: red;
  }

  & & {
    color: green;
  }

  && {
    color: blue;
  }

  &, &ish {
    color: cyan;
  }
}
// 编译为

.link + .link {
    color: red;
}
.link .link {
    color: green
}
.link.link {
    color: blue;
}
.link, .linkish {
    color: cyan;
}
```



