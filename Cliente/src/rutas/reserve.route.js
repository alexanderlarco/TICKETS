const express = require('express');
const root = express.Router();

const { getIndex, getNewView, getTimeAvailable, create}=require("../controladores/reserve.controller")

root.get("/",getIndex)
root.get("/new",getNewView);

root.post('/availableTime', getTimeAvailable);
root.post('/create', create);

module.exports=root