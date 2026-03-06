const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const { koaBody } = require('koa-body')
const cors = require('koa2-cors')
const koajwt = require('koa-jwt')
const path = require('./util/unlessJwtPath.js')
const registerRouter = require('./routes/blog/index.js')
const healthRouter = require('./routes/health/index.js')
const openRoter = require('./routes/open/index.js')
const logger = require('koa-logger')
const onerror = require('koa-onerror')
const { HttpException } = require('./middleware/httpException.js')
onerror(app)
app.use(cors());
app.use(json())
// 支持文件上传
app.use(koaBody({ multipart: true }));
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
// // logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 自定义错误拦截
app.use(async (ctx, next) => {
  // 请求前拦截
  try {
    await next();
    if (ctx.status === 404) {
      ctx.body = "<h2>你所访问的内容不存在</h2>";
    }
  } catch (error) {
    if (error.status == 401) {
      ctx.response.status = 401
      ctx.body = {
        code: '401',
        desc: '认证失败，请重新获取authorization'
      };
    } else {
      if (error instanceof HttpException) {
        ctx.body = {
          msg: error.msg,
          code: error.code,
          data: error.data
        }
      } else {
        throw error;
      }
    }
  }
})

app.use(koajwt({ secret: '123456' }).unless({ path: path }))
app.use(registerRouter.routes(), registerRouter.allowedMethods());
app.use(healthRouter.routes(), healthRouter.allowedMethods());
app.use(openRoter.routes(), openRoter.allowedMethods());
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
module.exports = app
