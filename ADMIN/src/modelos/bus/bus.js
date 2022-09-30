const bus=(sequelize,type)=>{
    return sequelize.define("buses",{
    id:{
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    plaque:type.STRING(7),
    unit_number:type.INTEGER,
    capacity:type.INTEGER,
    id_driver:type.INTEGER,
    id_member:type.INTEGER,
    state:{
        type:type.BOOLEAN,
        defaultValue:true
    }
},
    {
    timestamps:true
})
}

module.exports=bus