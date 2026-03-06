const prizeCodeModel = require("../../modules/prize/prizeCode");
const { HttpException } = require("../../middleware/httpException.js")
const { randCode } = require("../../util/prize.js")
class prizeCodeController {
    static async create(ctx) {
        const prizeCode = randCode(6);
        const req = {
            prizeCode: prizeCode,
            limit: 3
        }
        const info = await prizeCodeModel.createPrizeCode(req)
        ctx.body = {
            code: 200,
            msg: '创建激活码成功',
            data: info
        }
    }
    static async findCodeLimt(ctx) {
        let req = ctx.request.query;
        if (!req.prizeCode) {
            throw new HttpException("400", "激活码不能为空", '');
        }
        let data = await prizeCodeModel.findCodeLimt(req.prizeCode);
        if (!data) {
            throw new HttpException("500", "激活码过期或者已经被使用", '');
        }
        ctx.body = {
            code: 200,
            msg: '查找激活码详情成功',
            data
        }
    }
    static async win(ctx) {
        let req = ctx.request.query;
        if (!req.prizeCode) {
            throw new HttpException("400", "激活码不能为空", '');
        }
        const prizeData = await prizeCodeModel.findCodeLimt(req.prizeCode);
        const prize = prizeData.get({ plain: true })
        let limit = prize.limit;
        if (limit <= 0) {
            throw new HttpException("500", "抽奖次数已经使用完毕请", '');
        }
        limit = limit - 1;
        const updataInfo = {
            id: prize.id,
            limit: limit
        }
        const updataRes = await prizeCodeModel.update(updataInfo)
        ctx.body = {
            code: 200,
            msg: '抽奖卷使用成功',
            data:updataRes
        }
    }

}

module.exports = prizeCodeController;