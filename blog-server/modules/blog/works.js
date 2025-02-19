// 引入mysql的配置文件
const db = require('../../config/db');
// 引入sequelize对象
const Sequelize = db.sequelize;
const { Op } = require("sequelize");

// 引入数据表模型
const works = Sequelize.import('../../schema/blog/works.js');

class worksModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */
    // 创建文章类别
    static async createworks(data) {
        return await works.create({
            cardType: data.cardType, //标题
            height: data.height,
            title: data.title, //标题
            tag: data.tag,
            des: data.des, //标题
            coverBg: data.coverBg,
            cont: data.cont
        });
    }

    // 更新文章类别
    static async upDataworks(data) {
        let updateData = {}
        if (data.cardType) {
            updateData.navType = data.cardType
        }
        if (data.height) {
            updateData.height = data.height
        }
        if (data.title) {
            updateData.title = data.title
        }
        if (data.tag) {
            updateData.tag = data.tag
        }
        if (data.des) {
            updateData.des = data.des
        }
        if (data.coverBg) {
            updateData.coverBg = data.coverBg
        }
        if (data.cont) {
            updateData.cont = data.cont
        }
        return await works.update(updateData, {
            where: {
                id: data.id
            }
        });
    }
    // 对文章进行删除
    static async delworks(id) {
        return await works.destroy({
            where: {
                id
            }
        });
    }

    // 对文章批量删除
    static async bacthDel(data) {
        return await works.destroy({
            where: {
                id: data
            }
        })
    }
    /**
     * 查询文章的详情
     * @param id 文章ID
     * @returns {Promise<Model>}
     */
    static async detail(id) {
        return await works.findOne({
            where: {
                id
            }
        });
    }


    // 对文章类别进行搜索分页显示
    static async finAllworks(data) {
        let offset = data.pageSize * (data.currentPage - 1);
        let limit = parseInt(data.pageSize);
        let criteria = [];

        if (data.cardType) {
            criteria.push({
                cardType: data.cardType
            })
        }

        if (data.tag) {
            criteria.push({
                tag: {
                    [Op.like]: '%' + data.tag + '%'
                }
            })
        }
        if (data.title) {
            criteria.push({
                title: {
                    [Op.like]: '%' + data.title + '%'
                }
            })
        }

        if (data.des) {
            criteria.push({
                des: {
                    [Op.like]: '%' + data.des + '%'
                }
            })
        }
        if (data.startTime || data.endTime) {
            criteria.push({
                createdAt: {
                    [Op.between]: [new Date(data.startTime), new Date(data.endTime)]

                }
            })
        }
        return await works.findAndCountAll({
            where: {
                [Op.and]: criteria
            },
            order: [
                ['id', 'ASC'],
            ],
            //offet去掉前多少个数据
            offset,
            //limit每页数据数量
            limit: limit
        })




    }

}

module.exports = worksModel;