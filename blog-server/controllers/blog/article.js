const BlogModel = require('../../modules/blog/article.js')
const ArticleRelationModel = require('../../modules/blog/articleRelation.js')
const { HttpException } = require("../../middleware/httpException.js")
class BlogController {
    static async create(ctx) {
        let req = ctx.request.body;
        if (!req.title) {
            throw new HttpException("400", "文章标题title是必填字段", '');
        }
        const info = await BlogModel.create(req)
        ctx.body = {
            code: 200,
            msg: '创建文章成功',
            data: info
        }

    }
    static async update(ctx) {
        let req = ctx.request.body;
        if (!req.id) {
            throw new HttpException("400", "文章id不能为空", '');
        }
        const info = await BlogModel.update(req);
        if (info[0] == 1) {
            ctx.body = {
                code: 200,
                msg: '更新文章成功',
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '更新文章失败',
                data: info
            }
        }
    }
    static async del(ctx) {
        let req = ctx.request.body;
        if (!req.id) {
            throw new HttpException("400", "文章id不能为空", '');
        }
        const info = await BlogModel.del(req.id);
        if (info == 1) {
            ctx.body = {
                code: 200,
                msg: '删除文章成功',
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '删除文章失败',
                data: info
            }
        }
    }
    static async batchDel(ctx) {
        let req = ctx.request.body;
        if (!req.batchList) {
            throw new HttpException("400", "batchList是必填字段", '');
        }
        try {
            const data = await BlogModel.bacthDel(req.batchList);
            ctx.body = {
                code: 200,
                msg: '批量删除文章类别成功',
                data
            }
        } catch (err) {
            ctx.body = {
                code: 500,
                msg: '批量删除文章类别失败',
                data: err
            }
        }
    }
    static async findAll(ctx) {
        let req = ctx.request.body;
        try {
            if (!req.currentPage) {
                req.currentPage = 1
            }
            if (!req.pageSize) {
                req.pageSize = 10
            }
            let data = await ArticleRelationModel.findAll(req);
            ctx.body = {
                code: 200,
                msg: '查找所有文章成功',
                data
            }
        } catch (error) {
            ctx.body = {
                code: 500,
                msg: '查找所有文章失败',
                data: error
            }
        }
    }
    static async findOne(ctx) {
        let req = ctx.request.body;
        if (!req.id) {
            throw new HttpException("400", "文章id不能为空", '');
        }
        let data = await ArticleRelationModel.detail(req.id);
        ctx.body = {
            code: 200,
            msg: '查找文章详情成功',
            data
        }
    }
    static async updateSee(ctx) {
        let req = ctx.request.body;
        if (!req.id) {
            throw new HttpException("400", "文章id不能为空", '');
        }
        const info = await BlogModel.updateSee(req)
        if (info[0] = 1) {
            ctx.body = {
                code: 200,
                msg: '修改文章阅读量成功',
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '修改文章阅读量失败',
                data: info
            }
        }
    }
    static async articleAsy(ctx) {
        let req = ctx.request.query;
        let info = {}
        try {
            const article_totalData = await ArticleRelationModel.findArticleTotal(req);
            const article_total = article_totalData[0].get({ plain: true }).total;
            info["当前栏目下文章总数"] = article_total
            const visitNum_totalData = await ArticleRelationModel.findArticleVisitNum(req);
            const visitNum_total = visitNum_totalData[0].get({ plain: true }).total;
            info["当前栏目下访客总数"] = visitNum_total
            const reply_totalData = await ArticleRelationModel.findReplyTotal(req);
            const reply_total = reply_totalData[0].get({ plain: true }).total;
            info["当前栏目下评论总数"] = reply_total
            ctx.body = {
                code: 200,
                msg: '查询文章访客总数量成功',
                data: info
            }

        } catch (error) {
            ctx.body = {
                code: 500,
                msg: '统计文章访客总数量异常',
                data: {
                    "当前栏目下文章总数": "-",
                    "当前栏目下访客总数": "-"
                }
            }
        }

    }

}
module.exports = BlogController