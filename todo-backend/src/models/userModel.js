const pool = require('../config/db');

// Crear usuario
const createUser = async (user) => {
    const { username, email, password } = user;
    const [result] = await pool.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, password]
    );
    return { id: result.insertId, username, email };
};

// Obtener usuario por email
const getUserByEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

// Verificar si un usuario existe
const userExists = async (email) => {
    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM users WHERE email = ?', [email]);
    return rows[0].count > 0;
};

// Obtener usuario por ID
const getUserById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
};

// Actualizar usuario
const updateUser = async (id, updates) => {
    const fields = [];
    const values = [];

    for (const key in updates) {
        fields.push(`${key} = ?`);
        values.push(updates[key]);
    }

    values.push(id);

    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    const [result] = await pool.query(query, values);

    return result.affectedRows > 0;
};

// Eliminar usuario
const deleteUser = async (id) => {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
};

module.exports = {
    createUser,
    getUserByEmail,
    userExists,
    getUserById,
    updateUser,
    deleteUser,
};
