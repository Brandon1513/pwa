const taskModel = require('../models/taskModel');
const pool = require('../config/db');
// Obtener todas las tareas por ID de usuario
const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskModel.getAllTasksByUserId(req.user.id);
        res.json(tasks);
    } catch (error) {
        console.error('Error al obtener las tareas:', error.message);
        res.status(500).json({ message: 'Error al obtener tareas' });
    }
};

// Obtener una tarea por ID
const getTask = async (req, res) => {
    try {
        const task = await taskModel.getTaskByIdAndUserId(req.params.id, req.user.id);
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada o no pertenece al usuario' });
        }
        res.json(task);
    } catch (error) {
        console.error('Error al obtener la tarea:', error);
        res.status(500).json({ message: 'Error al obtener la tarea' });
    }
};

// Agregar una nueva tarea
const addTask = async (req, res) => {
    const { title, description, status } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'El título es obligatorio' });
    }

    try {
        const newTask = await taskModel.createTask({
            title,
            description: description || "No especificada",
            status: status || "Pendiente",
            user_id: req.user.id
        });
        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la tarea' });
    }
};


// Actualizar una tarea existente
const updateTask = async (req, res) => {
    const { title, description, status } = req.body;
    const taskId = req.params.id;
    const userId = req.user.id;

    console.log("Recibiendo datos en backend:", { taskId, userId, title, description, status });

    try {
        const [result] = await pool.query(
            'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?',
            [title, description || null, status, taskId, userId]
        );

        console.log("Resultado SQL:", result);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Tarea no encontrada o no pertenece al usuario' });
        }

        res.json({ id: taskId, title, description, status });
    } catch (error) {
        console.error("⚠️ Error en el servidor:", error);
        res.status(500).json({ message: 'Error al actualizar la tarea', error: error.message });
    }



};






// Eliminar una tarea
const deleteTask = async (req, res) => {
    try {
        const task = await taskModel.getTaskByIdAndUserId(req.params.id, req.user.id);

        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada o no pertenece al usuario' });
        }

        await taskModel.deleteTask(req.params.id);
        res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        res.status(500).json({ message: 'Error al eliminar la tarea' });
    }
};

module.exports = {
    getAllTasks,
    getTask,
    addTask,
    updateTask,
    deleteTask,
};
