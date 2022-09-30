const cooperativa=(sequelize,type)=>{
    return sequelize.define("cooperativas",{
    id:{
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:type.STRING,
     state:{
        type:type.BOOLEAN,
        defaultValue:true
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