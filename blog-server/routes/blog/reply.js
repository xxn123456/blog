const Router = require('koa-router');
const router = new Router({prefix: '/reply'});
const replyController = require('../../controllers/blog/reply.js');

router.post('/create',replyController.create)
router.post('/del',replyController.del)
router.post('/findAll',replyController.findAll)
router.post('/findOne', replyController.findOne)
router.post('/update',replyController.update)
router.post('/batchDel',replyController.batchDel)

module.exports = router