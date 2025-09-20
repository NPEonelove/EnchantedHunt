import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// Безопасные утилиты для localStorage (исправленные)
const safeLocalStorage = {
  getItem: (key) => {
    try {
      if (typeof window === 'undefined') return null;
      const item = localStorage.getItem(key);
      return item === 'undefined' || item === 'null' || item === null ? null : item;
    } catch (error) {
      console.warn(`Error reading ${key} from localStorage:`, error);
      return null;
    }
  },

  setItem: (key, value) => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn(`Error setting ${key} in localStorage:`, error);
    }
  },

  removeItem: (key) => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing ${key} from localStorage:`, error);
    }
  },

  getJSON: function(key) {  // Используем function вместо стрелочной для правильного this
    try {
      const item = this.getItem(key);
      if (!item) return null;
      return JSON.parse(item);
    } catch (error) {
      console.warn(`Error parsing ${key} from localStorage:`, error);
      this.removeItem(key);
      return null;
    }
  },

  setJSON: function(key, value) {  // Используем function вместо стрелочной
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error stringifying ${key} for localStorage:`, error);
    }
  }
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = safeLocalStorage.getItem('accessToken');
        const userData = safeLocalStorage.getJSON('user');
        
        console.log('Auth initialization - token:', !!token, 'userData:', userData);
        
        if (token && userData && typeof userData === 'object') {
          setCurrentUser({ ...userData, token });
        } else {
          // Очищаем невалидные данные
          if (token && !userData) {
            safeLocalStorage.removeItem('accessToken');
            safeLocalStorage.removeItem('refreshToken');
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Полная очистка при любой ошибке
        safeLocalStorage.removeItem('accessToken');
        safeLocalStorage.removeItem('refreshToken');
        safeLocalStorage.removeItem('user');
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

      // Ваш бэкенд возвращает JwtAuthenticationDTO с полями:
      // accessToken, refreshToken, user
      const { accessToken, refreshToken, user } = response;
      
      safeLocalStorage.setItem('accessToken', accessToken);
      safeLocalStorage.setItem('refreshToken', refreshToken);
      
      if (user && typeof user === 'object') {
        safeLocalStorage.setJSON('user', user);
        setCurrentUser({ ...user, token: accessToken });
      }
      
      return { success: true };
    } catch (error) {
      let errorMessage = 'Failed to login';
      
      if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (error.response?.data) {
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
      
      safeLocalStorage.setItem('accessToken', accessToken);
      safeLocalStorage.setItem('refreshToken', refreshToken);
      
      if (user && typeof user === 'object') {
        safeLocalStorage.setJSON('user', user);
        setCurrentUser({ ...user, token: accessToken });
      }
      
      return { success: true };
    } catch (error) {
      let errorMessage = 'Failed to create account';
      
      if (error.response?.status === 409) {
        errorMessage = 'User with this email already exists';
      } else if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || 'Invalid registration data';
      } else if (error.response?.data) {
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
      safeLocalStorage.removeItem('accessToken');
      safeLocalStorage.removeItem('refreshToken');
      safeLocalStorage.removeItem('user');
      setCurrentUser(null);
    }
  };

  const refreshAuthToken = async () => {
    try {
      const refreshToken = safeLocalStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await authService.refreshToken(refreshToken);
      const { accessToken, refreshToken: newRefreshToken } = response;
      
      safeLocalStorage.setItem('accessToken', accessToken);
      safeLocalStorage.setItem('refreshToken', newRefreshToken);
      
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