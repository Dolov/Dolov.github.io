![image](https://user-gold-cdn.xitu.io/2019/4/3/169ded1a735efcff?w=600&h=428&f=jpeg&s=19235)
> 图片来源于阮一峰博客

ES6 新增了第 7 种原始数据类型 Symbol，简单介绍一下它的使用方法及使用场景。
# Symbol 含义及使用方法
symbol 英文意思为 符号、象征、标记、记号，在 js 中更确切的翻译应该为 **独一无二的值**，理解了它的意思之后再看起来就简单多了。

可以通过下面的方式来创建一个 symbol 类型的值

```js
const s = Symbol();

console.log(typeof s);  // "symbol"
```

**需要注意的是通过 Symbol 方法创建值的时候不用使用 new 操作符，原因是通过 new 实例化的结果是一个 object 对象，而不是原始类型的 symbol**

Symbol 方法接收一个参数，表示对生成的 symbol 值的一种描述
```js
const s = Symbol('foo');
```
即使是传入相同的参数，生成的 symbol 值也是不相等的，因为 Symbol 本来就是独一无二的意思
```js
const foo = Symbol('foo');
const bar = Symbol('bar');

console.log(foo === bar); // false

```
Symbol.for 方法可以检测上下文中是否已经存在使用该方法且相同参数创建的 symbol 值，如果存在则返回已经存在的值，如果不存在则新建。
```js
const s1 = Symbol.for('foo');
const s2 = Symbol.for('foo');

console.log(s1 === s2); // true
```
Symbol.keyFor 方法返回一个使用 Symbol.for 方法创建的 symbol 值的 key
```js
const foo = Symbol.for("foo");
const key = Symbol.keyFor(foo);

console.log(key) // "foo"
```

# 使用场景
上面简单介绍一下几个常用的方法，那么在什么样的场景下能够使用到呢，接下来介绍几个比较适合的使用场景

1. 消除魔法字符

> 代码千万行，维护第一难。编码不规范，同事两行泪。

当代码中充斥着大量的魔法字符时，纵使是原开发者在经过一段时间后再回头看也会变得难以理解，更不必说是交由后来开发者维护。

假如现有一个 Tabs 切换的功能

    
    if (type === 'basic') {
        return <div>basic tab</div>
    }
    
    if (type === 'super') {
        return <div>super tab</div>
    }
    
上面代码中字符串 basic、super 就是与业务代码无关的魔法字符，接下来使用 Symbol 对这块代码进行改造

    const tabTypes = {
        basic: Symbol(),
        super: Symbol(),
    }
    
    if (type === tabTypes.basic) {
        return <div>basic tab</div>
    }
    
    if (type === tabTypes.super) {
        return <div>super tab</div>
    }


2、作为对象属性
当一个复杂对象中含有多个属性的时候，很容易将某个属性名覆盖掉，利用 Symbol 值作为属性名可以很好的避免这一现象。
```js
const name = Symbol('name');
const obj = {
    [name]: 'ClickPaas',
}
```

3、模拟类的私有方法

ES6 中的类是没有 private 关键字来声明类的私有方法和私有变量的，但是我们可以利用 Symbol 的唯一性来模拟。

```js
const speak = Symbol();
class Person {
    [speak]() {
        ...
    }
}
```
因为使用者无法在外部创建出一个相同的 speak，所以就无法调用该方法