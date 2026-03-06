// 引入mysql的配置文件
const db = require('../../config/db');
// 引入sequelize对象
const Sequelize = db.sequelize;
const { Op } = require("sequelize");
const works = Sequelize.import('../../schema/blog/works.js');

class worksModel {
    static async createworks(data) {
        return await works.create({
            tag: data.tag,
            coverBg: data.coverBg,
            title: data.title,
            des: data.des,
            cont: data.cont
        });
    }
    static async updateworks(data) {
        const { tag, coverBg, title, des, cont } = data;
        return await works.update({ tag, coverBg, title, des, cont }, {
            where: {
                id: data.id
            }
        });
    }
    static async delworks(id) {
        return await works.destroy({
            where: {
                id
            }
        });
    }
    static async bacthDel(data) {
        return await works.destroy({
            where: {
                id: data
            }
        })
    }
    static async detail(id) {
        return await works.findOne({
            where: {
                id
            }
        });
    }
    static async finAllworks(data) {
        let offset = data.pageSize * (data.currentPage - 1);
        let limit = parseInt(data.pageSize);
        let where = {};

        if (data.tag) {
            where["tag"] = data.tag
        }
        if (data.title) {
            where["title"] = {
                [Op.like]: '%' + data.title + '%'
            }
        }
        if (data.des) {
            where["des"] = {
                [Op.like]: '%' + data.des + '%'
            }
        }
        if (data.startTime || data.endTime) {
            where["createdAt"] = {
                [Op.between]: [new Date(data.startTime), new Date(data.endTime)]
            }
        }
        return await works.findAndCountAll({
            where: where,
            order: [
                ['id', 'ASC'],
            ],
            //offet去掉前多少个数据
            offset,
            //limit每页数据数量
            limit: limit,
            distinct: true
        })




    }

}

module.exports = worksModel;