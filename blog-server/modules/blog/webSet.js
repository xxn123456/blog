// 引入mysql的配置文件
const db = require('../../config/db');
// 引入sequelize对象
const Sequelize = db.sequelize;
const { Op } = require("sequelize");

// 引入数据表模型
const webSet = Sequelize.import('../../schema/blog/webSet.js');

class webSetModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */
    // 创建文章类别
    static async createwebSet(data) {
        return await webSet.create({
            name: data.name, //标题
            configs: data.configs
        });
    }

    // 更新文章类别
    static async upDatawebSet(data) {
        let updateData={}
        if(data.name){
            updateData.name=data.name
        }
        if(data.configs){
            updateData.configs=data.configs
        }
        return await webSet.update(updateData, {
            where: {
                id: data.id
            }
        });
    }
    // 对文章进行删除
    static async delwebSet(id) {
        return await webSet.destroy({
            where: {
                id
            }
        });
    }

    // 对文章批量删除
    static async bacthDel(data) {
        return await webSet.destroy({
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
        return await webSet.findOne({
            where: {
                id
            }
        });
    }


    // 对文章类别进行搜索分页显示
    static async finAllwebSet(data) {
        let offset = data.pageSize * (data.currentPage - 1);
        let limit = parseInt(data.pageSize);
        let criteria = [];
        if (data.name) {
            criteria.push({ name: data.name})
        }
        if (data.startTime || data.endTime) {
            criteria.push({
                createdAt: {
                    [Op.between]: [new Date(data.startTime), new Date(data.endTime)]

                }
            })
        }
        return await webSet.findAndCountAll({
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

module.exports = webSetModel;