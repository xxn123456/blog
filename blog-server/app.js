const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const cors = require('koa2-cors')
const json = require('koa-json')
const { koaBody } = require('koa-body')
const koajwt = require('koa-jwt')
const path = require('./util/unlessJwtPath.js')
const { HttpException } = require('./middleware/httpException.js')
const onerror = require('koa-onerror')
onerror(app)
app.use(cors());
app.use(json())
app.use(koaBody({ multipart: true }));
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 日志记录
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


app.use(async (ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                code: 401,
                message: '用户鉴权失败，请重新登录',
            };
        } else {
            console.log('错误拦截器异常抛出错误', err)
            if (err instanceof HttpException) {
            // 处理自定义业务异常
              ctx.status = Number(err.code);
              ctx.body = {
                code: err.code,
                msg: err.msg,
                data: err.data
              };
            } else {
              ctx.status = 500;
              ctx.body = {
                code: ctx.status,
                msg: err
              };
            }
        }
    });
   
});

// JWT 验证中间件（必须在错误拦截之前）
const JWT_SECRET = '123456';
app.use(koajwt({ secret: JWT_SECRET }).unless({ path: path }))

const registerRouter = require('./routes/blog/index.js')
const healthRouter = require('./routes/health/index.js')
const openRoter = require('./routes/open/index.js')
app.use(registerRouter.routes(), registerRouter.allowedMethods());
app.use(healthRouter.routes(), healthRouter.allowedMethods());
app.use(openRoter.routes(), openRoter.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)   
});
module.exports = app
