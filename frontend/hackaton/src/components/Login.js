import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate(); // Хук для навигации

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    setError('');
    
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const success = login(email, password);
    
    if (success) {
      // Перенаправляем на dashboard после успешного входа
      navigate('/dashboard');
    } else {
      setError('Неверные учетные данные. Попробуйте любой email и пароль');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Добро пожаловать</h2>
        <p style={{textAlign: 'center', marginBottom: '1.5rem', color: '#e0e0e0'}}>
          Войдите в вашу учетную запись
        </p>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите ваш email"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите ваш пароль"
            required
          />
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Вход...' : 'Войти в систему'}
        </button>
        
        <div style={{marginTop: '1.5rem', textAlign: 'center'}}>
          <span style={{color: '#a1a1aa'}}>Нет аккаунта? </span>
          <Link 
            to="/register" 
            style={{
              color: '#6366f1', 
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            Зарегистрироваться
          </Link>
        </div>
        
        <div style={{marginTop: '0.5rem', textAlign: 'center', color: '#a1a1aa'}}>
          <small>Для демонстрации используйте любой email и пароль</small>
        </div>
      </form>
    </div>
  );
}

export default Login;