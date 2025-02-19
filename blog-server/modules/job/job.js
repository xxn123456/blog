// 引入mysql的配置文件
const db = require('../../config/jobdb');

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const Job = Sequelize.import('../../schema/job/job.js');






class JobModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */
    // 创建文章类别
    static async create(data) {
        return await Job.create({
            title: data.title, //标题
           
            visitNum: data.visitNum,
           
            content: data.content
        });
    }
    // 更新文章类别
    static async update(data) {

        return await Job.update({
            title: data.title, //标题
           
            visitNum: data.visitNum,
           
            content: data.content
        }, {
            where: {
                id: data.id
            }
        });
    }
    // 对文章进行删除
    static async del(id) {

        return await Job.destroy({
            where: {
                id
            }
        });
    }

    // 对文章批量删除
    static async bacthDel(data) {
        return await Job.destroy({
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
        
        return await Job.findOne({
            where: {
                id
            }
        });
    }

    // 对文章类别进行搜索分页显示
    static async findAll(data) {

        
    


        return await Job.findAndCountAll();
    }

}

module.exports = JobModel;