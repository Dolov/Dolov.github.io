
### 前言

由于项目体积过大，以至于分包后也逐步超过了小程序的限制，所以将 h5 端的页面以 web-view 的方式嵌入了小程序。这也产生了一些意料之外的问题，这里记一个关于文件预览下载的问题。

在 h5 端中，针对图片和视频会使用 img、video 标签达到预览的效果，其余的文件类型会直接粗暴的调用 <code>window.open</code> 的方式打开，如果浏览器能够解析则预览，不能解析浏览器会默认下载。(这里有个问题，ios 的手机对于不能识别的文件会显示乱码)

嵌入小程序并配置了附件存储的业务域名之后发现使用 android 手机调用 <code>window.open</code> 会出现白屏，ios 手机则没有问题。
[类似问题](https://developers.weixin.qq.com/community/develop/doc/00084e2f1e02b04164a887b9251c00?highLine=window.open)

尝试使用 iframe 标签达到类似的效果，但是在小程序中也是没有效果的。

### 解决的方法

后面同事给了个思路，对于需要 <code>window.open</code> 打开的文件，直接跳转到一个特定的小程序原生页面，借助小程序的 api 预览文件。如果小程序环境也无法预览的文件，则使用小程序的 api 下载文件。

1. h5 页面的处理
   
```js
    import wx from 'weixin-js-sdk'

    if (
        process.env.TARO_ENV === 'h5' &&
        window.__wxjs_environment &&
        window.__wxjs_environment === 'miniprogram'
    ) {
        wx.miniProgram.navigateTo({
            url: `/pages/file/index?
            fileExt=${fileExt}
            &tokenId=${tokenId}
            &fileName=${fileName}
            &filePath=${encodeURIComponent(filePath)}
            `,
        })
    }
```

这里有几个点需要注意一下

- 因为项目是通过 Taro 编译出的，所以需要 process.env.TARO_ENV 判断代码类型
- 调用 wx sdk 的 wx.miniProgram.navigateTo api 可以直接调用。不需要在微信公众平台绑定域名权限验证等。
- 跳转路径一定要写完整 （因为少了一个 / 一直无法跳转，一度怀疑这个思路行不通）
- 文件路径一定要使用 <code>encodeURIComponent</code> 方法转义。如果 filePath 路径中包含一些参数，不转义的情况下路由跳转的过程中会丢失
- tokenId 用于权限鉴别（根据实际情况传递）

2. 小程序原生页面的处理

```js
    const { filePath, fileExt, tokenId, fileName } = this.queryParams
    const supports = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf']

    // 支持预览
    if (supports.includes(fileExt)) {

        const downloadResponse: any = await toPromise(wx.downloadFile, {
            url: filePath,
            header: {
                'cookie': `tokenId=${tokenId};`,
            }
        })
        const { tempFilePath } = downloadResponse
        const openResponse = await toPromise(wx.openDocument, {
            filePath: tempFilePath,
            fileType: fileExt
        })

    } else {
        // 该文件类型不支持预览，下载
        const filePath = wx.env.USER_DATA_PATH + `/${fileName}`
        const saveResponse = await toPromise(wx.getFileSystemManager().saveFile, {
            filePath,
            tempFilePath,
        })
    }
```

这里有几个点需要注意一下

- 对于有权限鉴定的文件一般是通过 cookie 实现的，小程序中需要手动设置 <code>wx.downloadFile</code> 的 header 设置 cookie
- 小程序中 api 的回调方式很容易造成回调地狱，可以包装一下 promise 
- 将文件保存在本地这个功能 <code>wx.getFileSystemManager().saveFile</code> 非常的不人性化。下载后很难找到下载的文件的具体地址。暂时没有找到好的解决方案。
  
  [参考1](https://developers.weixin.qq.com/community/develop/doc/00040684a400304b291ac3af350000)

  [参考2](https://developers.weixin.qq.com/community/develop/doc/000aa09ca30a9031462990b3b51000?jumpto=comment&commentid=00046880dfcdb09343294eabf514)
  