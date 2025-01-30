const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');// Encriptar contraseñas

//crear usuario

const registerUser = async (req, res) => {
    const {username,email,password} = req.body;

    //validar que los campos no esten vacios
    if(!username || !email || !password){
        return res.status(400).json({message: 'Por favor llena todos los campos'});
    }
    try{
        //encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        //crear usuario bd
        const newUser = await userModel.createUser({
            username,
            email,
            password: hashedPassword
        });
        res.status(201).json(newUser);
    } catch (error){
        if(error.code === 'ER_DUP_ENTRY'){
            return res.status(400).json({message: 'El usuario ya existe o el correo ya esta registrado'});
        }
        res.status(500).json({message: 'Error al registrar el usuario'});
    }

};

module.exports = {registerUser};