import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem('accessToken');
        const userData = localStorage.getItem('user');
        
        // Проверяем, что userData существует и не является undefined
        if (token && userData && userData !== 'undefined') {
          const parsedUser = JSON.parse(userData);
          setCurrentUser({ ...parsedUser, token });
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        // Очищаем некорректные данные
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.signIn({
        email: email,
        password: password
      });

      const { accessToken, refreshToken, user } = response;
      
      // Сохраняем токены и данные пользователя
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      // Убеждаемся, что user - валидный объект
      if (user && typeof user === 'object') {
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser({ ...user, token: accessToken });
      } else {
        throw new Error('Invalid user data received from server');
      }
      
      return { success: true };
    } catch (error) {
      let errorMessage = 'Failed to login';
      
      if (error.response?.data) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return { success: false, error: errorMessage };
    }
  };

  const register = async (email, password, name) => {
    try {
      const response = await authService.signUp({
        email: email,
        password: password,
        name: name
      });

      const { accessToken, refreshToken, user } = response;
      
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      // Убеждаемся, что user - валидный объект
      if (user && typeof user === 'object') {
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser({ ...user, token: accessToken });
      } else {
        throw new Error('Invalid user data received from server');
      }
      
      return { success: true };
    } catch (error) {
      let errorMessage = 'Failed to create account';
      
      if (error.response?.data) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setCurrentUser(null);
    }
  };

  const refreshAuthToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await authService.refreshToken(refreshToken);
      const { accessToken, refreshToken: newRefreshToken } = response;
      
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);
      
      return accessToken;
    } catch (error) {
      logout();
      throw error;
    }
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    refreshAuthToken
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};