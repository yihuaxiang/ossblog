# idea 插件篇

### IdeaVim

作为一个`vim`爱好者，无论使用什么`IDE`，都会第一时间安装`vim`插件，在`Idea`中就是`IdeaVim`

![](https://1.z.wiki/images/20220423/09f93ac8b7284d01872c7c948b3ec7dc.png)

通过`.ideavimrc`可以进行更高阶的配置，可参考[yihuaxiang/dotideavimrc](https://github.com/yihuaxiang/dotideavimrc)

### Markdown Image Support

经常使用`Markdown`写文档，通过该插件可以一键上传照片，适用于`Jetbrains`全系列软件，支持多种存储、自定义命名、支持压缩等等。

![](https://2.z.wiki/images/20220423/5df7f22010404e77b9f0782cece30cc5.png)


### Vue.js

`Idea`默认不支持`Vue`语法高亮，需要`Vue.js`插件来实现

![](https://3.z.wiki/images/20220423/4bf9f00bc7d74553877aebfd698ccfb3.png)

###  AceJump

`Ace Jump`是一种从`emacs`上借鉴过来的快速光标跳转方式，
操作方式是：你用某个快捷键进入`AceJump`模式后，再按任一个键，
当前屏幕中所有该字符都被打上一个字母标记，你只要按这个字母，光标就会跳转到这个字符上。这种跳转方式非常实用，
你根本不用管当前光标在什么位置，眼睛只需要盯着需要跳转到的位置，最多三四下按键就能准确把光标定位，开始编辑。

![AceJump.png](https://4.z.wiki/images/20220423/68a874934a054075a5a681788a282c62.png)


![ace](https://user-images.githubusercontent.com/7598734/164874481-b8ccc3ba-aa3b-4b44-8f44-944f3097aa76.gif)

### RestfulToolkit

`RestfulToolkit`是一套 `Restfull` 服务开发辅助工具集合。
提供根据`url`跳转到对应代码定义、`http`请求工具等

目前支持`spring`、`JAX-RS`。

![RestfulToolkit.png](https://1.z.wiki/images/20220423/d3414f87d3e94a0485905ab80842ea97.png)


![tool](https://user-images.githubusercontent.com/7598734/164874423-e2fb9ddd-118d-420d-a155-266a8de1fb34.gif)

### Jump to Line

`Jump to Line` 插件支持在调试代码时直接执行指定行的代码，和内置的调试功能不同的是，该插件跳到指定行时会忽略起止的代码直接执行目标行代码。

而且跟厉害的是，向前、向后跳转都支持。

![asdfa1234](https://user-images.githubusercontent.com/7598734/164883428-8dd6bb77-b29e-4749-8a1a-232f04c04426.gif)


### JRebel

`JRebel`是一种生产力工具，允许开发人员立即重新加载代码更改。它跳过了 `Java` 开发中常见的重建、重新启动和重新部署周期。`JRebel` 使开发人员能够更高效的进行业务开发。`JRebel` 支持大部分`java`技术框架。

<img width="452" alt="image" src="https://user-images.githubusercontent.com/7598734/164883519-4400644b-5c88-4113-bf88-5a735dfbd010.png">



### IdeaVimExtension

为`IdeaVim`插件增加自动切换为英文输入法的功能 
输入法自动切换功能不会默认启用
编辑器中`normal`模式下输入输入下面的指令以启用自动切换输入法功能：
1. `:set keep-english-in-normal` 开启输入法自动切换功能
2. `:set keep-english-in-normal-and-restore-in-insert` 回到`insert`模式时恢复输入法
3. `:set nokeep-english-in-normal-and-restore-in-insert` 保留输入法自动切换功能，但是回到`insert`模式不恢复输入法
4. `:set nokeep-english-in-normal` 关闭输入法自动切换功能

也可以通过将`set keep-english-in-normal[-and-restore-in-insert]`加入到`~/.ideavimrc`文件中并重启IDE来启用插件功能。


### GitToolBox

![](https://2.z.wiki/autoupload/2022-10-28/d459f305b38440aa9e7e5d2f36ab65be.image.png)

显示光标所在行的最后提交日志。
