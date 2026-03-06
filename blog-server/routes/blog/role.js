const Router = require('koa-router');
const router = new Router({prefix: '/role'});
const roleController = require('../../controllers/blog/role.js');

router.post('/create',roleController.create)
router.post('/del',roleController.del)
router.post('/findAll',roleController.findAll)
router.post('/findOne', roleController.findOne)
router.post('/update',roleController.update)
router.post('/batchDel', roleController.batchDel)

module.exports = router