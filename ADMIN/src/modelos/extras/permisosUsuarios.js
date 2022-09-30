const permisosUsuairos = (sequelize, type) =>{
    return sequelize.define('permisosUsuairos', {
        idPermisosUsuairos: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombrePermisosUsuairos: type.STRING,
        creacionPermisosUsuairos: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionPermisosUsuairos: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = permisosUsuairos