// 引入mysql的配置文件
const db = require('../../config/db');
// 引入sequelize对象
const Sequelize = db.sequelize;
const { Op } = require("sequelize");
const navType = Sequelize.import('../../schema/blog/navType.js');
class navTypeModel {
    static async createnavType(data) {
        return await navType.create({
            icon: data.icon,
            categoryName: data.categoryName,
            leftNavUrl: data.leftNavUrl
        });
    }
    static async updatenavType(data) {
        const { icon, categoryName, leftNavUrl } = data
        return await navType.update({icon,categoryName,leftNavUrl}, {
            where: {
                id: data.id
            }
        });
    }
    static async delnavType(id) {
        return await navType.destroy({
            where: {
                id
            }
        });
    }
    static async bacthDel(data) {
        return await navType.destroy({
            where: {
                id: data
            }
        })
    }
    static async getnavTypeDetail(id) {
        return await navType.findOne({
            where: {
                id
            }
        });
    }
    static async finAllnavType(data) {
        // 优化1：参数验证和默认值，防止 offset 计算出错
        const currentPage = Math.max(1, parseInt(data.currentPage) || 1);
        const pageSize = Math.min(100, Math.max(1, parseInt(data.pageSize) || 10));
        const offset = pageSize * (currentPage - 1);
        const limit = pageSize;
        
        let where = {};
        if (data.icon) {
            where["icon"] = data.icon
        }
        if (data.categoryName) {
            where["categoryName"] = data.categoryName
        }
        if (data.leftNavUrl) {
            where["leftNavUrl"] = data.leftNavUrl
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

        return await navType.findAndCountAll({
            where: where,
            order: [
                ['id', 'ASC'],
            ],
            offset,
            limit,
            distinct: true,
            attributes: [
                'id',
                'icon',
                'categoryName',
                'leftNavUrl',
                'createdAt',
                'updatedAt',
                // 子查询统计当前导航下的文章数量
                [Sequelize.literal(`(SELECT COUNT(*) FROM article WHERE article.navTypeId = navType.id)`), 'articleCount']
            ]
        });
    }

}

module.exports = navTypeModel;