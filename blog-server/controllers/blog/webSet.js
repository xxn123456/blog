const webSetModel = require("../../modules/blog/webSet");
const { HttpException } = require("../../middleware/httpException.js")
class webSetController {
    static async create(ctx) {
        let req = ctx.request.body;
        if (!req.name) {
            throw new HttpException("400", "配置名称name是必填字段", '');
        }
        if (!req.configs) {
            throw new HttpException("400", "配置项configs是必填字段", '');
        }
        const info = await webSetModel.createwebSet(req)
        ctx.response.status = 200;
        return ctx.body = {
            code: 200,
            msg: '创建配置项成功',
            data: info
        }
    }
    static async update(ctx) {
        let req = ctx.request.body;
        if (!req.id) {
            throw new HttpException("400", "配置id不能为空", '');
        }
        const info = await webSetModel.updatewebSet(req)
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
            throw new HttpException("400", "配置id不能为空", '');
        }
        const info = await webSetModel.delwebSet(req.id)
        if (info == 1) {
            ctx.body = {
                code: 200,
                msg: '删除配置项成功',
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '删除配置项失败'
            }
        }
    }

    static async batchDel(ctx) {
        let req = ctx.request.body;
        if (!req.batchList) {
            throw new HttpException("400", "batchList是必填字段", '');
        }
        try {
            let data = await webSetModel.bacthDel(req.batchList);
            ctx.body = {
                code: 200,
                webSet: data,
                msg: '批量删除配置项成功',
            }
        } catch (err) {
            ctx.body = {
                code: 500,
                msg: '批量删除配置项失败',
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
            let data = await webSetModel.finAllwebSet(req)
            ctx.body = {
                code: 200,
                msg: '查找所有配置成功',
                data
            }
        } catch (error) {
            ctx.body = {
                code: 500,
                msg: '查找所有配置失败',
                data: error
            }
        }
    }

    static async findOne(ctx) {
        let req = ctx.request.body;
        if (!req.id) {
            throw new HttpException("400", "配置id不能为空", '');
        }
        let data = await webSetModel.detail(req.id);
        ctx.body = {
            code: 200,
            msg: '查找配置详情成功',
            data
        }


    }

}

module.exports = webSetController;