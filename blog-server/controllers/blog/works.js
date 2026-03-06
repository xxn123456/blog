const worksModel = require("../../modules/blog/works");
const { HttpException } = require("../../middleware/httpException.js")
class worksController {
    static async create(ctx) {
        let req = ctx.request.body;
        if (!req.title) {
            throw new HttpException("400", "作品标题title是必填字段", '');
        }
        const info = await worksModel.createworks(req)
        ctx.body = {
            code: 200,
            msg: '创建作品成功',
            data: info
        }
    }
    static async update(ctx) {
        let req = ctx.request.body;
        if (!req.id) {
            throw new HttpException("400", "作品id不能为空", '');
        }
        const info = await worksModel.updateworks(req)
        console.log("info", info)
        if (info[0] == 1) {
            ctx.body = {
                code: 200,
                msg: '更新作品成功',
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '更新作品失败',
                data: info
            }
        }
    }
    static async del(ctx) {
        let req = ctx.request.body;
        if (!req.id) {
            throw new HttpException("400", "作品id不能为空", '');
        }
        const info = await worksModel.delworks(req.id)
        if (info == 1) {
            ctx.body = {
                code: 200,
                msg: '更新作品成功',
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '更新作品失败',
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
            let data = await worksModel.bacthDel(req.batchList);
            ctx.body = {
                code: 200,
                data,
                msg: '批量删除作品成功',
            }
        } catch (err) {
            ctx.body = {
                code: 500,
                msg: '批量删除作品失败',
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
            let data = await worksModel.finAllworks(req)
            ctx.body = {
                code: 200,
                msg: '查找所有作品成功',
                data
            }
        } catch (error) {
            ctx.body = {
                code: 500,
                msg: '查找所有作品失败',
                data: error
            }
        }
    }
    static async findOne(ctx) {
        let req = ctx.request.body;
        if (!req.id) {
            throw new HttpException("400", "作品id不能为空", '');
        }
        let data = await worksModel.detail(req.id);
        ctx.body = {
            code: 200,
            msg: '查找作品详情成功',
            data
        }


    }

}

module.exports = worksController;