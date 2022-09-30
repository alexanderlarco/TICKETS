const socio=(sequelize,type)=>{
    return sequelize.define("socios",{
    id:{
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dni:type.STRING,
    typeDni:{
        type:type.ENUM,
        values:['Cedula','Pasaporte','RUC']
    },
    name:type.STRING,
    lastname:type.STRING,
    email:type.STRING,
    password:type.STRING,
    phone:type.STRING,
    id_cooperative:type.INTEGER,
    status:type.BOOLEAN
},
    {
    timestamps:true
})
}

module.exports=socio