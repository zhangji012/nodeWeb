module.exports = {
  /**
   * port-服务启动的端口
   */
  port: 3000,

  /**
   * 代理的配置-可以设置多个代理
   * @param key - 代理的匹配路径
   * target-代理的目标地址
   * changeOrigin-是否改变来源
   * ws-是否支持socket
   * pathRewrite-路径重写
   */
  proxy: {
    "/api": {
      "target": "http://person.veryeast.cn",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    },
    "/file":{
      "target" :"https://dfws-file.veimg.cn",
      "changeOrigin": true,
      "pathRewrite": { "^/file" : "" }
    },
    "/search": {
      "target" :"https://search.veryeast.cn",
      "changeOrigin": true,
      "pathRewrite": { "^/search" : "" }
    },
    "/sso": {
      "target" :"https://sso.veryeast.cn",
      "changeOrigin": true,
      "pathRewrite": { "^/sso" : "" }
    }
  },
}
