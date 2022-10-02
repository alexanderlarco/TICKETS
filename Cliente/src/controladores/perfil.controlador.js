const perfil = {}
const sql = require("../configuracionBaseDatos/baseDatos.sql")
const orm = require("../configuracionBaseDatos/baseDatos.orm")

perfil.getClient = async(req, res)=>{
    const client = await orm.client.findOne({where:{
        email: req.user.email
    }}).then(res =>{
        return res.dataValues
    });
    res.render('perfil/perfil', {client});
}

perfil.update = async(req, res)=>{
    const id = req.params.id
    const {typeDni, dni, name, lastName, phone} = req.body
    const data={
        typeDni, 
        dni, 
        name, 
        lastName, 
        phone  
    }
    await orm.client.update(data,{ where: { id: id } })
    .then(() => {
        req.flash('success', 'Se añadio Correctamente');
        res.redirect('/dashboard');
    })
}

module.exports = perfil