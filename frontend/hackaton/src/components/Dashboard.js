import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h2>Добро пожаловать в систему!</h2>
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '1.5rem',
        borderRadius: '12px',
        margin: '1.5rem 0',
        animation: 'fadeInUp 0.6s ease-out'
      }}>
        <p><strong>Email:</strong> {currentUser.email}</p>
        <p><strong>Статус:</strong> Авторизован</p>
        <p><strong>Дата входа:</strong> {new Date().toLocaleString()}</p>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button 
          onClick={() => navigate('/home')}
          style={{
            padding: '1rem 2rem',
            background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          Перейти на главную
        </button>
        
        <button 
          onClick={logout}
          style={{
            padding: '1rem 2rem',
            background: 'rgba(239, 68, 68, 0.2)',
            color: '#ef4444',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          Выйти из системы
        </button>
      </div>
    </div>
  );
}

export default Dashboard;