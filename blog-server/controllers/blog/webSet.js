const webSetModel = require("../../modules/blog/webSet");

class webSetController {
    /**
     * 创建文章
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.name && req.configs) {
             //创建文章模型
             const data = await webSetModel.createwebSet(req);
             if(data[0]==1){
                ctx.response.status = 200;
                return ctx.body = {
                        code: 200,
                        msg: '创建配置项成功',
                    }
             }else{
                ctx.response.status = 200;
                return ctx.body = {
                    code: 500,
                    msg: '创建配置项失败',
                }
             }
           
        }
        ctx.response.status = 400;
    }
    static async updata(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.id) {
            let data = webSetModel.upDatawebSet(req);
            if(data[0]==1){
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '更新配置项成功',
                }
            }else{
                ctx.response.status = 500;
                ctx.body = {
                    code: 500,
                    msg: '更新配置项失败'
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

    // 删除配置项

    static async del(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.id) {
            let data = await webSetModel.delwebSet(req.id)
            if(data[0]==1){
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '删除配置项成功',
                }
            }else{
                ctx.response.status = 500;
                ctx.body = {
                    code: 500,
                    msg: '删除配置项失败'
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

    // 批量删除操作

    static async batchDel(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.batchList) {
           
            try {
                //创建文章模型
                let data=await webSetModel.bacthDel(req.batchList);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    webSet:data,
                    msg: '批量删除配置项成功',
                }
            } catch (err) {
                ctx.response.status = 500;
                ctx.body = {
                    code: 500,
                    msg: '批量删除配置项失败',
                    data:err
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

    // 查询所有分页

    static async findAll(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.currentPage && req.pageSize) {
            let data = await webSetModel.finAllwebSet(req);
            ctx.response.status = 200;
            return ctx.body = {
                code: 200,
                data
            }
        }
        ctx.response.status = 400;
    }

      // 查找文章详情

    static async findOne(ctx) {
        let req = ctx.request.body;
        let data = await webSetModel.detail(req.id);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: '查找配置详情成功',
            data
        }


    }

}

module.exports = webSetController;