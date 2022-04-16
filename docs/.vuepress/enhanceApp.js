import Notifications from 'vue-notification/dist/ssr.js';
// 使用异步函数也是可以的
export default ({
                    Vue, // VuePress 正在使用的 Vue 构造函数
                    options, // 附加到根实例的一些选项
                    router, // 当前应用的路由实例
                    siteData, // 站点元数据
                    isServer // 当前应用配置是处于 服务端渲染 或 客户端
                }) => {

  Vue.use(Notifications)

  /**
   * 路由切换事件处理
   */
  router.beforeEach((to, from, next) => {
    //发送cnzz的pv统计
    if (typeof _czc != "undefined") {
      if (to.path) {
        _czc.push(["_trackPageview", to.fullPath, from.fullPath]);
        console.log("上报cnzz统计", to.fullPath);
      }
    }
    if (typeof fetch != 'undefined') {
      new Image(0, 0).src = `https://playground.fudongdong.com/blog/pv?url=${encodeURIComponent(to.fullPath)}`;
    } else {
      console.error('fetch is not defined')
    }

    if (to.matched.length > 0 && to.matched[0].path === "*") {
      if (to.path && (to.path.startsWith('/snippets') || to.path.startsWith('/playground'))) {
        // 代码片段模块，有服务端路由控制
        window.location.assign(to.path);
      } else {
        next("/notfound.html");
      }
    } else {
      next();
    }
  });
}
