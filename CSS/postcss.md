## postcss是什么
我们都知道”babel“的存在，可以让我们使用比较新的js语法，postcss则可以理解为CSS的”babel“，可以让我们使用比较新的CSS语法

postcss 不是类似less的CSS预处理器， 而是一种允许用JS插件来转变样式的工具。
postcss提供了一个解析器，它能够将CSS解析成抽象语法树(AST)。

postcss的常用插件
- [autoprefixer](https://github.com/postcss/autoprefixer)： autoprefixer插件会给根据CanIUse的兼容性去检查你的CSS代码，然后自动为你的CSS代码加上浏览器厂商的私有前缀
- [precss](https://github.com/jonathantneal/precss)
- [postcss-cssnext](https://github.com/MoOx/postcss-cssnext/)
- [PostCSS 是个什么鬼东西？](https://segmentfault.com/a/1190000003909268)
