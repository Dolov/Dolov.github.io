# React 中 $$typeof 的作用

当在控制台打印一个 React 组件的时候，会能看出组件就是一个对象，也可以说是虚拟 dom，这个对象上面包含了所需要渲染的 dom 节点的标签名称、属性、子节点等信息。同时也有一个 $$typeof 的属性。

## $$typeof 是如何添加在 React 对象上的

jsx 语法在被 babel 解析的时候调用 React.createElement 方法，那么我们看一下 [createElement](https://github.com/Dolov/react/blob/master/packages/react/src/ReactElement.js) 方法的实现

```js
export function createElement(type, config, children) {

    ...

    return ReactElement(
        type,
        key,
        ref,
        self,
        source,
        ReactCurrentOwner.current,
        props,
    )
}
```

createElement 方法返回了 ReactElement 方法的执行结果，那么看一下 [ReactElement](https://github.com/Dolov/react/blob/master/packages/react/src/ReactElement.js) 方法的实现

```js
const ReactElement = function(type, key, ref, self, source, owner, props) {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner,
  }

  ...

  return element;
}
```

从上面的代码中可以看到 $$typeof 属性就是在 ReactElement 方法中添加到 React 对象上的。其值为变量 REACT_ELEMENT_TYPE。

## 变量 REACT_ELEMENT_TYPE 是如何定义的

在 [ReactSymbols.js](https://github.com/Dolov/react/blob/master/packages/shared/ReactSymbols.js) 文件中可以看到变量 REACT_ELEMENT_TYPE 的定义

```js
const hasSymbol = typeof Symbol === 'function' && Symbol.for;

export const REACT_ELEMENT_TYPE = hasSymbol
    ? Symbol.for('react.element')
    : 0xeac7;

    ...
```

如果当前浏览器支持 Symbol 则 REACT_ELEMENT_TYPE 为 Symbol 类型的变量，否则为 16 进制的数字。

## 添加 $$typeof 的意义
