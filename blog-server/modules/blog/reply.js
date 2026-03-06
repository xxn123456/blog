// 引入mysql的配置文件
const db = require('../../config/db');
// 引入sequelize对象
const Sequelize = db.sequelize;

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

class replyModel {
    static async createReply(data) {
        return await reply.create({
            article_id: data.article_id, //标题
            comment: data.comment,
            user_id: data.user_id
        });
    }
    static async updateReply(data) {
        const { article_id, comment, user_id } = data
        return await reply.update({ article_id, comment, user_id }, {
            where: {
                id: data.id
            }
        });
    }
    static async delReply(id) {
        return await reply.destroy({
            where: {
                id
            }
        });
    }
    static async bacthDel(data) {
        return await reply.destroy({
            where: {
                id: data
            }
        })
    }
    static async detail(id) {
        return await reply.findOne({
            where: {
                id
            }
        });
    }

}

module.exports = replyModel;