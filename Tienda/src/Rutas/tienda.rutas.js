const express=require('express')
const router=express.Router()

const {isLoggedIn}=require('../lib/auth')

const { mostrar, enviar, lista, traer, editar }=require('../Controladores/tienda.controlador')

router.use(isLoggedIn);

router.get('/agregar/', isLoggedIn, mostrar)
router.post('/agregar/', isLoggedIn, enviar)
router.get('/lista/:id', isLoggedIn, lista)
router.get('/editar/:id', isLoggedIn, traer) 
router.post('/editar/:id', isLoggedIn, editar)

module.exports=router