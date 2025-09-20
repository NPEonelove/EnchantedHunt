import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем, есть ли токен в localStorage при загрузке
    const token = localStorage.getItem('token');
    if (token) {
      // Здесь можно добавить проверку валидности токена
      setCurrentUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Здесь будет вызов API
      const response = await fakeAuthAPI(email, password);
      const { token, user } = response;
      
      localStorage.setItem('token', token);
      setCurrentUser({ ...user, token });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (email, password, name) => {
    try {
      // Здесь будет вызов API для регистрации
      const response = await fakeRegisterAPI(email, password, name);
      const { token, user } = response;
      
      localStorage.setItem('token', token);
      setCurrentUser({ ...user, token });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
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

// Заглушки для API (замените на реальные вызовы)
const fakeAuthAPI = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password') {
        resolve({
          token: 'fake-jwt-token',
          user: { 
            id: 1, 
            email, 
            name: 'Test User',
            position: 'Frontend Developer',
            department: 'IT Department'
          }
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

const fakeRegisterAPI = (email, password, name) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'fake-jwt-token',
        user: { 
          id: Date.now(), 
          email, 
          name,
          position: '',
          department: ''
        }
      });
    }, 1000);
  });
};