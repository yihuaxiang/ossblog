---
meta:
  - name: description
    content: neovim 配置 vim 开发 程序员 开发神器
  - name: keywords
    content: neovim 配置 vim 开发 程序员 开发神器
tags: ["vim", "neovim", "上古编辑器"]
---

# neovim 配置体验

### 背景

使用`vim`（`neovim`）也有三四年了，在此记录下常用的一些插件

顺便将相关配置同步到 `github `上，方便后续换电脑的时候进行配置同步

### neovim 简介

截止目前（2022-02-03），`neovim `在 `github `上已经有了 50K 的 `star `，而 `vim `具有 26K`star` 

<ImgView title="neovim" url="https://2.z.wiki/images/20220203/933d2b5126eb4e888ffbd54a4b937797.png" />

<ImgView title="neovim" url="https://2.z.wiki/images/20220203/6c435b23da3747e19681934ebdbe562e.png" />

`Neovim `是 `Vim `的一个雄心勃勃的重构。主要目标是：

1. 重构代码以改善维护
2. 实施新的高级功能
3. 展示一个更好、更强大的插件系统
4. 开放的开发模式，随时接受贡献，接受的标准也很明确。

具有以下特性

1. 现代图形用户界面
2. 从任何语言访问`API`，包括C/C++, C#, `Clojure`, `D`, ` Elixir`, ` Go`, ` Haskell`, ` Java`, ` JavaScript`/`Node.js`, ` Julia`, ` Lisp`, `Lua`, `Perl`, ` Python`, ` Racket`, ` Ruby`, `Rust` 
3. 嵌入式、可编写脚本的终端仿真器
4. 异步作业控制
5. 多个编辑器实例之间的共享数据（`shada`）。
6. 支持`XDG`基础目录
7. 与大多数`Vim`插件兼容，包括`Ruby`和`Python`插件

[neovim 官网](https://neovim.io/)

### 安装


`neovim` 支持多种安装方式，如：直接下载、包管理器安装、源码安装等诸多方式

本人所用系统为`CentOS 8`，选择通过`yum`安装

安装命令如下

```shell
yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
yum install -y neovim python3-neovim
```

<ImgView title="neovim" url="https://2.z.wiki/images/20220203/50a8b21c9aed4349af93e5a52a8cb6b2.gif" />

<ImgView title="neovim" url="https://4.z.wiki/images/20220203/f8c164e653644520a180a475421236d4.gif" />


此时，已经`nvim`使用`neovim`了，为方便期间，设置别名，操作如下：

```shell
echo "alias vim=\"nvim\"" >> ~/.bashrc
```

到此，通过执行`type vim`能看到 `vim`已经被映射到了`nvim`，方便后续使用`nvim`

### 包管理器

#### vim-plug

vim-plug简单理解就是一个容器，里面可以配置很多插件，然后使用命令让它自己去下载，然后配置到neovim中去

官网地址：[github vim-plug](https://github.com/junegunn/vim-plug)

使用方式如下：进入命令模式，执行 PlugInstall 即可安装所配置的插件
![](https://raw.githubusercontent.com/junegunn/i/master/vim-plug/installer.gif)

### 常用插件

单有`neovim`还不够，其强大的生态更是不可获取的，下面是我常用的插件以及配置

#### FZF (fuzzy finder)

`FZF `是一款使用 `GO `语言编写的交互式的 `Unix `命令行工具。可以用来查找任何 列表 内容，文件、`Git `分支、进程等。所有的命令行工具可以生成列表输出的都可以再通过管道 `pipe` 到 `fzf `上进行搜索和查找

优点如下：
1. GO 语言编写，编译完生成可执行文件没有任何依赖
2. 搜索/查找速度飞快
3. 功能全面/可视化界面体验很棒
4. 周边插件丰富 (vim, tmux, fuzzy auto-completion)

链接：[fzf github](https://github.com/junegunn/fzf)

##### 安装 fzf

在`centos 8`下只能通过源码安装

```shell
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install
```

无奈，国内的机器没法访问`github`，只能曲线下载了，从`gitee`找到对应的项目 [gitee fzf](https://gitee.com/yzymickey/fzf?_from=gitee_search)

<ImgView title="neovim" url="https://2.z.wiki/images/20220203/ac739d17ec2f4797ac5badbcbae8251b.png" />

<ImgView title="neovim" url="https://2.z.wiki/images/20220203/892222cc5823444ebf5f0409ccb3a174.png" />



```shell
git clone --depth 1 https://gitee.com/yzymickey/fzf.git ~/.fzf
~/.fzf/install
```


安装后需重启终端或重新加载`bashrc`文件，重启后即可输入`fzf`进行文件查找了


```shell
# 重新加载 bashrc
source ~/.bashrc
```

FZF 命令行使用效果如下：

<ImgView title="neovim" url="https://5.z.wiki/images/20220203/a6a3e01357eb4752aa76d1c5f7265cf0.gif" />

截至目前我们已经安装了了`fzf`，但是尚未和`nvim`建立任何整合，整合则需要借助 `fzf.vim` 插件


##### 安装 fzf.vim

[github fzf.vim](https://github.com/junegunn/fzf.vim)

通过 `vim-plug` 插件管理器进行安装

在 `init.vim` 文件中增加插件

```shell
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'junegunn/fzf.vim'
```

运行效果如下呐

1. 文件搜索

<ImgView title="neovim 文件搜索" url="https://4.z.wiki/images/20220203/b25e996392df47369cc92dbbab85fc7f.gif" />

此外，通过设置`iTerms`的按键映射，当按下`Ctrl+P`的时候自动触发`:Files`命令，实现文件查找的快捷键

其他配置：

推荐使用 [fd](https://github.com/sharkdp/fd) 替换默认的查找命令，可以在`bashrc`中增加如下配置
```shell
export FZF_DEFAULT_COMMAND="fd --exclude={.git,.idea,.vscode,.sass-cache,node_modules} --hidden --type f"
```


2. 内容搜索

`fzf.vim` 提供了 `:Ag` 命令，可以进行文件内容搜索，但是在此之前需要安装[ag](https://github.com/ggreer/the_silver_searcher)

运行效果如下：

<ImgView title="neovim 文件内容搜索" url="https://7.z.wiki/images/20220203/fbc3b5b87e5b467392d4942ccc48c154.gif" />


通过 `iTerms` 设置快捷键 `Command+Shift+F`进行全局搜索，效果杠杆的~


#### nerd-tree

`nerd-tree` 是`vim`中的文件管理插件

<ImgView title="neovim nerd-tree" url="https://4.z.wiki/images/20220203/76de3d0cf73649a496d708f801353b6c.png" />

安装：
```shell
Plug 'preservim/nerdtree'
```

在`init.vim`中可以设置键映射，通过 `F2`即可打开 `NerdTree`

```shell
map <F2> :NERDTreeToggle<CR>
```


### 键盘映射

该配置写在`init.vim`中

```shell
" 窗口切换快捷键"
map <Leader>wc <C-w><C-c><Esc>
map <Leader>ws <C-w><C-s><Esc>
map <Leader>wv <C-w><C-v><Esc>
map <Leader>ww <C-w><C-w><Esc>
map <Leader>wh <C-w><C-h><Esc>

" 保存快捷键
map <Leader>s :w<CR>

```


`init.vim` 配置连接 [github](https://github.com/yihuaxiang/neovim-config/blob/main/neovim_init.vim)


### 参考链接

[neovim](https://neovim.io/)

[vim-plug](https://vimawesome.com/plugin/vim-plug-already-like-death)

[Vim 到底可以配置得多漂亮?](https://www.zhihu.com/question/26248191/answer/2987005687)
