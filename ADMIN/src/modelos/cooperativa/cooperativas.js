const cooperativa=(sequelize,type)=>{
    return sequelize.define("public.cooperatives",{
    id:{
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:type.STRING,
     state:{
        defaultValue:true,
     },
created_at:{
    type:'TIMESTAMP',
    defaultValue: type.literal('CURRENT_TIMESTAMP'),
     allowNull: false
   }
    
},{
    timestamps:false,
})
}


module.exports=cooperativa