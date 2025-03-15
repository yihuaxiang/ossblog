---
meta:
  - name: description
    content: Python 编程语言基础知识，包括 Poetry 依赖管理工具的使用、虚拟环境配置和项目打包发布
  - name: keywords
    content: python,poetry,依赖管理,虚拟环境,打包,发布
tags: ["python", "poetry", "依赖管理"]
---

# python 知多少


### poetry


Poetry 是 Python 的 依赖管理 和 打包工具，它旨在简化 Python 项目的依赖管理、虚拟环境管理和项目发布流程。可以看作是 pip 和 virtualenv 的现代替代品，同时提供类似 npm（Node.js）或 Cargo（Rust）的体验。


#### Poetry 的主要功能

##### 管理 Python 依赖

Poetry 通过 pyproject.toml 文件管理项目依赖，替代了 requirements.txt，可以更高效地解决依赖冲突。

```shell
poetry add requests
```

##### 创建和管理 Python 虚拟环境

Poetry 默认会为你的项目创建 独立的虚拟环境，并自动在其中安装依赖：

```shell
poetry shell
```


##### 锁定依赖版本

Poetry 使用 poetry.lock 文件确保项目的依赖版本一致，避免因为不同环境的库版本不同导致的问题。

##### 打包和发布

Poetry 让打包和发布 Python 包变得简单：


```shell
poetry build
poetry publish
```

