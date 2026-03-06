const moment = require("moment");
module.exports = function(sequelize, DataTypes) {
    const BlogType = sequelize.define('works', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tag: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'tag'
        },
        coverBg: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'coverBg'
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'title'
        },
        des: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'des'
        },
        cont: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'cont'
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