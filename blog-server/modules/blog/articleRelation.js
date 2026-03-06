// 引入mysql的配置文件
const db = require('../../config/db');
// 引入sequelize对象
const Sequelize = db.sequelize;

const { Op } = require("sequelize");

// 引入数据表模型
const Blog = Sequelize.import('../../schema/blog/article.js');
const NavType = Sequelize.import('../../schema/blog/navType.js');
const User = Sequelize.import('../../schema/blog/user.js');
const Reply = Sequelize.import('../../schema/blog/reply.js')

Blog.belongsTo(NavType, {
    foreignKey: 'navTypeId'
})

Blog.belongsTo(User, {
    foreignKey: 'userId'
})

Blog.hasMany(Reply, {
    foreignKey: 'article_id',
    as: 'reply'
})

class ArticleRelationModel {
    static async detail(id) {
        return await Blog.findOne({
            where: {
                id
            },
            attributes: ['id', 'title', 'book', 'content', 'url', 'visitNum', 'recommend', 'createdAt', 'updatedAt'],
            include: [{
                model: NavType
            },
            {
                model: User
            }
            ]
        });
    }
    static async findAll(data) {
        let offset = data.pageSize * (data.currentPage - 1);
        let limit = parseInt(data.pageSize);
        let where = {};
        if (data.title) {
            where["title"] = {
                [Op.like]: '%' + data.title + '%'
            }
        }
        if (data.navTypeId) {
            where["navTypeId"] = data.navTypeId
        }
        if (data.recommend) {
            where["recommend"] = data.recommend
        }
        if (data.userId) {
            where["userId"] = data.userId
        }
        if (data.startTime || data.endTime) {
            where["createdAt"] = {
                [Op.between]: [new Date(data.startTime), new Date(data.endTime)]
            }
        }
        return await Blog.findAndCountAll({
            where: where,
            offset,
            limit,
            distinct: true,
            attributes: ['id', 'title', 'book', 'content', 'url', 'visitNum', 'createdAt', 'updatedAt'],
            order: [
                ['createdAt', 'DESC'],
            ],
            include: [
                {
                    model: NavType
                },
                {
                    model: User
                },
                {
                    model: Reply,
                    as: 'reply'
                }
            ]

        });
    }
    static async findArticleTotal(data) {
        let where = {}
        if (data.navTypeId) {
            where["navTypeId"]= data.navTypeId
        }
        return await Blog.findAll({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('navTypeId')), 'total']
            ],
            where: where
        });
    }
    static async findReplyTotal(data) {
        let where = {}
        if (data.navTypeId) {
            where["navTypeId"]= data.navTypeId
        }
        return await Reply.findAll({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('navTypeId')), 'total']
            ],
            where: where
        });
    }

    static async findArticleVisitNum(data) {
        let where = {}
        if (data.navTypeId) {
            where["navTypeId"]= data.navTypeId
        }
        return await Blog.findAll({
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('visitNum')), 'total']
            ],
            where: where,
        });
    }

}

module.exports = ArticleRelationModel;