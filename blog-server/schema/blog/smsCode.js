module.exports = function(sequelize, DataTypes) {
    const smsCode = sequelize.define(
        'smsCode', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            email:{
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'email'
            },
            veryCode:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'veryCode'
            }
           
    }, {
            timestamps: false,
            freezeTableName: true
        }
    )
    return smsCode
}
