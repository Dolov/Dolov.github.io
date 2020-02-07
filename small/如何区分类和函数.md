# 如何区分函数和类

```js
const isClass = fn => {
    if (
        typeof fn === 'function' &&
        fn.toString().includes('class')
    ) {
        return true
    }
    return false
};
```
