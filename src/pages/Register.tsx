import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register: React.FC = () => {
    const navigate = useNavigate();

    // Estados para los datos del formulario
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Evita recargar la página
        try {
            // Enviar datos al backend
            const response = await axios.post('http://localhost:5000/api/users/register', {
                username,
                email,
                password,
            });
            console.log('Registro exitoso:', response.data);
            // Redirigir al dashboard después de registrarse
            navigate('/dashboard');
        } catch (error: any) {
            console.error(error);
            // Mostrar mensaje de error si ocurre un problema
            setErrorMessage(error.response?.data?.message || 'Error al registrar usuario');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Registro
                </Typography>
                <Box component="form" noValidate sx={{ mt: 2 }} onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Nombre"
                        margin="normal"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Correo Electrónico"
                        margin="normal"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Contraseña"
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errorMessage && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                            {errorMessage}
                        </Typography>
                    )}
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3 }}
                        type="submit"
                    >
                        Registrarse
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
