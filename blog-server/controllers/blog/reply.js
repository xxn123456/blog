const replyModel = require("../../modules/blog/reply");
const replyRelationUserWithArticleModel = require("../../modules/blog/replyRelationUserWithArticle")
const { HttpException } = require("../../middleware/httpException.js")
class replyController {
    static async create(ctx) {
        let req = ctx.request.body;
        if (!req.user_id) {
            throw new HttpException("400", "评论发布人user_id是必填字段", '');
        }
        if (!req.article_id) {
            throw new HttpException("400", "评论文章article_id是必填字段", '');
        }
        if (!req.comment) {
            throw new HttpException("400", "评论内容comment是必填字段", '');
        }
        const info = await replyModel.createReply(req)
        ctx.body = {
            code: 200,
            msg: '创建评论成功',
            data: info
        }
    }
    static async update(ctx) {
        let req = ctx.request.body;
        if (!req.id) {
            throw new HttpException("400", "评论id不能为空", '');
        }
        const info = await replyModel.updateReply(req)
        if (info[0] == 1) {
            ctx.body = {
                code: 200,
                msg: '更新评论成功',
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '更新评论失败',
                data: info
            }
        }
    }
    static async del(ctx) {
        let req = ctx.request.body;
        if (!req.id) {
            throw new HttpException("400", "评论id不能为空", '');
        }
        const info = await replyModel.delReply(req.id)
        if (info == 1) {
            ctx.body = {
                code: 200,
                msg: '删除评论成功',
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '删除评论失败',
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
            let data = await replyModel.bacthDel(req.batchList);
            ctx.body = {
                code: 200,
                data,
                msg: '批量删除评论成功',
            }
        } catch (err) {
            ctx.body = {
                code: 500,
                msg: '批量删除评论失败',
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
            let data = await replyRelationUserWithArticleModel.finAllReply(req)
            ctx.body = {
                code: 200,
                msg: '查找所有评论成功',
                data
            }
        } catch (error) {
            ctx.body = {
                code: 500,
                msg: '查找所有评论失败',
                data: error
            }
        }
    }
    static async findOne(ctx) {
        let req = ctx.request.body;
        if (!req.id) {
            throw new HttpException("400", "评论id不能为空", '');
        }
        let data = await replyModel.detail(req.id);
        ctx.body = {
            code: 200,
            msg: '查找评论详情成功',
            data
        }


    }

}

module.exports = replyController;