// 引入mysql的配置文件
const db = require('../../config/db');
// 引入sequelize对象
const Sequelize = db.sequelize;
const { Op } = require("sequelize");

// 引入数据表模型
const navType = Sequelize.import('../../schema/blog/navType.js');

const Blog = Sequelize.import('../../schema/blog/article.js');

navType.hasMany(Blog, {
    foreignKey: 'navTypeId',
    sourceKey: 'id'
});
class navTypeModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */
    // 创建文章类别
    static async createnavType(data) {
        return await navType.create({
            categoryName: data.categoryName, //标题
            categoryCreater: data.categoryCreater,
            icon: data.icon,
            leftNavUrl: data.leftNavUrl
        });
    }

    // 更新文章类别
    static async upDatanavType(data) {
        let updateData={}
        if(data.categoryName){
            updateData.categoryName=data.categoryName
        }
        if(data.categoryCreater){
            updateData.categoryCreater=data.categoryCreater
        }
        if(data.leftNavUrl){
            updateData.leftNavUrl=data.leftNavUrl
        }
        if(data.icon){
            updateData.icon=data.icon
        }

        return await navType.update(updateData, {
            where: {
                id: data.id
            }
        });
    }
    // 对文章进行删除
    static async delnavType(id) {
        return await navType.destroy({
            where: {
                id
            }
        });
    }

    // 对文章批量删除
    static async bacthDel(data) {
        return await navType.destroy({
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
    static async getnavTypeDetail(id) {
        return await navType.findOne({
            where: {
                id
            }
        });
    }


    // 对文章类别进行搜索分页显示
    static async finAllnavType(data) {
        let offset = data.pageSize * (data.currentPage - 1);
        let limit = parseInt(data.pageSize);
        let criteria = [];
        if (data.categoryName) {
            criteria.push({ categoryName: data.categoryName })
        }
        if (data.categoryNum) {
            criteria.push({ categoryNum: data.categoryNum })
        }
        if (data.startTime || data.endTime) {
            criteria.push({
                createdAt: {
                    [Op.between]: [new Date(data.startTime), new Date(data.endTime)]

                }
            })
        }
        return await navType.findAndCountAll({

            where: {
                [Op.and]: criteria
            },
            order: [
                ['id', 'ASC'],
            ],
            //offet去掉前多少个数据
            offset,
            //limit每页数据数量
            limit: limit,
            include: [{
                model: Blog
            }

            ]

        })




    }

}

module.exports = navTypeModel;