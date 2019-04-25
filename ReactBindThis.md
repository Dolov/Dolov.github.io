![image](https://user-gold-cdn.xitu.io/2019/3/28/169c340b878987b2?w=1234&h=734&f=png&s=1399779)

在使用 React 做组件开发的时候经常需要对某些方法指定 this ，那么为什么需要指定 this 呢、有哪些方式来指定呢、这些方式有什么不同以及性能的优劣的？

#### 一、为什么需要指定this

> 原因就是 **this 丢失！！！**

那么好端端的为什么会出现 this 丢失的情况呢？这是因为 react 造成的么

this 丢失是 js 中常见的现象，跟 react 并没有直接关系（有一点点的间接关系）


那么 js 中有哪些常见的 this 丢失的现象呢，举个栗子

    const color = 'pink'
    const person = {
      color: 'red',
      getColor() {
          return this.color
      }
    }
    const getColor = person.getColor
    console.log(getColor())

那么现在打印出来的是什么？没错就是 undefined
> 认为应该打印 red 或者 pink 的小伙伴需要补充一些 this 指向和 ES6 的相关知识

react 中 this 丢失的原因跟这个基本是一样的，看一段简单的 react 代码


    export default class Header extends PureComponent {
        constructor() {
            super()
            this.state = {}
        }
        
        click() {
            console.log(this)
        }
        
        render() {
            return (
                <button onClick={this.click}>ClickPaas</button>
            )
        }
    }


那么现在打印出来的是什么？没错还是 undefined

这段代码中 button 的点击事件绑定的 click 方法没有手动的指定 this，所以打印出来的 this 为 undefined

前面我们说过，需要手动指定的原因是 this 丢失了，那么 react 组件中的 this 是怎么丢失的呢，这就跟 JSX 语法的解析有关了

React 组件能够显示在页面上形成真实的 dom 节点需要一系列复杂的操作，其中有一步是使用 transform-react-jsx 插件将 JSX 语法转化成多个参数，传递给 react 的 createElement 方法。这些参数可以分为三种类型存储为这样的结构

    {
        tag: "button",    // 外层标签的名称或者是自定义组件的名称
        props: { onClick: this.click},  // 外层标签的属性，className id  以及各种鼠标事件，或者是自定义组件含有的自定义属性
        children: ["ClickPaas"]  // 子级节点，
    }

现在可以看到 Header 组件中的 button 标签上面的属性以及属性值存储的方式了，由此可以明白当 button 标签的 click 事件触发时候相当于执行的是 props.onClick()   所以 this 丢失了

#### 二、有哪些指定 this 的方式呢？

1. 在构造函数中使用 bind 方法


        constructor() {
            super()
            this.click = this.click.bind(this)
        }
    

原理：通过 js 提供的 bind 方法改变 this 指向

优势：只需在类组件初始化时指定一次即可，性能好

劣势：当有多个需要指定this的方法时，需要在 constructor 中 bind 多个，略显繁琐


2. 在绑定事件时使用 bind 方法


        render() {
            return (
                <button onClick={this.click.bind(this)}>ClickPaas</button>
            )
        }

原理：同第一种方式的原理一样

优势：可读性强？

劣势：每次 render 都会重新 bind 一次，性能差


3. 在绑定事件时使用箭头函数

        render() {
            return (
                <button onClick={() => this.click()}>ClickPaas</button>
            )
        }


原理：ES6 新增的箭头函数没有自身的 this， 它继承上下文中的 this，指向当前组件

优势：不需要考虑this的指向

劣势：每次 render 都会产生一个新的回调函数，性能差


4. 将定义在原型上面的方法改为实例方法

        export default class Header extends PureComponent {
            constructor() {
                super()
                this.state = {}
            }
            
            // 实例方法
            click = () => {
                console.log(this)
            }
            
            render() {
                return (
                    <button onClick={this.click}>ClickPaas</button>
                )
            }
        }

原理：同第三种方式的原理一样

优势：性能比第二种、第三种方式要好

劣势：将原型方法变成了实例方法，有一定的内存开销