---
meta:
  - name: description
    content: here document 详解，介绍 shell 中 heredoc 的概念、语法和使用场景，包含多个实用示例
  - name: keywords
    content: here document,heredoc,shell,重定向,多行文本,EOF
tags: ["shell", "heredoc", "重定向"]
---

# here document


在 `shell` 脚本语言中，`here document`（有时也称作 `heredoc` 或 `here-document`）是一种`IO`重定向的方法，
允许你将一个字符串文本块作为输入传递给程序。

`here document` 允许你定义一个输入界定符（通常命名为 `EOF` 或其他任何你选择的文本），
然后在两个界定符之间包含文本。`Shell` 解释器会读取两个界定符之间的所有文本，并将其作为单个数据块提供给程序。

这种技术的一个主要用途是避免多次使用 `echo` 或其他输出命令，
或者省去创建和维护额外的文件。相反，你可以在脚本内部直接包含必要的多行数据，使得脚本更加自包含和可移植。

下面是一个`here document`的示例，在 `Shell` 脚本中使用 `cat` 命令将内联文本输出到 `stdout`：


```shell
cat <<'EOF'
这里是第一行文本。
这里是第二行文本。
这里是第三行文本。
EOF

```

在这个例子中，文本直到遇到第二个 `EOF` 为止会被作为 `cat` 命令的输入数据。
注意，如果在第一个界定符（`<<EOF`）后使用了引号（比如 `<<'EOF`'或 `<<"EOF"`），
那么内嵌的文本不会进行 `shell` 环境变量的替换。如果没有使用引号，则文本内容中的所有 $变量 都会被替换为它们的相应值。

