//引入db配置
const db = require('../../config/db')

//引入sequelize对象
const Sequelize = db.sequelize

//引入数据表模型
const user = Sequelize.import('../../schema/blog/user')
const { Op } = require("sequelize");

//数据库操作类
class userModule {
    // 用户注册
    static async userRegist(data) {
        return await user.create({
            password: data.password,
            username: data.username,
            email:data.email,
            avatar: data.avatar,
            role: data.role
        })
    }
    // 更新用户信息
    static async updateUser(data) {
        const { username, password,email, avatar, role_id } = data
        return await user.update({
            username, password,email, avatar, role_id
        }, {
            where: {
                id: data.id
            }
        });
    }
    // 删除用户
    static async delUser(id) {
        return await user.destroy({
            where: {
                id
            }
        })
    }

}
module.exports = userModule;