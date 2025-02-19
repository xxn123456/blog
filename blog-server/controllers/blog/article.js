const BlogModel = require('../../modules/blog/article.js')
class BlogController {
    // 创建文章
    static async create(ctx) {
        let req = ctx.request.body;
        const data = await BlogModel.create(req);
        if (data[0] == 1) {
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '创建文章成功'
            }
        } else {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                msg: '创建文章失败'
            }

        }

    }

    // 修改文章

    static async update(ctx) {
        let req = ctx.request.body;
        let data = await BlogModel.update(req);
        if (data[0] == 1) {
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '修改文章成功'
            }
        } else {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                msg: '修改文章失败'
            }

        }

    }

    static async updateSee(ctx) {
        let req = ctx.request.body;
        let data = await BlogModel.updateSee(req);

        if (data[0] == 1) {
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '修改文章阅读量成功'
            }
        } else {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                msg: '修改文章阅读量失败'
            }

        }

    }

    // 删除文章

    static async del(ctx) {
        let req = ctx.request.body;
        let data = await BlogModel.del(req.id);
        if (data[0] == 1) {
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '删除成功'
            }
        } else {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                msg: '删除失败'
            }

        }


    }

    // 批量删除

    static async batchDel(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.batchList) {
            try {
                //创建文章模型
                const data = await BlogModel.bacthDel(req.batchList);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    navType: data,
                    des: '批量删除文章类别成功',
                }
            } catch (err) {
                ctx.response.status = 500;
                ctx.body = {
                    code: 500,
                    msg: '批量删除文章类别失败',
                    des: err
                }
            }
        } else {
            ctx.response.status = 500;
            ctx.body = {
                code: 200,
                msg: '类别id不能为空'
            }
        }
    }

    // 分页

    static async findAll(ctx) {
        let req = ctx.request.body;
        let data = await BlogModel.findAll(req);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: '查找文章成功',
            data
        }
    }

    // 查找文章详情

    static async findOne(ctx) {
        let req = ctx.request.body;
        let data = await BlogModel.detail(req.id);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: '查找文章详情成功',
            data
        }


    }


}
module.exports = BlogController