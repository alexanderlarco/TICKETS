const actualizacionBus={}

const orm = require('../configuracionBaseDatos/baseDatos.orm');
const sql = require('../configuracionBaseDatos/baseDatos.sql');

actualizacionBus.mostrar=async(req,res)=>{
    const id=req.params.id
    const listaBus =await sql.query("SELECT*FROM buses where id=?",[id]);
    res.render('Bus/actualizar',{listaBus});// mismo nombre de la constante 
}


actualizacionBus.actualizar=async(req,res)=>{
    const id=req.params.id
    const {capacity,unit_number,state} = req.body;
    const actualizacion={
        capacity,
        unit_number,
        state
    };
    await orm.bus.findOne({where: {id:id}})
    .then(buses=>{
        buses.update(actualizacion);
        req.flash("succes","Se actualizo");
        res.redirect("/Bus/editar/"+id)
    })

}

actualizacionBus.renderBus=async(req,res)=>{
const id=req.params.id;
const buses =await sql.query(
    "SELECT*FROM buses "
);
res.render("Bus/editar",{buses});
};


module.exports= actualizacionBus