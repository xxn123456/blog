// 引入mysql的配置文件
const db = require('../../config/db');
// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const SmsCode = Sequelize.import('../../schema/blog/smsCode.js');

class smsCodeModel {
    // 创建验证码
    static async create(data) {
        return await SmsCode.create({
            email: data.email, //标题
            veryCode: data.veryCode
        });
    }
    static async update(data) {
        return await SmsCode.update({
            email: data.email, //标题
            veryCode: data.veryCode
        }, {
            where: {
                id: data.id
            }
        });
    }
    // 查询验证码详情
    static async detail(email) {
        return await SmsCode.findOne({
            where: {
                email
            }
        });
    }


}

module.exports = smsCodeModel;