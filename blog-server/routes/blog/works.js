const Router = require('koa-router');
const router = new Router({prefix: '/works'});
const worksController = require('../../controllers/blog/works.js');

// 创建文章类别

router.post('/create',worksController.create)

router.post('/del',worksController.del)

router.post('/findAllworks',worksController.findAll)

router.post('/findOne', worksController.findOne)

router.post('/updata',worksController.updata)



router.post('/batchDel',worksController.batchDel)

module.exports = router