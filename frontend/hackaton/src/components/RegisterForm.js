import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Очищаем ошибку при изменении поля
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Валидация на клиенте
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      return setError('Please fill in all fields');
    }

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters long');
    }

    if (!isValidEmail(formData.email)) {
      return setError('Please enter a valid email address');
    }

    try {
      setError('');
      setLoading(true);
      const result = await register(formData.email, formData.password, formData.name);
      
      if (!result.success) {
        setError(result.error);
      }
    } catch (error) {
      setError('Failed to create account. Please try again.');
    }
    setLoading(false);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="logo-container">
          <img src="/logo512.png" alt="Logo" className="logo" />
        </div>
        
        <h2>Create Account</h2>
        
        {error && (
          <div className="error-message">
            <strong>Registration Error:</strong> 
            <p>{error}</p>
            {error.includes('already exists') && (
              <div className="suggestion">
                <p>Already have an account? </p>
                <Link to="/login" className="suggestion-link">Sign in here</Link>
              </div>
            )}
          </div>
        )}
        
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label>Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password (min 6 characters)"
            minLength="6"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label>Confirm Password *</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm your password"
            disabled={loading}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className={`auth-button ${loading ? 'loading' : ''}`}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
        
        <div className="auth-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;