

- 为什么有的编程规范要求用 void 0 代替 undefined

在 js 中 undefined 的是一个变量，而不是关键字，存在被篡改的风险。
在低版本的浏览器中和局部作用域中 undefined 是可以被重新赋值的。

```js
    // 全局作用域

    const undefined = "hello"
    console.log(undefined) // undefined

    // 局部作用域

    (() => {
        const undefined = "world"
        console.log(undefined) // world
    })()
```
因为 void 对任何值都是返回 undefined，所以使用 void 0 可以弥补 undefined 存在的漏洞。


- String 的意义并非“字符串”，而是字符串的 UTF16 编码。

- 使用 Number.EPSILON 检查等式左右两边差的绝对值是否小于最小精度，才是正确的比较浮点数的方法。

```js
	Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON
```

- 哪些数据结构可以使用 for of 循环。

任何数据结构只要部署遍历器接口，就可以完成遍历操作。凡是部署了 Symbol.iterator 属性的数据结构，就称为部署了遍历器接口。
在ES6中，有三类数据结构原生具备 Iterator 接口：数组、某些类似数组的对象、Set 和 Map 结构。

```js

	// 为对象添加 Iterator 接口
	
	const person = {
		name: 'shi',
		age: 18,
		[Symbol.iterator]() {
			const keys = Object.keys(this)
			let = i
			return {
				next() {
					return { value: keys[i++], done: i > keys.length }
				}
			}
		}
	}

	for (const i of person) {
	    console.log(i)    // name age
	} 
```


- 为什么原始数据类型可以调用方法?

```js
	console.log("abc".charAt(0))     //a
```

“ . ”运算符提供了装箱操作，它会根据基础类型构造一个临时对象，使得我们能在基础类型上调用对应对象的方法。这个过程类似于下面

```js
	const s1  = new String("abc")
	const s2 = s1.charAt(0)
	s1 = null
```


- 对象是如何转化为 String 和 Number 的？
  
对象到 String 和 Number 的转换都遵循“先拆箱再转换”的规则。通过拆箱转换，把对象变成基本类型，再从基本类型转换为对应的 String 或者 Number。

```js
	const n = new Number(1)
	n.valueOf = function() {
		return 2
	}

	n.toString = function() {
		return "3"
	}

	console.log(n - 0)       // 2
	console.log(String(n))   // 3

```

对象在转化为 number 类型时优先执行 valueOf 方法，如果转化失败再执行 toString 方法。
转化为 string 类型则反之。(这两个方法在对象的原型链上)

在 ES6 之后，还允许对象通过 Symbol.toPrimitive 来覆盖原有的行为。

```js
	const person = {
		[Symbol.toPrimitive](type) {
			// type: default | number | string
			return 1
		}
	}

	console.log(+person)   // 1
```




# 参考
- [JavaScript类型：关于类型，有哪些你不知道的细节？](https://time.geekbang.org/column/article/78884)
- [toString方法和valueOf方法以及Symbol.toPrimitive方法的学习](https://segmentfault.com/a/1190000016300245)
- [Symbol.toPrimitive  MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive)
- [Symbol.iterator  MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator)