const Coop = {};

const sql = require('../configuracionBaseDatos/baseDatos.sql');


Coop.getAll = async (req, res) => {
    //const lista = await sql.query('SELECT * FROM Tiendas')
    const coop = await sql.query('SELECT * FROM cooperatives WHERE state = 1');
    const user = req.user || null;
    const coops = coop.map((cp)=>{
        return {...cp,user}
    })
    res.render('coop/list', { coops ,user });
}

Coop.searchCoop = async (req,res) =>{
    const search = req.query.name;
    const user = req.user || null
    const coop = await sql.query(`SELECT * FROM cooperatives WHERE name LIKE '%${search}%'`);
    const coops = coop.map((cp)=>{
        return {...cp,user}
    })
    res.render('coop/list', { coops ,user, search });

}

module.exports = Coop;
