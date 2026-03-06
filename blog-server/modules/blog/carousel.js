// 引入mysql的配置文件
const db = require('../../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;
const { Op } = require("sequelize");

// 引入数据表模型
const Carousel = Sequelize.import('../../schema/blog/carousel.js');
class CarouselModel {
    static async create(data) {
        return await Carousel.create({
            pic: data.pic, //
            url: data.url,
            title: data.title
        });
    }
    static async update(data) {
        const { title, pic, url } = data
        return await Carousel.update({
            title, pic, url
        }, {
            where: {
                id: data.id
            }
        });
    };
    static async del(id) {
        return await Carousel.destroy({
            where: {
                id
            }
        });
    }
    static async bacthDel(data) {
        return await Carousel.destroy({
            where: {
                id: data
            }
        })
    }
    static async detail(id) {
        return await Carousel.findOne({
            where: {
                id
            }
        });
    }
    static async finAll(data) {
        let offset = data.pageSize * (data.currentPage - 1);
        let limit = parseInt(data.pageSize);
        let where = {}
        if (data.startTime || data.endTime) {
            where["createdAt"] = {
                [Op.between]: [new Date(data.startTime), new Date(data.endTime)]
            }
        }
        return await Carousel.findAndCountAll({
            'order': [
                ['id', 'ASC'],
            ],
            where: where,
            offset,
            limit: limit,
            distinct: true

        })




    }

}

module.exports = CarouselModel;