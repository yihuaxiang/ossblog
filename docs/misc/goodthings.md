# 神器好物篇

> 相关链接
> 
> `chrome`插件推荐：[敖武的博客-chrome插件](https://fudongdong.com/misc/chrome-extensions.html)
> 
> `neovim` 插件：[neovim 插件](https://fudongdong.com/tech/neovim.html#%E5%B8%B8%E7%94%A8%E6%8F%92%E4%BB%B6)
> 

### clipMenu
系统剪切板增强工具，支持历史复制内容
[下载地址](http://www.clipmenu.com/)

### alfred
程序启动器Mac spotlight 的增强版，支持插件
常用功能
* 数学计算

  ![undefined](https://z.wiki/autoupload/2022-05-02/eaaba6b40de44a8aa1f134f2b891dd76.image.png)

* 程序启动

  ![undefined](https://z.wiki/autoupload/2022-05-02/9688bb111e794952ae35b16cda9e2904.image.png)

* 搜索（本地搜索、网络搜索）
* 翻译

  ![undefined](https://z.wiki/autoupload/2022-05-02/605273ed05d843f6a3e63299529a2aea.image.png)

* 自定义插件

  ![undefined](https://z.wiki/autoupload/2022-05-02/5824d383c3be4c94bb2d0f1c9aefd041.image.png)

* 编码、解码

  ![undefined](https://z.wiki/autoupload/2022-05-02/e48741002f5c41b389ef4a869d3e545d.image.png)

[下载地址](https://www.alfredapp.com/)

### axel
多线程下载工具

### brew
Mac 包管理工具

#### 安装 `brew`

```shell
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### Popclip
鼠标拓展小工具，当选中文本后会自动弹出操作框，支持复制、粘贴、大小写转换、单词计数、搜词等诸多功能。

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220317/68a45b525b93406e964904c2e782ae6c.png?x-oss-process=image/resize,w_800/quality,q_80)

支持安装多种扩展程序，如下图：

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220317/38752814af6b47f2a1dfe559a4386f2a.png?x-oss-process=image/resize,w_800/quality,q_80)


### 1Password
密码管理工具

### go2shell
在finder中直接打开shell

### omyzsh

`omyzsh`以及常用插件（ [下载链接](https://juejin.im/entry/5ae00e54f265da0b8635ea5c) ）

#### 安装`omyzsh`

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

### SwitchKey

`SwitchKey` 是一款可以根据当前 `macOS` `app` 窗口自动切换指定的输入法，让你无需再关注“输入法切换”这些琐碎的操作。特别是在代码编辑器、命令行和微信等程序之间切换的时候，非常方便。

安装方式：
```shell
brew install switchkey
```

### iShot 截图

介绍文章： [https://fudongdong.com/misc/ishot.html](https://fudongdong.com/misc/ishot.html)

注：我认为延迟截屏是他最好用的工具了，很多弹框功能在你进行任何操作的时候都会自动消失，普通截图软件截取不到😓。

### Beyond Compare

Beyond Compare中文版是一款专业的文本文件对比工具,可以高效的针对文件、文件夹、表格、mp3、图片、数据、注册表等文件并进行比较、合并、同步分析,并把相差的每一个字节用颜色加以表示,查看方便。

### thor launcher

全局激活某个 app 的快捷键设置程序

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220123/3f659b2ae9454def86b92a8223cf9f5d.png?x-oss-process=image/resize,w_800/quality,q_80)


### iTerm2

对于需要长期与终端打交道的工程师来说，拥有一款称手的终端管理器是很有必要的，对于 `Windows` 用户来说，最好的选择是 `Xshell`，
这个大家都没有异议。但对于 `MacOS` 用户来说，仍然毋庸置疑，`iTerm2` 就是你要的利器

喜欢`iTerm2`的一个重要原因就是它支持快捷键绑定，如下图：

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220317/2b9b39dd89fc408a9b71a7d155c3f94b.png?x-oss-process=image/resize,w_800/quality,q_80)

当我按下`Command+/`时，`iTerm2`会自动输入`,cc`,在`vim`编辑文件的时候自动将当前行给注释掉。从而实现类似`VS Code`、`idea`很多相同的快捷键。

### sshpass

平时通过`ssh`登陆服务器，都会交互式进行密码输入，有些特殊的服务器操作需要自动化，例如：提交代码后自动登陆服务器、拉取代码、重新部署。
这种情况下为了自动化，交互式密码输入无法满足，需要一种免密登陆方案，常见免密登陆有如下两种：

1. 基于密钥的认证

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220322/ed6739bed9534abcb32510b71ac9a94d.png?x-oss-process=image/resize,w_800/quality,q_80)

2. sshpass

针对少量服务器，使用方案一较为便捷，然而针对批量+非固定机器，方案二优势更为明显。

`sshpass`是一个简单轻量级的命令行工具，
它使我们能够在脚本中显示指定密码（非交互式密码验证），以便可以自动化执行服务器上的 `shell` 脚本。

### snap

Snap是一款快速启动程序的插件App， 功能虽小，但是对开发体验和效率提升很大。用快捷键 command + 数字（0-9）启动/唤起Dock对应的程序。

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220330/6a64681197f849388e3e3c79660f1630.png?x-oss-process=image/resize,w_800/quality,q_80)

右侧`option`键一般用不到，故通过`karabiner`将右侧`option`改成了`command`键，通过右侧`option`+数字启动/唤起Dock对应的程序。


### LightProxy

`LightProxy` 是 `IFE` 团队开发的一款基于 `Electron` 和 `whistle` 的开源桌面代理软件，致力于让前端开发人员能够精确的掌握自己的开发环境，通过 HTTP 代理使用规则转发、修改每一个请求和响应的内容。

通过`LightProxy`用户可以快速进行转包、修改包，解决开发过程中的各个拦路虎。

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220330/bdb51ebd3fb94a479cad74fb631bd68e.png?x-oss-process=image/resize,w_800/quality,q_80)

典型应用场景一：
由于安全原因，前端发布后，对应的`sourcemap`文件不会发布到公网上，需要`debug`的时候可以通过`lightproxy`做下映射。

```
https://xxx.cnd.com/web.js.map file:///Users/xxx/xxx/web.js.map
```

解决跨域问题
```
https://xxx.com/path resCors://https://xxx.com
```

添加 `header`
```
https://xxx.com/path resHeaders://`
{
    "key": "value"
}
`
```
### mockoon

本地`mock API`服务，搭配`LightProxy`成为前端开发利剑。

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220331/94ae7c76fd8549aab17783f47c997328.png?x-oss-process=image/resize,w_800/quality,q_80)


### Go2Shell

`Go2Shell`是`Finder`的一个扩展软件，正如其名字描述的那样，`Go2Shell`支持在`Finder`中一键使用终端打开当前目录。终端爱好者必备良器。

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/autoupload/2022-04-23/287920b1229e42af8043f32bd3f17212.image.png)

### TotalFinder

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220423/a120002c11e6428a91a0cefa77b78f3a.png?x-oss-process=image/auto-orient,1/interlace,1/quality,q_50/format,jpg)

`TotalFinder` 是`Mac`上一款好用的`Finder`增强工具，`TotalFinder` 提供了多标签式浏览、拷贝路径、剪切文件、显示隐藏文件、多栏窗口模式、彩色标签等功能。

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220423/2a2589b2a18d4682acdcd14d667e8206.png?x-oss-process=image/auto-orient,1/interlace,1/quality,q_50/format,jpg)

### 超级右键

超级右键是`Mac`上最强大的右键菜单工具，丰富的功能，让你的右键菜单如虎添翼，深入人心的交互设计，助你大幅提升`macOS`使用体验！

下载地址：[超级右键](https://apps.apple.com/cn/app/%E8%B6%85%E7%BA%A7%E5%8F%B3%E9%94%AE-irightmouse/id1497428978?mt=12)

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220501/bc7a37c1906c4dc7a7e81bf7e2c9d1c0.png?x-oss-process=image/auto-orient,1/interlace,1/quality,q_50/format,jpg)


### LICEcap

轻量级录屏工具，下载地址[LICEcap](https://www.macupdate.com/app/mac/49461/licecap)

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220501/dbfba0970e4643e897470b7a21c81c65.png?x-oss-process=image/auto-orient,1/interlace,1/quality,q_50/format,jpg)


### drawio-desktop

`drawio`用于创建图流程图、线框、UML图、组织图、网络图等。

客户端下载链接 [drawio-desktop](https://github.com/jgraph/drawio-desktop/releases/)
