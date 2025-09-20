import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Показываем заглушку во время проверки аутентификации
  if (isLoading) {
    return (
      <div className="login-container">
        <div style={{textAlign: 'center', color: '#e0e0e0'}}>
          <p>Проверка авторизации...</p>
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;