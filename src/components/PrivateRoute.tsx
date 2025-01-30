import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage

    //si el token no existe, redirigir al usuario a la página de inicio de sesión
    return token ? children : <Navigate to="/" />;

    return children;
}
export default PrivateRoute;
