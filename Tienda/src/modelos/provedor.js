const provedor = (sequelize, type)=>{
    return sequelize.define('provedores', {
        idProvedores:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        NombreProveedor: type.STRING,
        Direccion: type.STRING,
        Celular: type.STRING(10),
        Telefono: type.STRING(10),
        //fechaVisita: type.STRING,
        Estado: type.BOOLEAN,
        creacionProvedores: type.STRING,
        actualizacionProvedores:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    },{
        timestamps: false,
    })
}

module.exports = provedor