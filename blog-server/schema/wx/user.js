
const moment = require("moment");
module.exports = function(sequelize, DataTypes) {
    const user = sequelize.define(
        'user', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'userName'
            },
            avatarUrl:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'avatarUrl'
            },
            openid:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'openid'
            },
            session_key:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'session_key'
            },
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
        }
    )


    return user
}
