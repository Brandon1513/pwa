import React, { useState, useEffect } from 'react';
import { 
    Container, Box, Typography, TextField, Button, List, 
    ListItem, ListItemText, ListItemSecondaryAction, IconButton, 
    Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import axios from 'axios';

// Definición de la interfaz para una tarea
interface Task {
    id: number;
    title: string;
    description?: string;
    status: string;
}

const Dashboard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]); // Estado para las tareas
    const [taskTitle, setTaskTitle] = useState(''); // Estado para el título de la nueva tarea
    const [taskDescription, setTaskDescription] = useState(''); // Estado para la descripción de la nueva tarea
    const [taskStatus, setTaskStatus] = useState('Pendiente'); // Estado para el estado de la nueva tarea
    const [errorMessage, setErrorMessage] = useState(''); // Estado para mensajes de error
    const [editTask, setEditTask] = useState<Task | null>(null); // Estado para editar una tarea
    const [open, setOpen] = useState(false); // Estado para abrir y cerrar el formulario de edición

    // Función para obtener tareas específicas del usuario desde el backend
    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setErrorMessage('Usuario no autenticado. Por favor, inicie sesión.');
                return;
            }

            const response = await axios.get('http://localhost:5000/api/tasks', {
                headers: {
                    Authorization: token,
                },
            });

            setTasks(response.data);
            setErrorMessage('');
        } catch (error: any) {
            console.error('Error al obtener las tareas:', error);
            setErrorMessage('Error al obtener las tareas. Por favor, intente de nuevo.');
        }
    };

    // Función para agregar una nueva tarea
    const handleAddTask = async () => {
        if (taskTitle.trim() === '') {
            setErrorMessage('El título de la tarea no puede estar vacío.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setErrorMessage('Usuario no autenticado. Por favor, inicie sesión.');
                return;
            }

            const response = await axios.post(
                'http://localhost:5000/api/tasks',
                { title: taskTitle, description: taskDescription, status: 'Pendiente' },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            setTasks([...tasks, response.data]);
            setTaskTitle('');
            setTaskDescription('');

        setTaskStatus('Pendiente');
            setErrorMessage('');
        } catch (error: any) {
            console.error('Error al agregar tarea:', error);
            setErrorMessage(error.response?.data?.message || 'Error al agregar tarea');
        }
    };

    // Función para abrir el formulario de edición
    const handleEditClick = (task: Task) => {
        setEditTask(task);
        setTaskTitle(task.title);
        setTaskDescription(task.description || '');
        setTaskStatus(task.status);
        setOpen(true);
    };

    // Función para actualizar una tarea
    const handleUpdateTask = async () => {
        if (!editTask) return;
    
        console.log("Enviando datos al backend:", {
            title: taskTitle,
            description: taskDescription,
            status: taskStatus,
        });
    
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setErrorMessage('Usuario no autenticado. Por favor, inicie sesión.');
                return;
            }
    
            const response = await axios.put(
                `http://localhost:5000/api/tasks/${editTask.id}`,
                { title: taskTitle, description: taskDescription, status: taskStatus },
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json'
                    },
                }
            );
    
            console.log("Respuesta del backend:", response.data);
            setTasks(tasks.map((task) => (task.id === editTask.id ? response.data : task)));
            setOpen(false);
        } catch (error: any) {
            console.error('Error al actualizar tarea:', error);
            setErrorMessage(error.response?.data?.message || 'Error al actualizar tarea');
        }
    };
    

    // Cargar tareas al montar el componente
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Mis Tareas
                </Typography>
                {errorMessage && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        {errorMessage}
                    </Typography>
                )}
                <Box sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        label="Nueva Tarea"
                        variant="outlined"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Descripción"
                        variant="outlined"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={handleAddTask}
                        fullWidth
                    >
                        Agregar Tarea
                    </Button>
                </Box>
                <List sx={{ mt: 4 }}>
                    {tasks.map((task) => (
                        <ListItem key={task.id} divider>
                            <ListItemText
                                primary={task.title}
                                secondary={`Estado: ${task.status} | Descripción: ${task.description || 'No especificada'}`}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" onClick={() => handleEditClick(task)}>
                                    <EditIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Diálogo de edición */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Editar Tarea</DialogTitle>
                <DialogContent>
                <TextField
                    fullWidth
                    label="Título"
                    variant="outlined"
                    value={editTask?.title || ""}
                    onChange={(e) => setEditTask(prev => prev ? { ...prev, title: e.target.value } : null)}
                />

                <TextField
                    fullWidth
                    label="Descripción"
                    variant="outlined"
                    value={editTask?.description || ""}
                    onChange={(e) => setEditTask(prev => prev ? { ...prev, description: e.target.value } : null)}
                />

                <Select
                    fullWidth
                    value={editTask?.status || "Pendiente"}
                    onChange={(e) => setEditTask(prev => prev ? { ...prev, status: e.target.value } : null)}
                >
                    <MenuItem value="Pendiente">Pendiente</MenuItem>
                    <MenuItem value="En Progreso">En Progreso</MenuItem>
                    <MenuItem value="Completado">Completado</MenuItem>
                </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button variant="contained" color="primary" onClick={handleUpdateTask}>
                        Guardar Cambios
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Dashboard;
