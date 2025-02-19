const RecordModel = require('../../modules/job/record.js')


class RecordController {


    // 创建文章
    static async create(ctx) {


        let req = ctx.request.body;
        try {

            const data = await RecordModel.create(req);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '创建文章成功',
                data
            }
        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                msg: '创建文章失败',
                data: err
            }

        }


    }

    // 修改文章

    static async update(ctx) {
        let req = ctx.request.body;
        try {

            let data = await RecordModel.update(req);



            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '修改文章成功',
                data
            }
        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                msg: '修改文章失败',
                data: err
            }

        }


    }

    // 删除文章

    static async del(ctx) {
        let req = ctx.request.body;
        try {

            const data = await RecordModel.del(req.id);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '删除文章成功',
                data
            }
        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                msg: '删除文章失败',
                data: err
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
                const data = await RecordModel.bacthDel(req.batchList);
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



        try {
            let data = await RecordModel.findAll(req);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查找文章成功',
                data
            }
        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                msg: '查找文章失败',
                data: err
            }

        }


    }

    // 查找文章详情

    static async findOne(ctx) {
        let req = ctx.request.body;
        try {
            let data = await RecordModel.detail(req.id);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查找文章详情成功',
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                msg: '查找文章详情失败',
                data: err
            }

        }


    }

}
module.exports = RecordController