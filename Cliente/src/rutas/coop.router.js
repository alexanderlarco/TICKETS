const express = require('express');
const router = express.Router();

const { getAll, searchCoop } = require('../controladores/coop.controller');

router.get('/', getAll)
router.get('/search', searchCoop)

module.exports = router