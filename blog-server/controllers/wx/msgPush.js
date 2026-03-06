const { HttpException } = require("../../middleware/httpException.js")
const request = require('koa2-request');
const wxConfig = require("../../util/wx.js")
const crypto = require('crypto');
class sdkController {
    static async pushCheck(ctx) {
        const { signature, timestamp, nonce, echostr } = ctx.query;

        // 1. 将token、timestamp、nonce三个参数按字典序排序
        const token = 'shutiaogege';
        const arr = [token, timestamp, nonce].sort();

        // 2. 将三个参数字符串拼接成一个字符串进行sha1加密
        const str = arr.join('');
        const sha1Str = crypto.createHash('sha1').update(str).digest('hex');

        // 3. 将加密后的字符串与signature对比
        if (sha1Str === signature) {
            ctx.body = echostr; // 验证成功，返回echostr
        } else {
            ctx.status = 403;
            ctx.body = 'Token验证失败';
        }
    }
    // SubscribeMessage
    static async sendModelMsg(ctx) {
        let req = ctx.request.body;
        const touser = req.openid;
        const accessTokenRes = await request(
            {
                url: `https://api.weixin.qq.com/cgi-bin/token?appid=${wxConfig.APPID}&secret=${wxConfig.SECRET}&grant_type=client_credential`,
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET',
            }
        )
       
        const { access_token } = JSON.parse(accessTokenRes.body)
        const sendRes = await request({
            url: `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${access_token}`,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                template_id: "X-nfuimNzh4LC9Mfu_4x7mtPvU4nklh4RSMW5k0Mio4", //模板id
                touser: touser, //openid
                data: {
                    thing1: {
                        value: "薯条代码学习"
                    },
                    time2: {
                        value: "2026年1月26日"
                    },
                    phrase3: {
                        value: "审核成功"
                    },
                    thing4: {
                        value: "无"
                    }
                },
                miniprogram_state: "developer",
                lang: "zh_CN"
            })
        })
        ctx.body = {
            code: 200,
            msg: '发送消息模板成功',
            data: sendRes
        }

    }

}
module.exports = sdkController;