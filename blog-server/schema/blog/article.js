const moment = require("moment");
module.exports = function (sequelize, DataTypes) {
    const Blog = sequelize.define('article', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'title'
        },
        recommend: {
            type: DataTypes.INTEGER,
            field: 'recommend'
        },
        book: {
            type: DataTypes.STRING,
            field: 'book'

        },
        visitNum: {
            type: DataTypes.INTEGER,
            field: 'visitNum',
            defaultValue: 0
        },
        userId: {
            type: DataTypes.INTEGER,
            field: 'userId'
        },
        url: {
            type: DataTypes.STRING,
            field: 'url'
        },
        content: {
            type: DataTypes.TEXT,
            field: 'content'
        },
        userId: {
            type: DataTypes.INTEGER,
            field: 'userId',
            unique: true
        },
        //文章类别
        navTypeId: {
            type: DataTypes.STRING,
            field: 'navTypeId',
            defaultValue: '0',
        },
        // 创建时间
        createdAt: {
            type: DataTypes.DATE,
            get() {
                return this.getDataValue('createdAt') ? moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss') : null;
            }
        },
        // 更新时间
        updatedAt: {
            type: DataTypes.DATE,
            get() {
                return this.getDataValue('updatedAt') ? moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss') : null;
            }
        }
    }, {
        /**
         * 如果为true，则表示名称和model相同，即user
         * 如果为fasle，mysql创建的表名称会是复数，即users
         * 如果指定的表名称本身就是复数，则形式不变
         */
        freezeTableName: true
    });

    return Blog

}