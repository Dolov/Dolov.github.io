

1. copy()
   
    在控制台执行 <code>copy()</code> 方法，可以将控制台的内容复制下来。



2. Store as global variable
   
    控制台的数据和被审查的元素可以通过右键的菜单中的 <code>Store as global variable</code> 被引用在控制台中

3. Snippets

    进入到 Sources 面板，在导航栏里选中 Snippets 这栏，点击 New snippet(新建一个代码块) ，然后输入你的代码之后保存。现在你可以通过右击菜单或者快捷键： <kbd>ctrl</kbd> + <kbd>enter</kbd> 来运行它了。

    Command Menu 才是最快的方式。只需在它的输入框中输入 ! ，就可以根据名字来筛选预设代码块

4. $

    在控制台中 $0 ~ $4 是对选中元素的引用

    在控制台中 $$ 选择器返回 <em>数组</em>

    在控制台中 $_ 是对上次运行结果的引用

    在控制台上 $i() 配合 Console Importer 插件可以快速的引入和测试一些 npm 库。例如 $i('lodash')


5. 按一下 <kbd>h</kbd> 就可以隐藏你在元素面板中选择的元素。再次按下 <kbd>h</kbd> 可以使它出现

6. workspace 可以拖进文件，更改会同步在文件上。

