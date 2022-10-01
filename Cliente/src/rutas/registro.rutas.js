const express = require('express');
const router = express.Router();

const { renderSignUp, signUp, renderSignIn, signIn, logOut,  } = require('../controladores/registro.controlador')

// SIGNUP
router.get('/register', renderSignUp);
router.post('/register', signUp);

// SINGIN
router.get('/login', renderSignIn);
router.post('/login', signIn);

router.get('/logout', logOut);

module.exports = router;