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
        let offset = data.pageSize * (data.currentPage - 1);
        let limit = parseInt(data.pageSize);
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
        if (data.startTime || data.endTime) {
            where["createdAt"] = {
                    [Op.between]: [new Date(data.startTime), new Date(data.endTime)]
            }
        }
        return await navType.findAndCountAll({
            where: where,
            order: [
                ['id', 'ASC'],
            ],
            //offet去掉前多少个数据
            offset,
            //limit每页数据数量
            limit: limit,
            distinct:true
        })




    }

}

module.exports = navTypeModel;