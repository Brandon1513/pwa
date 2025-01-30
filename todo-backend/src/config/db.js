const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
   
});

// Probar la conexión al pool
(async () => {
    try {
        const connection = await pool.getConnection(); // Obtén una conexión
        console.log('Conexión al pool establecida correctamente');
        connection.release(); // Libera la conexión
    } catch (error) {
        console.error('Error de conexión al pool:', error.message);
    }
})();

module.exports = pool;