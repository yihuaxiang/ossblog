# Koa vs Egg.js

### Koa

> `Koa` 由 `Express` 幕后的原班人马打造， 致力于成为 `web` 应用和 `API` 开发领域中的一个更小、更富有表现力、更健壮的基石。

Koa 是一个非常优秀的框架，但同时它也还是一个较为基础的框架，
只提供了核心`web`功能，写`hello world`很检点，但是`web`开发中的`session`、视图模板、路由、请求解析、日志管理等这些基础能力`Koa`都不提供，
需要自行去官方的 [middleware](https://github.com/koajs/koa/wiki#middleware) 中查找，例如：

1. `koajs/ejs` `alexmingoia/koa-router` 实现 `mvc`
2. `koajs/bodyparser` 用来处理 `post`请求体中的数据
3. `expressjs/cookie-parser`用来解析`cookie`
4. `koajs/session` 基于`cookie`的`session`解决方案
5. `Automattic/mongoose`数据库连接中间件

然而，一百个开发者可能会有一百种不同的配置、整合。



### Egg.js

`Egg.js` 继承于 `Koa`，在`Koa`的基础上进行了扩展，并解决了上述问题：将一套最佳实践整合进了`Koa`并重命名为`Egg.js`，
此外还解决了多线程启动、热更新等问题，对开发者友好、开箱即用。
并具备如下特性：

1. 约定优先配置，`Egg`默认将常用的配置都已集成，并提供约定好的使用规范。
2. egg.js 底层基于 koa2，中间件机制和 koa 一致，实现通过 config 文件配置
3. 插件:`Egg` 提供了一个更加强大的插件机制，让这些独立领域的功能模块可以更加容易编写
4. 扩展:在基于 `Egg` 的框架或者应用中，我们可以通过定义 `app/extend/{application,context,request,response}.js` 来扩展 Koa 中对应的四个对象的原型，通过这个功能，我们可以快速的增加更多的辅助方法。

