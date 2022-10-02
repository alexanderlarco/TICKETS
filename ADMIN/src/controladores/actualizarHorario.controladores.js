const actualizacionHorario={}


const { STRING } = require('sequelize');
const orm = require('../configuracionBaseDatos/baseDatos.orm');
const sql = require('../configuracionBaseDatos/baseDatos.sql');

actualizacionHorario.mostrar=async(req,res)=>{
    const id=req.params.id
    const lista =await sql.query("SELECT*FROM times_buses where id=?",[id]);
    res.render('horario/actualizar',{lista});// mismo nombre de la constante 
}

   
actualizacionHorario.actualizar=async(req,res)=>{
    const id=req.params.id
    const {hour_start,hour_finalize} = req.body;

    console.log("PARAMETROS DE LLEGADA",req.body)
    const actualizacion={
        hour_start,
        hour_finalize

    };
    await orm.horario.findOne({where: {id:id}})
    .then(horario=>{
        horario.update(actualizacion);
        req.flash("succes","Se actualizo");
        res.redirect("/horario/editar/"+id)
    })

}

actualizacionHorario.renderHorario=async(req,res)=>{
const id=req.params.id;
const horario =await sql.query(
    "SELECT*FROM times_buses"
);
res.render("horario/editar",{horario});
};





module.exports=actualizacionHorario

