const Router = require('koa-router');
const router = new Router({ prefix: '/upload' });
const path = require('path');

const OSS = require('ali-oss');
const client = new OSS({
   region: 'oss-cn-hangzhou',
   accessKeyId: 'LTAI5tNbW83pMmQ6GiEdJit4',
   accessKeySecret: 'YacY0qQ5UC3ZegBBYTacbaxfuFQBxH',
   bucket: 'shutiao',
});


// 上传文章图片
router.post('/oss', async (ctx, next) => {
   const file = ctx.request.files.file;
   var fileFormat = (file.originalFilename).split(".");
   const filename = Date.now() + "." + fileFormat[fileFormat.length - 1];
   try {
      await client.put('article/' + filename, file.filepath);
      ctx.response.status = 200;
      ctx.body = {
          code: 200,
          url: 'http://upload.shutiaogege.top/article/' + filename,
          des: "文章图片上传成功"
      }
  } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
          code: 500,
          des: "文章图片上传失败",
          data: err
      }

  }

})
module.exports = router


