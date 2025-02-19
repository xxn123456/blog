//功能处理
const userModule = require("../../modules/blog/user.js");
const jwtUtil = require("../../util/verifyJwt.js");
class userController {
    //注册用户
    static async create(ctx) {
        const req = ctx.request.body;
        if (req.username && req.password) {
            let query = await userModule.getUserInfo(req);
            if (query) {
                ctx.response.status = 200;
                ctx.body = {
                    code: -1,
                    msg: '用户已存在'
                }
            } else {
                const param = {
                    password: req.password,
                    username: req.username,
                    avatar: req.avatar,
                    role: "vistor"
                }
                const data = await userModule.userRegist(param);
                ctx.response.status = 200;
                ctx.body = {
                    code: 0,
                    msg: '用户注册成功',
                    data
                }
            }
        }
        ctx.response.status = 400;
    }

    // 登录用户
    static async login(ctx) {
        const req = ctx.request.body;
        if (req.username && req.password) {
            const info = await userModule.getUserInfo(req.username);
            if (info && info.password == req.password) {
                let token = jwtUtil.getToken(info)
                return ctx.body = {
                    code: '200',
                    token: token,
                    msg: '登陆成功'
                }
            } else {
                return ctx.body = {
                    code: '400',
                    msg: '用户密码错误'
                }
            }
        }
        ctx.response.status = 400;
    }

    // 修改用户密码
    static async updatePassword(ctx) {
        const req = ctx.request.body;
        if (req.userId && req.password) {
            const param = {
                password: req.password,
                userId: req.userId
            }
            const data = await userModule.updatePassword(param);
            ctx.response.status = 200;
            if (data == 0) {
                return ctx.body = {
                    code: 0,
                    msg: '用户修改密码成功',
                }
            }
        }
        ctx.response.status = 400;
    }

    // 获取用户信息
    static async getUserInfo(ctx) {
        const token = ctx.headers.authorization;
        const result = await jwtUtil.verify(token);
        let data = await userModule.getUserInfo(result.user);
        const info = {
            userId: data.id,
            username: data.username,
            avatar: data.avatar
        };
        ctx.response.status = 200;
        return ctx.body = {
            code: '200',
            userInfo: info,
            msg: '获取用户信息成功'
        }
    }



    // 删除用户
    static async delUser(ctx) {
        const req = ctx.request.body;
        let data = await userModule.delUser(req.userId);
        if (data == 1) {
            return ctx.body = {
                code: '200',
                msg: '删除用户成功'
            }
        } else {
            ctx.response.status = 500;
        }

    }



    static async findAll(ctx) {
        let req = ctx.request.body;
        if (req.currentPage && req.pageSize) {
            let data = await userModule.findAll(req);
            ctx.response.status = 200;
            return ctx.body = {
                code: 200,
                msg: '查找所有用户成功',
                data
            }
        }
        ctx.response.status = 400;


    }




}

module.exports = userController;