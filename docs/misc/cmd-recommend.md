# 终端工具推荐

### fzf

`fzf`是一款使用`GO`语言编写的交互式的`Unix`命令行工具。
可以用来查找任何 列表内容、文件、历史命令、 本机绑定的`host`、 进程、`Git`分支、进程 等。所有的命令行工具可以生成列表输出的都可以再通过管道`pipe`到`fzf`上进行搜索和查找

![fzf](https://1.z.wiki/images/20220318/85ed7eeda5f8490794630145886067fa.gif)

[github](https://github.com/junegunn/fzf)

```shell
brew install fzf
```


### rg

快速、多用途的代码搜索工具

常用选项：

```
    -A, --after-context <NUM>                    Show NUM lines after each match.
    -B, --before-context <NUM>                   Show NUM lines before each match.
    -s, --case-sensitive                         Search case sensitively (default).
    -f, --file <PATTERNFILE>...                  Search for patterns from the given file.
    -M, --max-columns <NUM>                      Don't print lines longer than this limit.
    -m, --max-count <NUM>                        Limit the number of matches.
```

前端经常有编辑后的`js`文件都压缩成一行，使用`-M`可以避免控制台大量输出内容。

#### 安装

```shell
brew install ripgrep

```

[github](https://github.com/BurntSushi/ripgrep)

### loc

`lines of code`,快速统计代码行数的工具

![](https://1.z.wiki/images/20220318/eb49ea01501344e688d39e31bfe59013.png)


#### 安装

安装：[点此 github](https://github.com/cgag/loc/releases)(或[国内镜像](https://5.z.wiki/autoupload/2022-09-14/62d62f3479a64502ab11fc04dfa746a4.loc-v0.3.4-x86_64-unknown-linux-gnu.tar.gz.zip))下载可执行程序

```shell
brew install loc

```

### http-server

[npm http-server](https://www.npmjs.com/package/http-server)
简单、零配置的命令行静态资源服务器,平时局域网内分享文件、共享本地资源还是很方便的

```shell
# 安装命令
npm install --global http-server
```

### Oh My Zsh && Zsh

`zsh`提供诸如补全、色彩高亮、跳转、历史记录、智能提示等诸多特性

#### 安装 `zsh`
```shell
brew install zsh
```

#### 切换默认 `shell`
```shell
chsh -s /bin/zsh
```

`Oh My Zsh`则是`zsh`配置管理工具

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

### neovim

`vim`的替代配，`vim`是一个非常成功的项目，是一个非常优秀的工具。但过于悠久的历史也成了不小负担，而过去的辉煌也一定程度上成为了前进的枷锁。这导致 `vim` 社区过于保守。现在 `neovim` 和 `vim` 相互竞争，对两者应该都是一个好的事情。让我们试目以待吧。

![](https://1.z.wiki/images/20220318/f6b299ce76f14a36bdb34287bb0b8cc9.png)


### jq

轻量级命令行`json`处理器，使用`C`语言开发、零依赖。

![](https://2.z.wiki/images/20220319/92902799ed1c44e9bca8fa2cbd9fbc73.png)

```shell
# centos 安装命令
sudo yum install jq

# macOS 安装命令
brew info jq
```

### jless

命令行`json`查看工具，最大的特点是支持折叠。

![jless](https://9.z.wiki/autoupload/2022-09-14/a7c95bd5fd0546be85cc5c5f5fa33b81.jless-recording.gif)

### mycli

`mysql`客户端，支持语法高亮和命令补全，效果类似`ipython`，可以替代`mysql`命令。

![mycli mysql 客户端](https://2.z.wiki/images/20220319/8724416f58714a04906308de93607eb8.png)

### fig

终端自动提示工具。

![12341234.gif](https://3.z.wiki/images/20220319/6d94bfddc24a48d08b12b6c51144b3b9.gif)

### tig

`git` 提交日志查看工具，以文本形式查看提交历史，[安装方法](https://jonas.github.io/tig/INSTALL.html)

![](https://3.z.wiki/images/20220327/e04486b038f64aaab1effc3fe4cdd6ad.png)


### tldr

`tdlr` 是 `Too long, Don't read` 的缩写（太长不读、太长不看），
可以帮助你快速查看常用命令的使用实例，比如 `tar` 命令，那后面一长串参数谁记得清呢？当然，`linux` 大佬除外。

![](https://3.z.wiki/images/20220327/6b8f1df8617c4b0b8105c3962fe86819.png)


### zsh-autosuggestions

`zsh`命令自动补全插件`zsh-autosuggestions`

![](https://4.z.wiki/images/20220327/c049aa1a16774e54a99ef7369a860f55.png)


### cnpm

[cnpm](https://npmmirror.com/) 是阿里定制的命令行工具，用来代替默认的`npm`，同时解决国内访问速度首先的问题，支持 `npm` 除了 `publish` 之外的所有命令。

### gck

[gck](https://npmjs.com/package/gck) 用于切换分枝的神器


![](https://9.z.wiki/autoupload/20221124/UgEU.352X762-RPReplay_Final1669303784.gif)

#### 安装

```shell
npm install -g gck
```

### nodemon

`nodemon`可是监听文件变化自动重启服务，开发提效工具，可通过`npm`安装

### siege

`siege`是个开源的服务压测工具，地址：[siege](https://github.com/JoeDog/siege)

### viu 与 lsix

在终端查看照片的工具，均可以通过`brew`安装。
