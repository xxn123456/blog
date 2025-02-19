const Router = require('koa-router');
const router = new Router({prefix: '/user'});
const userController = require('../../controllers/blog/user.js');


//密码登陆
router.post('/login', userController.login)

router.post('/regist', userController.create)




//获取用户信息
router.get('/getUserInfo', userController.getUserInfo)

router.post('/findAll',userController.findAll)



module.exports = router


