const horario=(sequelize,type)=>{
    return sequelize.define("times_buses",{
    id:{
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    hour_start:type.DATE,
    hour_finalize:type.DATE,
    capacity:type.INTEGER,
    id_driver:type.INTEGER,
    id_bus:type.INTEGER,
    id_root:type.INTEGER,
    
},
    {
    timestamps:true
})
}

module.exports=horario