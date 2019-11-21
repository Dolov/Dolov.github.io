<div align="center">
    <img src="./taro.png" width="800"  />
</div>

# 前言

前段时间公司决定开发移动端项目，需要适配小程序端、h5 端。以后也不排除有向其他端扩展的可能性。对比了一些相关的跨端开发框架，如 uni-app、mpvue、chameleon、Taro 等。最后出于以下考虑采用了 Taro。

- Taro 支持的终端更多，有利于后期扩展。
- Taro 遵循 React 语法规范，与团队技术选型完全契合。
- Taro 团队对于 issue 的解决速度比较及时，更新维护频率快。

# 踩过的坑 

在使用 Taro 开发的过程中遇到的很多的问题，这是使用任何框架都无法避免的情况。这里把遇到的问题简单的记录一下，避免重复踩坑。(h5 和 weapp 端)

- 当打包多端 UI 库时需要执行 <code>TARO_BUILD_TYPE=ui taro build --ui</code> 命令。但是如果源码中有组件互相调用和递归的场景时打包就会死循环。(1.3.19 版本已经修复)[issue](https://github.com/NervJS/taro/issues/4427)

- 1.3.18 版本， weapp 端使用 Context, 当 Context 值变化的时候 PureComponent 子组件不会更新。 (1.3.19 版本时，weapp 和 h5 端都存在此问题) 
  
- 1.3.18 版本， h5 端使用 Context, 当父组件的状态变更引起子组件更新的时候，子组件的 this.context 结构会发生变化。
  
- weapp 端 this.props 不支持使用 rest property 语法，需要把每一个 prop 都单独列出来。

- weapp 端传递父组件的实例给子组件会导致内存溢出，组件崩溃。可以尝试以函数的方式传递。

```js

  // wrong

  <InstanceTest instance={this} />

  // fix

  <InstanceTest instance={() => this} />
```
- 以 render 开头的 props 只能传入包含一个 JSX 元素的 JSX 表达式。
  
- weapp 端不能定义 jsx 变量
  
```js

  // wrong

  const Error = <View>error</View>
```

- weapp 端每个文件只能定义导出一个组件。导出了一个组件后，就不能再导出其他变量、方法。

- weapp 端 render 方法会提前执行，所以对于对象的取值，需要加上兼容处理。

```js
  
  render() {
    const { name, id } = this.props.params || {}
  }
```

- 当项目中出现语法报错并更改代码之后，命令行中会出现警告 <samp>"出现文件没有被引用到，不会被编辑"</samp> 这个时候需要重启一下服务。


  


- 有时候会遇到 setState 无效的情况，可以尝试使用 setTimeout。可能会有意想不到的效果。
