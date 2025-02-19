const Router = require('koa-router');
const router = new Router({prefix: '/webSet'});
const webSetController = require('../../controllers/blog/webSet.js');

// 创建文章类别

router.post('/create',webSetController.create)

router.post('/del',webSetController.del)

router.post('/findAllwebSet',webSetController.findAll)

router.post('/findOne', webSetController.findOne)

router.post('/updata',webSetController.updata)



router.post('/batchDel',webSetController.batchDel)

module.exports = router