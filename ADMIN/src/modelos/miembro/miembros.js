
const miembros=(sequelize,type)=>{
    return sequelize.define("miembros",{
    id:{
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
   name:type.STRING,
   lastname:type.STRING,
   email:type.STRING,
   CI:type.INTEGER,
   fk_cooperative:type.INTEGER,
   pass:type.INTEGER,
   rol:type.STRING,
   permissions: type.JSON,
   url_img:type.STRING,
   state:{
    type:type.BOOLEAN,
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


module.exports=miembros
