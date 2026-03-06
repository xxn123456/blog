const Router = require('koa-router');
const router = new Router({
    prefix: '/health'
});
const speedController = require('../../controllers/health/speed.js');
//密码登陆
router.post('/his', speedController.findOne)

module.exports = router