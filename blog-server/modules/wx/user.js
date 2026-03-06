// 引入mysql的配置文件
const db = require('../../config/wxdb');
// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const User = Sequelize.import('../../schema/wx/user.js');

class userModel {
    static async createWxUser(data) {
        return await User.create({
            userName: data.userName, //标题
            avatarUrl: data.avatarUrl,
            openid: data.openid,
            session_key:data.session_key
        });
    }
    static async findWxUser(openid) {
        console.log("进入模型",openid)
        return await User.findOne({
            where: {
                openid
            }
        });
    }

}

module.exports = userModel;