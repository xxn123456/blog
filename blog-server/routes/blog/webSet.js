const Router = require('koa-router');
const router = new Router({prefix: '/webSet'});
const webSetController = require('../../controllers/blog/webSet.js');

router.post('/create',webSetController.create)
router.post('/del',webSetController.del)
router.post('/findAll',webSetController.findAll)
router.post('/findOne', webSetController.findOne)
router.post('/update',webSetController.update)
router.post('/batchDel',webSetController.batchDel)

module.exports = router