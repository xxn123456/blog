const Router = require('koa-router');
const router = new Router({ prefix: '/kill' });
const killController = require('../../controllers/job/kill');

const multer = require('koa-multer');

// 上传文章图片
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'public/images/kill/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
//加载配置
var upload = multer({ storage: storage });

//密码登陆
router.post('/create', killController.create)

router.post('/findAll', killController.findAll)

router.post('/findOne', killController.findOne)

router.post('/update', killController.update)

router.post('/del', killController.del)

router.post('/batchDel', killController.batchDel)


router.post('/upload', upload.single('file'), async (ctx, next) => {
    try {
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            url: '/images/kill/' + ctx.req.file.filename,
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