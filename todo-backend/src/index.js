const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE'],
    credentials: true,
}));
app.use(express.json());

// Rutas
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);
//registro de usuarios
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
//login
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

app.get('/api/ping', (req, res) => {
    res.status(200).send('pong');
});



// Inicio del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
