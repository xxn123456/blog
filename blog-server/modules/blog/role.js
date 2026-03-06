// 引入mysql的配置文件
const db = require('../../config/db');
// 引入sequelize对象
const Sequelize = db.sequelize;
const { Op } = require("sequelize");

// 引入数据表模型
const Role = Sequelize.import('../../schema/blog/role.js');

class RoleModel {
    // 创建角色
    static async createRole(data) {
        return await Role.create({
            name: data.name, //标题
            routers:data.routers,
            permission_btns: data.permission_btns
        });
    }

    // 更新角色
    static async updateRole(data) {
        const {name,routers,permission_btns} = data
        return await Role.update({name,routers,permission_btns}, {
            where: {
                id: data.id
            }
        });
    }
    // 删除角色
    static async delRole(id) {
        return await Role.destroy({
            where: {
                id
            }
        });
    }

    // 角色批量删除
    static async bacthDel(data) {
        return await Role.destroy({
            where: {
                id: data
            }
        })
    }
    // 查询角色详情
    static async detail(id) {
        return await Role.findOne({
            where: {
                id
            }
        });
    }
    // 角色分页查询
    static async finAllRole(data) {
        let offset = data.pageSize * (data.currentPage - 1);
        let limit = parseInt(data.pageSize);
        let where = {};
        if (data.name) {
            where["name"] = data.name
        }
        if (data.startTime || data.endTime) {
            where["createdAt"] = {
                [Op.between]: [new Date(data.startTime), new Date(data.endTime)]
            }
        }
        return await Role.findAndCountAll({
            where: where,
            order: [
                ['id', 'ASC'],
            ],
            offset,
            limit: limit,
            distinct:true
        })
    }

}

module.exports = RoleModel;