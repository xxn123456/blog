const Router = require('koa-router');
const router = new Router({prefix: '/carousel'});
const carouselController = require('../../controllers/blog/carousel');

router.post('/create', carouselController.create)
router.post('/update',carouselController.update)
router.post('/del', carouselController.del)
router.post('/findAll',carouselController.findAll)
router.post('/batchDel',carouselController.batchDel)
module.exports = router