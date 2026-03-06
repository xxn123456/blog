const Router = require('koa-router');
const router = new Router({prefix: '/sdk'});
const sdkController = require('../../controllers/blog/sdk.js');

router.get('/queryAdcodeByIp',sdkController.queryAdcodeByIp)
module.exports = router