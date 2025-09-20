import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { safeLocalStorage } from '../utils/localStorage';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const token = safeLocalStorage.getItem('accessToken');
      const userData = safeLocalStorage.getJSON('user');
      
      if (token && userData) {
        setCurrentUser({ ...userData, token });
      }
      setLoading(false);
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
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
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
      
      // Обработка конкретных ошибок
      if (error.response?.status === 409) {
        errorMessage = 'User with this email already exists';
      } else if (error.response?.status === 400) {
        // Обработка ошибок валидации
        if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else {
          errorMessage = 'Invalid registration data';
        }
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
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

  const value = {
    currentUser,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};