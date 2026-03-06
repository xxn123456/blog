const moment = require("moment");
module.exports = function(sequelize, DataTypes) {
    const BlogType = sequelize.define('role', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'name'
        },
        routers: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'routers'
        },
        permission_btns: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'permission_btns'
        },
        // 创建时间
        createdAt: {
            type: DataTypes.DATE,
            get () {
                return this.getDataValue('createdAt') ? moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss') : null;
              }
        },
        // 更新时间
        updatedAt: {
            type: DataTypes.DATE,
            get () {
                return this.getDataValue('updatedAt') ? moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss') : null;
              }
        }
    }, {
        freezeTableName: true
    });
    return BlogType
}