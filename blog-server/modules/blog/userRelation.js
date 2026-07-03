//引入db配置
const db = require('../../config/db')
const Sequelize = db.sequelize
//引入sequelize对象
const user = Sequelize.import('../../schema/blog/user')
const Role = Sequelize.import('../../schema/blog/role')
user.belongsTo(Role, {
    foreignKey: 'role_id'
});
class userRelationModule {
    // 查找所有用户
    static async findAllUser(data) {
        let offset = data.pageSize * (data.currentPage - 1);
        let limit = parseInt(data.pageSize);
        let where = {};
        if (data.username) {
            where["username"] = data.username
        }
        if (data.startTime || data.endTime) {
            where["createdAt"] = {
                [Op.between]: [new Date(data.startTime), new Date(data.endTime)]
            }
        }
        return await user.findAndCountAll({
            attributes: ['id', 'username', 'avatar', 'updatedAt'],
            where: where,
            order: [
                ['id', 'ASC'],
            ],
            offset,
            limit,
            distinct: true,
            include: [{ model: Role, attributes: ['id', 'name'], }]
        });
    }
    // 查询用户信息
    static async getUserInfo(username) {
        return await user.findOne({
            where: {
                username: username
            },
            include: [{ model: Role }]
        })
    }
}
module.exports = userRelationModule
