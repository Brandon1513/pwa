const express = require('express');
const {registerUser} = require('../controllers/userController');

const router = express.Router();

//ruta para registrar usuario
router.post('/register', registerUser);

module.exports = router;