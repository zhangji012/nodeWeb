const path = require('path')
const Koa = require('koa2')
const static = require('koa-static')
const k2c = require('koa2-connect')
const { createProxyMiddleware } = require('http-proxy-middleware');
const router = require('koa-router')();
const app = new Koa()

// 引入静态文件
app.use(static(path.join(__dirname, 'dist')))

router.get('*', async (ctx, next) => {
  ctx.redirect(('/'))
  next()
})

// 代理配置
const proxyTable = {
  targets: {
    "/api": {
      "target": "http://api-resume.veryeast.cn",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" },
    }
  }
}
app.use(router.routes())
app.use(async (ctx, next) => {
  if (ctx.url.startsWith('/api')) { //匹配有api字段的请求url
    ctx.respond = false // 绕过koa内置对象response ，写入原始res对象，而不是koa处理过的response
    await k2c(createProxyMiddleware({
      target: 'http://10.10.2.170',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': ''
      }
    }
    ))(ctx, next);
  }
  await next()
})

app.listen(3000, () => { console.log('开启成功') })