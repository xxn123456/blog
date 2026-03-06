// 引入mysql的配置文件
const db = require('../../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const Blog = Sequelize.import('../../schema/blog/article.js');
class BlogModel {
    static async create(data) {
        return await Blog.create({
            title: data.title,
            book:data.book,
            visitNum: data.visitNum,
            content: data.content,
            navTypeId: data.navTypeId,
            userId: data.userId,
        });
    }
    static async update(data) {
        const { title, book, content, visitNum, navTypeId, userId } = data
        return await Blog.update({ title, book, content, visitNum, navTypeId, userId }, {
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
    static async del(id) {
        return await Blog.destroy({
            where: {
                id
            }
        });
    }
    static async bacthDel(data) {
        return await Blog.destroy({
            where: {
                id: data
            }
        })
    }
}

module.exports = BlogModel;