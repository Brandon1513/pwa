const pool = require('../config/db');


const getAllTasksByUserId = async (userId) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tasks WHERE user_id = ?', [userId]);
        return rows;
    } catch (error) {
        console.error('Error al obtener tareas:', error.message);
        throw error;
    }
};

const getTaskByIdAndUserId = async (taskId, userId) => {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [taskId, userId]);
    return rows[0];
};

const createTask = async ({ title, description, status, user_id }) => {
    const [result] = await pool.query(
        'INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)',
        [title, description, status, user_id]
    );
    return { id: result.insertId, title, description, status, user_id };
};


const updateTask = async (taskId, task) => {
    const { title, description, status } = task;

    // Ejecutar la consulta SQL con descripción incluida
    await pool.query(
        'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
        [title, description || null, status, taskId]
    );

    return { id: taskId, title, description, status };
};


const deleteTask = async (taskId) => {
    await pool.query('DELETE FROM tasks WHERE id = ?', [taskId]);
};

module.exports = {
    getAllTasksByUserId,
    getTaskByIdAndUserId,
    createTask,
    updateTask,
    deleteTask,
};
