![image](https://user-gold-cdn.xitu.io/2019/5/13/16ab046534dedd67?w=2995&h=2250&f=jpeg&s=1545159)

> 图片来源于互联网

React 中常规的父子组件通信都是通过 props 进行的，子组件通过 props 来接收父组件传递的状态值以及方法，从而响应视图的更新以及事件的执行。

## 为什么要获取组件实例

在不同的业务场景中也会存在非常规的通信方式，例如需要在父组件中调用子组件属性或者方法，这个时候就需要获取子组件的实例来解决这个问题。

### 获取组件实例的方法

首先需要说明的是，只有类组件才有实例，函数式组件是没有组件实例的。

React 官方提供了 3 种使用 ref 获取实例的方式。

1. ref 接收一个字符串作为参数 （不推荐）

```js
    class Index extends React.PureComponent {
        componentDidMount() {
            // 调用实例
            console.log(this.refs.classComponentInstance)
        }
        render() {
            return (
                <ClassComponent ref="classComponentInstance" />
            )
        }
    }
```

2. ref 接收一个回调函数作为参数

```js

    class Index extends React.PureComponent {
        componentDidMount() {
            // 调用实例
            console.log(this.classComponentInstance)
        }
        classComponentInstance = null
        render() {
            return (
                <ClassComponent ref={instance => {this.classComponentInstance=instance}} />
            )
        }
    }
```

3. ref 接收 React.createRef 作为参数

```js
    class Index extends React.PureComponent {
        componentDidMount() {
            // 调用实例
            console.log(this.classComponentInstance.current)
        }
        classComponentInstance = React.createRef()
        render() {
            return (
                <ClassComponent ref={this.classComponentInstance} />
            )
        }
    }
```

## 被高级组件装饰的组件

所谓的高级组件也就一个函数，以组件作为参数，以组件作为返回值，主要是用于处理一些相似的逻辑，使组件可高度复用。

```js

    // Child.js
    @HocComponent
    export default class Child extends React.PureComponent {
        render(
            return (
                <div>this is Child</div>
            )
        )
    }
    // Parent.js
    import Child from './Child'
    class Parent extends React.PureComponent {
        childComponentInstance = null
        render(
            return (
                <Child ref={instance => {this.childComponentInstance=instance}} />
            )
        )
    }
```

关于装饰符可查看[教程](http://es6.ruanyifeng.com/?search=%E8%A3%85%E9%A5%B0%E7%AC%A6&x=0&y=0#docs/decorator)

上面示例中 Child 就是一个被高级组件使用装饰符装饰的类组件，当在 Parent 组件中调用并使用 ref 获取其实例的时候就会发现 this.childComponentInstance 被赋值的实例并不是 Child 的实例，而是 HocComponent 组件的实例。

### 获取被装饰组件的实例

```js

    // Child.js
    @HocComponent
    export default class Child extends React.PureComponent {
        componentDidMount() {
            // 在 componentDidMount 周期中或者在 constructor 构造函数中执行父组件中传递过来的 getRef 方法，将实例 this 作为参数
            this.props.getRef(this)
        }
        render(
            return (
                <div>this is Child</div>
            )
        )
    }
    // Parent.js
    import Child from './Child'
    class Parent extends React.PureComponent {
        childComponentInstance = null
        render(
            return (
                <Child getRef={instance => {this.childComponentInstance=instance}} />
            )
        )
    }

```

通过上面的方式就可以穿透高级组件，获取到目标组件的实例

## 抽象封装为可复用的高级组件

上面的方法虽然已经实现了我们需要的功能，但是代码侵入性太强，没有复用度可言，所以我们需要把这个功能提取出来。

```js

    // util.js
    export const getRef = WrapperdComponent => {
        return props => {
            const { getRef, ...otherProps }  = props
            return <WrapperdComponent ref={getRef} {...otherProps} />
        }
    }
```

当把穿透方法提取为一个高级组件之后就可以在任何需要的地方调用即可

```js

    // 使用示例
    // Child.js
    import { getRef } from './util'
    @HocComponent
    @getRef
    export default class Child extends React.PureComponent {
        render(
            return (
                <div>this is Child</div>
            )
        )
    }
    // Parent.js
    import Child from './Child'
    class Parent extends React.PureComponent {
        childComponentInstance = null
        render(
            return (
                <Child getRef={instance => {this.childComponentInstance=instance}} />
            )
        )
    }
```

## 最后

文中如有错误，欢迎在评论区指正，谢谢阅读