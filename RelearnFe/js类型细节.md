

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