const Router = require('koa-router');
const router = new Router({prefix: '/navType'});
const navTypeController = require('../../controllers/blog/navType.js');

router.post('/create',navTypeController.create)
router.post('/findAll',navTypeController.findAll)
router.post('/update',navTypeController.update)
router.post('/del',navTypeController.del)
router.post('/batchDel',navTypeController.batchDel)

module.exports = router