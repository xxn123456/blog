const userModel = require("../../modules/wx/user");
const { HttpException } = require("../../middleware/httpException.js")
const request = require('koa2-request');
const wxConfig = require("../../util/wx.js")
class sdkController {
    static async jsCode(ctx) {
        let req = ctx.request.query;
        const JS_CODE = req.code
        const res = await request({
            url: `https://api.weixin.qq.com/sns/jscode2session?appid=${wxConfig.APPID}&secret=${wxConfig.SECRET}&js_code=${JS_CODE}&grant_type=authorization_code`,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
        const wxBody = JSON.parse(res.body)
        ctx.body = {
            code: 200,
            msg: '查找微信三方接口jscode2session成功',
            data: wxBody
        }
    }
    static async wxRegist(ctx) {
        let req = ctx.request.body;
        if (!req.userName) {
            throw new HttpException("500", "userName不能为空", '');
        }
        if (!req.openid) {
            throw new HttpException("500", "openid不能为空", '');
        }
        const user = await userModel.findWxUser(req.openid)
        if (user) {
            throw new HttpException("500", "当前微信账号已经绑定", '');
        }
        const info = await userModel.createWxUser(req)
        ctx.body = {
            code: 200,
            msg: '微信绑定用户成功',
            data: info
        }
    }
    static async findWxUser(ctx) {
        let req = ctx.request.body;
        if (!req.openid) {
            throw new HttpException("500", "openid不能为空", '');
        }
        const info = await userModel.findWxUser(req.openid)
        ctx.body = {
            code: 200,
            msg: '查找微信绑定用户成功',
            data: info
        }
    }
}

module.exports = sdkController;