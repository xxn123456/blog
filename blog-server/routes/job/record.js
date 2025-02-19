const Router = require('koa-router');
const router = new Router({prefix: '/record'});
const recordController = require('../../controllers/job/record');

router.post('/create',recordController.create)

router.post('/findAll',recordController.findAll)

router.post('/findOne',recordController.findOne)

router.post('/update', recordController.update)

router.post('/del', recordController.del)

router.post('/batchDel',recordController.batchDel)

module.exports = router