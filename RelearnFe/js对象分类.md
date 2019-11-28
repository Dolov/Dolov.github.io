> 在浏览器环境中，我们也无法单纯依靠 JavaScript 代码实现 div 对象，只能靠 document.createElement 来创建。这也说明了 JavaScript 的对象机制并非简单的属性集合 + 原型。


# 对象分类

- 宿主对象
  - 浏览器环境  window Image 
  - Node 环境  global
    
- 内置对象
  - 固有对象  
    > 随着 JavaScript 运行时创建而自动创建的对象实例
  - 原生对象  
    > 能够通过语言本身的构造器创建的对象称作原生对象
  - 普通对象  
