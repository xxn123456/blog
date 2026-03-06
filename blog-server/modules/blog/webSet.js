// 引入mysql的配置文件
const db = require('../../config/db');
// 引入sequelize对象
const Sequelize = db.sequelize;
const { Op } = require("sequelize");

// 引入数据表模型
const webSet = Sequelize.import('../../schema/blog/webSet.js');

class webSetModel {
    static async createwebSet(data) {
        return await webSet.create({
            name: data.name, //标题
            configs: data.configs
        });
    }
    static async updatewebSet(data) {
        const { name, configs } = data
        return await webSet.update({ name, configs }, {
            where: {
                id: data.id
            }
        });
    }
    static async delwebSet(id) {
        return await webSet.destroy({
            where: {
                id
            }
        });
    }
    static async bacthDel(data) {
        return await webSet.destroy({
            where: {
                id: data
            }
        })
    }
    static async detail(id) {
        return await webSet.findOne({
            where: {
                id
            }
        });
    }

    static async finAllwebSet(data) {
        let offset = data.pageSize * (data.currentPage - 1);
        let limit = parseInt(data.pageSize);
        let where = {};
        if (data.name) {
            where["name"] = data.name
        }
        if (data.startTime || data.endTime) {
            where["createdAt"] = {
                [Op.between]: [new Date(data.startTime), new Date(data.endTime)]
            }
        }
        return await webSet.findAndCountAll({
            where: where,
            order: [
                ['id', 'ASC'],
            ],
            offset,
            limit: limit,
            distinct: true
        })




    }

}

module.exports = webSetModel;