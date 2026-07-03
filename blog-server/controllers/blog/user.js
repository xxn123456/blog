//功能处理
const userModule = require("../../modules/blog/user.js");
const userRelationModule = require("../../modules/blog/userRelation.js");
const smsCodeModule = require("../../modules/blog/smsCode.js");
const jwtUtil = require("../../util/verifyJwt.js");
const { sendVerificationCode } = require('../../util/email.js');
const { HttpException } = require("../../middleware/httpException.js")
class userController {
    //注册用户
    static async regist(ctx) {
        const req = ctx.request.body;
        if (!req.username || !req.password) {
            throw new HttpException("400", "用户名或者密码不能为空", '');
        }
        if (!req.email) {
            throw new HttpException("400", "邮箱地址不能为空", '');
        }
        if (!req.veryCode) {
            throw new HttpException("400", "验证码不能为空", '');
        }
        const smsinfo = await smsCodeModule.detail(req.email);
        if (req.veryCode != smsinfo.veryCode) {
            throw new HttpException("400", "邮箱验证码错误请重新发送", '');
        }
        if (req.username && req.password) {
            let query = await userRelationModule.getUserInfo(req.username);
            if (query) {
                ctx.body = {
                    code: -1,
                    msg: '用户已存在'
                }
            } else {
                const data = await userModule.userRegist(req);
                ctx.body = {
                    code: 200,
                    msg: '用户注册成功',
                    data
                }
            }
        }
    }
    static async sendVeryCode(ctx) {
        const req = ctx.query;
        console.log("发送验证码", req)
        if (!req.email) {
            throw new HttpException("400", "邮箱地址不能为空", '');
        }
        // 对比验证码
        if (req.email) {
            let repeatCode = await smsCodeModule.detail(req.email)
            // 第一次发情况下
            if (!repeatCode) {
                let info = await sendVerificationCode(req.email);
                if (info) {
                    ctx.body = {
                        code: 200,
                        msg: '发送成功'
                    }
                    smsCodeModule.create({
                        email: req.email,
                        veryCode: info.code
                    })
                } else {
                    throw new HttpException("500", "邮箱验证码发送失败", info.error);
                }

            } else {
                const codeId = repeatCode.dataValues.id
                if (codeId) {
                    let info = await sendVerificationCode(req.email);
                    ctx.body = {
                        code: 200,
                        msg: '发送成功'
                    }
                    smsCodeModule.update({
                        id: codeId,
                        email: req.email,
                        veryCode: info.code
                    })
                } else {
                    throw new HttpException("500", "邮箱验证码发送失败", info.error);
                }

            }




        }
    }

    // 登录用户
    static async login(ctx) {
        const req = ctx.request.body;
        if (!req.username || !req.password) {
            throw new HttpException("400", "用户名或者密码不能为空", '');
        }
        if (req.username && req.password) {
            const info = await userRelationModule.getUserInfo(req.username);
            if (info && info.password == req.password) {
                let token = jwtUtil.getToken(info)
                ctx.body = {
                    code: 200,
                    msg: '登陆成功',
                    token: token
                }
            } else {
                ctx.body = {
                    code: 400,
                    msg: '用户密码错误'
                }
            }
        }
    }

    // 获取用户信息
    static async getUserInfo(ctx) {
        const token = ctx.headers.authorization;
        const result = await jwtUtil.verify(token);
        let data = await userRelationModule.getUserInfo(result.user);
        const info = {
            userId: data.id,
            username: data.username,
            avatar: data.avatar,
            role: data.role
        };
        return ctx.body = {
            code: 200,
            msg: '获取用户信息成功',
            data: info,
        }
    }

    // 更新用户信息
    static async update(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (!req.id) {
            throw new HttpException("400", "用户id不能为空", '');
        }
        const info = await userModule.updateUser(req)
        if (info[0] == 1) {
            ctx.body = {
                code: 200,
                msg: '更新用户成功',
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '更新用户失败',
                data: info,
            }
        }
    }
    // 删除用户
    static async delUser(ctx) {
        const req = ctx.request.body;
        if (!req.id) {
            throw new HttpException("400", "用户id不能为空", '');
        }
        const info = await userModule.delUser(req.id)
        if (info == 1) {
            ctx.body = {
                code: 200,
                msg: '删除用户成功'
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '删除用户失败',
                data: info,
            }
        }
    }
    // 查询所有用户成功
    static async findAll(ctx) {
        let req = ctx.request.body;
        try {
            if (!req.currentPage) {
                req.currentPage = 1
            }
            if (!req.pageSize) {
                req.pageSize = 10
            }
            let data = await userRelationModule.findAllUser(req);
            ctx.body = {
                code: 200,
                msg: '查找所有用户成功',
                data
            }
        } catch (error) {
            ctx.body = {
                code: 500,
                msg: '查找所有用户失败',
                data: error
            }
        }
    }
}

module.exports = userController;