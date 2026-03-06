// 引入mysql的配置文件
const db = require('../../config/db');
// 引入sequelize对象
const Sequelize = db.sequelize;
const { Op } = require("sequelize");

// 引入数据表模型
const reply = Sequelize.import('../../schema/blog/reply.js');
const User = Sequelize.import('../../schema/blog/user.js');
const Blog = Sequelize.import('../../schema/blog/article.js');


reply.belongsTo(User, {
    foreignKey: 'user_id'
})

reply.belongsTo(Blog, {
    foreignKey: 'article_id'
})

class replyRelationUserWithArticleModel {
    static async finAllReply(data) {
        let offset = data.pageSize * (data.currentPage - 1);
        let limit = parseInt(data.pageSize);
        let where = {};
        if (data.article_id) {
            where["article_id"] = data.article_id
        }
        if (data.comment) {
            where["comment"] = {
                [Op.like]: '%' + data.comment + '%'
            }
        }
        if (data.user_id) {
            where["user_id"] = data.user_id
        }
        if (data.startTime || data.endTime) {
            where["createdAt"] = {
                [Op.between]: [new Date(data.startTime), new Date(data.endTime)]
            }
        }
        return await reply.findAndCountAll({
            where: where,
            order: [
                ['id', 'ASC'],
            ],
            offset,
            limit: limit,
            distinct: true,
            include: [
                {
                    model: User,
                    attributes: ['id', 'username', 'avatar', 'email']
                },
                {
                    model: Blog,
                    attributes: ['id', 'title']
                }
            ]
        })




    }

}

module.exports = replyRelationUserWithArticleModel;