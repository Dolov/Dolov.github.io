<div align="center">
    <img src="./../images/html2.png" width="800"  />
</div>

# 前言
在我刚接触前端的时候，html5 标准规范就已经发布了很长时间了。
知道新增了很多功能性标签如 video、audio 等多媒体标签，canvas、svg 图像标签，新的表单类型和属性，以及非常多的语义标签。

然而在的日常开发中除了用一些如 footer、header 等 h5 语义化标签外，其他的基本都是 div + span 一梭子全部搞定。快速还原设计稿，并不会感觉有什么不妥。因为在 HTML 语义上面花费太多时间并不会有一个很明显的收益，还可能会被领导误认为在摸鱼。所以语义化的 HTML 在紧张的开发迭代中就这么被忽略了。

但是看了 winter 对于语义化 HTML 的讲解之后，才突然认识到这些年写的 HTML 就是在瞎 ** 写，虽然实现了布局结构但是意义完全是变了味道的。

## 语义化 HTML 的意义

> - 语义类标签对开发者更为友好，使用语义类标签增强了可读性，即便是在没有 CSS 的时候，开发者也能够清晰地看出网页的结构，也更为便于团队的开发和维护。
> - 除了对人类友好之外，语义类标签也十分适宜机器阅读。它的文字表现力丰富，更适合搜索引擎检索（SEO），也可以让搜索引擎爬虫更好地获取到更多有效信息，有效提升网页的搜索量，并且语义类还可以支持读屏软件，根据文章可以自动生成目录等等。


# 正文

## ruby 
> ruby 元素被用来展示东亚文字注音或字符注释。
> 
<font size=18>
龙行
    <ruby>
        龘<rt>dá</rt>
        龘<rt>dá</rt>
    </ruby>
</font>    

<p>
<font size=18>
    <ruby>
    明日 <rt>Ashita</rt>
    </ruby>
</font>
</p>
之前在遇到这种布局的时候一般都是使用定位达到显示效果，但是 ruby 元素才是该场景的最优解。

## em
> em 标签告诉浏览器把其中的文本表示为强调的内容。对于所有浏览器来说，这意味着要把这段文字用斜体来显示。

em 是英文 emphasize 的缩写，意思为强调。

<p>我今天吃了一个<em>苹果</em></p>  
<p>我今天吃了<em>一个</em>苹果</p>

上面两句话，第一句强调的是苹果第二句强调的是今天。所以如果有需要强调某个词语的时候就应该使用 em 标签，如果仅仅是为了斜体显示则使用 i 标签。

## strong
> strong 标签和 em 标签一样，用于强调文本，但它强调的程度更强一些。

> 如果常识告诉我们应该较少使用 em 标签的话，那么 strong 标签出现的次数应该更少。如果说用 em 标签修饰的文本好像是在大声呼喊，那么用 strong 标签修饰的文本就无异于尖叫了。沉默寡言的人说出的话总是一诺千金，与此相同，限制 strong 的使用可以令应该更加引人注意，而且更加有效。

## aside

> aside 元素表示一个和其余页面内容几乎无关的部分，被认为是独立于该内容的一部分并且可以被单独的拆分出来而不会使整体受影响。其通常表现为侧边栏或者标注框（call-out boxes）。

- 被包含在 article 元素中作为主要内容的附属信息部分，其中的内容可以是与当前文章有关的相关资料、名次解释，等等。
- 在 article 元素之外使用作为页面或站点全局的附属信息部分。最典型的是侧边栏，其中的内容可以使友情链接，博客中的其它文章列表、广告单元等。

## hgroup
> hgroup 标签用于对网页或区段（section）的标题进行组合。


> h1-h6 是最基本的标题，它们表示了文章中不同层级的标题。有些时候，我们会有副标题，为了避免副标题产生额外的一个层级，我们使用 hgroup 标签。


## section

> section 元素表示一个包含在HTML文档中的独立部分，它没有更具体的语义元素来表示，一般来说会有包含一个标题。

```html
<section>
  <h1>Heading</h1>
  <p>Bunch of awesome content</p>
</section>
```
<em>section 的嵌套会使得其中的 h1-h6 下降一级</em>


## article

> article 是使用来定义独立于文档且有意义的来自外部的内容，比如：一些投稿文章、新闻记者的文章，或者是摘自其它博客、论坛的信息等。

> article 是一种特别的结构，它表示具有一定独立性质的文章。所以，article 和 body 具有相似的结构，同时，一个 HTML 页面中，可能有多个 article 存在。 除了内容主题以外，一个 article 元素通常会有自己的标题及脚注。

## header

> 如其名，通常出现在前部，表示导航或者介绍性的内容。

## footer

> 通常出现在尾部，包含一些作者信息、相关链接、版权信息等。


## hr

> hr 元素表示段落级元素之间的主题转换（例如，一个故事中的场景的改变，或一个章节的主题的改变）

在还原设计稿的时候通常会遇到很长的横线，有很多方法都能实现这个横线，border、hr、伪类、高度元素等，所以在不同的场景使用不同的实现方法。


## blockquote

> blockquote 元素（或者 HTML 块级引用元素），代表其中的文字是引用内容。通常在渲染时，这部分的内容会有一定的缩进（注 中说明了如何更改）。若引文来源于网络，则可以将原内容的出处 URL 地址设置到 cite 特性上，若要以文本的形式告知读者引文的出处时，可以通过 <cite> 元素。

```html
<blockquote cite="https://www.huxley.net/bnw/four.html">
    <p>Words can be like X-rays, if you use them properly—they’ll go through anything. You read and you’re pierced.</p>
    <footer>—Aldous Huxley, <cite>Brave New World</cite></footer>
</blockquote>
```
<blockquote cite="https://www.huxley.net/bnw/four.html">
    <p>Words can be like X-rays, if you use them properly—they’ll go through anything. You read and you’re pierced.</p>
    <footer>—Aldous Huxley, <cite>Brave New World</cite></footer>
</blockquote>


## time

> time 标签用来表示24小时制时间或者公历日期，若表示日期则也可包含时间和时区。

```html
<p>The concert starts at <time>20:00</time>.</p>

<p>This article was created on <time pubdate>2011-01-28</time>.</p>

<p>The concert took place on <time datetime="2001-05-15 19:00">May 15</time>.</p>
```

## figure

> 用于表示与主文章相关的图片，代码、表格等流内容。


## dfn

> dfn 标签是用来包裹被定义的名词。


# 参考
- [HTML语义：div和span不是够用了吗？](https://time.geekbang.org/column/article/78158)
