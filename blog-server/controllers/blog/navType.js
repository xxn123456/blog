const navTypeModel = require("../../modules/blog/navType");

class navTypeController {
    /**
     * 创建文章
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.categoryName && req.categoryCreater) {
             //创建文章模型
             const data = await navTypeModel.createnavType(req);
             if(data[0]==1){
                ctx.response.status = 200;
                return ctx.body = {
                        code: 200,
                        msg: '创建文章类别成功',
                    }
             }else{
                ctx.response.status = 200;
                return ctx.body = {
                    code: 500,
                    msg: '创建文章类别失败',
                }
             }
           
        }
        ctx.response.status = 400;
    }
    static async updata(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.id) {
            let data = navTypeModel.upDatanavType(req);
            if(data[0]==1){
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '更新文章类别成功',
                }
            }else{
                ctx.response.status = 500;
                ctx.body = {
                    code: 500,
                    msg: '更新文章类别失败'
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

    // 删除文章类别

    static async del(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.id) {
            let data = await navTypeModel.delnavType(req.id)
            if(data[0]==1){
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '删除文章类别成功',
                }
            }else{
                ctx.response.status = 500;
                ctx.body = {
                    code: 500,
                    msg: '删除文章类别失败'
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
                let data=await navTypeModel.bacthDel(req.batchList);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    navType:data,
                    msg: '批量删除文章类别成功',
                }
            } catch (err) {
                ctx.response.status = 500;
                ctx.body = {
                    code: 500,
                    msg: '批量删除文章类别失败',
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
            let data = await navTypeModel.finAllnavType(req);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                data
            }
        } else {
            ctx.response.status = 500;
            ctx.body = {
                code: 200,
                msg: '参数不齐全'
            }
        }
    }
}

module.exports = navTypeController;