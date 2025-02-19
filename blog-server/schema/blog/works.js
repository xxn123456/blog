const moment = require("moment");
module.exports = function(sequelize, DataTypes) {
    const BlogType = sequelize.define('works', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'height'
        },
        cardType: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'cardType'
        },
        tag: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'tag'
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
        coverBg: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'coverBg'
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
                // console.log(this.getDataValue('created_time'))
                return this.getDataValue('createdAt') ? moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss') : null;
              }
        },
        // 更新时间
        updatedAt: {
            type: DataTypes.DATE,
            get () {
                // console.log(this.getDataValue('created_time'))
                return this.getDataValue('updatedAt') ? moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss') : null;
              }
        }
    }, {
        freezeTableName: true
    });
    return BlogType
}