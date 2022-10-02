const socio=(sequelize,type)=>{
    return sequelize.define("socios",{
    id:{
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dni:type.STRING,
    name:type.STRING,
    lastname:type.STRING,
    email:type.STRING,
    password:type.STRING,
    phone:type.STRING,
    status:type.BOOLEAN
},
    {
    timestamps:true
})
}

module.exports=socio