const moment = require("moment");
module.exports = function(sequelize, DataTypes) {
    const BlogType = sequelize.define('webSet', {
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
        configs: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'configs'
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