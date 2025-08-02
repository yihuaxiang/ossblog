---
meta:
  - name: description
    content: 深度体验腾讯 CodeBuddy AI IDE，对比 Cursor 等主流 AI 编程工具，分析其在 Figma 支持、组件选择、设计模式、Plan Mode 等方面的特色功能
  - name: keywords
    content: CodeBuddy,AI IDE,腾讯,编程辅助,AI 编程,VSCode 插件,Figma 支持,组件选择,设计模式,Plan Mode
tags: ["CodeBuddy", "AI", "IDE", "编程辅助"]
---

# CodeBuddy 体验

腾讯也出 AI IDE 了，从之前的 vscode 插件正式升级为 AI IDE，官网： [https://www.codebuddy.ai/](https://www.codebuddy.ai/) ，目前还在内测中，需要邀请码才能体验。

![CodeBuddy](https://a.tuchuangyun.top/autoupload/fdd/20250803/9VnD/2840X1546/image.png/webp)

我在 [linux.do](https://linux.do/t/topic/821969/172) 平台上有幸抽到了邀请码，因此有机会体验一把。

![linux.do 抽奖](https://a.tuchuangyun.top/autoupload/fdd/20250803/JL8x/1618X906/image.png/webp)

# 初次见面

![CodeBuddy](https://a.tuchuangyun.top/autoupload/fdd/20250803/qqzm/3062X1742/image.png)

整体 UI 很清爽，主色调为绿色，有点微信风，不少细节动画，炫酷。

![CodeBuddy](https://a.tuchuangyun.top/autoupload/fdd/20250803/UbrD/508X401/wx.gif)

# 对比 cursor

[cursor](https://z.wiki/misc/ai-usage.html) 应该是最近最流行的 AI IDE 了，和 cursor 项目有明显几个特点：

1. Figma 支持
2. 选择组件
3. 设计模式
4. plan mode
5. 提示词优化
6. 配置集成和部署

其他如 rule 、MCP、代码补全、agent 模式、chat 模式、多模型选择等功能大差不差。

# Figma 支持

CodeBuddy 天然支持 Figma，通过直接选中设计稿节点可以生成代码，不过看过程，应该是先利用 Figma 的接口生成了 HTML 代码，再利用 AI 优化成组件的，在概念验证、原型阶段有价值，线上环境中怕是价值优先，毕竟没有用到业务组件。

![2682X1312/image.png](https://a.tuchuangyun.top/autoupload/fdd/20250803/tTdO/2682X1312/image.png/webp)

从对话过程中可以明显看出来先生成的 figma.html。

![946X1184/image.png](https://a.tuchuangyun.top/autoupload/fdd/20250803/JLYm/946X1184/image.png/webp)

# 选择组件

选择组件的功能很赞，支持三种开源 UI 组件，分别是：TDesign、MUI、Shadcn。

> 如果能支持业务自己的组件更好了，但是业务组件都属于私域知识，大模型缺乏相关了解，因此天然支持确实有难度。

![734X386/image.png](https://a.tuchuangyun.top/autoupload/fdd/20250803/dzst/734X386/image.png)


# 设计模式 与 Plan Mode

官方缺少相关介绍，不太清楚二者的区别，简单测试下，提示词：“帮我创建一个番茄时钟网站。”

## 设计模式

![876X1642/image.png](https://a.tuchuangyun.top/autoupload/fdd/20250803/s9Ns/876X1642/image.png)

设计模式下核心步骤为 设计风格 - 页面规划 - 开发

## Plan Mode

![866X8418/image.png](https://a.tuchuangyun.top/autoupload/fdd/20250803/kxmp/866X8418/image.png/webp)

Plan Mode 模式下核心步骤为 分析 - 技术 - UI设计 - 计划（指定任务节点） - 开发 等

## 对比

从以上节点可以简单看出来，设计模式更强调 UI 设计，而 Plan Mode 跟注重整个需求的完成流程，更适合复杂业务场景。

# 提示词优化

![508X401/提示词优化.gif](https://a.tuchuangyun.top/autoupload/fdd/20250803/gC2k/508X401/%E6%8F%90%E7%A4%BA%E8%AF%8D%E4%BC%98%E5%8C%96.gif)

提示词优化是个不错的功能，很多时候我们也懒得写特别长的提示词，有了提示词优化在某些场景下确实有点用。

# 配置集成和部署

![800X654/image.png](https://a.tuchuangyun.top/autoupload/fdd/20250803/8guM/800X654/image.png)

CodeBuddy 支持 Supabase 和 腾讯云进行集成，毕竟是腾讯的产品，对自家云服务支持也到位。

# 其他亮眼功能

预览模式下点选 DOM 进行优化。

![1307X795/click.gif](https://a.tuchuangyun.top/autoupload/fdd/20250803/aV1p/1307X795/click.gif)