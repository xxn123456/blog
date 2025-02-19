const Router = require('koa-router');
const router = new Router({prefix: '/navType'});
const navTypeController = require('../../controllers/blog/navType.js');

// 创建文章类别

router.post('/create',navTypeController.create)

router.post('/findAll',navTypeController.findAll)

router.post('/findAllnavType',navTypeController.findAll)

router.post('/updata',navTypeController.updata)

router.post('/del',navTypeController.del)

router.post('/batchDel',navTypeController.batchDel)

module.exports = router