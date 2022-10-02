const horario=(sequelize,type)=>{
    return sequelize.define("times_buses",{
    id:{
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    hour_start:type.DATE,
    hour_finalize:type.DATE
    
},
    {
    timestamps:true
})
}

module.exports=horario