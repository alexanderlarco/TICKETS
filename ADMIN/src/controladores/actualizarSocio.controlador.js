const actualizacionSocio={}


const orm = require('../configuracionBaseDatos/baseDatos.orm');
const sql = require('../configuracionBaseDatos/baseDatos.sql');

actualizacionSocio.mostrar=async(req,res)=>{
    const id=req.params.id
    const lista =await sql.query("SELECT*FROM socios where id=?",[id]);
    res.render('socios/actualizar',{lista});// mismo nombre de la constante 
}


   
actualizacionSocio.actualizar=async(req,res)=>{
    const id=req.params.id
    const {name,dni,status} = req.body;
    const actualizacion={
        name,
        dni,
        status
    };
    await orm.socio.findOne({where: {id:id}})
    .then(socios=>{
        socios.update(actualizacion);
        req.flash("succes","Se actualizo");
        res.redirect("/Socio/editar/"+id)
    })

}

actualizacionSocio.renderSocio=async(req,res)=>{
const id=req.params.id;
const socios =await sql.query(
    "SELECT*FROM socios"
);
res.render("socios/editar",{socios});
};


module.exports=actualizacionSocio
