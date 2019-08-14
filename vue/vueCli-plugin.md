## @vue/cli 插件开发

Vue Cli 使用了基于插件的架构。如果你查阅一个新创建项目的package.json, 就会发现依赖都是以`@vue/cli-plugin-`开头的。插件可以修改内部的webpack配置， 也可以向vue-cli-service注入命令。在项目创建的过程中列出的特性，绝大部门都是通过 插件来实现的。

每个cli插件都会包含一个（用来创建文件）生成器和一个（用来调整webpack核心配置和注入命令的）运行时插件

## @vue/cli 核心思想

通过预设配置保存用户在使用 vue create 命令时选择要支持的一些功能；
预设配置的数据会被插件生成器用来生成相应的项目文件。
比如 
```js
if（isHaveVuex）{
    vue add vuex
}
```
