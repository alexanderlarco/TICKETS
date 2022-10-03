const express = require('express');
const root = express.Router();

const { approved,getIndex }=require("../controladores/ticket.controller")

root.get('/create/:id', approved);
root.get('/:id', getIndex);

module.exports=root