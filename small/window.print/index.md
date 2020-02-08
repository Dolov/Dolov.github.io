# 浏览器打印
前言：前段时间做了一个功能，打印富文本编辑的业务模板。用到了浏览器打印功能，总结一下常见的问题。


### 如何调用浏览器打印
- 在浏览器中可以通过快捷键 <kbd>ctrl + p</kbd> 调用
- 在 js 脚本中通过 <code>window.print()</code> 调用

> window.print() 方法用于打印当前窗口的内容。
调用 print() 方法所引发的行为就像用户单击浏览器的打印按钮。通常，这会产生一个对话框，让用户可以取消或定制打印请求。

### 钩子方法
- onbeforeprint
  
  在调用 print() 方法后执行该方法
- onafterprint
  
  在打印完成或者点击取消按钮后执行该方法

window.print() 方法非常不方便的地方是无法通过传参的方式对打印操作进行设置，需要在 css 中进行设置。

### 设置打印的样式
当需要针对打印的内容设置特殊的样式，比如隐藏部分区域、对某个区域设置特殊的字体大小。

- 当样式内容比较多时，可以通过外链样式表。
  
```css
    <link rel="stylesheet" href="css/printstylesheet.css" media="print" />
```

- 当样式比较少时，可以通过媒体查询内联样式。

```css
    @media print {
        .ad {
            display: none;
        }
    }
```

### 设置打印的区域
有些场景下需要打印页面中部分区域内容

- 通过设置打印样式，将不需要打印的内容设置为 <code>display: none</code>，只留下需要打印的区域。
- 获取需要打印的 dom 节点，替换当前 body 下的节点。完成打印后恢复 body 下的节点。

```js
    const bodyHtml = document.body.innerHTML
    const printContentHtml = document.getElementById('print').innerHTML
    document.body.innerHTML= printContentHtml
    window.print()
    document.body.innerHTML = bodyHtml
```

- 动态创建一个不可见的 iframe, 将需要打印的 dom 节点插入 iframe 内，调用 iframe 的 print 方法。(推荐)

```js
    const printContentHtml = document.getElementById('print').innerHTML
    const iframe = document.createElement('iframe')
    iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;')
    document.body.appendChild(iframe)
    iframe.contentDocument.write(printContentHtml)
    iframe.contentDocument.close()
    iframe.contentWindow.print()
    document.body.removeChild(iframe)
```
- 在新打开的页面中进行打印
  
```js
    const printContentHtml = document.getElementById('print').innerHTML
    const printPage = window.open()
    printPage.document.write(printContentHtml)
    printPage.document.close()
    printPage.print()
    printPage.close()
```

### 设置打印的方向
默认的打印方向是纵向的，可以通过 css 设置为横向打印
- 横向 <code>@page { size: landscape; }</code>
- 纵向 <code>@page { size: portrait; }</code>

设置了打印方向之后，浏览器打印弹窗中无法再次进行打印方向的设置

### 设置打印的纸张类型
默认的纸张类型是 A4，可以通过 css 设置为其他纸张类型，但是只有 A5, A4 , A3 为有效值
```css
    @page {
        size: A3;  // A5, A4 or A3
    }
```
如果既要设置方向又要设置纸张类型
```css
    @page {
        size: A3 landscape;  
    }
```

### 设置打印的边距
```css
    @page {
        margin: 1cm;
    }
```

### 设置打印的页眉页脚
默认的打印会带有页眉页脚。页眉包括日期、title，页脚包括链接和分页等信息。
可以通过 margin 设置边距达到隐藏页眉页脚的目的。
- 去除页眉
```css
    @page {
        margin-top: 0;
    }
```

- 去除页脚
```css
    @page {
        margin-bottom: 0;
    }
```

- 如果想把页眉页脚全部去掉可以通过下面的方式。
```css
    @page {
        margin: 0;
    }
```

如果需要边距，可以通过设置 body 的 margin 值来模拟边距。至于如何单独去除页眉中的某项或者页脚中某项暂时还没发现方法。