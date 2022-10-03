const express=require('express')
const router=express.Router()


router.get('/inicio',(req,res)=>{
    res.render('Encomiendas/inicio')
})


router.get('/listado',(req,res)=>{
    res.render('Encomiendas/listado')
})

router.get('/historial',(req,res)=>{
    res.render('Encomiendas/historial')
})

router.get('/despacho',(req,res)=>{
    res.render('Encomiendas/despacho')
})

router.get('/desembarque',(req,res)=>{
    res.render('Encomiendas/desembarque')
})

router.get('/entrega',(req,res)=>{
    res.render('Encomiendas/entrega')
})

module.exports=router