//引入db配置
const db = require('../../config/db')

//引入sequelize对象
const Sequelize = db.sequelize

//引入数据表模型
const user = Sequelize.import('../../schema/blog/user')


const {
    Op
} = require("sequelize");


//自动创建表
user.sync({
    force: false
});

//数据库操作类
class userModule {

    // 用户注册

    static async userRegist(data) {
        return await user.create({
            password: data.password,
            username: data.username,
            avatar: data.avatar,
            role: data.role
        })

    }

    // 用户登录

    static async getUserInfo(username) {
        return await user.findOne({
            where: {
                username: username
            }
        })
    }


    // 修改密码
    static async updatePassword(data) {
        return await user.update({
            password: data.password
        }, {
            where: {
                userId: data.userId
            }
        })
    }

    // 删除用户


    static async delUser(userId) {
        return await user.destroy({
            where: {
                userId
            }
        })
    }

    // 查找所有用户

    static async findAll(data) {

        let offset = data.pageSize * (data.currentPage - 1);
        let limit = parseInt(data.pageSize);

        let criteria = [];




        if (data.startTime || data.endTime) {
            criteria.push({

                createdAt: {
                    [Op.between]: [new Date(data.startTime), new Date(data.endTime)]

                }
            })

        }


        return await user.findAndCountAll({
            where: {
                [Op.and]: criteria

            },
            offset,
            limit


        });
    }


}
module.exports = userModule;