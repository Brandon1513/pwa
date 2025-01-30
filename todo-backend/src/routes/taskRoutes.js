const express = require('express');
const { getAllTasks, addTask, updateTask, deleteTask, getTask } = require('../controllers/taskController');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

// Ruta para obtener todas las tareas
router.get('/', authenticate, getAllTasks);

// Ruta para crear una nueva tarea
router.post('/', authenticate, addTask);

// Ruta para actualizar una tarea específica
router.put('/:id', authenticate, updateTask);

// Ruta para eliminar una tarea específica
router.delete('/:id', authenticate, deleteTask);

module.exports = router;
