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

const createTask = async (task) => {
    const { title, status, user_id } = task;
    const [result] = await pool.query('INSERT INTO tasks (title, status, user_id) VALUES (?, ?, ?)', [title, status, user_id]);
    return { id: result.insertId, ...task };
};

const updateTask = async (taskId, task) => {
    const { title, status } = task;
    await pool.query('UPDATE tasks SET title = ?, status = ? WHERE id = ?', [title, status, taskId]);
    return { id: taskId, title, status };
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
