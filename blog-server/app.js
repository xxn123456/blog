const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const registerRouter = require('./routes/blog/index.js');
const JobRouter = require('./routes/job/index.js');
const cors = require('koa2-cors')
const koajwt = require('koa-jwt')
const errorMiddle = require('./middleware/errorMiddle.js');
const path = require('./util/unlessJwtPath.js')

onerror(app)
app.use(cors());
app.use(json())
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
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


// jwt错误拦截
app.use(async (ctx, next) => {
  return next().catch((err) => {
      console.log("错误",err)
      if (err.status == 401) {
          ctx.response.status = 401
          ctx.body = {
              code: '401',
              desc: '认证失败，请重新获取authorization'
          };
      } else {
          throw err;
      }
  })
})

// 自定义错误拦截
app.use(async (ctx, next) => {
  // 请求前拦截
  await next()
  // 请求后处理，自定义错误拦截
  errorMiddle(ctx, next)
})




app.use(koajwt({ secret: '123456' }).unless({ path: path }))

app.use(registerRouter.routes(), registerRouter.allowedMethods());
app.use(JobRouter.routes(),JobRouter.allowedMethods());



// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});




module.exports = app
