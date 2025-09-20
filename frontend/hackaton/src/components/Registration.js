import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate(); // Хук для навигации

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      setError('Все поля обязательны для заполнения');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Введите корректный email адрес');
      return false;
    }

    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');
    
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // В реальном приложении здесь был бы запрос к API регистрации
    const success = login(email, password);
    
    if (success) {
      // Перенаправляем на dashboard после успешной регистрации
      navigate('/dashboard');
    } else {
      setError('Ошибка при регистрации');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Создать аккаунт</h2>
        <p style={{textAlign: 'center', marginBottom: '1.5rem', color: '#e0e0e0'}}>
          Заполните данные для регистрации
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
            placeholder="Придумайте пароль (мин. 6 символов)"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Повторите пароль:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Повторите ваш пароль"
            required
          />
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
        
        <div style={{marginTop: '1.5rem', textAlign: 'center'}}>
          <span style={{color: '#a1a1aa'}}>Уже есть аккаунт? </span>
          <Link 
            to="/login" 
            style={{
              color: '#6366f1', 
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Registration;