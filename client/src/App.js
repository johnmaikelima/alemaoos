import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import ProtectedRoute from './ProtectedRoute';
import Empresas from './pages/Empresas';
import Clientes from './pages/Clientes';
import Produtos from './pages/Produtos';
import Ordens from './pages/Ordens';
import CriarOrdem from './pages/CriarOrdem';
import EditarOrdem from './pages/EditarOrdem';
import Usuarios from './pages/Usuarios';

function App() {
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

  useEffect(() => {
    const handleStorageChange = () => {
      console.log('Storage changed');
      setUserName(localStorage.getItem('userName'));
      setUserId(localStorage.getItem('userId'));
      setUserRole(localStorage.getItem('userRole'));
    };

    const handleUserLoggedIn = () => {
      console.log('userLoggedIn event received');
      const newUserName = localStorage.getItem('userName');
      const newUserId = localStorage.getItem('userId');
      const newUserRole = localStorage.getItem('userRole');
      console.log('Atualizando estado:', { newUserName, newUserId, newUserRole });
      setUserName(newUserName);
      setUserId(newUserId);
      setUserRole(newUserRole);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLoggedIn', handleUserLoggedIn);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLoggedIn', handleUserLoggedIn);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="app">
        {userId && (
          <nav className="navbar">
            <div className="nav-container">
              <Link to="/" className="nav-logo">
                📋 Manager OS
              </Link>
              <ul className="nav-menu">
                <li className="nav-item">
                  <Link to="/empresas" className="nav-link">Empresas</Link>
                </li>
                <li className="nav-item">
                  <Link to="/clientes" className="nav-link">Clientes</Link>
                </li>
                <li className="nav-item">
                  <Link to="/produtos" className="nav-link">Produtos</Link>
                </li>
                <li className="nav-item">
                  <Link to="/ordens" className="nav-link">Ordens de Serviço</Link>
                </li>
                {userRole === 'admin' && (
                  <li className="nav-item">
                    <Link to="/usuarios" className="nav-link">Usuários</Link>
                  </li>
                )}
                <li className="nav-item nav-user">
                  <span className="user-name">{userName}</span>
                  <button onClick={handleLogout} className="nav-link logout-btn">
                    Sair
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        )}

        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/empresas" element={<ProtectedRoute><Empresas /></ProtectedRoute>} />
            <Route path="/clientes" element={<ProtectedRoute><Clientes /></ProtectedRoute>} />
            <Route path="/produtos" element={<ProtectedRoute><Produtos /></ProtectedRoute>} />
            <Route path="/ordens" element={<ProtectedRoute><Ordens /></ProtectedRoute>} />
            <Route path="/ordens/criar" element={<ProtectedRoute><CriarOrdem /></ProtectedRoute>} />
            <Route path="/ordens/editar/:id" element={<ProtectedRoute><EditarOrdem /></ProtectedRoute>} />
            <Route path="/usuarios" element={<ProtectedRoute><Usuarios /></ProtectedRoute>} />
            <Route path="/" element={userId ? <ProtectedRoute><Ordens /></ProtectedRoute> : <Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
