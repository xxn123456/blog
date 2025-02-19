// 引入mysql的配置文件
const db = require('../../config/jobdb');

// 引入sequelize对象
const Sequelize = db.sequelize;

const {
    Op
} = require("sequelize");

// 引入数据表模型
const record = Sequelize.import('../../schema/job/record.js');

record.sync({
    force: false
}); //自动创建表



class recordModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */
    // 创建文章类别
    static async create(data) {
        return await record.create({
            company: data.company, //标题
            work: data.work,
            time: data.time
        });
    }
    // 更新文章类别
    static async update(data) {

        return await record.update({
            company: data.company, //标题
            work: data.work,
            time: data.time
        }, {
            where: {
                id: data.id
            }
        });
    }
    // 对文章进行删除
    static async del(id) {

        return await record.destroy({
            where: {
                id
            }
        });
    }

    // 对文章批量删除
    static async bacthDel(data) {
        return await record.destroy({
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
       
        return await record.findOne({
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


        return await record.findAndCountAll({
            'order': [
                ['id', 'msg'],
               
            ],
            where: {
                [Op.and]:criteria
            
            }

        });
    }

}

module.exports = recordModel;