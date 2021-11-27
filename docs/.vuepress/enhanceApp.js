// 使用异步函数也是可以的
export default ({
                    Vue, // VuePress 正在使用的 Vue 构造函数
                    options, // 附加到根实例的一些选项
                    router, // 当前应用的路由实例
                    siteData, // 站点元数据
                    isServer // 当前应用配置是处于 服务端渲染 或 客户端
                }) => {
    const onlineHosts = ['fudongdong.cn', 'fudongdong.com']
    if(typeof window) {
        if(window.location.protocol === 'http:' && onlineHosts.includes(window.location.host)) {
            window.location.assign(window.location.href.replace('http://', 'https://'));
        }
    }

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

    // continue
    next();
  });
}
