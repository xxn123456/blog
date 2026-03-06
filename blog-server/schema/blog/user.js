
const moment = require("moment");
module.exports = function(sequelize, DataTypes) {
    const user = sequelize.define(
        'user', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'username'
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'password'
            },
            avatar:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'avatar'
            },
            email:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'email'
            },
            veryCode:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'veryCode'
            },
            role_id:{
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'role_id'
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
