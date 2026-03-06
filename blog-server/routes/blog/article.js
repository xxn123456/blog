const Router = require('koa-router');
const router = new Router({
    prefix: '/blog'
});
const blogController = require('../../controllers/blog/article.js');
//密码登陆
router.post('/create', blogController.create)
router.post('/findAll', blogController.findAll)
router.post('/findOne', blogController.findOne)
router.post('/update', blogController.update)
router.post('/updateSee', blogController.updateSee)
router.post('/del', blogController.del)
router.post('/batchDel', blogController.batchDel)

module.exports = router