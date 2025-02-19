// 引入mysql的配置文件
const db = require('../../config/jobdb');

// 引入sequelize对象
const Sequelize = db.sequelize;

const {
    Op
} = require("sequelize");

// 引入数据表模型
const myKill = Sequelize.import('../../schema/job/kill.js');

myKill.sync({
    force: false
}); //自动创建表



class myKillModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */
    // 创建文章类别
    static async create(data) {
        return await myKill.create({
            title: data.title, //标题
            url:data.url,
            type: data.type,
            exp: data.exp,
            content: data.content
        });
    }
    // 更新文章类别
    static async update(data) {

        return await myKill.update({
            title: data.title, 
            url:data.url,
            type: data.type,
            exp: data.exp,
            content: data.content
        }, {
            where: {
                id: data.id
            }
        });
    }
    // 对文章进行删除
    static async del(id) {

        return await myKill.destroy({
            where: {
                id
            }
        });
    }

    // 对文章批量删除
    static async bacthDel(data) {
        return await myKill.destroy({
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
       
        return await myKill.findOne({
            where: {
                id
            }
        });
    }

    // 对文章类别进行搜索分页显示
    static async findAll(data) {

        let offset = data.pageSize * (data.currentPage - 1);
        let limit = parseInt(data.pageSize);

        let criteria = [];



        if (data.startTime || data.endTime) {
            criteria.push({

                createdAt: {
                    [Op.between]: [new Date(data.startTime), new Date(data.endTime)]

                }
            })

        }


        return await myKill.findAndCountAll({
            where: {
                [Op.and]:criteria
            
            }

        });
    }

}

module.exports = myKillModel;