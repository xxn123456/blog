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
            attributes: ['id', 'title','recommend', 'book', 'content', 'url', 'visitNum', 'createdAt','updatedAt'],
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
        // 优化1：参数验证和默认值，防止 offset 计算出错
        const currentPage = Math.max(1, parseInt(data.currentPage) || 1);
        const pageSize = Math.min(100, Math.max(1, parseInt(data.pageSize) || 10));
        const offset = pageSize * (currentPage - 1);
        const limit = pageSize;
        
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
        // 优化2：改进时间范围查询，支持单独的开始或结束时间
        if (data.startTime || data.endTime) {
            where["createdAt"] = {};
            if (data.startTime) {
                where["createdAt"][Op.gte] = new Date(data.startTime);
            }
            if (data.endTime) {
                where["createdAt"][Op.lte] = new Date(data.endTime);
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
        // 优化3：使用 findOne 替代 findAll，聚合查询只返回一行
        const result = await Blog.findOne({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'total']
            ],
            where: where
        });
        // 返回普通对象，处理可能的 null 值
        return result ? result.get({ plain: true }) : { total: 0 };
    }
    static async findReplyTotal(data) {
        let where = {}
        if (data.navTypeId) {
            where["navTypeId"]= data.navTypeId
        }
        // 优化3：使用 findOne 替代 findAll
        const result = await Reply.findOne({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'total']
            ],
            where: where
        });
        // 返回普通对象，处理可能的 null 值
        return result ? result.get({ plain: true }) : { total: 0 };
    }

    static async findArticleVisitNum(data) {
        let where = {}
        if (data.navTypeId) {
            where["navTypeId"]= data.navTypeId
        }
        // 优化3：使用 findOne 替代 findAll，并处理 SUM 可能返回 null 的情况
        const result = await Blog.findOne({
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('visitNum')), 'total']
            ],
            where: where,
        });
        // SUM 在没有数据时返回 null，需要转为 0
        const plainResult = result ? result.get({ plain: true }) : { total: 0 };
        return {
            total: plainResult.total || 0
        };
    }

}

module.exports = ArticleRelationModel;