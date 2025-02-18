import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router,Routes, Route, } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import './styles/theme.ts';
import registerServiceWorker from './utils/registerServiceWorker.ts';

registerServiceWorker();


ReactDOM.createRoot(document.getElementById('root')as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    
  </React.StrictMode>
  
);