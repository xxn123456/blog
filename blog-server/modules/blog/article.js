// 引入mysql的配置文件
const db = require('../../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;

const { Op } = require("sequelize");

// 引入数据表模型
const Blog = Sequelize.import('../../schema/blog/article.js');

const BlogType = Sequelize.import('../../schema/blog/navType.js');

const User = Sequelize.import('../../schema/blog/user.js');


// 进行表关联查询

Blog.belongsTo(BlogType, {
    foreignKey: 'navTypeId'
});


Blog.belongsTo(User, {
    foreignKey: 'userId'
});

class BlogModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */
    // 创建文章类别
    static async create(data) {
        return await Blog.create({
            title: data.title, //标题
            navTypeId: data.navTypeId,
            userId: data.userId,
            visitNum: data.visitNum,
            content: data.content
        });
    }
    // 更新文章类别
    static async update(data) {
        let updateData={}
        if(data.title){
            updateData.title=data.title
        }
        if(data.navTypeId){
            updateData.title=data.navTypeId
        }
        if(data.userId){
            updateData.userId=data.userId
        }
        if(data.visitNum){
            updateData.visitNum=data.visitNum
        }
        if(data.content){
            updateData.content=data.content
        }
        return await Blog.update(updateData, {
            where: {
                id: data.id
            }
        });
    }
    static async updateSee(data) {
        return await Blog.update({
            visitNum: data.visitNum

        }, {
            where: {
                id: data.id
            }
        });
    }
    // 对文章进行删除
    static async del(id) {
        return await Blog.destroy({
            where: {
                id
            }
        });
    }

    // 对文章批量删除
    static async bacthDel(data) {
        return await Blog.destroy({
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
        return await Blog.findOne({
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

        if(data.title){
            criteria.push({
                title: {
                     [Op.like]: '%' + data.title + '%'
                }
            })
        }
        
        if (data.recommend) {
            criteria.push({
                recommend: data.recommend
            })
        }

        if(data.userId){
            userId.push({
                userId:data.userId
            })
        }
        if (data.categoryId) {
            criteria.push({
                navTypeId: data.categoryId
            })
        }


        if (data.startTime || data.endTime) {
            criteria.push({

                createdAt: {
                    [Op.between]: [new Date(data.startTime), new Date(data.endTime)]

                }
            })

        }
        return await Blog.findAndCountAll({
            where: {
                [Op.and]: criteria
            },
            offset,
            limit,
            order: [
                ['createdAt', 'DESC'],
            ],
            include: [{
                model: BlogType
            },
            {
                model: User
            }
            ]

        });
    }


}

module.exports = BlogModel;