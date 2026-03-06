
const CarouselModel = require("../../modules/blog/carousel.js");
const { HttpException } = require("../../middleware/httpException.js")
class CarouselController {
    static async create(ctx) {
        let req = ctx.request.body;
        if (!req.pic) {
            throw new HttpException("400", "图片路径pic是必填字段", '');
        }
        let maxNum = await CarouselModel.finAll();
        if (maxNum.count > 5) {
            ctx.body = {
                code: "-1",
                msg: '超过轮播图最大设置-5',
            }

        } else {
            const info = await CarouselModel.create(req);
            ctx.body = {
                code: 200,
                msg: '创建轮播成功',
                data: info,
            }

        }
    }

    static async update(ctx) {
        let req = ctx.request.body;
        if (!req.id) {
            throw new HttpException("400", "轮播id不能为空", '');
        }
        const info = await CarouselModel.update(req);
        if (info[0] == 1) {
            ctx.body = {
                code: 200,
                msg: '更新轮播成功',
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '更新轮播失败',
                data: info
            }
        }

    }
    static async del(ctx) {
        let req = ctx.request.body;
        if (!req.id) {
            throw new HttpException("400", "轮播id不能为空", '');
        }
        const info = await CarouselModel.del(req.id);
        if (info == 1) {
            ctx.body = {
                code: 200,
                msg: '更新轮播成功',
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '更新轮播失败',
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
            const info = await CarouselModel.bacthDel(req.batchList);
            ctx.body = {
                code: 200,
                msg: '批量删除轮播成功',
                data: info,
            }
        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                msg: '批量删除轮播失败',
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
            let data = await CarouselModel.finAll(req);
            ctx.body = {
                code: 200,
                msg: '查找所有轮播成功',
                data
            }
        } catch (error) {
            ctx.body = {
                code: 500,
                msg: '查找所有轮播失败',
                data: error
            }
        }
    }
}

module.exports = CarouselController;