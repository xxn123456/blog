const Router = require('koa-router');
const router = new Router({
    prefix: '/open'
});
const userController = require('../../controllers/blog/user.js');
const blogController = require('../../controllers/blog/article.js');
const replyController = require('../../controllers/blog/reply.js');
const prizeCodeController = require('../../controllers/prize/prizeCode.js');
const wxController = require("../../controllers/wx/user.js")
const wxPushController = require("../../controllers/wx/msgPush.js")
router.post('/user/regist', userController.regist)
router.get('/user/sendVeryCode', userController.sendVeryCode)
router.get('/blog/articleAsy', blogController.articleAsy)
router.post('/reply/findAll', replyController.findAll)
router.get('/prizeCode/create', prizeCodeController.create)
router.get('/prizeCode/findCodeLimt', prizeCodeController.findCodeLimt)
router.get('/prizeCode/win', prizeCodeController.win)
router.get('/wx/js_code', wxController.jsCode)
router.post('/wx/findWxUser', wxController.findWxUser)
router.post('/wx/regist', wxController.wxRegist)
router.get('/wxPush/check', wxPushController.pushCheck)
router.post('/wxPush/sendModelMsg', wxPushController.sendModelMsg)
module.exports = router