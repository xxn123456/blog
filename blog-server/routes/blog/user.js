const Router = require('koa-router');
const router = new Router({prefix: '/user'});
const userController = require('../../controllers/blog/user.js');
router.post('/login', userController.login)
router.get('/getUserInfo', userController.getUserInfo)
router.post('/update',userController.update)
router.post('/del',userController.delUser)
router.post('/findAll',userController.findAll)
module.exports = router


