const socio={}

const orm = require('../configuracionBaseDatos/baseDatos.orm');
const sql = require('../configuracionBaseDatos/baseDatos.sql');

socio.mostrar=async(req,res)=>{
    const ids=req.user.id
    const dni=await sql.query("SELECT*FROM socios where id=?",[ids])
    const name =await sql.query("SELECT*FROM socios where id=?",[ids])
    const lastName =await sql.query("SELECT*FROM socios where id=?",[ids])
    const address =await sql.query("SELECT*FROM socios where id=?",[ids])
    const phone =await sql.query("SELECT*FROM socios where id=?",[ids])
    const id_cooperative =await sql.query("SELECT*FROM socios where id=?",[ids])
    const status =await sql.query("SELECT*FROM socios where id=?",[ids])
    
