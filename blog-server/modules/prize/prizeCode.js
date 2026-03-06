// 引入mysql的配置文件
const db = require('../../config/db');
// 引入sequelize对象
const Sequelize = db.sequelize;
const { Op } = require("sequelize");

// 引入数据表模型
const PrizeCode = Sequelize.import('../../schema/prize/prizeCode.js');

class PrizeCodeModel {
    static async createPrizeCode(data) {
        return await PrizeCode.create({
            prizeCode: data.prizeCode, //标题
            limit: data.limit
        });
    }
    static async findCodeLimt(prizeCode) {
        return await PrizeCode.findOne({
            where: {
                prizeCode
            }
        });
    }
    static async detail(id) {
        return await PrizeCode.findOne({
            where: {
                id
            }
        });
    }
    static async update(data) {
        const { limit } = data
        return await PrizeCode.update({ limit }, {
            where: {
                id: data.id
            }
        });
    }

}

module.exports = PrizeCodeModel;