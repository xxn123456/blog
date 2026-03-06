const navTypeModel = require("../../modules/blog/navType");
const { HttpException } = require("../../middleware/httpException.js")
class navTypeController {
    static async create(ctx) {
        let req = ctx.request.body;
        if (!req.icon) {
            throw new HttpException("400", "导航图标icon是必填字段", '');
        }
        if (!req.categoryName) {
            throw new HttpException("400", "导航名称categoryName是必填字段", '');
        }
        if (!req.leftNavUrl) {
            throw new HttpException("400", "导航路由leftNavUrl是必填字段", '');
        }
        const info = await navTypeModel.createnavType(req)
        ctx.body = {
            code: 200,
            msg: '创建导航成功',
            data: info
        }
    }
    static async update(ctx) {
        let req = ctx.request.body;
        if (!req.id) {
            throw new HttpException("400", "导航id不能为空", '');
        }
        const info = await navTypeModel.updatenavType(req)
        if (info[0] == 1) {
            ctx.body = {
                code: 200,
                msg: '更新导航成功',
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '更新导航失败',
                data: info
            }
        }
    }
    static async del(ctx) {
        let req = ctx.request.body;
        if (!req.id) {
            throw new HttpException("400", "导航id不能为空", '');
        }
        const info = await navTypeModel.delnavType(req.id)
        if (info == 1) {
            ctx.body = {
                code: 200,
                msg: '删除导航成功',
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '删除导航失败',
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
            await navTypeModel.bacthDel(req.batchList);
            ctx.body = {
                code: 200,
                msg: '批量删除导航成功',
            }
        } catch (err) {
            ctx.body = {
                code: 500,
                msg: '批量导航失败',
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
            let data = await navTypeModel.finAllnavType(req);
            ctx.body = {
                code: 200,
                msg: '查找所有导航成功',
                data
            }
        } catch (error) {
            ctx.body = {
                code: 500,
                msg: '查找所有导航失败',
                data: error
            }
        }
    }
}

module.exports = navTypeController;