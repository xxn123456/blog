const roleModel = require("../../modules/blog/role");
const { HttpException } = require("../../middleware/httpException.js")
class roleController {
    // 创建角色
    static async create(ctx) {
        let req = ctx.request.body;
        if (!req.name) {
            throw new HttpException("400", "角色名称name是必填字段", '');
        }
        if (!req.routers) {
            throw new HttpException("400", "角色路由routers是必填字段", '');
        }
        if (!req.permission_btns) {
            throw new HttpException("400", "角色按钮权限permission_btns是必填字段", '');
        }
        const info = await roleModel.createRole(req)
        ctx.body = {
            code: 200,
            msg: '创建角色成功',
            data: info
        }
    }
    // 更新角色
    static async update(ctx) {
        let req = ctx.request.body;
        if (!req.id) {
            throw new HttpException("400", "角色id不能为空", '');
        }
        const info = await roleModel.updateRole(req)
        if (info[0] == 1) {
            ctx.body = {
                code: 200,
                msg: '更新角色成功',
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '更新角色失败',
                data: info
            }
        }
    }
    // 删除角色
    static async del(ctx) {
        let req = ctx.request.body;
        if (!req.id) {
            throw new HttpException("400", "角色id不能为空", '');
        }
        const info = await roleModel.delRole(req.id)
        if (info == 1) {
            ctx.body = {
                code: 200,
                msg: '删除角色成功',
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '删除角色失败',
                data: info
            }
        }
    }

    // 批量删除操作
    static async batchDel(ctx) {
        let req = ctx.request.body;
        if (!req.batchList) {
            throw new HttpException("400", "batchList是必填字段", '');
        }
        try {
            await roleModel.bacthDel(req.batchList)
            ctx.body = {
                code: 200,
                msg: '批量删除角色成功',
            }
        } catch (err) {
            ctx.body = {
                code: 500,
                msg: '批量删除角色失败',
                data: err
            }
        }

    }

    // 查询所有分页
    static async findAll(ctx) {
        let req = ctx.request.body;
        try {
            if (!req.currentPage) {
                req.currentPage = 1
            }
            if (!req.pageSize) {
                req.pageSize = 10
            }
            let data = await roleModel.finAllRole(req);
            ctx.body = {
                code: 200,
                msg: '查找所有角色成功',
                data
            }
        } catch (error) {
            ctx.body = {
                code: 500,
                msg: '查找所有角色失败',
                data: error
            }
        }
    }

    // 查找角色详情
    static async findOne(ctx) {
        let req = ctx.request.body;
        let data = await roleModel.detail(req.id);
        ctx.body = {
            code: 200,
            msg: '查找配置详情成功',
            data
        }
    }

}

module.exports = roleController;