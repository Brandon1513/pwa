const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Busca al usuario en la base de datos
        const user = await userModel.getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Verifica la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Genera el token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email }, // Payload
            process.env.JWT_SECRET,           // Clave secreta
            { expiresIn: '1h' }               // Opciones del token
        );

        res.json({ token });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { login };

