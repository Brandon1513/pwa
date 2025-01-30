import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

// Definición de la interfaz para una tarea
interface Task {
    id: number;
    title: string;
    status: string;
}

const Dashboard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]); // Estado para las tareas
    const [taskTitle, setTaskTitle] = useState(''); // Estado para el título de la nueva tarea
    const [errorMessage, setErrorMessage] = useState(''); // Estado para mensajes de error

    // Función para obtener tareas específicas del usuario desde el backend
    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token'); // Asegúrate de que el token incluya "Bearer"
            if (!token) {
                setErrorMessage('Usuario no autenticado. Por favor, inicie sesión.');
                return;
            }

            // Petición GET para obtener las tareas
            const response = await axios.get('http://localhost:5000/api/tasks', {
                headers: {
                    Authorization: token, // Enviar el token en el encabezado
                },
            });
            setTasks(response.data); // Actualizar las tareas en el estado
            setErrorMessage(''); // Limpiar el mensaje de error
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
            const token = localStorage.getItem('token'); // Obtener el token del localStorage
            if (!token) {
                setErrorMessage('Usuario no autenticado. Por favor, inicie sesión.');
                return;
            }

            // Petición POST para agregar una nueva tarea
            const response = await axios.post(
                'http://localhost:5000/api/tasks',
                { title: taskTitle, status: 'Pendiente' },
                {
                    headers: {
                        Authorization: token, // Añadir el token al encabezado
                    },
                }
            );
            setTasks([...tasks, response.data]); // Agregar la nueva tarea a la lista
            setTaskTitle(''); // Limpiar el input de la nueva tarea
            setErrorMessage(''); // Limpiar el mensaje de error
        } catch (error: any) {
            console.error('Error al agregar tarea:', error);
            setErrorMessage(error.response?.data?.message || 'Error al agregar tarea');
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
                                secondary={`Estado: ${task.status}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
};

export default Dashboard;
