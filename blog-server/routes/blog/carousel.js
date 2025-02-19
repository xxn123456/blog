const Router = require('koa-router');
const router = new Router({prefix: '/carousel'});
const carouselController = require('../../controllers/blog/carousel');

router.post('/create', carouselController.create)

router.post('/findAll',carouselController.findAll)

router.post('/findAllCarousel',carouselController.findAll)

router.post('/update',carouselController.updata)

router.post('/del', carouselController.del)

router.post('/batchDel',carouselController.batchDel)

router.post('/queryCarousel',carouselController.queryCarousel)



module.exports = router