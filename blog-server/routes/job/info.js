const Router = require('koa-router');
const router = new Router({prefix: 'info'});
const infoController = require('../../controllers/job/info');

router.post('/create',infoController.create)

router.post('/findAll',infoController.findAll)

router.post('/findOne',infoController.findOne)

router.post('/update', infoController.update)

router.post('/del', infoController.del)

router.post('/batchDel',infoController.batchDel)

module.exports = router